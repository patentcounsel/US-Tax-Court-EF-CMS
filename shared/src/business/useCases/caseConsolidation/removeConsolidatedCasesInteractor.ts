import { Case } from '../../entities/cases/Case';
import { NotFoundError, UnauthorizedError } from '../../../errors/errors';
import {
  ROLE_PERMISSIONS,
  isAuthorized,
} from '../../../authorization/authorizationClientService';

/**
 * removeConsolidatedCasesInteractor
 *
 * @param {object} applicationContext the application context
 * @param {object} providers the providers object
 * @param {object} providers.docketNumber the docket number of the case to consolidate
 * @param {Array} providers.docketNumbersToRemove the docket numbers of the cases to remove from consolidation
 * @returns {object} the updated case data
 */
export const removeConsolidatedCasesInteractor = async (
  applicationContext: IApplicationContext,
  {
    docketNumber,
    docketNumbersToRemove,
  }: { docketNumber: string; docketNumbersToRemove: string[] },
) => {
  const user = applicationContext.getCurrentUser();

  if (!isAuthorized(user, ROLE_PERMISSIONS.CONSOLIDATE_CASES)) {
    throw new UnauthorizedError('Unauthorized for case consolidation');
  }

  const caseToUpdate = await applicationContext
    .getPersistenceGateway()
    .getCaseByDocketNumber({ applicationContext, docketNumber });

  if (!caseToUpdate) {
    throw new NotFoundError(`Case ${docketNumber} was not found.`);
  }

  const updateCasePromises = [];

  const { leadDocketNumber } = caseToUpdate;

  const allConsolidatedCases = await applicationContext
    .getPersistenceGateway()
    .getCasesByLeadDocketNumber({
      applicationContext,
      leadDocketNumber,
    });

  const newConsolidatedCases = allConsolidatedCases.filter(
    consolidatedCase =>
      !docketNumbersToRemove.includes(consolidatedCase.docketNumber),
  );

  if (
    docketNumbersToRemove.includes(leadDocketNumber) &&
    newConsolidatedCases.length > 1
  ) {
    const newLeadCase = Case.findLeadCaseForCases(newConsolidatedCases);

    for (let newConsolidatedCaseToUpdate of newConsolidatedCases) {
      const oldCaseCopy = applicationContext
        .getUtilities()
        .cloneAndFreeze(newConsolidatedCaseToUpdate);
      const caseEntity = new Case(newConsolidatedCaseToUpdate, {
        applicationContext,
      });
      caseEntity.setLeadCase(newLeadCase.docketNumber);

      updateCasePromises.push(
        applicationContext.getUseCaseHelpers().updateCaseAndAssociations({
          applicationContext,
          caseToUpdate: caseEntity,
          oldCaseCopy,
        }),
      );
    }
  } else if (newConsolidatedCases.length == 1) {
    // a case cannot be consolidated with itself
    const oldCaseCopy = applicationContext
      .getUtilities()
      .cloneAndFreeze(newConsolidatedCases[0]);
    const caseEntity = new Case(newConsolidatedCases[0], {
      applicationContext,
    });
    caseEntity.removeConsolidation();

    updateCasePromises.push(
      applicationContext.getUseCaseHelpers().updateCaseAndAssociations({
        applicationContext,
        caseToUpdate: caseEntity,
        oldCaseCopy,
      }),
    );
  }

  for (let docketNumberToRemove of docketNumbersToRemove) {
    const caseToRemove = await applicationContext
      .getPersistenceGateway()
      .getCaseByDocketNumber({
        applicationContext,
        docketNumber: docketNumberToRemove,
      });

    if (!caseToRemove) {
      throw new NotFoundError(
        `Case to consolidate with (${docketNumberToRemove}) was not found.`,
      );
    }

    const oldCaseCopy = applicationContext
      .getUtilities()
      .cloneAndFreeze(caseToRemove);

    const caseEntity = new Case(caseToRemove, { applicationContext });
    caseEntity.removeConsolidation();

    updateCasePromises.push(
      applicationContext.getUseCaseHelpers().updateCaseAndAssociations({
        applicationContext,
        caseToUpdate: caseEntity,
        oldCaseCopy,
      }),
    );
  }

  await Promise.all(updateCasePromises);
};

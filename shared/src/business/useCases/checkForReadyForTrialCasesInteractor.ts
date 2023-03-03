import { CASE_STATUS_TYPES } from '../entities/EntityConstants';
import { Case } from '../entities/cases/Case';
import { cloneDeep } from 'lodash';
import { createISODateString } from '../utilities/DateHandler';
import deepFreeze from 'deep-freeze';

/**
 * @param {object} applicationContext the application context
 */
export const checkForReadyForTrialCasesInteractor = async (
  applicationContext: IApplicationContext,
) => {
  applicationContext.logger.debug('Time', createISODateString());

  const caseCatalog = await applicationContext
    .getPersistenceGateway()
    .getReadyForTrialCases({ applicationContext });

  const updateForTrial = async ({ entity, oldCaseCopy }) => {
    // assuming we want these done serially; if first fails, promise is rejected and error thrown
    const caseEntity = entity.validate();
    await applicationContext.getUseCaseHelpers().updateCaseAndAssociations({
      applicationContext,
      newCase: caseEntity,
      oldCaseCopy,
    });

    if (caseEntity.isReadyForTrial()) {
      await applicationContext
        .getPersistenceGateway()
        .createCaseTrialSortMappingRecords({
          applicationContext,
          caseSortTags: caseEntity.generateTrialSortTags(),
          docketNumber: caseEntity.docketNumber,
        });
    }
  };

  const updatedCases = [];

  for (let caseRecord of caseCatalog) {
    const { docketNumber } = caseRecord;
    const caseToCheck = await applicationContext
      .getPersistenceGateway()
      .getCaseByDocketNumber({
        applicationContext,
        docketNumber,
      });

    if (caseToCheck) {
      const oldCaseCopy = deepFreeze(cloneDeep(caseToCheck));
      const caseEntity = new Case(caseToCheck, { applicationContext });

      if (caseEntity.status === CASE_STATUS_TYPES.generalDocket) {
        caseEntity.checkForReadyForTrial();
        if (
          caseEntity.status === CASE_STATUS_TYPES.generalDocketReadyForTrial
        ) {
          updatedCases.push(
            updateForTrial({ entity: caseEntity, oldCaseCopy }),
          );
        }
      }
    }
  }

  await Promise.all(updatedCases);

  applicationContext.logger.debug('Time', createISODateString());
};

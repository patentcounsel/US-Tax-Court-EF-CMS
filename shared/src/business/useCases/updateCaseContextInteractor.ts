import { CASE_STATUS_TYPES } from '../entities/EntityConstants';
import { Case } from '../entities/cases/Case';
import {
  ROLE_PERMISSIONS,
  isAuthorized,
} from '../../authorization/authorizationClientService';
import { TrialSession } from '../entities/trialSessions/TrialSession';
import { UnauthorizedError } from '../../errors/errors';

/**
 * updateCaseContextInteractor
 *
 * @param {object} applicationContext the application context
 * @param {object} providers the providers object
 * @param {string} providers.associatedJudge the associated judge to set on the case
 * @param {string} providers.caseCaption the caption to set on the case
 * @param {string} providers.docketNumber the docket number of the case to update
 * @param {object} providers.caseStatus the status to set on the case
 * @returns {object} the updated case data
 */
export const updateCaseContextInteractor = async (
  applicationContext: IApplicationContext,
  {
    associatedJudge,
    caseCaption,
    caseStatus,
    docketNumber,
  }: {
    associatedJudge?: string;
    caseCaption?: string;
    caseStatus?: string;
    docketNumber: string;
  },
) => {
  const user = applicationContext.getCurrentUser();

  if (!isAuthorized(user, ROLE_PERMISSIONS.UPDATE_CASE_CONTEXT)) {
    throw new UnauthorizedError('Unauthorized for update case');
  }

  const caseRecord = await applicationContext
    .getPersistenceGateway()
    .getCaseByDocketNumber({ applicationContext, docketNumber });
  const oldCaseCopy = applicationContext
    .getUtilities()
    .cloneAndFreeze(caseRecord);
  const newCase = new Case(caseRecord, { applicationContext });

  if (caseCaption) {
    newCase.setCaseCaption(caseCaption);
  }

  if (associatedJudge) {
    newCase.setAssociatedJudge(associatedJudge);
  }

  // if this case status is changing FROM calendared
  // we need to remove it from the trial session
  if (caseStatus && caseStatus !== oldCaseCopy.status) {
    const date = applicationContext.getUtilities().createISODateString();
    newCase.setCaseStatus({
      changedBy: user.name,
      date,
      updatedCaseStatus: caseStatus,
    });

    if (oldCaseCopy.status === CASE_STATUS_TYPES.calendared) {
      const disposition = `Status was changed to ${caseStatus}`;

      const trialSession = await applicationContext
        .getPersistenceGateway()
        .getTrialSessionById({
          applicationContext,
          trialSessionId: caseRecord.trialSessionId,
        });

      const trialSessionEntity = new TrialSession(trialSession, {
        applicationContext,
      });

      trialSessionEntity.removeCaseFromCalendar({
        disposition,
        docketNumber: caseRecord.docketNumber,
      });

      await applicationContext.getPersistenceGateway().updateTrialSession({
        applicationContext,
        trialSessionToUpdate: trialSessionEntity.validate().toRawObject(),
      });

      newCase.removeFromTrialWithAssociatedJudge(associatedJudge);
    } else if (
      caseRecord.status === CASE_STATUS_TYPES.generalDocketReadyForTrial
    ) {
      await applicationContext
        .getPersistenceGateway()
        .deleteCaseTrialSortMappingRecords({
          applicationContext,
          docketNumber: newCase.docketNumber,
        });
    }

    if (newCase.isReadyForTrial() && !caseRecord.trialSessionId) {
      await applicationContext
        .getPersistenceGateway()
        .createCaseTrialSortMappingRecords({
          applicationContext,
          caseSortTags: newCase.generateTrialSortTags(),
          docketNumber: newCase.docketNumber,
        });
    }
  }

  const updatedCase = await applicationContext
    .getUseCaseHelpers()
    .updateCaseAndAssociations({
      applicationContext,
      newCase,
      oldCaseCopy,
    });

  return new Case(updatedCase, { applicationContext }).toRawObject();
};

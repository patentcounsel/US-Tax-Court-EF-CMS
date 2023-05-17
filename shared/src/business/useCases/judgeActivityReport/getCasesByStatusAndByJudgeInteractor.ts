import { Case } from '../../entities/cases/Case';
import {
  ROLE_PERMISSIONS,
  isAuthorized,
} from '../../../authorization/authorizationClientService';
import { UnauthorizedError } from '../../../errors/errors';

const getConsolidatedCaseGroupCountMap = (
  consolidatedCases,
  consolidatedCasesGroupCountMap,
) => {
  consolidatedCases
    .sort(
      (a, b) =>
        Case.getSortableDocketNumber(a.docketNumber) -
        Case.getSortableDocketNumber(b.docketNumber),
    )
    .forEach(consolidatedCase => {
      if (consolidatedCase.leadDocketNumber) {
        if (
          !consolidatedCasesGroupCountMap.has(consolidatedCase.leadDocketNumber)
        ) {
          consolidatedCasesGroupCountMap.set(
            consolidatedCase.leadDocketNumber,
            1,
          );
        } else {
          consolidatedCasesGroupCountMap.set(
            consolidatedCase.leadDocketNumber,
            consolidatedCasesGroupCountMap.get(
              consolidatedCase.leadDocketNumber,
            ) + 1,
          );
        }
      }
    });
};

const hasUnwantedDocketEntryEventCode = docketEntries => {
  const prohibitedDocketEntryEventCodes = ['ODD', 'DEC', 'OAD', 'SDEC'];
  return docketEntries.some(docketEntry =>
    prohibitedDocketEntryEventCodes.includes(docketEntry.eventCode),
  );
};

const filterCasesWithUnwantedDocketEntryEventCodes = caseRecords => {
  const caseRecordsToReturn = [];

  caseRecords.forEach(individualCaseRecord => {
    if (!hasUnwantedDocketEntryEventCode(individualCaseRecord.docketEntries)) {
      caseRecordsToReturn.push(individualCaseRecord);
    }
  });

  return caseRecordsToReturn;
};

/**
 * getCasesClosedByJudgeInteractor
 * @param {object} applicationContext the application context
 * @param {object} providers the providers object
 * @param {string} providers.endDate the date to end the search for judge activity
 * @param {string} providers.judgeName the name of the judge
 * @param {string} providers.startDate the date to start the search for judge activity
 * @param {array} providers.statuses statuses of cases for judge activity
 * @returns {object} errors (null if no errors)
 */
export const getCasesByStatusAndByJudgeInteractor = async (
  applicationContext,
  {
    judgeName,
    statuses,
  }: {
    judgeName: string;
    statuses: string[];
  },
) => {
  const authorizedUser = applicationContext.getCurrentUser();

  if (!isAuthorized(authorizedUser, ROLE_PERMISSIONS.JUDGE_ACTIVITY_REPORT)) {
    throw new UnauthorizedError('Unauthorized');
  }

  const submittedAndCavCasesResults = await applicationContext
    .getPersistenceGateway()
    .getCasesByStatusAndByJudge({
      applicationContext,
      judgeName,
      statuses,
    });

  const rawCaseRecords = await Promise.all(
    submittedAndCavCasesResults.map(async result => {
      return await applicationContext
        .getPersistenceGateway()
        .getCaseByDocketNumber({
          applicationContext,
          docketNumber: result.docketNumber,
        });
    }),
  );

  // We need to filter out member cases returned from elasticsearch so we can get an accurate
  // conolidated cases group count even when the case status of a member case does not match
  // the lead case status.
  const rawCaseRecordsWithWithoutMemberCases = await Promise.all(
    rawCaseRecords
      .filter(
        rawCaseRecord =>
          !rawCaseRecord.leadDocketNumber ||
          rawCaseRecord.docketNumber === rawCaseRecord.leadDocketNumber,
      )
      .map(async rawCaseRecord => {
        if (rawCaseRecord.leadDocketNumber) {
          if (rawCaseRecord.docketNumber === rawCaseRecord.leadDocketNumber) {
            rawCaseRecord.consolidatedCases = await applicationContext
              .getPersistenceGateway()
              .getCasesByLeadDocketNumber({
                applicationContext,
                leadDocketNumber: rawCaseRecord.docketNumber,
              });
            return rawCaseRecord;
          }
        } else {
          return rawCaseRecord;
        }
      }),
  );

  console.log(
    'rawCaseRecordsWithWithoutMemberCases:::::',
    rawCaseRecordsWithWithoutMemberCases,
  );

  const filteredCaseRecords = filterCasesWithUnwantedDocketEntryEventCodes(
    rawCaseRecordsWithWithoutMemberCases,
  );

  const consolidatedCasesGroupCountMap = new Map();
  filteredCaseRecords.forEach(filteredCaseRecord => {
    if (filteredCaseRecord.leadDocketNumber) {
      getConsolidatedCaseGroupCountMap(
        filteredCaseRecord.consolidatedCases,
        consolidatedCasesGroupCountMap,
      );
    }
  });

  console.log(
    'consolidatedCasesGroupCountMap:::::',
    consolidatedCasesGroupCountMap,
  );

  return {
    cases: Case.validateRawCollection(filteredCaseRecords, {
      applicationContext,
    }),
    consolidatedCasesGroupCountMap: Object.fromEntries(
      consolidatedCasesGroupCountMap,
    ),
  };
};

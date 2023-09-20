import { AggregatedEventCodesType } from '@web-api/persistence/elasticsearch/fetchEventCodesCountForJudges';
import { InvalidRequest, UnauthorizedError } from '@web-api/errors/errors';
import {
  JUDGE_ACTIVITY_REPORT_ORDER_EVENT_CODES,
  OPINION_EVENT_CODES_WITH_BENCH_OPINION,
} from '../../entities/EntityConstants';
import { JudgeActivityReportSearch } from '../../entities/judgeActivityReport/JudgeActivityReportSearch';
import {
  ROLE_PERMISSIONS,
  isAuthorized,
} from '@shared/authorization/authorizationClientService';
import { addDocumentTypeToEventCodeAggregation } from './addDocumentTypeToEventCodeAggregation';

export type CaseDocumentsAggregationReturnType = {
  orders: AggregatedEventCodesType;
  opinions: AggregatedEventCodesType;
};

export type JudgeActivityReportFilters = {
  endDate: string;
  startDate: string;
  judgeId?: string;
  judges: string[];
};

export const getCountOfCaseDocumentsFiledByJudgesInteractor = async (
  applicationContext: IApplicationContext,
  params: JudgeActivityReportFilters,
): Promise<CaseDocumentsAggregationReturnType> => {
  const authorizedUser = applicationContext.getCurrentUser();

  if (!isAuthorized(authorizedUser, ROLE_PERMISSIONS.JUDGE_ACTIVITY_REPORT)) {
    throw new UnauthorizedError('Unauthorized to view Judge Activity Report');
  }

  const searchEntity = new JudgeActivityReportSearch(params);

  if (!searchEntity.isValid()) {
    throw new InvalidRequest('The Search Params for judges are invalid');
  }

  const { aggregations: opinionAggregationCount, total: opinionTotal } =
    await applicationContext
      .getPersistenceGateway()
      .fetchEventCodesCountForJudges({
        applicationContext,
        params: {
          documentEventCodes: OPINION_EVENT_CODES_WITH_BENCH_OPINION,
          endDate: searchEntity.endDate,
          judges: searchEntity.judges,
          startDate: searchEntity.startDate,
        },
      });

  const computedAggregatedOpinionEventCodes =
    addDocumentTypeToEventCodeAggregation(opinionAggregationCount);

  const { aggregations: orderAggregationCount, total: orderTotal } =
    await applicationContext
      .getPersistenceGateway()
      .fetchEventCodesCountForJudges({
        applicationContext,
        params: {
          documentEventCodes: JUDGE_ACTIVITY_REPORT_ORDER_EVENT_CODES,
          endDate: searchEntity.endDate,
          judges: searchEntity.judges,
          startDate: searchEntity.startDate,
        },
      });

  const computedAggregatedOrderEventCodes =
    addDocumentTypeToEventCodeAggregation(orderAggregationCount);

  return {
    opinions: {
      aggregations: computedAggregatedOpinionEventCodes,
      total: opinionTotal,
    },
    orders: {
      aggregations: computedAggregatedOrderEventCodes,
      total: orderTotal,
    },
  };
};

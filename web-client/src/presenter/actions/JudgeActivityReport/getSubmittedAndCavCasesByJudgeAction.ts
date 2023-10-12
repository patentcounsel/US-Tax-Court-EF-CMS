import { CAV_AND_SUBMITTED_CASE_STATUS } from '../../../../../shared/src/business/entities/EntityConstants';
import { state } from '@web-client/presenter/app.cerebral';

export const getSubmittedAndCavCasesByJudgeAction = async ({
  applicationContext,
  get,
}: ActionProps) => {
  const { judges } = get(state.judgeActivityReport.filters);

  const { cases, totalCount } = await applicationContext
    .getUseCases()
    .getCasesByStatusAndByJudgeInteractor(applicationContext, {
      judges,

      statuses: CAV_AND_SUBMITTED_CASE_STATUS,
    });

  return {
    cases,
    totalCountForSubmittedAndCavCases: totalCount,
  };
};

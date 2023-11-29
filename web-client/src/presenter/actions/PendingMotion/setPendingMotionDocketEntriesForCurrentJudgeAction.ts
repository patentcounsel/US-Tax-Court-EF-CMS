import { DocketEntryWithWorksheet } from '@shared/business/useCases/pendingMotion/getPendingMotionDocketEntriesForCurrentJudgeInteractor';
import { state } from '@web-client/presenter/app.cerebral';

export const setPendingMotionDocketEntriesForCurrentJudgeAction = ({
  props,
  store,
}: ActionProps<{
  docketEntries: DocketEntryWithWorksheet[];
}>): void => {
  const { docketEntries } = props;
  store.set(state.pendingMotions.docketEntries, docketEntries);
};

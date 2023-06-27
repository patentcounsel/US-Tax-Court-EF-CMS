import { clearAlertsAction } from '../actions/clearAlertsAction';
import { setCurrentPageAction } from '../actions/setCurrentPageAction';

export const printPaperServiceForTrialCompleteSequence = [
  clearAlertsAction,
  setCurrentPageAction('TrialSessionDetail'),
];

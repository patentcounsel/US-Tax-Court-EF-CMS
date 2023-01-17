import { clearModalStateAction } from '../actions/clearModalStateAction';
import { getConstants } from '../../getConstants';
import { getFeatureFlagValueFactoryAction } from '../actions/getFeatureFlagValueFactoryAction';
import { setDocketEntryIdAction } from '../actions/setDocketEntryIdAction';
import { setMultiDocketingCheckboxesAction } from '../actions/CaseConsolidation/setMultiDocketingCheckboxesAction';
import { setRedirectUrlAction } from '../actions/setRedirectUrlAction';
import { setShowModalFactoryAction } from '../actions/setShowModalFactoryAction';
import { shouldSetupConsolidatedCasesAction } from '../actions/CaseConsolidation/shouldSetupConsolidatedCasesAction';

export const openConfirmServePaperFiledDocumentSequence = [
  setRedirectUrlAction,
  getFeatureFlagValueFactoryAction(
    getConstants().ALLOWLIST_FEATURE_FLAGS.MULTI_DOCKETABLE_PAPER_FILINGS,
    true,
  ),
  setDocketEntryIdAction,
  clearModalStateAction,
  shouldSetupConsolidatedCasesAction,
  {
    no: [],
    yes: [setMultiDocketingCheckboxesAction],
  },
  setShowModalFactoryAction('ConfirmInitiatePaperFilingServiceModal'),
];

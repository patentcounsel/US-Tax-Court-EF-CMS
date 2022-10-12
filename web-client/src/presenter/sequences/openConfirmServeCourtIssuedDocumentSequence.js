import { clearModalStateAction } from '../actions/clearModalStateAction';
import { getConstants } from '../../getConstants';
import { getFeatureFlagValueFactoryAction } from '../actions/getFeatureFlagValueFactoryAction';
import { setDocketEntryIdAction } from '../actions/setDocketEntryIdAction';
import { setRedirectUrlAction } from '../actions/setRedirectUrlAction';
import { setShowModalFactoryAction } from '../actions/setShowModalFactoryAction';
import { setupConsolidatedCasesAction } from '../actions/CaseConsolidation/setupConsolidatedCasesAction';
import { shouldSetupConsolidatedCasesAction } from '../actions/CaseConsolidation/shouldSetupConsolidatedCasesAction';

export const openConfirmServeCourtIssuedDocumentSequence = [
  setRedirectUrlAction,
  setDocketEntryIdAction,
  clearModalStateAction,
  getFeatureFlagValueFactoryAction(
    getConstants().ALLOWLIST_FEATURE_FLAGS
      .CONSOLIDATED_CASES_PROPAGATE_DOCKET_ENTRIES,
    true,
  ),
  shouldSetupConsolidatedCasesAction,
  {
    no: [],
    yes: [setupConsolidatedCasesAction],
  },
  setShowModalFactoryAction('ConfirmInitiateCourtIssuedDocumentServiceModal'),
];

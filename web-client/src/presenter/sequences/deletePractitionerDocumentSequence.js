import { clearErrorAlertsAction } from '../actions/clearErrorAlertsAction';
import { clearModalAction } from '../actions/clearModalAction';
import { clearModalStateAction } from '../actions/clearModalStateAction';
import { deletePractitionerDocumentAction } from '../actions/Practitioners/deletePractitionerDocumentAction';
import { getDeletePractitionerDocumentAlertSuccessAction } from '../actions/Practitioners/getDeletePractitionerDocumentAlertSuccessAction';
import { getPractitionerDocumentsAction } from '../actions/getPractitionerDocumentsAction';
import { setAlertErrorAction } from '../actions/setAlertErrorAction';
import { setAlertSuccessAction } from '../actions/setAlertSuccessAction';
import { setInitialTableSortAction } from '../actions/setInitialTableSortAction';
import { setPractitionerDocumentsAction } from '../actions/setPractitionerDocumentsAction';
import { setTabFromPropsAction } from '../actions/setTabFromPropsAction';
import { showProgressSequenceDecorator } from '../utilities/showProgressSequenceDecorator';

export const deletePractitionerDocumentSequence = showProgressSequenceDecorator(
  [
    deletePractitionerDocumentAction,
    {
      error: [setAlertErrorAction],
      success: [
        clearErrorAlertsAction,
        setTabFromPropsAction,
        setInitialTableSortAction,
        getPractitionerDocumentsAction,
        setPractitionerDocumentsAction,
        getDeletePractitionerDocumentAlertSuccessAction,
        setAlertSuccessAction,
      ],
    },
    clearModalAction,
    clearModalStateAction,
  ],
);

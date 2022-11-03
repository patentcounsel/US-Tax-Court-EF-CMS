import { clearFormAction } from '../actions/clearFormAction';
import { clearModalAction } from '../actions/clearModalAction';
import { clearScansAction } from '../actions/clearScansAction';
import { clearScreenMetadataAction } from '../actions/clearScreenMetadataAction';
import { deconstructDatesToFormAction } from '../actions/EditDocketRecord/deconstructDatesToFormAction';
import { getCaseAction } from '../actions/getCaseAction';
import { getShouldMarkReadAction } from '../actions/getShouldMarkReadAction';
import { isLoggedInAction } from '../actions/isLoggedInAction';
import { isWorkItemAlreadyCompletedAction } from '../actions/isWorkItemAlreadyCompletedAction';
import { redirectToCognitoAction } from '../actions/redirectToCognitoAction';
import { setCaseAction } from '../actions/setCaseAction';
import { setCurrentPageAction } from '../actions/setCurrentPageAction';
import { setDocketEntryFormForDocketEditAction } from '../actions/EditDocketRecord/setDocketEntryFormForDocketEditAction';
import { setDocketEntryIdAction } from '../actions/setDocketEntryIdAction';
import { setFromPageAction } from '../actions/setFromPageAction';
import { setQCWorkItemIdToMarkAsReadIfNeededAction } from '../actions/EditDocketRecord/setQCWorkItemIdToMarkAsReadIfNeededAction';
import { setShowModalFactoryAction } from '../actions/setShowModalFactoryAction';
import { setTabAction } from '../actions/setTabAction';
import { setWorkItemAsReadAction } from '../actions/setWorkItemAsReadAction';
import { startWebSocketConnectionSequenceDecorator } from '../utilities/startWebSocketConnectionSequenceDecorator';
import { stopShowValidationAction } from '../actions/stopShowValidationAction';
import { updateDocketEntryWizardDataAction } from '../actions/DocketEntry/updateDocketEntryWizardDataAction';

export const gotoDocketEntryQc = startWebSocketConnectionSequenceDecorator([
  setCurrentPageAction('Interstitial'),
  stopShowValidationAction,
  setFromPageAction,
  clearScansAction,
  clearFormAction,
  clearModalAction,
  clearScreenMetadataAction,
  getCaseAction,
  setCaseAction,
  setDocketEntryFormForDocketEditAction,
  deconstructDatesToFormAction,
  updateDocketEntryWizardDataAction,
  setDocketEntryIdAction,
  isWorkItemAlreadyCompletedAction,
  {
    no: [],
    yes: [setShowModalFactoryAction('WorkItemAlreadyCompletedModal')],
  },
  setQCWorkItemIdToMarkAsReadIfNeededAction,
  setTabAction('Document Info'),
  setCurrentPageAction('DocketEntryQc'),
  getShouldMarkReadAction,
  {
    markRead: [setWorkItemAsReadAction],
    noAction: [],
  },
]);

export const gotoDocketEntryQcSequence = [
  isLoggedInAction,
  {
    isLoggedIn: gotoDocketEntryQc,
    unauthorized: [redirectToCognitoAction],
  },
];

import { broadcastLogoutAction } from '../actions/broadcastLogoutAction';
import { clearAlertsAction } from '../actions/clearAlertsAction';
import { clearLoginFormAction } from '../actions/clearLoginFormAction';
import { clearMaintenanceModeAction } from '../actions/clearMaintenanceModeAction';
import { clearUserAction } from '../actions/clearUserAction';
import { deleteAuthCookieAction } from '../actions/deleteAuthCookieAction';
import { navigateToCognitoAction } from '../actions/navigateToCognitoAction';
import { setupCurrentPageAction } from '../actions/setupCurrentPageAction';
import { stopWebSocketConnectionAction } from '../actions/WebSocketConnection/stopWebSocketConnectionAction';

export const signOutSequence = [
  setupCurrentPageAction('Interstitial'),
  stopWebSocketConnectionAction,
  broadcastLogoutAction,
  deleteAuthCookieAction,
  clearAlertsAction,
  clearUserAction,
  clearMaintenanceModeAction,
  clearLoginFormAction,
  navigateToCognitoAction,
];

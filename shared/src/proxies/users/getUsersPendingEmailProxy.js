const { get } = require('../requests');

/**
 * getUsersPendingEmailInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.userIds the userId to update the pendingEmail
 * @returns {Promise<*>} the promise of the api call
 */
exports.getUsersPendingEmailInteractor = ({ applicationContext, userIds }) => {
  return get({
    applicationContext,
    endpoint: '/users/pending-email',
    params: { userIds },
  });
};

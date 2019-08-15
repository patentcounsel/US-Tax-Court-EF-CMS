const { get } = require('../requests');

/**
 * getTrialSessionWorkingCopyInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.trialSessionId the id of the trial session
 * @returns {Promise<*>} the promise of the api call
 */
exports.getTrialSessionWorkingCopyInteractor = ({
  applicationContext,
  trialSessionId,
}) => {
  return get({
    applicationContext,
    endpoint: `/trial-sessions/${trialSessionId}/working-copy`,
  });
};

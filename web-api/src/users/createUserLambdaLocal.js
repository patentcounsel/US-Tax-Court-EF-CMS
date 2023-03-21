const { genericHandler } = require('../genericHandler');

/**
 * creates a new user locally
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.createUserLambdaLocal = event =>
  genericHandler(event, async ({ applicationContext }) => {
    return await applicationContext
      .getUseCases()
      .createUserInteractorLocal(applicationContext, {
        user: JSON.parse(event.body),
      });
  });

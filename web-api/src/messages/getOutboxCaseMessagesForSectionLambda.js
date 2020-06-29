const { genericHandler } = require('../genericHandler');

/**
 * gets the outbox case messages for the section
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.getOutboxCaseMessagesForSectionLambda = event =>
  genericHandler(event, async ({ applicationContext }) => {
    return await applicationContext
      .getUseCases()
      .getOutboxCaseMessagesForSectionInteractor({
        applicationContext,
        section: event.pathParameters.section,
      });
  });

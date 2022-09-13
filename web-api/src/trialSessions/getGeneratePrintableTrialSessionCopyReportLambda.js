const { genericHandler } = require('../genericHandler');

/**
 * generate the printable trial session working copy and return url
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.getGeneratePrintableTrialSessionCopyReportLambda = event =>
  genericHandler(
    event,
    async ({ applicationContext }) => {
      const body = JSON.parse(event.body);
      return await applicationContext
        .getUseCases()
        .generatePrintableTrialSessionCopyReportInteractor(applicationContext, {
          filters: body.filters,
          formattedCases: body.formattedCases,
          formattedTrialSession: body.formattedTrialSession,
          nameToDisplay: body.nameToDisplay,
          sessionNotes: body.sessionNotes,
        });
    },
    // { logResults: false },
  );

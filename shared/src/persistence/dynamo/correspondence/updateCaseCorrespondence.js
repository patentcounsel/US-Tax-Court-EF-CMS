const client = require('../../dynamodbClientService');

/**
 * updateCaseCorrespondence
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.docketNumber the docket number of the case the correspondence is attached to
 * @param {string} providers.correspondence the correspondence document to update
 * @returns {Promise} resolved promise upon completion of client request
 */
exports.updateCaseCorrespondence = ({
  applicationContext,
  correspondence,
  docketNumber,
}) =>
  client.put({
    Item: {
      ...correspondence,
      pk: `case|${docketNumber}`,
      sk: `correspondence|${correspondence.correspondenceId}`,
    },
    applicationContext,
  });

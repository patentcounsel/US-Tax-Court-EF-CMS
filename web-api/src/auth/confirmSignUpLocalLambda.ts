import { genericHandler } from '../genericHandler';

/**
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
export const confirmSignUpLocalLambda = event =>
  genericHandler(
    event,
    async ({ applicationContext }) => {
      return await applicationContext
        .getUseCases()
        .confirmSignUpLocalInteractor(applicationContext, {
          ...JSON.parse(event.body),
        });
    },
    { logResults: true },
  );

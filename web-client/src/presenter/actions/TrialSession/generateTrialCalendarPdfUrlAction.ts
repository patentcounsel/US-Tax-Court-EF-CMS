import { state } from '@web-client/presenter/app.cerebral';
/**
 * get the trial calendar pdf url
 * @param {object} providers the providers object
 * @param {Function} providers.get the cerebral get function
 * @returns {object} the pdfUrl
 */
export const generateTrialCalendarPdfUrlAction = async ({
  applicationContext,
  get,
}: ActionProps) => {
  const trialSession = get(state.trialSession);

  const { url } = await applicationContext
    .getUseCases()
    .generateTrialCalendarPdfInteractor(applicationContext, {
      trialSessionId: trialSession.trialSessionId,
    });

  return { pdfUrl: url };
};

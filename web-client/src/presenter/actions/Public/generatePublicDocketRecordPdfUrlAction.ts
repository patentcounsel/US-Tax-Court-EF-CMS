import { state } from '@web-client/presenter/app.cerebral';
/**
 * invokes the generate public docket record endpoint to get back the pdf url
 * @param {object} providers the providers object
 * @param {Function} providers.get the cerebral get function
 * @returns {object} the pdfUrl
 */
export const generatePublicDocketRecordPdfUrlAction = async ({
  applicationContext,
  get,
}: ActionProps) => {
  const docketNumber = get(state.caseDetail.docketNumber);

  const { url } = await applicationContext
    .getUseCases()
    .generatePublicDocketRecordPdfInteractor(applicationContext, {
      docketNumber,
    });

  return { pdfUrl: url };
};

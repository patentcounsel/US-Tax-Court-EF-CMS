import { state } from 'cerebral';
/**
 * get the pdf file and pdf blob url from the passed in htmlString
 *
 * @param {object} providers the providers object
 * @param {Function} providers.get the cerebral get function
 * @returns {object} the pdfUrl
 */
export const generateDocketRecordPdfUrlAction = async ({
  applicationContext,
  get,
}) => {
  const caseDetail = get(state.formattedCaseDetail);
  const docketRecordSort = get(
    state.sessionMetadata.docketRecordSort[caseDetail.caseId],
  );

  const docketRecordPdf = await applicationContext
    .getUseCases()
    .createDocketRecordPdfInteractor({
      applicationContext,
      caseId: caseDetail.caseId,
      docketRecordSort,
    });

  const pdfFile = new Blob([docketRecordPdf], { type: 'application/pdf' });

  const pdfUrl = window.URL.createObjectURL(pdfFile);

  return { pdfUrl };
};

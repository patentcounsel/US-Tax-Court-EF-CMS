import { post } from '../requests';

/**
 * createCourtIssuedOrderPdfFromHtmlInteractor
 *
 * @param {object} applicationContext the application context
 * @param {object} providers the providers object
 * @param {string} providers.addedDocketNumbers an optional array of docket numbers to add to the coversheet
 * @param {string} providers.docketNumber the docket number where the order is generated
 * @param {string} providers.contentHtml the html string for the pdf content
 * @param {string} providers.documentTitle the title of the document
 * @param {string} providers.signatureText (optional) text to be used as the signatory of the document
 * @returns {Promise<*>} the promise of the api call
 */
export const createCourtIssuedOrderPdfFromHtmlInteractor = (
  applicationContext,
  {
    addedDocketNumbers,
    contentHtml,
    docketNumber,
    documentTitle,
    signatureText,
  },
) => {
  return post({
    applicationContext,
    body: {
      addedDocketNumbers,
      contentHtml,
      docketNumber,
      documentTitle,
      signatureText,
    },
    endpoint: '/api/court-issued-order',
  });
};

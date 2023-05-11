import { createApplicationContext } from '../../../src/applicationContext';

/**
 * handler
 */
export const handler = async (event, context, cb) => {
  const applicationContext = createApplicationContext();

  const results = await applicationContext
    .getUseCaseHelpers()
    .generatePdfFromHtmlHelper(applicationContext, event);

  cb(null, results);
};

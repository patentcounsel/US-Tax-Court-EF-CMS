import { Case } from '../entities/cases/Case';
import { cloneDeep } from 'lodash';
import deepFreeze from 'deep-freeze';

/**
 * Removes a signature from a document
 *
 * @param {object} applicationContext the application context
 * @param {object} providers the providers object
 * @param {string} providers.docketNumber the docket number of the case on which to remove the signature from the document
 * @param {string} providers.docketEntryId the id of the docket entry for the signed document
 * @returns {object} the updated case
 */
export const removeSignatureFromDocumentInteractor = async (
  applicationContext,
  { docketEntryId, docketNumber },
) => {
  const caseRecord = await applicationContext
    .getPersistenceGateway()
    .getCaseByDocketNumber({
      applicationContext,
      docketNumber,
    });
  const oldCaseCopy = deepFreeze(cloneDeep(caseRecord));

  const caseEntity = new Case(caseRecord, { applicationContext });
  const docketEntryToUnsign = caseEntity.getDocketEntryById({
    docketEntryId,
  });

  docketEntryToUnsign.unsignDocument();

  const originalPdfNoSignature = await applicationContext
    .getPersistenceGateway()
    .getDocument({
      applicationContext,
      key: docketEntryToUnsign.documentIdBeforeSignature,
      protocol: 'S3',
      useTempBucket: false,
    });

  await applicationContext.getPersistenceGateway().saveDocumentFromLambda({
    applicationContext,
    document: originalPdfNoSignature,
    key: docketEntryId,
  });

  await applicationContext.getUseCaseHelpers().updateCaseAndAssociations({
    applicationContext,
    newCase: caseEntity,
    oldCaseCopy,
  });

  return caseEntity.toRawObject();
};

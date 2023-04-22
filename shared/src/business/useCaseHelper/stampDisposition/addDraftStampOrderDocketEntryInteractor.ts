const {
  COURT_ISSUED_EVENT_CODES,
  DOCUMENT_PROCESSING_STATUS_OPTIONS,
} = require('../../entities/EntityConstants');
const { Case } = require('../../entities/cases/Case');
const { DocketEntry } = require('../../entities/DocketEntry');
const { Message } = require('../../entities/Message');
const { orderBy } = require('lodash');
const { Stamp } = require('../../entities/Stamp');
import {
  ROLE_PERMISSIONS,
  isAuthorized,
} from '../../../authorization/authorizationClientService';
import {
  ServiceUnavailableError,
  UnauthorizedError,
} from '../../../errors/errors';
import { withLocking } from '../../useCaseHelper/acquireLock';

/**
 * addDraftStampOrderDocketEntryInteractor
 *
 * @param {object} applicationContext the application context
 * @param {object} providers the providers object
 * @param {string} providers.docketNumber the docket number of the case on which to save the document
 * @param {string} providers.formattedDraftDocumentTitle the formatted draft document title of the document
 * @param {string} providers.originalDocketEntryId the id of the original (un-stamped) document
 * @param {string} providers.parentMessageId the id of the parent message to add the stamped document to
 * @param {string} providers.stampedDocketEntryId the id of the stamped document
 * @param {string} providers.stampData the stampData from the form
 */
export const addDraftStampOrderDocketEntry = async (
  applicationContext,
  {
    docketNumber,
    formattedDraftDocumentTitle,
    originalDocketEntryId,
    parentMessageId,
    stampData,
    stampedDocketEntryId,
  },
) => {
  const user = applicationContext.getCurrentUser();

  if (!isAuthorized(user, ROLE_PERMISSIONS.STAMP_MOTION)) {
    throw new UnauthorizedError('Unauthorized to update docket entry');
  }

  const caseRecord = await applicationContext
    .getPersistenceGateway()
    .getCaseByDocketNumber({
      applicationContext,
      docketNumber,
    });
  const caseEntity = new Case(caseRecord, { applicationContext });
  const originalDocketEntryEntity = caseEntity.docketEntries.find(
    docketEntry => docketEntry.docketEntryId === originalDocketEntryId,
  );

  let stampedDocketEntryEntity;
  const orderDocumentInfo = COURT_ISSUED_EVENT_CODES.find(
    doc => doc.eventCode === 'O',
  );

  const validatedStampData = new Stamp(stampData);

  stampedDocketEntryEntity = new DocketEntry(
    {
      createdAt: applicationContext.getUtilities().createISODateString(),
      docketEntryId: stampedDocketEntryId,
      docketNumber: caseRecord.docketNumber,
      documentTitle: `${originalDocketEntryEntity.documentType} ${formattedDraftDocumentTitle}`,
      documentType: orderDocumentInfo.documentType,
      draftOrderState: {
        docketNumber: caseEntity.docketNumber,
        documentTitle: formattedDraftDocumentTitle,
        documentType: orderDocumentInfo.documentType,
        eventCode: orderDocumentInfo.eventCode,
        freeText: `${originalDocketEntryEntity.documentType} ${formattedDraftDocumentTitle}`,
      },
      eventCode: orderDocumentInfo.eventCode,
      filedBy: user.judgeFullName || user.name,
      freeText: `${originalDocketEntryEntity.documentType} ${formattedDraftDocumentTitle}`,
      isDraft: true,
      isPaper: false,
      processingStatus: DOCUMENT_PROCESSING_STATUS_OPTIONS.COMPLETE,
      stampData: validatedStampData,
      userId: user.userId,
    },
    { applicationContext },
  );

  stampedDocketEntryEntity.setSigned(user.userId, stampData.nameForSigning);

  caseEntity.addDocketEntry(stampedDocketEntryEntity);

  if (parentMessageId) {
    const messages = await applicationContext
      .getPersistenceGateway()
      .getMessageThreadByParentId({
        applicationContext,
        parentMessageId,
      });

    const mostRecentMessage = orderBy(messages, 'createdAt', 'desc')[0];

    const messageEntity = new Message(mostRecentMessage, {
      applicationContext,
    }).validate();
    messageEntity.addAttachment({
      documentId: stampedDocketEntryEntity.docketEntryId,
      documentTitle: stampedDocketEntryEntity.documentTitle,
    });

    await applicationContext.getPersistenceGateway().updateMessage({
      applicationContext,
      message: messageEntity.validate().toRawObject(),
    });
  }

  await applicationContext.getUseCaseHelpers().updateCaseAndAssociations({
    applicationContext,
    caseToUpdate: caseEntity,
  });
};

export const addDraftStampOrderDocketEntryInteractor = withLocking(
  addDraftStampOrderDocketEntry,
  (_applicationContext, { docketNumber }) => ({
    identifier: docketNumber,
    prefix: 'case',
  }),
  new ServiceUnavailableError('The case is currently being updated'),
);

import { Case } from '../../entities/cases/Case';
import { DOCUMENT_PROCESSING_STATUS_OPTIONS } from '../../entities/EntityConstants';
import { DocketEntry, getServedPartiesCode } from '../../entities/DocketEntry';
import { aggregatePartiesForService } from '../../utilities/aggregatePartiesForService';
import { createISODateString } from '../../utilities/DateHandler';

export const createAndServeNoticeDocketEntry = async (
  applicationContext: IApplicationContext,
  {
    additionalDocketEntryInfo = {},
    caseEntity,
    documentInfo,
    newPdfDoc,
    noticePdf,
    onlyProSePetitioners,
    userId,
  }: {
    additionalDocketEntryInfo?: any;
    caseEntity: Case;
    documentInfo: {
      documentType: string;
      documentTitle: string;
      eventCode: string;
    };
    newPdfDoc: any;
    noticePdf: Buffer;
    userId: string;
    onlyProSePetitioners?: boolean;
  },
) => {
  const docketEntryId = applicationContext.getUniqueId();

  await applicationContext.getPersistenceGateway().saveDocumentFromLambda({
    applicationContext,
    document: noticePdf,
    key: docketEntryId,
  });

  const servedParties = aggregatePartiesForService(caseEntity, {
    onlyProSePetitioners,
  });

  const numberOfPages = await applicationContext
    .getUseCaseHelpers()
    .countPagesInDocument({
      applicationContext,
      docketEntryId,
    });

  const noticeDocketEntry = new DocketEntry(
    {
      docketEntryId,
      documentTitle: documentInfo.documentTitle,
      documentType: documentInfo.documentType,
      eventCode: documentInfo.eventCode,
      isAutoGenerated: true,
      isFileAttached: true,
      isOnDocketRecord: true,
      numberOfPages,
      processingStatus: DOCUMENT_PROCESSING_STATUS_OPTIONS.COMPLETE,
      servedAt: createISODateString(),
      servedParties: servedParties.all,
      servedPartiesCode: getServedPartiesCode(servedParties.all),
      userId,
      ...additionalDocketEntryInfo,
    },
    { applicationContext },
  );

  caseEntity.addDocketEntry(noticeDocketEntry);

  await applicationContext.getUseCaseHelpers().serveGeneratedNoticesOnCase({
    applicationContext,
    caseEntity,
    newPdfDoc,
    noticeDocketEntryEntity: noticeDocketEntry,
    noticeDocumentPdfData: noticePdf,
    servedParties,
  });
};

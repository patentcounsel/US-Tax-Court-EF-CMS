/* eslint-disable no-unused-vars */
import { addDocketEntryForSystemGeneratedOrder } from '../../shared/src/business/useCaseHelper/addDocketEntryForSystemGeneratedOrder';
import { addDraftStampOrderDocketEntryInteractor } from '../../shared/src/business/useCaseHelper/stampDisposition/addDraftStampOrderDocketEntryInteractor';
import { addExistingUserToCase } from '../../shared/src/business/useCaseHelper/caseAssociation/addExistingUserToCase';
import { addServedStampToDocument } from '../../shared/src/business/useCases/courtIssuedDocument/addServedStampToDocument';
import { appendPaperServiceAddressPageToPdf } from '../../shared/src/business/useCaseHelper/service/appendPaperServiceAddressPageToPdf';
import { associateIrsPractitionerToCase } from '../../shared/src/business/useCaseHelper/caseAssociation/associateIrsPractitionerToCase';
import { associatePrivatePractitionerToCase } from '../../shared/src/business/useCaseHelper/caseAssociation/associatePrivatePractitionerToCase';
import { associateSwingTrialSessions } from '../../shared/src/business/useCaseHelper/trialSessions/associateSwingTrialSessions';
import { autoGenerateDeadline } from '../../shared/src/business/useCaseHelper/autoGenerateDeadline';
import { closeCaseAndUpdateTrialSessionForEnteredAndServedDocuments } from '../../shared/src/business/useCaseHelper/docketEntry/closeCaseAndUpdateTrialSessionForEnteredAndServedDocuments';
import { countPagesInDocument } from '../../shared/src/business/useCaseHelper/countPagesInDocument';
import { createAndServeNoticeDocketEntry } from '../../shared/src/business/useCaseHelper/docketEntry/createAndServeNoticeDocketEntry';
import { createCaseAndAssociations } from '../../shared/src/business/useCaseHelper/caseAssociation/createCaseAndAssociations';
import { createTrialSessionAndWorkingCopy } from '../../shared/src/business/useCaseHelper/trialSessions/createTrialSessionAndWorkingCopy';
import { createUserForContact } from '../../shared/src/business/useCaseHelper/caseAssociation/createUserForContact';
import { fetchPendingItemsByDocketNumber } from '../../shared/src/business/useCaseHelper/pendingItems/fetchPendingItemsByDocketNumber';
import { fileAndServeDocumentOnOneCase } from '../../shared/src/business/useCaseHelper/docketEntry/fileAndServeDocumentOnOneCase';
import { formatConsolidatedCaseCoversheetData } from '../../shared/src/business/useCaseHelper/consolidatedCases/formatConsolidatedCaseCoversheetData';
import { generateAndServeDocketEntry } from '../../shared/src/business/useCaseHelper/service/createChangeItems';
import { generateCaseInventoryReportPdf } from '../../shared/src/business/useCaseHelper/caseInventoryReport/generateCaseInventoryReportPdf';
import { generateNoticeOfChangeToInPersonProceeding } from '../../shared/src/business/useCaseHelper/trialSessions/generateNoticeOfChangeToInPersonProceeding';
import { generatePdfFromHtmlHelper } from '../../shared/src/business/useCaseHelper/generatePdfFromHtmlHelper';
import { generateStampedCoversheetInteractor } from '../../shared/src/business/useCaseHelper/stampDisposition/generateStampedCoversheetInteractor';
import { getConsolidatedCasesForLeadCase } from '../../shared/src/business/useCaseHelper/consolidatedCases/getConsolidatedCasesForLeadCase';
import { getJudgeInSectionHelper } from '../../shared/src/business/useCaseHelper/getJudgeInSectionHelper';
import { getUserIdForNote } from '../../shared/src/business/useCaseHelper/getUserIdForNote';
import { parseAndScrapePdfContents } from '../../shared/src/business/useCaseHelper/pdf/parseAndScrapePdfContents';
import { removeCounselFromRemovedPetitioner } from '../../shared/src/business/useCaseHelper/caseAssociation/removeCounselFromRemovedPetitioner';
import { removeCoversheet } from '../../shared/src/business/useCaseHelper/coverSheets/removeCoversheet';
import { saveFileAndGenerateUrl } from '../../shared/src/business/useCaseHelper/saveFileAndGenerateUrl';
import { sealInLowerEnvironment } from '../../shared/src/business/useCaseHelper/sealInLowerEnvironment';
import { sendEmailVerificationLink } from '../../shared/src/business/useCaseHelper/email/sendEmailVerificationLink';
import { sendIrsSuperuserPetitionEmail } from '../../shared/src/business/useCaseHelper/service/sendIrsSuperuserPetitionEmail';
import { sendServedPartiesEmails } from '../../shared/src/business/useCaseHelper/service/sendServedPartiesEmails';
import { serveDocumentAndGetPaperServicePdf } from '../../shared/src/business/useCaseHelper/serveDocumentAndGetPaperServicePdf';
import { serveGeneratedNoticesOnCase } from '../../shared/src/business/useCaseHelper/trialSessions/serveGeneratedNoticesOnCase';
import { setNoticeOfChangeOfTrialJudge } from '../../shared/src/business/useCaseHelper/trialSessions/setNoticeOfChangeOfTrialJudge';
import { setNoticeOfChangeToInPersonProceeding } from '../../shared/src/business/useCaseHelper/trialSessions/setNoticeOfChangeToInPersonProceeding';
import { setNoticeOfChangeToRemoteProceeding } from '../../shared/src/business/useCaseHelper/trialSessions/setNoticeOfChangeToRemoteProceeding';
import { setPdfFormFields } from '../../shared/src/business/useCaseHelper/pdf/setPdfFormFields';
import { stampDocumentForService } from '../../shared/src/business/useCaseHelper/stampDocumentForService';
import { updateCaseAndAssociations } from '../../shared/src/business/useCaseHelper/caseAssociation/updateCaseAndAssociations';
import { updateCaseAutomaticBlock } from '../../shared/src/business/useCaseHelper/automaticBlock/updateCaseAutomaticBlock';
import { updateInitialFilingDocuments } from '../../shared/src/business/useCaseHelper/initialFilingDocuments/updateInitialFilingDocuments';

const useCaseHelpers = {
  addDocketEntryForSystemGeneratedOrder,
  addDraftStampOrderDocketEntryInteractor,
  addExistingUserToCase,
  addServedStampToDocument,
  appendPaperServiceAddressPageToPdf,
  associateIrsPractitionerToCase,
  associatePrivatePractitionerToCase,
  associateSwingTrialSessions,
  autoGenerateDeadline,
  closeCaseAndUpdateTrialSessionForEnteredAndServedDocuments,
  countPagesInDocument,
  createAndServeNoticeDocketEntry,
  createCaseAndAssociations,
  createTrialSessionAndWorkingCopy,
  createUserForContact,
  fetchPendingItemsByDocketNumber,
  fileAndServeDocumentOnOneCase,
  formatConsolidatedCaseCoversheetData,
  generateAndServeDocketEntry,
  generateCaseInventoryReportPdf,
  generateNoticeOfChangeToInPersonProceeding,
  generatePdfFromHtmlHelper,
  generateStampedCoversheetInteractor,
  getConsolidatedCasesForLeadCase,
  getJudgeInSectionHelper,
  getUserIdForNote,
  parseAndScrapePdfContents,
  removeCounselFromRemovedPetitioner,
  removeCoversheet,
  saveFileAndGenerateUrl,
  sealInLowerEnvironment,
  sendEmailVerificationLink,
  sendIrsSuperuserPetitionEmail,
  sendServedPartiesEmails,
  serveDocumentAndGetPaperServicePdf,
  serveGeneratedNoticesOnCase,
  setNoticeOfChangeOfTrialJudge,
  setNoticeOfChangeToInPersonProceeding,
  setNoticeOfChangeToRemoteProceeding,
  setPdfFormFields,
  stampDocumentForService,
  updateCaseAndAssociations,
  updateCaseAutomaticBlock,
  updateInitialFilingDocuments,
};

export const getUseCaseHelpers = () => useCaseHelpers;

type _IGetUseCaseHelpers = typeof getUseCaseHelpers;

declare global {
  interface IGetUseCaseHelpers extends _IGetUseCaseHelpers {}
}

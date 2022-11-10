import {
  PAYMENT_STATUS,
  SYSTEM_GENERATED_DOCUMENT_TYPES,
} from '../../shared/src/business/entities/EntityConstants';
import { docketClerkAddsDocketEntryFromOrder } from './journey/docketClerkAddsDocketEntryFromOrder';
import { fakeFile, loginAs, setupTest } from './helpers';
import { petitionsClerkCreatesNewCaseFromPaper } from './journey/petitionsClerkCreatesNewCaseFromPaper';
import { petitionsClerkReviewsPaperCaseBeforeServing } from './journey/petitionsClerkReviewsPaperCaseBeforeServing';
import { petitionsClerkServesElectronicCaseToIrs } from './journey/petitionsClerkServesElectronicCaseToIrs';
import { petitionsClerkServesPetitionFromDocumentView } from './journey/petitionsClerkServesPetitionFromDocumentView';

describe('Petitions Clerk something', () => {
  const cerebralTest = setupTest();
  cerebralTest.draftOrders = [];

  beforeAll(() => {
    jest.setTimeout(40000);
    jest.spyOn(
      cerebralTest.applicationContext.getUseCases(),
      'createMessageInteractor',
    );
  });

  afterAll(() => {
    cerebralTest.closeSocket();
  });

  loginAs(cerebralTest, 'petitionsclerk@example.com');
  petitionsClerkCreatesNewCaseFromPaper(cerebralTest, fakeFile, {
    paymentStatus: PAYMENT_STATUS.UNPAID,
  });
  petitionsClerkReviewsPaperCaseBeforeServing(cerebralTest, {
    hasIrsNoticeFormatted: 'No',
    ordersAndNoticesInDraft: [
      'Order Designating Place of Trial',
      'Order for Filing Fee',
    ],
    ordersAndNoticesNeeded: ['Order for Ratification of Petition'],
    petitionPaymentStatusFormatted: PAYMENT_STATUS.UNPAID,
    receivedAtFormatted: '01/01/01',
    shouldShowIrsNoticeDate: false,
  });

  // petitionsClerkServesElectronicCaseToIrs(cerebralTest);

  loginAs(cerebralTest, 'docketclerk@example.com');

  it('should view the draft order and sign it', async () => {
    await cerebralTest.runSequence('gotoCaseDetailSequence', {
      docketNumber: cerebralTest.docketNumber,
    });

    const docketEntries = cerebralTest.getState('caseDetail.docketEntries');
    const draftOrderForFilingFeeDocketEntry = docketEntries.find(
      doc =>
        doc.eventCode ===
        SYSTEM_GENERATED_DOCUMENT_TYPES.orderForFilingFee.eventCode,
    );

    expect(draftOrderForFilingFeeDocketEntry).toBeTruthy();

    await cerebralTest.runSequence('gotoSignOrderSequence', {
      docketEntryId: draftOrderForFilingFeeDocketEntry.docketEntryId,
      docketNumber: cerebralTest.docketNumber,
    });

    await cerebralTest.runSequence('setPDFSignatureDataSequence', {
      signatureData: {
        scale: 1,
        x: 100,
        y: 100,
      },
    });
    await cerebralTest.runSequence('saveDocumentSigningSequence');
  });

  docketClerkAddsDocketEntryFromOrder(cerebralTest, 0);

  //create a new paper case with filing fee not paid
  //serve the case
  //verify OF in drafts
  //sign OF
  //add docket entry from OF
  //serve docket entry
  //verify there is a new case deadline with date from previous step and correct description

  //create a new paper case with filing fee not paid
  //serve the case
  //sign OF
  //add docket entry from OF
  //save for later
  //serve docket entry from document viewer
  //verify there is a new case deadline with date from previous step and correct description
});

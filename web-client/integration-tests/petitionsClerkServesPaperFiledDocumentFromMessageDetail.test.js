import { OBJECTIONS_OPTIONS_MAP } from '../../shared/src/business/entities/EntityConstants';
import { createNewMessageOnCase } from './journey/createNewMessageOnCase';
import { docketClerkAddsPaperFiledDocketEntryAndSavesForLater } from './journey/docketClerkAddsPaperFiledDocketEntryAndSavesForLater';
import { fakeFile, loginAs, setupTest, uploadPetition } from './helpers';
import { petitionsClerk1ServesDocumentFromMessageDetail } from './journey/petitionsClerk1ServesDocumentFromMessageDetail';
import { petitionsClerk1ViewsMessageDetail } from './journey/petitionsClerk1ViewsMessageDetail';
import { petitionsClerk1ViewsMessageInbox } from './journey/petitionsClerk1ViewsMessageInbox';

const cerebralTest = setupTest();
cerebralTest.draftOrders = [];

describe('Petitions Clerk Serves Paper Filed Document From Message Detail', () => {
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

  loginAs(cerebralTest, 'petitioner@example.com');
  it('Create case', async () => {
    const caseDetail = await uploadPetition(cerebralTest);
    expect(caseDetail.docketNumber).toBeDefined();
    cerebralTest.docketNumber = caseDetail.docketNumber;
  });

  loginAs(cerebralTest, 'docketclerk1@example.com');

  const documentFormValues = {
    dateReceivedDay: 1,
    dateReceivedMonth: 1,
    dateReceivedYear: 2018,
    eventCode: 'M115',
    objections: OBJECTIONS_OPTIONS_MAP.NO,
    primaryDocumentFile: fakeFile,
    primaryDocumentFileSize: 100,
    'secondaryDocument.addToCoversheet': true,
    'secondaryDocument.additionalInfo': 'Test Secondary Additional Info',
    'secondaryDocument.eventCode': 'APPW',
    secondaryDocumentFile: fakeFile,
    secondaryDocumentFileSize: 100,
  };

  docketClerkAddsPaperFiledDocketEntryAndSavesForLater({
    cerebralTest,
    documentFormValues,
  });

  createNewMessageOnCase(cerebralTest);

  loginAs(cerebralTest, 'petitionsclerk1@example.com');
  petitionsClerk1ViewsMessageInbox(cerebralTest);
  petitionsClerk1ViewsMessageDetail(cerebralTest);
  petitionsClerk1ServesDocumentFromMessageDetail(cerebralTest);
});

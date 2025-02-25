import { applicationContextForClient as applicationContext } from '@web-client/test/createClientTestApplicationContext';
import { createApplicationContext as applicationContextFactory } from '../../web-api/src/applicationContext';
import {
  getFormattedDocumentQCMyOutbox,
  getFormattedDocumentQCSectionOutbox,
  loginAs,
  setupTest,
  uploadPetition,
} from './helpers';

const {
  IRS_SYSTEM_SECTION,
  PETITIONS_SECTION,
  STATUS_TYPES: CASE_STATUS_TYPES,
  USER_ROLES: ROLES,
} = applicationContext.getConstants();

const cerebralTest = setupTest();

describe('verify old served work items do not show up in the outbox', () => {
  let workItem6Days;
  let workItem7Days;
  let workItem8Days;
  let caseDetail;

  let workItemId6;
  let workItemId7;
  let workItemId8;

  beforeAll(() => {
    jest.setTimeout(300000);
  });

  afterAll(() => {
    cerebralTest.closeSocket();
  });

  loginAs(cerebralTest, 'petitioner@example.com');

  it('creates a case', async () => {
    caseDetail = await uploadPetition(cerebralTest);
    expect(caseDetail.docketNumber).toBeDefined();

    const appContext = applicationContextFactory({
      role: ROLES.petitionsClerk,
      section: PETITIONS_SECTION,
      userId: '3805d1ab-18d0-43ec-bafb-654e83405416',
    });
    appContext.environment.dynamoDbTableName = 'efcms-local';

    const CREATED_8_DAYS_AGO = applicationContext
      .getUtilities()
      .calculateISODate({ howMuch: -8, units: 'days' });
    const CREATED_7_DAYS_AGO = applicationContext
      .getUtilities()
      .calculateISODate({ howMuch: -7, units: 'days' });
    const CREATED_6_DAYS_AGO = applicationContext
      .getUtilities()
      .calculateISODate({ howMuch: -6, units: 'days' });

    workItemId6 = appContext.getUniqueId();
    workItemId7 = appContext.getUniqueId();
    workItemId8 = appContext.getUniqueId();

    workItem8Days = {
      assigneeId: '3805d1ab-18d0-43ec-bafb-654e83405416',
      assigneeName: 'Test petitionsclerk1',
      caseStatus: CASE_STATUS_TYPES.new,
      completedAt: '2019-06-26T16:31:17.643Z',
      completedByUserId: '3805d1ab-18d0-43ec-bafb-654e83405416',
      createdAt: CREATED_8_DAYS_AGO,
      docketEntry: {
        createdAt: '2019-06-25T15:14:11.924Z',
        docketEntryId: '01174a9a-7ac4-43ff-a163-8ed421f9612d',
        documentType: 'Petition',
      },
      docketNumber: caseDetail.docketNumber,
      docketNumberSuffix: null,
      isInitializeCase: false,
      section: IRS_SYSTEM_SECTION,
      sentBy: 'Test petitionsclerk1',
      sentBySection: PETITIONS_SECTION,
      sentByUserId: '3805d1ab-18d0-43ec-bafb-654e83405416',
      updatedAt: '2019-06-26T16:31:17.643Z',
      workItemId: `${workItemId8}`,
    };

    workItem7Days = {
      ...workItem8Days,
      completedAt: CREATED_7_DAYS_AGO,
      createdAt: CREATED_7_DAYS_AGO,
      workItemId: `${workItemId7}`,
    };

    workItem6Days = {
      ...workItem8Days,
      completedAt: CREATED_6_DAYS_AGO,
      createdAt: CREATED_6_DAYS_AGO,
      workItemId: `${workItemId6}`,
    };

    await appContext.getPersistenceGateway().putWorkItemInOutbox({
      applicationContext: appContext,
      workItem: workItem8Days,
    });

    await appContext.getPersistenceGateway().putWorkItemInOutbox({
      applicationContext: appContext,
      workItem: workItem7Days,
    });

    await appContext.getPersistenceGateway().putWorkItemInOutbox({
      applicationContext: appContext,
      workItem: workItem6Days,
    });
  });

  loginAs(cerebralTest, 'petitionsclerk@example.com');

  it('the petitionsclerk user should have the expected work items equal to or new than 7 days', async () => {
    const myOutbox = (
      await getFormattedDocumentQCMyOutbox(cerebralTest)
    ).filter(item => item.docketNumber === caseDetail.docketNumber);
    expect(myOutbox.length).toEqual(2);
    expect(
      myOutbox.find(item => item.workItemId === workItemId6),
    ).toBeDefined();
    expect(
      myOutbox.find(item => item.workItemId === workItemId7),
    ).toBeDefined();

    const sectionOutbox = (
      await getFormattedDocumentQCSectionOutbox(cerebralTest)
    ).filter(item => item.docketNumber === caseDetail.docketNumber);
    expect(sectionOutbox.length).toEqual(2);
    expect(
      sectionOutbox.find(item => item.workItemId === workItemId6),
    ).toBeDefined();
    expect(
      sectionOutbox.find(item => item.workItemId === workItemId7),
    ).toBeDefined();
  });
});

import { UNSERVABLE_EVENT_CODES } from '../../shared/src/business/entities/EntityConstants';
import { addCourtIssuedDocketEntryHelper } from '../src/presenter/computeds/addCourtIssuedDocketEntryHelper';
import { caseDetailHeaderHelper } from '../src/presenter/computeds/caseDetailHeaderHelper';
import { caseDetailSubnavHelper } from '../src/presenter/computeds/caseDetailSubnavHelper';
import { docketClerkAddsPaperFiledPendingDocketEntryAndSavesForLater } from './journey/docketClerkAddsPaperFiledPendingDocketEntryAndSavesForLater';
import { docketClerkAssignWorkItemToSelf } from './journey/docketClerkAssignWorkItemToSelf';
import { docketClerkQCsDocketEntry } from './journey/docketClerkQCsDocketEntry';
import { docketClerkUploadsACourtIssuedDocument } from './journey/docketClerkUploadsACourtIssuedDocument';
import { docketClerkVerifiesConsolidatedCaseIndicatorDocumentQCSection } from './journey/docketClerkVerifiesConsolidatedCaseIndicatorDocumentQCSection';
import { docketClerkVerifiesConsolidatedLeadCaseIndicatorDocumentQCSection } from './journey/docketClerkVerifiesConsolidatedLeadCaseIndicatorDocumentQCSection';
import {
  fakeFile,
  loginAs,
  refreshElasticsearchIndex,
  setupTest,
} from './helpers';
import { petitionsClerkAddsPractitionersToCase } from './journey/petitionsClerkAddsPractitionersToCase';
import { practitionerFilesDocumentForOwnedCase } from './journey/practitionerFilesDocumentForOwnedCase';
import { runCompute } from 'cerebral/test';
import { withAppContextDecorator } from '../src/withAppContext';

describe('Docket clerk consolidated case work item journey', () => {
  const cerebralTest = setupTest();

  afterAll(() => {
    cerebralTest.closeSocket();
  });

  const leadCaseDocketNumber = '111-19';
  const consolidatedCaseDocketNumber = '112-19';

  // Document QC External filed document on Lead Case

  loginAs(cerebralTest, 'petitionsclerk@example.com');

  petitionsClerkAddsPractitionersToCase(
    cerebralTest,
    true,
    leadCaseDocketNumber,
  );

  loginAs(cerebralTest, 'privatePractitioner@example.com');

  practitionerFilesDocumentForOwnedCase(
    cerebralTest,
    fakeFile,
    leadCaseDocketNumber,
  );

  loginAs(cerebralTest, 'docketclerk@example.com');

  docketClerkVerifiesConsolidatedLeadCaseIndicatorDocumentQCSection(
    cerebralTest,
    leadCaseDocketNumber,
    { box: 'inbox', queue: 'section' },
  );

  docketClerkAssignWorkItemToSelf(cerebralTest, leadCaseDocketNumber);

  docketClerkVerifiesConsolidatedLeadCaseIndicatorDocumentQCSection(
    cerebralTest,
    leadCaseDocketNumber,
    { box: 'inbox', queue: 'my' },
  );

  docketClerkQCsDocketEntry(cerebralTest);

  docketClerkVerifiesConsolidatedLeadCaseIndicatorDocumentQCSection(
    cerebralTest,
    leadCaseDocketNumber,
    { box: 'outbox', queue: 'my' },
  );

  docketClerkVerifiesConsolidatedLeadCaseIndicatorDocumentQCSection(
    cerebralTest,
    leadCaseDocketNumber,
    { box: 'outbox', queue: 'section' },
  );

  //file a unservable document
  docketClerkUploadsACourtIssuedDocument(cerebralTest, fakeFile);

  it('adds a docket entry with an unservable event code', async () => {
    const getHelper = () => {
      return runCompute(
        withAppContextDecorator(addCourtIssuedDocketEntryHelper),
        {
          state: cerebralTest.getState(),
        },
      );
    };

    await cerebralTest.runSequence('gotoAddCourtIssuedDocketEntrySequence', {
      docketEntryId: cerebralTest.draftOrders[0].docketEntryId,
      docketNumber: cerebralTest.docketNumber,
    });

    expect(getHelper().showReceivedDate).toEqual(false);

    await cerebralTest.runSequence(
      'updateCourtIssuedDocketEntryFormValueSequence',
      {
        key: 'eventCode',
        value: UNSERVABLE_EVENT_CODES[0], // CTRA
      },
    );

    await cerebralTest.runSequence(
      'updateCourtIssuedDocketEntryFormValueSequence',
      {
        key: 'documentType',
        value: 'Corrected Transcript',
      },
    );

    await cerebralTest.runSequence(
      'updateCourtIssuedDocketEntryFormValueSequence',
      {
        key: 'freeText',
        value: 'for test',
      },
    );

    await cerebralTest.runSequence(
      'updateCourtIssuedDocketEntryFormValueSequence',
      {
        key: 'month',
        value: '1',
      },
    );
    await cerebralTest.runSequence(
      'updateCourtIssuedDocketEntryFormValueSequence',
      {
        key: 'day',
        value: '1',
      },
    );
    await cerebralTest.runSequence(
      'updateCourtIssuedDocketEntryFormValueSequence',
      {
        key: 'year',
        value: '2020',
      },
    );

    expect(getHelper().showReceivedDate).toEqual(true);

    await cerebralTest.runSequence('submitCourtIssuedDocketEntrySequence');

    expect(cerebralTest.getState('validationErrors')).toEqual({
      filingDate: 'Enter a filing date',
    });

    await cerebralTest.runSequence(
      'updateCourtIssuedDocketEntryFormValueSequence',
      {
        key: 'filingDateMonth',
        value: '1',
      },
    );
    await cerebralTest.runSequence(
      'updateCourtIssuedDocketEntryFormValueSequence',
      {
        key: 'filingDateDay',
        value: '1',
      },
    );
    await cerebralTest.runSequence(
      'updateCourtIssuedDocketEntryFormValueSequence',
      {
        key: 'filingDateYear',
        value: '2021',
      },
    );

    await cerebralTest.runSequence('submitCourtIssuedDocketEntrySequence');

    expect(cerebralTest.getState('validationErrors')).toEqual({});

    expect(cerebralTest.getState('alertSuccess').message).toEqual(
      'Your entry has been added to the docket record.',
    );

    await cerebralTest.runSequence('gotoEditDocketEntryMetaSequence', {
      docketNumber: cerebralTest.docketNumber,
      docketRecordIndex: 3,
    });

    await cerebralTest.runSequence(
      'updateDocketEntryMetaDocumentFormValueSequence',
      {
        key: 'pending',
        value: true,
      },
    );

    await cerebralTest.runSequence('submitEditDocketEntryMetaSequence', {
      docketNumber: cerebralTest.docketNumber,
    });

    await refreshElasticsearchIndex();

    const headerHelper = runCompute(
      withAppContextDecorator(caseDetailHeaderHelper),
      {
        state: cerebralTest.getState(),
      },
    );

    expect(headerHelper.showBlockedTag).toBeTruthy();

    const caseDetailSubnav = runCompute(
      withAppContextDecorator(caseDetailSubnavHelper),
      {
        state: cerebralTest.getState(),
      },
    );
    expect(caseDetailSubnav.showTrackedItemsNotification).toBeTruthy();

    await cerebralTest.runSequence('gotoPendingReportSequence');

    await cerebralTest.runSequence('setPendingReportSelectedJudgeSequence', {
      judge: 'Chief Judge',
    });

    await cerebralTest.runSequence('loadMorePendingItemsSequence');

    const pendingItems = cerebralTest.getState('pendingReports.pendingItems');
    expect(
      pendingItems.find(
        item => item.docketNumber === cerebralTest.docketNumber,
      ),
    ).toBeDefined();
  });

  docketClerkVerifiesConsolidatedLeadCaseIndicatorDocumentQCSection(
    cerebralTest,
    leadCaseDocketNumber,
    { box: 'outbox', queue: 'section' },
  );

  // Document QC External filed document on Non-lead Case

  loginAs(cerebralTest, 'petitionsclerk@example.com');

  petitionsClerkAddsPractitionersToCase(
    cerebralTest,
    true,
    consolidatedCaseDocketNumber,
  );

  loginAs(cerebralTest, 'privatePractitioner@example.com');

  practitionerFilesDocumentForOwnedCase(
    cerebralTest,
    fakeFile,
    consolidatedCaseDocketNumber,
  );

  loginAs(cerebralTest, 'docketclerk@example.com');

  docketClerkVerifiesConsolidatedCaseIndicatorDocumentQCSection(
    cerebralTest,
    consolidatedCaseDocketNumber,
    { box: 'inbox', queue: 'section' },
  );
  docketClerkAssignWorkItemToSelf(cerebralTest, consolidatedCaseDocketNumber);

  docketClerkVerifiesConsolidatedCaseIndicatorDocumentQCSection(
    cerebralTest,
    consolidatedCaseDocketNumber,
    { box: 'inbox', queue: 'my' },
  );

  docketClerkQCsDocketEntry(cerebralTest);

  docketClerkVerifiesConsolidatedLeadCaseIndicatorDocumentQCSection(
    cerebralTest,
    leadCaseDocketNumber,
    { box: 'outbox', queue: 'my' },
  );

  docketClerkVerifiesConsolidatedLeadCaseIndicatorDocumentQCSection(
    cerebralTest,
    leadCaseDocketNumber,
    { box: 'outbox', queue: 'section' },
  );

  // Document QC Internal filed document on Lead Case

  loginAs(cerebralTest, 'docketclerk@example.com');

  docketClerkAddsPaperFiledPendingDocketEntryAndSavesForLater(
    cerebralTest,
    leadCaseDocketNumber,
  );

  docketClerkVerifiesConsolidatedLeadCaseIndicatorDocumentQCSection(
    cerebralTest,
    leadCaseDocketNumber,
    { box: 'inProgress', queue: 'section' },
  );

  docketClerkVerifiesConsolidatedLeadCaseIndicatorDocumentQCSection(
    cerebralTest,
    leadCaseDocketNumber,
    { box: 'inProgress', queue: 'my' },
  );

  // Document QC Internal filed document on Non-lead Case

  loginAs(cerebralTest, 'docketclerk@example.com');

  docketClerkAddsPaperFiledPendingDocketEntryAndSavesForLater(
    cerebralTest,
    consolidatedCaseDocketNumber,
  );

  docketClerkVerifiesConsolidatedCaseIndicatorDocumentQCSection(
    cerebralTest,
    consolidatedCaseDocketNumber,
    { box: 'inProgress', queue: 'section' },
  );

  docketClerkVerifiesConsolidatedCaseIndicatorDocumentQCSection(
    cerebralTest,
    consolidatedCaseDocketNumber,
    { box: 'inProgress', queue: 'my' },
  );
});

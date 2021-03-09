import { applicationContextForClient as applicationContext } from '../../shared/src/business/test/createTestApplicationContext';
import { loginAs, setupTest, uploadPetition } from './helpers';

const test = setupTest();
const { COUNTRY_TYPES, PARTY_TYPES } = applicationContext.getConstants();

describe('docket clerk edits the petitioner information', () => {
  beforeEach(() => {
    jest.setTimeout(50000);
  });

  afterAll(() => {
    test.closeSocket();
  });

  let caseDetail;

  loginAs(test, 'petitioner@example.com');

  it('login as a tax payer and create a case', async () => {
    caseDetail = await uploadPetition(test, {
      contactSecondary: {
        address1: '734 Cowley Parkway',
        city: 'Somewhere',
        countryType: COUNTRY_TYPES.DOMESTIC,
        name: 'Secondary Person',
        phone: '+1 (884) 358-9729',
        postalCode: '77546',
        state: 'CT',
      },
      partyType: PARTY_TYPES.petitionerSpouse,
    });
    expect(caseDetail.docketNumber).toBeDefined();
    test.docketNumber = caseDetail.docketNumber;
  });

  loginAs(test, 'docketclerk@example.com');

  it('login as the docketclerk and edit the case contact information', async () => {
    await test.runSequence('gotoEditPetitionerInformationSequence', {
      docketNumber: caseDetail.docketNumber,
    });

    expect(test.getState('caseDetail.contactPrimary.address1')).toEqual(
      '734 Cowley Parkway',
    );

    await test.runSequence('updateFormValueSequence', {
      key: 'contactPrimary.address1',
      value: '',
    });

    await test.runSequence('updateFormValueSequence', {
      key: 'contactPrimary.phone',
      value: '',
    });

    expect(test.getState('form.contactPrimary.address1')).toBeUndefined();

    await test.runSequence('updatePetitionerInformationFormSequence');

    expect(test.getState('validationErrors')).toEqual({
      contactPrimary: {
        address1: 'Enter mailing address',
        phone: 'Enter phone number',
      },
      contactSecondary: null,
    });

    await test.runSequence('updateFormValueSequence', {
      key: 'contactPrimary.phone',
      value: '1234567890',
    });

    await test.runSequence('updatePetitionerInformationFormSequence');

    expect(test.getState('validationErrors')).toEqual({
      contactPrimary: {
        address1: 'Enter mailing address',
      },
      contactSecondary: null,
    });

    await test.runSequence('gotoEditPetitionerInformationSequence', {
      docketNumber: caseDetail.docketNumber,
    });

    expect(test.getState('form.contactPrimary.address2')).toEqual(
      'Cum aut velit volupt',
    );

    expect(test.getState('form.contactPrimary.address3')).toEqual(
      'Et sunt veritatis ei',
    );

    await test.runSequence('updateFormValueSequence', {
      key: 'contactPrimary.address1',
      value: '123 Some Street',
    });

    await test.runSequence('updateFormValueSequence', {
      key: 'contactPrimary.address2',
      value: '',
    });

    await test.runSequence('updateFormValueSequence', {
      key: 'contactPrimary.address3',
      value: '',
    });
  });

  it('verify that the paper service modal is displayed after submitting the address, the address was updated, and a Notice of Change of Address was generated and served', async () => {
    await test.runSequence('updatePetitionerInformationFormSequence');

    expect(test.getState('currentPage')).toEqual('CaseDetailInternal');

    expect(test.getState('caseDetail.contactPrimary.address1')).toEqual(
      '123 Some Street',
    );

    expect(test.getState('caseDetail.contactPrimary.address2')).toBeUndefined();
    expect(test.getState('caseDetail.contactPrimary.address3')).toBeUndefined();

    const noticeDocument = test
      .getState('caseDetail.docketEntries')
      .find(d => d.documentTitle === 'Notice of Change of Address');
    expect(noticeDocument.servedAt).toBeDefined();
  });
});

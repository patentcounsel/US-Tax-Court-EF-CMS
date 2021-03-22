const {
  applicationContext,
} = require('../../test/createTestApplicationContext');
const {
  CASE_TYPES_MAP,
  COUNTRY_TYPES,
  PARTY_TYPES,
} = require('../EntityConstants');
const { CaseExternal } = require('./CaseExternal');
const { ContactFactory } = require('../contacts/ContactFactory');

const contactErrorMessages =
  ContactFactory.INTERNATIONAL_VALIDATION_ERROR_MESSAGES;

describe('CaseExternal', () => {
  describe('for (international) Contacts', () => {
    it('should not validate without country', () => {
      const caseExternal = new CaseExternal(
        {
          caseType: CASE_TYPES_MAP.other,
          filingType: 'Myself',
          hasIrsNotice: true,
          irsNoticeDate: '2009-10-13',
          partyType: PARTY_TYPES.petitioner,
          petitionFile: {},
          petitionFileSize: 1,
          petitioners: [
            {
              address1: '876 12th Ave',
              city: 'Nashville',
              countryType: COUNTRY_TYPES.INTERNATIONAL,
              email: 'someone@example.com',
              isContactPrimary: true,
              name: 'Jimmy Dean',
              phone: '1234567890',
              postalCode: '05198',
              state: 'AK',
            },
          ],
          preferredTrialCity: 'Memphis, Tennessee',
          procedureType: 'Small',
          signature: true,
          stinFile: {},
          stinFileSize: 1,
        },
        { applicationContext },
      );
      expect(caseExternal.getFormattedValidationErrors()).toEqual({
        petitioners: [{ country: contactErrorMessages.country, index: 0 }],
      });
    });

    it('can validate the primary contact in the petitioners array', () => {
      const caseExternal = new CaseExternal(
        {
          caseType: CASE_TYPES_MAP.other,
          filingType: 'Myself',
          hasIrsNotice: true,
          irsNoticeDate: '2009-10-13',
          partyType: PARTY_TYPES.petitioner,
          petitionFile: {},
          petitionFileSize: 1,
          petitioners: [
            {
              address1: '876 12th Ave',
              city: 'Nashville',
              country: 'USA',
              countryType: COUNTRY_TYPES.INTERNATIONAL,
              email: 'someone@example.com',
              isContactPrimary: true,
              name: 'Jimmy Dean',
              phone: '1234567890',
              postalCode: '05198',
              state: 'AK',
            },
          ],
          preferredTrialCity: 'Memphis, Tennessee',
          procedureType: 'Small',
          signature: true,
          stinFile: {},
          stinFileSize: 1,
        },
        { applicationContext },
      );
      expect(caseExternal.getFormattedValidationErrors()).toEqual(null);
    });
  });
});

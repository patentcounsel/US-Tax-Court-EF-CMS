const {
  ContactFactory,
} = require('../../../shared/src/business/entities/contacts/ContactFactory');

export default (test, fakeFile, trialLocation = 'Birmingham, Alabama') => {
  const primaryContactName = {
    key: 'contactPrimary.name',
    value: 'Shawn Johnson',
  };

  const formValues = [
    {
      key: 'dateReceivedMonth',
      value: '01',
    },
    {
      key: 'dateReceivedDay',
      value: '01',
    },
    {
      key: 'dateReceivedYear',
      value: '2001',
    },
    {
      key: 'mailingDate',
      value: 'Some Day',
    },
    {
      key: 'petitionFile',
      value: fakeFile,
    },
    {
      key: 'petitionFileSize',
      value: 1,
    },
    {
      key: 'stinFile',
      value: fakeFile,
    },
    {
      key: 'stinFileSize',
      value: 1,
    },
    {
      key: 'ownershipDisclosureFile',
      value: fakeFile,
    },
    {
      key: 'ownershipDisclosureFileSize',
      value: 1,
    },
    {
      key: 'requestForPlaceOfTrialFile',
      value: fakeFile,
    },
    {
      key: 'requestForPlaceOfTrialFileSize',
      value: 1,
    },
    {
      key: 'applicationForWaiverOfFilingFeeFile',
      value: fakeFile,
    },
    {
      key: 'applicationForWaiverOfFilingFeeFileSize',
      value: 1,
    },
    {
      key: 'preferredTrialCity',
      value: trialLocation,
    },
    {
      key: 'procedureType',
      value: 'Small',
    },
    {
      key: 'caseType',
      value: 'Deficiency',
    },
    {
      key: 'partyType',
      value: ContactFactory.PARTY_TYPES.petitionerDeceasedSpouse,
    },
    {
      key: 'contactPrimary.countryType',
      value: 'international',
    },
    {
      key: 'contactPrimary.country',
      value: 'Switzerland',
    },
    primaryContactName,
    {
      key: 'contactPrimary.address1',
      value: '123 Abc Ln',
    },
    {
      key: 'contactPrimary.city',
      value: 'Cityville',
    },
    {
      key: 'contactPrimary.postalCode',
      value: '23-skidoo',
    },
    {
      key: 'contactPrimary.email',
      value: 'test@example.com',
    },
    {
      key: 'contactPrimary.phone',
      value: '1234567890',
    },
    {
      key: 'contactSecondary.name',
      value: 'Julius Lenhart',
    },
    {
      key: 'contactSecondary.inCareOf',
      value: 'Nora Stanton Barney',
    },
  ];

  return it('Petitions clerk creates a new case and saves for later', async () => {
    await test.runSequence('gotoStartCaseWizardSequence');
    await test.runSequence('navigateToReviewPetitionFromPaperSequence');

    expect(test.getState('currentPage')).toEqual('StartCaseInternal');
    expect(test.getState('startCaseInternal.tab')).toBe('partyInfo');

    for (const item of formValues) {
      await test.runSequence('updateFormValueSequence', item);
    }

    await test.runSequence('copyPrimaryContactSequence');
    await test.runSequence(
      'updateFormValueAndInternalCaseCaptionSequence',
      primaryContactName,
    );
    await test.runSequence('validatePetitionFromPaperSequence');

    expect(test.getState('form.caseCaption')).toBe(
      'Shawn Johnson & Julius Lenhart, Deceased, Shawn Johnson, Surviving Spouse, Petitioners',
    );

    expect(test.getState('form.contactSecondary.address1')).toBe(
      test.getState('form.contactPrimary.address1'),
    );

    expect(test.getState('form.contactSecondary.city')).toBe(
      test.getState('form.contactPrimary.city'),
    );

    expect(test.getState('form.contactSecondary.country')).toBe(
      test.getState('form.contactPrimary.country'),
    );

    expect(test.getState('form.contactSecondary.postalCode')).toBe(
      test.getState('form.contactPrimary.postalCode'),
    );

    expect(test.getState('form.contactSecondary.email')).toBe(
      test.getState('form.contactPrimary.email'),
    );

    expect(test.getState('form.contactSecondary.phone')).toBe(
      test.getState('form.contactPrimary.phone'),
    );

    expect(test.getState('form.contactSecondary.inCareOf')).toBe(
      'Nora Stanton Barney',
    );

    await test.runSequence('updateFormValueAndInternalCaseCaptionSequence', {
      key: 'contactPrimary.name',
      value: 'Ada Lovelace',
    });

    expect(test.getState('form.caseCaption')).toBe(
      'Ada Lovelace & Julius Lenhart, Deceased, Ada Lovelace, Surviving Spouse, Petitioners',
    );

    const updatedCaseCaption = 'Ada Lovelace is awesome';
    await test.runSequence('updateFormValueSequence', {
      key: 'caseCaption',
      value: updatedCaseCaption,
    });

    expect(test.getState('form.caseCaption')).toBe(updatedCaseCaption);

    await test.runSequence('updateFormValueSequence', {
      key: 'petitionFile',
      value: fakeFile,
    });
    await test.runSequence('updateFormValueSequence', {
      key: 'stinFile',
      value: fakeFile,
    });

    expect(test.getState('alertError')).toBeUndefined();
    expect(test.getState('validationErrors')).toEqual({});

    await test.runSequence('gotoReviewPetitionFromPaperSequence');

    expect(test.getState('currentPage')).toEqual('ReviewPetitionFromPaper');

    await test.runSequence('goBackToStartCaseInternalSequence', {
      tab: 'partyInfo',
    });

    expect(test.getState('currentPage')).toEqual('StartCaseInternal');
    expect(test.getState('startCaseInternal.tab')).toBe('partyInfo');

    await test.runSequence('updateFormValueAndInternalCaseCaptionSequence', {
      key: 'contactPrimary.address1',
      value: '123 Something Street',
    });

    await test.runSequence('gotoReviewPetitionFromPaperSequence');

    expect(test.getState('currentPage')).toEqual('ReviewPetitionFromPaper');

    expect(test.getState('form.contactPrimary.address1')).toBe(
      '123 Something Street',
    );

    await test.runSequence('saveInternalCaseForLaterSequence');

    expect(test.getState('currentPage')).toEqual('Messages');
  });
};

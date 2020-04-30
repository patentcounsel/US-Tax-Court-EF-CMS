const { MOCK_DOCUMENTS } = require('./mockDocuments');

exports.MOCK_CASE = {
  caseCaption: 'Test Petitioner, Petitioner',
  caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
  caseType: 'Other',
  contactPrimary: {
    address1: '123 Main St',
    city: 'Somewhere',
    countryType: 'domestic',
    email: 'petitioner@example.com',
    name: 'Test Petitioner',
    phone: '1234567',
    postalCode: '12345',
    state: 'TN',
    title: 'Executor',
  },
  docketNumber: '101-18',
  docketRecord: [
    {
      description: 'first record',
      docketRecordId: '8675309b-18d0-43ec-bafb-654e83405411',
      documentId: '8675309b-18d0-43ec-bafb-654e83405411',
      eventCode: 'P',
      filingDate: '2018-03-01T00:01:00.000Z',
      index: 1,
    },
    {
      description: 'second record',
      docketRecordId: '8675309b-28d0-43ec-bafb-654e83405412',
      documentId: '8675309b-28d0-43ec-bafb-654e83405412',
      eventCode: 'PSDE',
      filingDate: '2018-03-01T00:02:00.000Z',
      index: 2,
    },
    {
      description: 'third record',
      docketRecordId: '8675309b-28d0-43ec-bafb-654e83405413',
      documentId: '8675309b-28d0-43ec-bafb-654e83405413',
      eventCode: 'SDEC',
      filingDate: '2018-03-01T00:03:00.000Z',
      index: 3,
    },
  ],
  documents: MOCK_DOCUMENTS,
  filingType: 'Myself',
  hasIrsNotice: true,
  irsNoticeDate: '2018-03-01T00:00:00.000Z',
  partyType: 'Petitioner',
  preferredTrialCity: 'Washington, District of Columbia',
  procedureType: 'Regular',
  status: 'New',
  userId: '6805d1ab-18d0-43ec-bafb-654e83405416',
};

exports.MOCK_CASE_WITHOUT_PENDING = {
  caseCaption: 'Test Petitioner, Petitioner',
  caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
  caseType: 'Other',
  contactPrimary: {
    address1: '123 Main St',
    city: 'Somewhere',
    countryType: 'domestic',
    email: 'petitioner@example.com',
    name: 'Test Petitioner',
    phone: '1234567',
    postalCode: '12345',
    state: 'TN',
    title: 'Executor',
  },
  docketNumber: '101-18',
  docketRecord: [
    {
      description: 'first record',
      docketRecordId: '8675309b-18d0-43ec-bafb-654e83405411',
      documentId: '8675309b-18d0-43ec-bafb-654e83405411',
      eventCode: 'P',
      filingDate: '2018-03-01T00:01:00.000Z',
      index: 1,
    },
    {
      description: 'second record',
      docketRecordId: '8675309b-28d0-43ec-bafb-654e83405412',
      documentId: '8675309b-28d0-43ec-bafb-654e83405412',
      eventCode: 'PSDE',
      filingDate: '2018-03-01T00:02:00.000Z',
      index: 2,
    },
    {
      description: 'third record',
      docketRecordId: '8675309b-28d0-43ec-bafb-654e83405413',
      documentId: '8675309b-28d0-43ec-bafb-654e83405413',
      eventCode: 'SDEC',
      filingDate: '2018-03-01T00:03:00.000Z',
      index: 3,
    },
  ],
  documents: MOCK_DOCUMENTS.slice(0, 3), // exclude proposed stipulated decision
  filingType: 'Myself',
  hasIrsNotice: true,
  irsNoticeDate: '2018-03-01T00:00:00.000Z',
  partyType: 'Petitioner',
  preferredTrialCity: 'Washington, District of Columbia',
  procedureType: 'Regular',
  status: 'New',
  userId: '6805d1ab-18d0-43ec-bafb-654e83405416',
};

exports.MOCK_CASE_WITHOUT_NOTICE = {
  caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
  contactPrimary: {
    address1: '123 Main St',
    city: 'Somewhere',
    countryType: 'domestic',
    email: 'petitioner@example.com',
    name: 'Test Petitioner',
    phone: '1234567',
    postalCode: '12345',
    state: 'TN',
    title: 'Executor',
  },
  docketNumber: '101-18',
  docketRecord: [
    {
      description: 'first record',
      docketRecordId: '8675309b-18d0-43ec-bafb-654e83405411',
      documentId: '8675309b-18d0-43ec-bafb-654e83405411',
      eventCode: 'P',
      filingDate: '2018-03-01T00:01:00.000Z',
      index: 1,
    },
  ],
  documents: MOCK_DOCUMENTS,
  filingType: 'Myself',
  partyType: 'Petitioner',
  preferredTrialCity: 'Washington, District of Columbia',
  procedureType: 'Regular',
  status: 'New',
};

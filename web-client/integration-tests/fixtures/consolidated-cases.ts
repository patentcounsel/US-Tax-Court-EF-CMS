const case105_23: TCase & TDynamoRecord = {
  associatedJudge: 'Chief Judge',
  caseCaption: 'Armand Fulton, Petitioner',
  caseType: 'Disclosure',
  createdAt: '2023-01-06T22:33:08.581Z',
  docketNumber: '105-23',
  docketNumberSuffix: 'D',
  docketNumberWithSuffix: '105-23D',
  entityName: 'Case',
  gsi1pk: 'case|105-23',
  hasPendingItems: false,
  hasVerifiedIrsNotice: false,
  initialCaption: 'Armand Fulton, Petitioner',
  initialDocketNumberSuffix: 'D',
  isPaper: true,
  isSealed: false,
  leadDocketNumber: '105-23',
  mailingDate: 'asdf',
  noticeOfAttachments: false,
  orderDesignatingPlaceOfTrial: false,
  orderForAmendedPetition: false,
  orderForAmendedPetitionAndFilingFee: false,
  orderForCds: false,
  orderForFilingFee: true,
  orderForRatification: false,
  orderToShowCause: false,
  partyType: 'Petitioner',
  petitionPaymentDate: null,
  petitionPaymentStatus: 'Not paid',
  petitionPaymentWaivedDate: null,
  petitioners: [
    {
      address1: '20 Rocky Oak Extension',
      address2: 'Rerum dolor tenetur',
      address3: 'Fugit et laboriosam',
      city: 'Sit consequatur solu',
      contactId: '40eb0890-aab3-4925-8769-e056b30c502d',
      contactType: 'petitioner',
      countryType: 'domestic',
      entityName: 'Petitioner',
      isAddressSealed: false,
      name: 'Armand Fulton',
      phone: '+1 (119) 752-9655',
      postalCode: '68721',
      sealedAndUnavailable: false,
      serviceIndicator: 'Paper',
      state: 'NM',
    },
  ],
  pk: 'case|105-23',
  preferredTrialCity: 'Birmingham, Alabama',
  procedureType: 'Regular',
  qcCompleteForTrial: {},
  receivedAt: '2023-01-02T05:00:00.000Z',
  sk: 'case|105-23',
  sortableDocketNumber: 2023000105,
  statistics: [],
  status: 'General Docket - At Issue (Ready for Trial)',
};

const case105_23_petition: TDynamoRecord & RawDocketEntry = {
  addToCoversheet: false,
  createdAt: '2023-01-02T05:00:00.000Z',
  docketEntryId: '38b33b7b-2017-41fe-9453-e9732ebf28f7',
  docketNumber: '105-23',
  documentTitle: 'Petition',
  documentType: 'Petition',
  draftOrderState: null,
  entityName: 'DocketEntry',
  eventCode: 'P',
  filedBy: 'Petr. Armand Fulton',
  filers: ['40eb0890-aab3-4925-8769-e056b30c502d'],
  filingDate: '2023-01-02T05:00:00.000Z',
  index: 1,
  isDraft: false,
  isFileAttached: true,
  isMinuteEntry: false,
  isOnDocketRecord: true,
  isPaper: true,
  isStricken: false,
  mailingDate: 'asdf',
  numberOfPages: 3,
  pending: false,
  pk: 'case|105-23',
  processingStatus: 'complete',
  receivedAt: '2023-01-02T05:00:00.000Z',
  servedAt: '2023-01-06T22:33:13.813Z',
  servedParties: [
    {
      name: 'IRS',
      role: 'irsSuperuser',
    },
  ],
  servedPartiesCode: 'R',
  sk: 'docket-entry|38b33b7b-2017-41fe-9453-e9732ebf28f7',
  stampData: {},
  userId: '4805d1ab-18d0-43ec-bafb-654e83405416',
};

const case105_23_order: TDynamoRecord & RawDocketEntry = {
  addToCoversheet: false,
  createdAt: '2023-01-06T22:33:13.835Z',
  docketEntryId: '5157315b-1116-465e-9fa9-f81be578d6b8',
  docketNumber: '105-23',
  documentContentsId: '5d2ab4e4-1e53-46e8-88b9-75248d9a87a1',
  documentTitle: 'Order',
  documentType: 'Order for Filing Fee',
  draftOrderState: {
    docketNumber: '105-23',
    documentTitle: 'Order',
    documentType: 'Order for Filing Fee',
    eventCode: 'OF',
  },
  entityName: 'DocketEntry',
  eventCode: 'OF',
  filers: [],
  filingDate: '2023-01-06T22:33:13.836Z',
  isDraft: true,
  isMinuteEntry: false,
  isOnDocketRecord: false,
  isStricken: false,
  pending: false,
  pk: 'case|105-23',
  processingStatus: 'pending',
  receivedAt: '2023-01-06T05:00:00.000Z',
  sk: 'docket-entry|5157315b-1116-465e-9fa9-f81be578d6b8',
  stampData: {},
  userId: '4805d1ab-18d0-43ec-bafb-654e83405416',
};

const case105_23_place_of_trial: RawDocketEntry & TDynamoRecord = {
  addToCoversheet: false,
  createdAt: '2023-01-02T05:00:00.000Z',
  docketEntryId: '86018db0-2fb6-4783-8027-3f85204da186',
  docketNumber: '105-23',
  documentTitle: 'Request for Place of Trial at Birmingham, Alabama',
  documentType: 'Request for Place of Trial',
  draftOrderState: null,
  entityName: 'DocketEntry',
  eventCode: 'RQT',
  filedBy: 'Petr. Armand Fulton',
  filers: ['40eb0890-aab3-4925-8769-e056b30c502d'],
  filingDate: '2023-01-02T05:00:00.000Z',
  index: 2,
  isDraft: false,
  isFileAttached: true,
  isMinuteEntry: false,
  isOnDocketRecord: true,
  isPaper: true,
  isStricken: false,
  mailingDate: 'asdf',
  numberOfPages: 3,
  pending: false,
  pk: 'case|105-23',
  processingStatus: 'complete',
  receivedAt: '2023-01-02T05:00:00.000Z',
  servedAt: '2023-01-06T22:33:13.821Z',
  servedParties: [
    {
      name: 'IRS',
      role: 'irsSuperuser',
    },
  ],
  servedPartiesCode: 'R',
  sk: 'docket-entry|86018db0-2fb6-4783-8027-3f85204da186',
  stampData: {},
  userId: '4805d1ab-18d0-43ec-bafb-654e83405416',
};

const case106_23: TCase & TDynamoRecord = {
  associatedJudge: 'Chief Judge',
  caseCaption: 'Thaddeus Nicholson, Petitioner',
  caseType: 'Interest Abatement',
  createdAt: '2023-01-06T22:34:19.386Z',
  docketNumber: '106-23',
  docketNumberSuffix: null,
  docketNumberWithSuffix: '106-23',
  entityName: 'Case',
  filingType: 'Myself',
  gsi1pk: 'case|105-23',
  hasPendingItems: false,
  hasVerifiedIrsNotice: false,
  initialCaption: 'Thaddeus Nicholson, Petitioner',
  initialDocketNumberSuffix: '_',
  irsNoticeDate: null,
  isPaper: false,
  isSealed: false,
  leadDocketNumber: '105-23',
  noticeOfAttachments: false,
  orderDesignatingPlaceOfTrial: false,
  orderForAmendedPetition: false,
  orderForAmendedPetitionAndFilingFee: false,
  orderForCds: false,
  orderForFilingFee: true,
  orderForRatification: false,
  orderToShowCause: false,
  partyType: 'Petitioner',
  petitionPaymentDate: null,
  petitionPaymentStatus: 'Not paid',
  petitionPaymentWaivedDate: null,
  petitioners: [
    {
      address1: '42 East First Parkway',
      address2: 'Quaerat sunt facere',
      address3: 'Voluptas adipisicing',
      city: 'Aut similique itaque',
      contactId: '7805d1ab-18d0-43ec-bafb-654e83405417',
      contactType: 'petitioner',
      countryType: 'domestic',
      email: 'petitioner2@example.com',
      entityName: 'Petitioner',
      isAddressSealed: false,
      name: 'Thaddeus Nicholson',
      phone: '+1 (169) 337-9051',
      postalCode: '78858',
      sealedAndUnavailable: false,
      serviceIndicator: 'Electronic',
      state: 'AK',
    },
  ],
  pk: 'case|106-23',
  preferredTrialCity: 'Birmingham, Alabama',
  procedureType: 'Regular',
  qcCompleteForTrial: {},
  receivedAt: '2023-01-06T22:34:19.386Z',
  sk: 'case|106-23',
  sortableDocketNumber: 2023000106,
  statistics: [],
  status: 'General Docket - At Issue (Ready for Trial)',
};

const case106_23_stin: RawDocketEntry & TDynamoRecord = {
  addToCoversheet: false,
  createdAt: '2023-01-06T22:34:19.389Z',
  docketEntryId: '1fdbd670-febb-44e6-a257-bb3b6e3f6b15',
  docketNumber: '106-23',
  documentTitle: 'Statement of Taxpayer Identification',
  documentType: 'Statement of Taxpayer Identification',
  draftOrderState: null,
  entityName: 'DocketEntry',
  eventCode: 'STIN',
  filedBy: 'Petr. Thaddeus Nicholson',
  filers: ['7805d1ab-18d0-43ec-bafb-654e83405417'],
  filingDate: '2023-01-06T22:34:19.386Z',
  index: 0,
  isDraft: false,
  isFileAttached: true,
  isMinuteEntry: false,
  isOnDocketRecord: false,
  isStricken: false,
  numberOfPages: 3,
  pending: false,
  pk: 'case|106-23',
  privatePractitioners: [],
  processingStatus: 'complete',
  receivedAt: '2023-01-06T05:00:00.000Z',
  servedAt: '2023-01-06T22:34:39.112Z',
  servedParties: [
    {
      name: 'IRS',
      role: 'irsSuperuser',
    },
  ],
  servedPartiesCode: 'R',
  sk: 'docket-entry|1fdbd670-febb-44e6-a257-bb3b6e3f6b15',
  stampData: {},
  userId: '7805d1ab-18d0-43ec-bafb-654e83405417',
};

const case105_23_petition_work_item: WorkItem & TDynamoRecord = {
  assigneeId: '4805d1ab-18d0-43ec-bafb-654e83405416',
  assigneeName: 'Test Petitionsclerk1',
  associatedJudge: 'Chief Judge',
  caseIsInProgress: true,
  caseStatus: 'General Docket - At Issue (Ready for Trial)',
  caseTitle: 'Armand Fulton',
  completedAt: '2023-01-06T22:33:15.488Z',
  completedBy: 'Test Petitionsclerk1',
  completedByUserId: '4805d1ab-18d0-43ec-bafb-654e83405416',
  completedMessage: 'Served to IRS',
  createdAt: '2023-01-06T22:33:08.582Z',
  docketEntry: case105_23_petition,
  docketNumber: '105-23',
  docketNumberWithSuffix: '105-23D',
  entityName: 'WorkItem',
  gsi1pk: 'work-item|da03efd1-a7d5-4cf6-ad71-aa1d7c65e0f1',
  highPriority: false,
  inProgress: false,
  isInitializeCase: true,
  pk: 'case|105-23',
  section: 'petitions',
  sentBy: 'Test Petitionsclerk1',
  sentBySection: 'petitions',
  sentByUserId: '4805d1ab-18d0-43ec-bafb-654e83405416',
  sk: 'work-item|da03efd1-a7d5-4cf6-ad71-aa1d7c65e0f1',
  updatedAt: '2023-01-06T22:33:08.582Z',
  workItemId: 'da03efd1-a7d5-4cf6-ad71-aa1d7c65e0f1',
};

const case105_23_notr: RawDocketEntry & TDynamoRecord = {
  addToCoversheet: false,
  createdAt: '2023-01-06T22:33:18.437Z',
  docketEntryId: 'a8c259e6-b6ec-4f0d-b07e-2db3c9c55737',
  docketNumber: '105-23',
  documentTitle: 'Notice of Receipt of Petition',
  documentType: 'Notice of Receipt of Petition',
  draftOrderState: null,
  entityName: 'DocketEntry',
  eventCode: 'NOTR',
  filers: [],
  filingDate: '2023-01-06T22:33:18.437Z',
  index: 3,
  isDraft: false,
  isFileAttached: true,
  isMinuteEntry: false,
  isOnDocketRecord: true,
  isStricken: false,
  numberOfPages: 1,
  pending: false,
  pk: 'case|105-23',
  processingStatus: 'complete',
  receivedAt: '2023-01-06T05:00:00.000Z',
  servedAt: '2023-01-06T22:33:18.438Z',
  servedParties: [
    {
      name: 'Armand Fulton',
    },
  ],
  servedPartiesCode: 'P',
  sk: 'docket-entry|a8c259e6-b6ec-4f0d-b07e-2db3c9c55737',
  stampData: {},
  userId: '4805d1ab-18d0-43ec-bafb-654e83405416',
};

const case106_23_place_of_trial = {
  addToCoversheet: false,
  createdAt: '2023-01-06T22:34:19.388Z',
  docketEntryId: '7d357d67-7a95-4097-872e-fce395362a7e',
  docketNumber: '106-23',
  documentTitle: 'Request for Place of Trial at Birmingham, Alabama',
  documentType: 'Request for Place of Trial',
  entityName: 'DocketEntry',
  eventCode: 'RQT',
  filers: [],
  filingDate: '2023-01-06T22:34:19.386Z',
  index: 2,
  isDraft: false,
  isFileAttached: false,
  isMinuteEntry: true,
  isOnDocketRecord: true,
  isStricken: false,
  pending: false,
  pk: 'case|106-23',
  processingStatus: 'complete',
  receivedAt: '2023-01-06T05:00:00.000Z',
  sk: 'docket-entry|7d357d67-7a95-4097-872e-fce395362a7e',
  stampData: {},
  userId: '7805d1ab-18d0-43ec-bafb-654e83405417',
};

const case106_23_notr: RawDocketEntry & TDynamoRecord = {
  addToCoversheet: false,
  createdAt: '2023-01-06T22:34:42.962Z',
  docketEntryId: 'a0f13802-5eae-43cb-b886-797e322917d6',
  docketNumber: '106-23',
  documentTitle: 'Notice of Receipt of Petition',
  documentType: 'Notice of Receipt of Petition',
  draftOrderState: null,
  entityName: 'DocketEntry',
  eventCode: 'NOTR',
  filers: [],
  filingDate: '2023-01-06T22:34:42.962Z',
  index: 3,
  isDraft: false,
  isFileAttached: true,
  isMinuteEntry: false,
  isOnDocketRecord: true,
  isStricken: false,
  numberOfPages: 1,
  pending: false,
  pk: 'case|106-23',
  processingStatus: 'complete',
  receivedAt: '2023-01-06T05:00:00.000Z',
  servedAt: '2023-01-06T22:34:42.963Z',
  servedParties: [
    {
      email: 'petitioner2@example.com',
      name: 'Thaddeus Nicholson',
    },
  ],
  servedPartiesCode: 'P',
  sk: 'docket-entry|a0f13802-5eae-43cb-b886-797e322917d6',
  stampData: {},
  userId: '4805d1ab-18d0-43ec-bafb-654e83405416',
};

const case106_23_petition = {
  addToCoversheet: false,
  createdAt: '2023-01-06T22:34:19.387Z',
  docketEntryId: 'dfb11c0f-6680-4b1b-88de-7a04c79630d2',
  docketNumber: '106-23',
  documentTitle: 'Petition',
  documentType: 'Petition',
  draftOrderState: null,
  entityName: 'DocketEntry',
  eventCode: 'P',
  filedBy: 'Petr. Thaddeus Nicholson',
  filers: ['7805d1ab-18d0-43ec-bafb-654e83405417'],
  filingDate: '2023-01-06T22:34:19.386Z',
  index: 1,
  isDraft: false,
  isFileAttached: true,
  isMinuteEntry: false,
  isOnDocketRecord: true,
  isStricken: false,
  numberOfPages: 3,
  pending: false,
  pk: 'case|106-23',
  privatePractitioners: [],
  processingStatus: 'complete',
  receivedAt: '2023-01-06T05:00:00.000Z',
  servedAt: '2023-01-06T22:34:39.108Z',
  servedParties: [
    {
      name: 'IRS',
      role: 'irsSuperuser',
    },
  ],
  servedPartiesCode: 'R',
  sk: 'docket-entry|dfb11c0f-6680-4b1b-88de-7a04c79630d2',
  stampData: {},
  userId: '7805d1ab-18d0-43ec-bafb-654e83405417',
};

const case106_23_order_for_filing_fee: RawDocketEntry & TDynamoRecord = {
  addToCoversheet: false,
  createdAt: '2023-01-06T22:34:39.129Z',
  docketEntryId: 'fe45bb45-f32d-4bba-ba1f-eb8178655f2b',
  docketNumber: '106-23',
  documentContentsId: '551dd0da-d57d-4b53-8de0-ab7658ba6542',
  documentTitle: 'Order',
  documentType: 'Order for Filing Fee',
  draftOrderState: {
    docketNumber: '106-23',
    documentTitle: 'Order',
    documentType: 'Order for Filing Fee',
    eventCode: 'OF',
  },
  entityName: 'DocketEntry',
  eventCode: 'OF',
  filers: [],
  filingDate: '2023-01-06T22:34:39.129Z',
  isDraft: true,
  isMinuteEntry: false,
  isOnDocketRecord: false,
  isStricken: false,
  pending: false,
  pk: 'case|106-23',
  processingStatus: 'pending',
  receivedAt: '2023-01-06T05:00:00.000Z',
  sk: 'docket-entry|fe45bb45-f32d-4bba-ba1f-eb8178655f2b',
  stampData: {},
  userId: '4805d1ab-18d0-43ec-bafb-654e83405416',
};

const case106_23_petition_work_item = {
  assigneeId: '4805d1ab-18d0-43ec-bafb-654e83405416',
  assigneeName: 'Test Petitionsclerk1',
  associatedJudge: 'Chief Judge',
  caseIsInProgress: true,
  caseStatus: 'General Docket - At Issue (Ready for Trial)',
  caseTitle: 'Thaddeus Nicholson',
  completedAt: '2023-01-06T22:34:40.081Z',
  completedBy: 'Test Petitionsclerk1',
  completedByUserId: '4805d1ab-18d0-43ec-bafb-654e83405416',
  completedMessage: 'Served to IRS',
  createdAt: '2023-01-06T22:34:19.388Z',
  docketEntry: {
    createdAt: '2023-01-06T22:34:19.387Z',
    docketEntryId: 'dfb11c0f-6680-4b1b-88de-7a04c79630d2',
    documentTitle: 'Petition',
    documentType: 'Petition',
    eventCode: 'P',
    filedBy: 'Petr. Thaddeus Nicholson',
    isFileAttached: true,
    receivedAt: '2023-01-06T05:00:00.000Z',
    servedAt: '2023-01-06T22:34:39.108Z',
    userId: '7805d1ab-18d0-43ec-bafb-654e83405417',
  },
  docketNumber: '106-23',
  docketNumberWithSuffix: '106-23',
  entityName: 'WorkItem',
  gsi1pk: 'work-item|9bbe3f94-2221-4773-b8b8-418d3d50cb41',
  highPriority: false,
  isInitializeCase: true,
  pk: 'case|106-23',
  section: 'petitions',
  sentBy: 'Test Petitioner 2',
  sentByUserId: '7805d1ab-18d0-43ec-bafb-654e83405417',
  sk: 'work-item|9bbe3f94-2221-4773-b8b8-418d3d50cb41',
  updatedAt: '2023-01-06T22:34:19.388Z',
  workItemId: '9bbe3f94-2221-4773-b8b8-418d3d50cb41',
};

const petitioner2 = {
  address1: '3202 Elk Avenue',
  address2: 'Hanover, MI 49241',
  email: 'petitioner2@example.com',
  entityName: 'User',
  name: 'Test Petitioner 2',
  phone: '517-563-1536',
  pk: 'user|7805d1ab-18d0-43ec-bafb-654e83405417',
  role: 'petitioner',
  section: 'petitioner',
  sk: 'user|7805d1ab-18d0-43ec-bafb-654e83405417',
  userId: '7805d1ab-18d0-43ec-bafb-654e83405417',
};

const petitioner2_usercase_106_23 = {
  caseCaption: 'Thaddeus Nicholson, Petitioner',
  createdAt: '2023-01-06T22:34:19.386Z',
  docketNumber: '106-23',
  docketNumberSuffix: null,
  docketNumberWithSuffix: '106-23',
  entityName: 'UserCase',
  gsi1pk: 'user-case|106-23',
  leadDocketNumber: '105-23',
  pk: 'user|7805d1ab-18d0-43ec-bafb-654e83405417',
  sk: 'case|106-23',
  status: 'General Docket - At Issue (Ready for Trial)',
};

const docketclerk = {
  email: 'docketclerk@example.com',
  entityName: 'User',
  name: 'Test Docketclerk',
  pk: 'user|1805d1ab-18d0-43ec-bafb-654e83405416',
  role: 'docketclerk',
  section: 'docket',
  sk: 'user|1805d1ab-18d0-43ec-bafb-654e83405416',
  userId: '1805d1ab-18d0-43ec-bafb-654e83405416',
};

const petitionsclerk1 = {
  email: 'petitionsclerk1@example.com',
  entityName: 'User',
  name: 'Test Petitionsclerk1',
  pk: 'user|4805d1ab-18d0-43ec-bafb-654e83405416',
  role: 'petitionsclerk',
  section: 'petitions',
  sk: 'user|4805d1ab-18d0-43ec-bafb-654e83405416',
  userId: '4805d1ab-18d0-43ec-bafb-654e83405416',
};

const consolidated_group_feature_flag = {
  current: true,
  pk: 'consolidated-cases-group-access-petitioner',
  sk: 'consolidated-cases-group-access-petitioner',
};

export const seedData = [
  case105_23,
  case105_23_petition,
  case105_23_order,
  case105_23_place_of_trial,
  case105_23_notr,
  case105_23_petition_work_item,
  case106_23,
  case106_23_stin,
  case106_23_place_of_trial,
  case106_23_notr,
  case106_23_petition,
  case106_23_order_for_filing_fee,
  case106_23_petition_work_item,
  petitioner2,
  petitioner2_usercase_106_23,
  docketclerk,
  petitionsclerk1,
  consolidated_group_feature_flag,
];

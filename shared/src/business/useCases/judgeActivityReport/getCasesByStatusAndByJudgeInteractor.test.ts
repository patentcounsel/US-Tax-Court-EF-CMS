/* eslint-disable max-lines */

import {
  CASE_STATUS_TYPES,
  CAV_AND_SUBMITTED_CASES_PAGE_SIZE,
} from '../../entities/EntityConstants';
import {
  MOCK_CASE,
  MOCK_CONSOLIDATED_1_CASE_WITH_PAPER_SERVICE,
  MOCK_LEAD_CASE_WITH_PAPER_SERVICE,
} from '../../../test/mockCase';
import { applicationContext } from '../../test/createTestApplicationContext';
import {
  docketClerkUser,
  judgeUser,
  petitionsClerkUser,
} from '../../../test/mockUsers';
import { getCasesByStatusAndByJudgeInteractor } from './getCasesByStatusAndByJudgeInteractor';

const docketEntryWithoutCaseHistory = '115-23';

const prohibitedDocketEntries = 'ODD, DEC, SDEC, OAD';

const mockSubmittedCase = {
  ...MOCK_CASE,
  associatedJudge: judgeUser.name,
  caseStatusHistory: [
    {
      changedBy: docketClerkUser.name,
      date: '2023-05-11T14:19:28.717Z',
      updatedCaseStatus: CASE_STATUS_TYPES.submitted,
    },
  ],
  pk: `case|${MOCK_CASE.docketNumber}`,
  sk: `case|${MOCK_CASE.docketNumber}`,
};

const mockSubmittedCaseWithoutCaseHistory = {
  ...MOCK_CASE,
  associatedJudge: judgeUser.name,
  caseStatusHistory: [],
  pk: `case|${docketEntryWithoutCaseHistory}`,
  sk: `case|${docketEntryWithoutCaseHistory}`,
};

const mockSubmittedCaseWithOddOnDocketRecord = {
  ...MOCK_CASE,
  associatedJudge: judgeUser.name,
  caseStatusHistory: [
    {
      changedBy: docketClerkUser.name,
      date: '2023-05-12T14:19:28.717Z',
      updatedCaseStatus: CASE_STATUS_TYPES.submitted,
    },
  ],
  docketEntries: [
    {
      createdAt: '2018-11-21T20:49:28.192Z',
      docketEntryId: 'e6b81f4d-1e47-423a-8caf-6d2fdc3d3888',
      docketNumber: '101-19',
      documentTitle: `Order of Dismissal and Decision Entered, ${judgeUser.name} Dismissed`,
      documentType: 'Order of Dismissal and Decision',
      draftOrderState: {},
      entityName: 'DocketEntry',
      eventCode: 'ODD',
      filers: [],
      filingDate: '2018-03-01T05:00:00.000Z',
      index: 4,
      isDraft: false,
      // isFileAttached: true,
      // isMinuteEntry: false,
      // isOnDocketRecord: false,
      isStricken: false,
      judge: 'Colvin',
      // pending: false,
      // processingStatus: 'complete',
      // receivedAt: '2018-03-01T05:00:00.000Z',
      // servedAt: '2019-05-24T18:41:36.122Z',
      // servedParties: [
      //   {
      //     name: 'Bernard Lowe',
      //   },
      //   {
      //     name: 'IRS',
      //     role: 'irsSuperuser',
      //   },
      // ],
      // signedAt: '2019-05-24T18:41:36.122Z',
      // signedByUserId: 'dabbad00-18d0-43ec-bafb-654e83405416',
      // signedJudgeName: 'John O. Colvin',
      // stampData: {},
      // userId: '7805d1ab-18d0-43ec-bafb-654e83405416',
    },
  ],
  docketNumber: '101-19',
  docketNumberWithSuffix: '101-19',
  hasVerifiedIrsNotice: false,
  pk: 'case|101-19',
  sk: 'case|101-19',
  sortableDocketNumber: 2019000101,
  status: CASE_STATUS_TYPES.submitted,
};

const mockSubmittedCaseWithDECOnDocketRecord = {
  ...MOCK_CASE,
  associatedJudge: judgeUser.name,
  caseStatusHistory: [
    {
      changedBy: docketClerkUser.name,
      date: '2023-05-12T14:19:28.717Z',
      updatedCaseStatus: CASE_STATUS_TYPES.submitted,
    },
  ],
  docketEntries: [
    {
      createdAt: '2018-11-21T20:49:28.192Z',
      docketEntryId: 'e6b81f4d-1e47-423a-8caf-6d2fdc3d3888',
      docketNumber: '101-19',
      documentTitle: 'Decision',
      documentType: 'Decision',
      draftOrderState: {},
      entityName: 'DocketEntry',
      eventCode: 'DEC',
      filers: [],
      filingDate: '2018-03-01T05:00:00.000Z',
      index: 4,
      isDraft: false,
      isFileAttached: true,
      isMinuteEntry: false,
      isOnDocketRecord: false,
      isStricken: false,
      judge: 'Colvin',
      pending: false,
      processingStatus: 'complete',
      receivedAt: '2018-03-01T05:00:00.000Z',
      servedAt: '2019-05-24T18:41:36.122Z',
      servedParties: [
        {
          name: 'Bernard Lowe',
        },
        {
          name: 'IRS',
          role: 'irsSuperuser',
        },
      ],
      signedAt: '2019-05-24T18:41:36.122Z',
      signedByUserId: 'dabbad00-18d0-43ec-bafb-654e83405416',
      signedJudgeName: 'John O. Colvin',
      stampData: {},
      userId: '7805d1ab-18d0-43ec-bafb-654e83405416',
    },
  ],
  docketNumber: '121-19',
  docketNumberWithSuffix: '121-19',
  pk: 'case|121-19',
  sk: 'case|121-19',
  sortableDocketNumber: 2019000121,
};

const mockSubmittedCaseWithSDECOnDocketRecord = {
  ...MOCK_CASE,
  associatedJudge: judgeUser.name,
  caseStatusHistory: [
    {
      changedBy: docketClerkUser.name,
      date: '2023-05-12T14:19:28.717Z',
      updatedCaseStatus: CASE_STATUS_TYPES.submitted,
    },
  ],
  docketEntries: [
    {
      createdAt: '2018-11-21T20:49:28.192Z',
      docketEntryId: 'e6b81f4d-1e47-423a-8caf-6d2fdc3d3888',
      docketNumber: '101-19',
      documentTitle: 'Stipulated Decision Entered, [Judge Name] [Anything]',
      documentType: 'Stipulated Decision',
      draftOrderState: {},
      entityName: 'DocketEntry',
      eventCode: 'SDEC',
      filers: [],
      filingDate: '2018-03-01T05:00:00.000Z',
      index: 4,
      isDraft: false,
      isFileAttached: true,
      isMinuteEntry: false,
      isOnDocketRecord: false,
      isStricken: false,
      judge: 'Colvin',
      pending: false,
      processingStatus: 'complete',
      receivedAt: '2018-03-01T05:00:00.000Z',
      servedAt: '2019-05-24T18:41:36.122Z',
      servedParties: [
        {
          name: 'Bernard Lowe',
        },
        {
          name: 'IRS',
          role: 'irsSuperuser',
        },
      ],
      signedAt: '2019-05-24T18:41:36.122Z',
      signedByUserId: 'dabbad00-18d0-43ec-bafb-654e83405416',
      signedJudgeName: 'John O. Colvin',
      stampData: {},
      userId: '7805d1ab-18d0-43ec-bafb-654e83405416',
    },
  ],
  docketNumber: '122-19',
  docketNumberWithSuffix: '122-19',
  pk: 'case|122-19',
  sk: 'case|122-19',
  sortableDocketNumber: 2019000122,
};

const mockSubmittedCaseWithOADOnDocketRecord = {
  ...MOCK_CASE,
  associatedJudge: judgeUser.name,
  caseStatusHistory: [
    {
      changedBy: docketClerkUser.name,
      date: '2023-05-12T14:19:28.717Z',
      updatedCaseStatus: CASE_STATUS_TYPES.submitted,
    },
  ],
  docketEntries: [
    {
      createdAt: '2018-11-21T20:49:28.192Z',
      docketEntryId: 'e6b81f4d-1e47-423a-8caf-6d2fdc3d3888',
      docketNumber: '101-19',
      documentTitle: 'Order and Decision',
      documentType: 'Order and Decision',
      draftOrderState: {},
      entityName: 'DocketEntry',
      eventCode: 'OAD',
      filers: [],
      filingDate: '2018-03-01T05:00:00.000Z',
      index: 4,
      isDraft: false,
      isFileAttached: true,
      isMinuteEntry: false,
      isOnDocketRecord: false,
      isStricken: false,
      judge: 'Colvin',
      pending: false,
      processingStatus: 'complete',
      receivedAt: '2018-03-01T05:00:00.000Z',
      servedAt: '2019-05-24T18:41:36.122Z',
      servedParties: [
        {
          name: 'Bernard Lowe',
        },
        {
          name: 'IRS',
          role: 'irsSuperuser',
        },
      ],
      signedAt: '2019-05-24T18:41:36.122Z',
      signedByUserId: 'dabbad00-18d0-43ec-bafb-654e83405416',
      signedJudgeName: 'John O. Colvin',
      stampData: {},
      userId: '7805d1ab-18d0-43ec-bafb-654e83405416',
    },
  ],
  docketNumber: '123-19',
  docketNumberWithSuffix: '123-19',
  pk: 'case|123-19',
  sk: 'case|123-19',
  sortableDocketNumber: 2021000123,
};

const mockCavLeadCase = {
  ...MOCK_LEAD_CASE_WITH_PAPER_SERVICE,
  associatedJudge: judgeUser.name,
  caseStatusHistory: [
    {
      changedBy: docketClerkUser.name,
      date: '2023-05-13T14:19:28.717Z',
      updatedCaseStatus: CASE_STATUS_TYPES.cav,
    },
  ],
  pk: `case|${MOCK_LEAD_CASE_WITH_PAPER_SERVICE.docketNumber}`,
  sk: `case|${MOCK_LEAD_CASE_WITH_PAPER_SERVICE.docketNumber}`,
  sortableDocketNumber: 2019000109,
  status: CASE_STATUS_TYPES.cav,
};

const mockCavConsolidatedMemberCase = {
  ...MOCK_CONSOLIDATED_1_CASE_WITH_PAPER_SERVICE,
  associatedJudge: judgeUser.name,
  caseStatusHistory: [
    {
      changedBy: docketClerkUser.name,
      date: '2023-05-13T14:19:28.717Z',
      updatedCaseStatus: CASE_STATUS_TYPES.cav,
    },
  ],
  pk: `case|${MOCK_CONSOLIDATED_1_CASE_WITH_PAPER_SERVICE.docketNumber}`,
  sk: `case|${MOCK_CONSOLIDATED_1_CASE_WITH_PAPER_SERVICE.docketNumber}`,
  sortableDocketNumber: 2019000110,
  status: CASE_STATUS_TYPES.cav,
};

let mockReturnedDocketNumbers: Array<{ docketNumber: string }> = [];

let expectedConsolidatedCasesGroupCountMap = {};

describe('getCasesByStatusAndByJudgeInteractor', () => {
  const mockValidRequest = {
    judges: [judgeUser.name],
    pageNumber: 0,
    pageSize: CAV_AND_SUBMITTED_CASES_PAGE_SIZE,
    statuses: [CASE_STATUS_TYPES.submitted, CASE_STATUS_TYPES.cav],
  };

  beforeEach(() => {
    applicationContext.getCurrentUser.mockReturnValue(judgeUser);
  });

  it('should return an error when the user is not authorized to generate the report', async () => {
    applicationContext.getCurrentUser.mockReturnValue(petitionsClerkUser);

    await expect(
      getCasesByStatusAndByJudgeInteractor(
        applicationContext,
        mockValidRequest,
      ),
    ).rejects.toThrow('Unauthorized');
  });

  it('should return an error when the search parameters are not valid', async () => {
    await expect(
      getCasesByStatusAndByJudgeInteractor(applicationContext, {
        judges: [judgeUser.name],
        statuses: [undefined],
      }),
    ).rejects.toThrow();
  });

  it('should return an array of 2 cases and consolidatedCasesGroupMap (stripping out the consolidated member case)', async () => {
    mockReturnedDocketNumbers = [
      { docketNumber: mockSubmittedCase.docketNumber },
      { docketNumber: mockCavLeadCase.docketNumber },
      { docketNumber: mockCavConsolidatedMemberCase.docketNumber },
      { docketNumber: mockSubmittedCaseWithoutCaseHistory.docketNumber },
    ];

    const casesForLeadDocketNumber = [
      mockCavLeadCase,
      mockCavConsolidatedMemberCase,
    ];

    expectedConsolidatedCasesGroupCountMap = {
      [`${mockCavLeadCase.docketNumber}`]: casesForLeadDocketNumber.length,
    };

    applicationContext
      .getPersistenceGateway()
      .getDocketNumbersByStatusAndByJudge.mockReturnValue({
        foundCases: mockReturnedDocketNumbers,
      });

    applicationContext
      .getPersistenceGateway()
      .getCaseByDocketNumber.mockResolvedValueOnce(mockSubmittedCase)
      .mockResolvedValueOnce(mockCavLeadCase)
      .mockResolvedValueOnce(mockCavConsolidatedMemberCase);

    applicationContext
      .getPersistenceGateway()
      .getCasesByLeadDocketNumber.mockResolvedValueOnce(
        casesForLeadDocketNumber,
      );

    const result = await getCasesByStatusAndByJudgeInteractor(
      applicationContext,
      mockValidRequest,
    );

    expect(result.cases.length).toEqual(2);
    expect(result.cases).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          docketNumber: '101-18',
        }),
        expect.objectContaining({
          docketNumber: '109-19',
        }),
      ]),
    );

    expect(result.cases).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          docketNumber: docketEntryWithoutCaseHistory,
        }),
      ]),
    );

    expect(result.consolidatedCasesGroupCountMap).toEqual(
      expectedConsolidatedCasesGroupCountMap,
    );
    expect(result.totalCount).toEqual(2);
  });

  it(`should return an array of 2 cases and consolidatedCasesGroupMap (stripping out the member case of consolidated cases and cases with ${prohibitedDocketEntries} docket entries)`, async () => {
    mockReturnedDocketNumbers = [
      { docketNumber: mockSubmittedCase.docketNumber },
      { docketNumber: mockSubmittedCaseWithOddOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithDECOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithSDECOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithOADOnDocketRecord.docketNumber },
      { docketNumber: mockCavLeadCase.docketNumber },
      { docketNumber: mockCavConsolidatedMemberCase.docketNumber },
      { docketNumber: mockSubmittedCaseWithoutCaseHistory.docketNumber },
    ];

    const casesForLeadDocketNumber = [
      mockCavLeadCase,
      mockCavConsolidatedMemberCase,
    ];

    expectedConsolidatedCasesGroupCountMap = {
      [`${mockCavLeadCase.docketNumber}`]: casesForLeadDocketNumber.length,
    };

    applicationContext
      .getPersistenceGateway()
      .getDocketNumbersByStatusAndByJudge.mockReturnValue({
        foundCases: mockReturnedDocketNumbers,
      });

    applicationContext
      .getPersistenceGateway()
      .getCaseByDocketNumber.mockResolvedValueOnce(mockSubmittedCase)
      .mockResolvedValueOnce(mockSubmittedCaseWithOddOnDocketRecord)
      .mockResolvedValueOnce(mockCavLeadCase)
      .mockResolvedValueOnce(mockCavConsolidatedMemberCase)
      .mockResolvedValueOnce(mockSubmittedCaseWithDECOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithSDECOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithOADOnDocketRecord);

    applicationContext
      .getPersistenceGateway()
      .getCasesByLeadDocketNumber.mockResolvedValueOnce(
        casesForLeadDocketNumber,
      );

    const result = await getCasesByStatusAndByJudgeInteractor(
      applicationContext,
      mockValidRequest,
    );

    expect(result.cases).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          docketNumber: '101-18',
        }),
        expect.objectContaining({
          docketNumber: '109-19',
        }),
      ]),
    );

    expect(result.cases).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          docketNumber: docketEntryWithoutCaseHistory,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithDECOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithOddOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithSDECOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithOADOnDocketRecord.docketNumber,
        }),
      ]),
    );

    expect(result.consolidatedCasesGroupCountMap).toEqual(
      expectedConsolidatedCasesGroupCountMap,
    );
    expect(result.totalCount).toEqual(2);
  });

  it(`should return an array of 1 case and consolidatedCasesGroupMap (stripping out the cases with served ${prohibitedDocketEntries} docket entries and no consolidated cases)`, async () => {
    mockReturnedDocketNumbers = [
      { docketNumber: mockSubmittedCase.docketNumber },
      { docketNumber: mockSubmittedCaseWithOddOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithDECOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithSDECOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithOADOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithoutCaseHistory.docketNumber },
    ];

    applicationContext
      .getPersistenceGateway()
      .getDocketNumbersByStatusAndByJudge.mockReturnValue({
        foundCases: mockReturnedDocketNumbers,
      });

    applicationContext
      .getPersistenceGateway()
      .getCaseByDocketNumber.mockResolvedValueOnce(mockSubmittedCase)
      .mockResolvedValueOnce(mockSubmittedCaseWithOddOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithDECOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithSDECOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithOADOnDocketRecord);

    const result = await getCasesByStatusAndByJudgeInteractor(
      applicationContext,
      mockValidRequest,
    );

    expect(result.cases.length).toEqual(1);
    expect(result.cases).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          docketNumber: '101-18',
        }),
      ]),
    );

    expect(result.cases).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          docketNumber: docketEntryWithoutCaseHistory,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithDECOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithOddOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithSDECOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithOADOnDocketRecord.docketNumber,
        }),
      ]),
    );

    expect(result.consolidatedCasesGroupCountMap).toEqual({});
    expect(result.totalCount).toEqual(1);
  });

  it(`should return an array of 5 cases (4 cases containing ${prohibitedDocketEntries} docket entries in DRAFT statuses) and consolidatedCasesGroupMap`, async () => {
    mockSubmittedCaseWithOddOnDocketRecord.docketEntries = [
      {
        ...mockSubmittedCaseWithOddOnDocketRecord.docketEntries[0],
        isDraft: true,
        servedAt: undefined,
        servedParties: undefined,
      },
    ];
    mockSubmittedCaseWithDECOnDocketRecord.docketEntries = [
      {
        ...mockSubmittedCaseWithDECOnDocketRecord.docketEntries[0],
        isDraft: true,
        servedAt: undefined,
        servedParties: undefined,
      },
    ];
    mockSubmittedCaseWithOADOnDocketRecord.docketEntries = [
      {
        ...mockSubmittedCaseWithOADOnDocketRecord.docketEntries[0],
        isDraft: true,
        servedAt: undefined,
        servedParties: undefined,
      },
    ];
    mockSubmittedCaseWithSDECOnDocketRecord.docketEntries = [
      {
        ...mockSubmittedCaseWithSDECOnDocketRecord.docketEntries[0],
        isDraft: true,
        servedAt: undefined,
        servedParties: undefined,
      },
    ];

    mockReturnedDocketNumbers = [
      { docketNumber: mockSubmittedCase.docketNumber },
      { docketNumber: mockSubmittedCaseWithOddOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithDECOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithSDECOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithOADOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithoutCaseHistory.docketNumber },
    ];

    applicationContext
      .getPersistenceGateway()
      .getDocketNumbersByStatusAndByJudge.mockReturnValue({
        foundCases: mockReturnedDocketNumbers,
      });

    applicationContext
      .getPersistenceGateway()
      .getCaseByDocketNumber.mockResolvedValueOnce(mockSubmittedCase)
      .mockResolvedValueOnce(mockSubmittedCaseWithOddOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithDECOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithSDECOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithOADOnDocketRecord);

    const result = await getCasesByStatusAndByJudgeInteractor(
      applicationContext,
      mockValidRequest,
    );

    expect(result.cases).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          docketNumber: mockSubmittedCase.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithDECOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithOddOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithSDECOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithOADOnDocketRecord.docketNumber,
        }),
      ]),
    );

    expect(result.cases).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          docketNumber: docketEntryWithoutCaseHistory,
        }),
      ]),
    );

    expect(result.consolidatedCasesGroupCountMap).toEqual({});
    expect(result.totalCount).toEqual(5);
  });

  it(`should return an array of 5 cases (4 cases containing UNSERVED ${prohibitedDocketEntries} docket entries) and consolidatedCasesGroupMap`, async () => {
    mockSubmittedCaseWithOddOnDocketRecord.docketEntries = [
      {
        ...mockSubmittedCaseWithOddOnDocketRecord.docketEntries[0],
        isDraft: false,
        servedAt: undefined,
        servedParties: undefined,
      },
    ];

    mockSubmittedCaseWithDECOnDocketRecord.docketEntries = [
      {
        ...mockSubmittedCaseWithDECOnDocketRecord.docketEntries[0],
        isDraft: false,
        servedAt: undefined,
        servedParties: undefined,
      },
    ];
    mockSubmittedCaseWithOADOnDocketRecord.docketEntries = [
      {
        ...mockSubmittedCaseWithOADOnDocketRecord.docketEntries[0],
        isDraft: false,
        servedAt: undefined,
        servedParties: undefined,
      },
    ];
    mockSubmittedCaseWithSDECOnDocketRecord.docketEntries = [
      {
        ...mockSubmittedCaseWithSDECOnDocketRecord.docketEntries[0],
        isDraft: false,
        servedAt: undefined,
        servedParties: undefined,
      },
    ];

    mockReturnedDocketNumbers = [
      { docketNumber: mockSubmittedCase.docketNumber },
      { docketNumber: mockSubmittedCaseWithOddOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithDECOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithSDECOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithOADOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithoutCaseHistory.docketNumber },
    ];

    applicationContext
      .getPersistenceGateway()
      .getDocketNumbersByStatusAndByJudge.mockReturnValue({
        foundCases: mockReturnedDocketNumbers,
      });

    applicationContext
      .getPersistenceGateway()
      .getCaseByDocketNumber.mockResolvedValueOnce(mockSubmittedCase)
      .mockResolvedValueOnce(mockSubmittedCaseWithOddOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithDECOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithSDECOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithOADOnDocketRecord);

    const result = await getCasesByStatusAndByJudgeInteractor(
      applicationContext,
      mockValidRequest,
    );

    expect(result.cases).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          docketNumber: mockSubmittedCase.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithDECOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithOddOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithSDECOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithOADOnDocketRecord.docketNumber,
        }),
      ]),
    );

    expect(result.cases).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          docketNumber: docketEntryWithoutCaseHistory,
        }),
      ]),
    );

    expect(result.consolidatedCasesGroupCountMap).toEqual({});
    expect(result.totalCount).toEqual(5);
  });

  it(`should return an array of 5 cases (4 cases containing ${prohibitedDocketEntries} docket entries that have been stricken) and consolidatedCasesGroupMap`, async () => {
    mockSubmittedCaseWithOddOnDocketRecord.docketEntries = [
      {
        ...mockSubmittedCaseWithOddOnDocketRecord.docketEntries[0],
        isStricken: true,
        strickenAt: '2023-05-25T16:15:59.058Z',
        strickenBy: 'Test Docketclerk',
        strickenByUserId: '1805d1ab-18d0-43ec-bafb-654e83405416',
      },
    ];

    mockSubmittedCaseWithDECOnDocketRecord.docketEntries = [
      {
        ...mockSubmittedCaseWithDECOnDocketRecord.docketEntries[0],
        isStricken: true,
        strickenAt: '2023-05-25T16:15:59.058Z',
        strickenBy: 'Test Docketclerk',
        strickenByUserId: '1805d1ab-18d0-43ec-bafb-654e83405416',
      },
    ];
    mockSubmittedCaseWithOADOnDocketRecord.docketEntries = [
      {
        ...mockSubmittedCaseWithOADOnDocketRecord.docketEntries[0],
        isStricken: true,
        strickenAt: '2023-05-25T16:15:59.058Z',
        strickenBy: 'Test Docketclerk',
        strickenByUserId: '1805d1ab-18d0-43ec-bafb-654e83405416',
      },
    ];
    mockSubmittedCaseWithSDECOnDocketRecord.docketEntries = [
      {
        ...mockSubmittedCaseWithSDECOnDocketRecord.docketEntries[0],
        isStricken: true,
        strickenAt: '2023-05-25T16:15:59.058Z',
        strickenBy: 'Test Docketclerk',
        strickenByUserId: '1805d1ab-18d0-43ec-bafb-654e83405416',
      },
    ];
    mockReturnedDocketNumbers = [
      { docketNumber: mockSubmittedCase.docketNumber },
      { docketNumber: mockSubmittedCaseWithOddOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithDECOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithSDECOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithOADOnDocketRecord.docketNumber },
      { docketNumber: mockSubmittedCaseWithoutCaseHistory.docketNumber },
    ];

    applicationContext
      .getPersistenceGateway()
      .getDocketNumbersByStatusAndByJudge.mockReturnValue({
        foundCases: mockReturnedDocketNumbers,
      });

    applicationContext
      .getPersistenceGateway()
      .getCaseByDocketNumber.mockResolvedValueOnce(mockSubmittedCase)
      .mockResolvedValueOnce(mockSubmittedCaseWithOddOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithDECOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithSDECOnDocketRecord)
      .mockResolvedValueOnce(mockSubmittedCaseWithOADOnDocketRecord);

    const result = await getCasesByStatusAndByJudgeInteractor(
      applicationContext,
      mockValidRequest,
    );

    expect(result.cases).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          docketNumber: mockSubmittedCase.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithDECOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithOddOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithSDECOnDocketRecord.docketNumber,
        }),
        expect.objectContaining({
          docketNumber: mockSubmittedCaseWithOADOnDocketRecord.docketNumber,
        }),
      ]),
    );
    expect(result.cases).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          docketNumber: docketEntryWithoutCaseHistory,
        }),
      ]),
    );

    expect(result.consolidatedCasesGroupCountMap).toEqual({});
    expect(result.totalCount).toEqual(5);
  });
});

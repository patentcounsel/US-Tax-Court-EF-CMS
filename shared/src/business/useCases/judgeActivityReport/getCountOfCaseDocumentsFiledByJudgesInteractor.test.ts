import { AggregatedEventCodesType } from '@web-api/persistence/elasticsearch/fetchEventCodesCountForJudges';
import {
  JUDGE_ACTIVITY_REPORT_ORDER_EVENT_CODES,
  OPINION_EVENT_CODES_WITH_BENCH_OPINION,
} from '../../entities/EntityConstants';
import {
  JudgeActivityReportFilters,
  getCountOfCaseDocumentsFiledByJudgesInteractor,
} from './getCountOfCaseDocumentsFiledByJudgesInteractor';
import { applicationContext } from '../../test/createTestApplicationContext';
import { judgeUser, petitionsClerkUser } from '@shared/test/mockUsers';
import {
  mockCountOfOpinionsIssuedByJudge,
  mockCountOfOrdersIssuedByJudge,
} from '@shared/test/mockSearchResults';

describe('getCountOfCaseDocumentsFiledByJudgesInteractor', () => {
  const mockStartDate = '02/12/2020';
  const mockEndDate = '03/21/2020';
  const mockJudges = [judgeUser.name];
  const mockValidRequest: JudgeActivityReportFilters = {
    endDate: mockEndDate,
    judges: mockJudges,
    startDate: mockStartDate,
  };

  beforeEach(() => {
    applicationContext.getCurrentUser.mockReturnValue(judgeUser);

    applicationContext
      .getPersistenceGateway()
      .fetchEventCodesCountForJudges.mockResolvedValueOnce(
        mockCountOfOpinionsIssuedByJudge,
      )
      .mockResolvedValueOnce(mockCountOfOrdersIssuedByJudge);
  });

  it('should return an error when the user is not authorized to generate the report', async () => {
    applicationContext.getCurrentUser.mockReturnValue(petitionsClerkUser);

    await expect(
      getCountOfCaseDocumentsFiledByJudgesInteractor(
        applicationContext,
        mockValidRequest,
      ),
    ).rejects.toThrow('Unauthorized');
  });

  it('should return an error when the search parameters are not valid', async () => {
    await expect(
      getCountOfCaseDocumentsFiledByJudgesInteractor(applicationContext, {
        endDate: 'baddabingbaddaboom',
        judges: [judgeUser.name],
        startDate: 'yabbadabbadoo',
      }),
    ).rejects.toThrow();
  });

  it('should make a call to return the case documents filed by the judge provided in the date range provided, sorted by eventCode (ascending)', async () => {
    const results: AggregatedEventCodesType =
      await getCountOfCaseDocumentsFiledByJudgesInteractor(
        applicationContext,
        mockValidRequest,
      );

    expect(
      applicationContext.getPersistenceGateway().fetchEventCodesCountForJudges
        .mock.calls[0][0],
    ).toMatchObject({
      params: {
        documentEventCodes: OPINION_EVENT_CODES_WITH_BENCH_OPINION,
        endDate: '2020-03-22T03:59:59.999Z',
        judges: mockJudges,
        startDate: '2020-02-12T05:00:00.000Z',
      },
    });

    expect(
      applicationContext.getPersistenceGateway().fetchEventCodesCountForJudges
        .mock.calls[1][0],
    ).toMatchObject({
      params: {
        documentEventCodes: JUDGE_ACTIVITY_REPORT_ORDER_EVENT_CODES,
        endDate: '2020-03-22T03:59:59.999Z',
        judges: mockJudges,
        startDate: '2020-02-12T05:00:00.000Z',
      },
    });

    expect(results).toEqual({
      opinions: mockCountOfOpinionsIssuedByJudge,
      orders: mockCountOfOrdersIssuedByJudge,
    });
  });

  it('should exclude certain order event codes when calling fetchEventCodesCountForJudges', async () => {
    await getCountOfCaseDocumentsFiledByJudgesInteractor(
      applicationContext,
      mockValidRequest,
    );

    expect(
      applicationContext.getPersistenceGateway().fetchEventCodesCountForJudges
        .mock.calls[1][0].params.documentEventCodes,
    ).not.toContain('OAJ');
    expect(
      applicationContext.getPersistenceGateway().fetchEventCodesCountForJudges
        .mock.calls[1][0].params.documentEventCodes,
    ).not.toContain('SPOS');
    expect(
      applicationContext.getPersistenceGateway().fetchEventCodesCountForJudges
        .mock.calls[1][0].params.documentEventCodes,
    ).not.toContain('SPTO');
    expect(
      applicationContext.getPersistenceGateway().fetchEventCodesCountForJudges
        .mock.calls[1][0].params.documentEventCodes,
    ).not.toContain('OST');
  });
});

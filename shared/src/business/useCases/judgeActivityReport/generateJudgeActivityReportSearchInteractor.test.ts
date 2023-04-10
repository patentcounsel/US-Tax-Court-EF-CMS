import { applicationContext } from '../../test/createTestApplicationContext';
import { generateJudgeActivityReportSearchInteractor } from './generateJudgeActivityReportSearchInteractor';
import { judgeUser, petitionsClerkUser } from '../../../test/mockUsers';

describe('generateJudgeActivityReportSearchInteractor', () => {
  const mockClosedCases = [];

  const mockValidRequest = {
    endDate: '2014-03-21',
    judge: 'abc',
    startDate: '2013-12-23',
  };

  it('should return an error when the user is not authorized to generate the report', () => {
    applicationContext.getCurrentUser.mockReturnValue(petitionsClerkUser);

    expect(() =>
      generateJudgeActivityReportSearchInteractor(
        applicationContext,
        mockValidRequest,
      ),
    ).toThrow('Unauthorized');
  });

  it('should return an error when the search parameters are not valid', () => {
    applicationContext.getCurrentUser.mockReturnValue(judgeUser);

    expect(() =>
      generateJudgeActivityReportSearchInteractor(applicationContext, {
        endDate: undefined,
        judge: 'abc',
        startDate: 'yabbadabbadoo',
      }),
    ).toThrow();
  });

  it('should return the cases closed in the time period specified in the request by the current user when they are a judge', () => {
    applicationContext.getCurrentUser.mockReturnValue(judgeUser);
    applicationContext
      .getPersistenceGateway()
      .getCasesClosedByJudge.mockReturnValue(mockClosedCases);

    const { closedCases } = generateJudgeActivityReportSearchInteractor(
      applicationContext,
      mockValidRequest,
    );

    expect(closedCases).toBe(mockClosedCases);
    expect(
      applicationContext.getPersistenceGateway().getCasesClosedByJudge.mock
        .calls[0][0].judge,
    ).toBe('Sotomayor');
  });
});

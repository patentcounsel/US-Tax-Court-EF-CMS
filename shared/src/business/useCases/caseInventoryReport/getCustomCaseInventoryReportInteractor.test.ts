import {
  GetCaseInventoryReportInteractorRequest,
  getCustomCaseInventoryReportInteractor,
} from './getCustomCaseInventoryReportInteractor';
import { ROLES } from '../../entities/EntityConstants';
import { applicationContext } from '../../test/createTestApplicationContext';

describe('getCustomCaseInventoryReportInteractor', () => {
  let getCustomCaseInventoryRequest: GetCaseInventoryReportInteractorRequest;
  beforeEach(() => {
    getCustomCaseInventoryRequest = {
      caseStatuses: ['CAV'],
      caseTypes: ['Deficiency'],
      createEndDate: '2022-02-01T17:21:05.483Z',
      createStartDate: '2022-01-01T17:21:05.483Z',
      filingMethod: 'all',
    };
    applicationContext.getCurrentUser.mockReturnValue({
      role: ROLES.docketClerk,
      userId: '9754a349-1013-44fa-9e61-d39aba2637e0',
    });
  });

  describe('Validation', () => {
    it('throws an error if user is not authorized for case inventory report', async () => {
      applicationContext.getCurrentUser.mockReturnValue({
        role: ROLES.petitioner, //petitioner does not have CASE_INVENTORY_REPORT permission
        userId: '8e20dd1b-d142-40f4-8362-6297f1be68bf',
      });

      await expect(
        getCustomCaseInventoryReportInteractor(
          applicationContext,
          getCustomCaseInventoryRequest,
        ),
      ).rejects.toThrow('Unauthorized for case inventory report');
    });

    const testCases = [
      { missingField: 'createEndDate' },
      { missingField: 'createStartDate' },
      { missingField: 'filingMethod' },
      { missingField: 'caseStatuses' },
      { missingField: 'caseTypes' },
    ];

    testCases.forEach(testCase => {
      it(`throws an error if ${testCase.missingField} is not passed in`, async () => {
        delete getCustomCaseInventoryRequest[testCase.missingField];

        await expect(
          getCustomCaseInventoryReportInteractor(
            applicationContext,
            getCustomCaseInventoryRequest,
          ),
        ).rejects.toThrow(
          'Missing required params to run a Custom Case Inventory Report',
        );
      });
    });
  });

  it('should fetch cases from persistence with the user selected filters', async () => {
    applicationContext
      .getPersistenceGateway()
      .getCasesByFilters.mockResolvedValue({
        foundCases: [],
        totalCount: 0,
      });

    await getCustomCaseInventoryReportInteractor(
      applicationContext,
      getCustomCaseInventoryRequest,
    );

    expect(
      applicationContext.getPersistenceGateway().getCasesByFilters,
    ).toHaveBeenCalledWith({
      applicationContext: expect.anything(),
      getCustomCaseInventoryRequest,
    });
  });
});

import { MOCK_CASE } from '@shared/test/mockCase';
import { addEditPrimaryIssueModalHelper as addEditPrimaryIssueModalHelperComputed } from './addEditPrimaryIssueModalHelper';
import { applicationContextForClient as applicationContext } from '@shared/business/test/createTestApplicationContext';
import { runCompute } from '@web-client/presenter/test.cerebral';
import { withAppContextDecorator } from '../../../withAppContext';

describe('addEditPrimaryIssueModalHelper', () => {
  const addEditPrimaryIssueModalHelper = withAppContextDecorator(
    addEditPrimaryIssueModalHelperComputed,
  );

  it('should return the title of the modal, formatted to include the docket number and case title of the case the user is adding a primary issue to', () => {
    const { title } = runCompute(addEditPrimaryIssueModalHelper, {
      state: {
        judgeActivityReport: {
          judgeActivityReportData: {
            submittedAndCavCasesByJudge: [MOCK_CASE],
          },
        },
        modal: {
          docketNumber: MOCK_CASE.docketNumber,
        },
      },
    });

    expect(title).toBe(
      `Docket ${MOCK_CASE.docketNumber}: ${applicationContext.getCaseTitle(
        MOCK_CASE.caseCaption,
      )}`,
    );
  });
});

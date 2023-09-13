import { FORMATS } from '@shared/business/utilities/DateHandler';
import { state } from '@web-client/presenter/app.cerebral';

export const updateCaseWorksheetAction = async ({
  applicationContext,
  get,
  props,
}: ActionProps) => {
  const { docketNumber, finalBriefDueDate, primaryIssue, statusOfMatter } = get(
    state.form,
  );

  const updatedWorksheet = await applicationContext
    .getUseCases()
    .updateCaseWorksheetInteractor(applicationContext, {
      worksheet: {
        docketNumber,
        finalBriefDueDate,
        primaryIssue,
        statusOfMatter,
      },
    });

  return { updatedWorksheet };
};

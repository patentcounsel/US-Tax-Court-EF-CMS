import { compareCasesByDocketNumber } from '../../utilities/getFormattedTrialSessionDetails';
import { saveFileAndGenerateUrl } from '../../useCaseHelper/saveFileAndGenerateUrl';

export const generateTrialCalendarPdfInteractor = async (
  applicationContext: IApplicationContext,
  { trialSessionId }: { trialSessionId: string },
): Promise<{ fileId: string; url: string }> => {
  const trialSession = await applicationContext
    .getPersistenceGateway()
    .getTrialSessionById({
      applicationContext,
      trialSessionId,
    });

  const calendaredCases = await applicationContext
    .getPersistenceGateway()
    .getCalendaredCasesForTrialSession({
      applicationContext,
      trialSessionId,
    });

  const formattedTrialSession = applicationContext
    .getUtilities()
    .getFormattedTrialSessionDetails({
      applicationContext,
      trialSession: {
        ...trialSession,
        calendaredCases,
      },
    });

  const formattedOpenCases = formattedTrialSession.openCases;

  formattedTrialSession.caseOrder.forEach(aCase => {
    if (aCase.calendarNotes) {
      const caseToUpdate = formattedOpenCases.find(
        theCase => theCase.docketNumber === aCase.docketNumber,
      );
      if (caseToUpdate) {
        caseToUpdate.calendarNotes = aCase.calendarNotes;
      }
    }
  });

  const {
    formattedCourtReporter,
    formattedIrsCalendarAdministrator,
    formattedJudge,
    formattedStartDateFull,
    formattedStartTime,
    formattedTrialClerk,
  } = formattedTrialSession;

  const sessionDetail = {
    ...formattedTrialSession,
    courtReporter: formattedCourtReporter,
    irsCalendarAdministrator: formattedIrsCalendarAdministrator,
    judge: formattedJudge,
    startDate: formattedStartDateFull,
    startTime: formattedStartTime,
    trialClerk: formattedTrialClerk,
  };

  const file = await applicationContext.getDocumentGenerators().trialCalendar({
    applicationContext,
    data: {
      cases: formattedOpenCases,
      sessionDetail,
    },
  });

  return await saveFileAndGenerateUrl({
    applicationContext,
    file,
    useTempBucket: true,
  });
};

export const getPractitionerName = practitioner => {
  const { barNumber, name } = practitioner;
  const barNumberFormatted = barNumber ? ` (${barNumber})` : '';
  return `${name}${barNumberFormatted}`;
};

export const formatCases = ({ applicationContext, calendaredCases }) => {
  const formattedOpenCases = calendaredCases
    .filter(calendaredCase => !calendaredCase.removedFromTrial)
    .sort(compareCasesByDocketNumber)
    .map(openCase => {
      return {
        caseTitle: applicationContext.getCaseTitle(openCase.caseCaption || ''),
        docketNumber: openCase.docketNumber,
        docketNumberWithSuffix: openCase.docketNumberWithSuffix,
        petitionerCounsel: (openCase.privatePractitioners || []).map(
          getPractitionerName,
        ),
        respondentCounsel: (openCase.irsPractitioners || []).map(
          getPractitionerName,
        ),
      };
    });
  return formattedOpenCases;
};

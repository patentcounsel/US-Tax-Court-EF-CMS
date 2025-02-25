import { ClerkOfTheCourtSignature } from '../components/ClerkOfTheCourtSignature';
import { DocketHeader } from '../components/DocketHeader';
import { PROCEDURE_TYPES_MAP } from '../../../entities/EntityConstants';
import { PrimaryHeader } from '../components/PrimaryHeader';
import React from 'react';

export const NoticeOfChangeOfTrialJudge = ({
  caseCaptionExtension,
  caseTitle,
  docketNumberWithSuffix,
  trialInfo,
}) => {
  return (
    <div id="notice-of-change-of-trial-judge-pdf">
      <PrimaryHeader />
      <DocketHeader
        caseCaptionExtension={caseCaptionExtension}
        caseTitle={caseTitle}
        docketNumberWithSuffix={docketNumberWithSuffix}
        documentTitle="NOTICE OF CHANGE OF TRIAL JUDGE"
      />

      <div id="notice-body">
        <p className="indent-paragraph">
          The {trialInfo.trialLocationAndProceedingType} trial session scheduled
          to begin on {trialInfo.formattedStartDate}, has been reassigned from{' '}
          {trialInfo.priorJudgeTitleWithFullName} to{' '}
          {trialInfo.updatedJudgeTitleWithFullName}.{' '}
          {trialInfo.updatedJudgeTitleWithFullName}’s chambers are located at:
          United States Tax Court, 400 Second St., N.W., Washington, DC 20217, (
          {trialInfo.chambersPhoneNumber}). The Standing Pretrial Order{' '}
          {trialInfo.caseProcedureType === PROCEDURE_TYPES_MAP.small && (
            <span>for Small Tax Cases</span>
          )}{' '}
          and the Notice Setting Case for Trial for the{' '}
          {trialInfo.formattedStartDate}, {trialInfo.proceedingType} trial
          session remains in full force and effect.
        </p>

        <ClerkOfTheCourtSignature />
      </div>
    </div>
  );
};

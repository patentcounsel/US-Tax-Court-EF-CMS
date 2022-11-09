import { BindedSelect } from '../../ustc-ui/BindedSelect/BindedSelect';
import { Button } from '../../ustc-ui/Button/Button';
import { CaseLink } from '../../ustc-ui/CaseLink/CaseLink';
import { ConsolidatedCaseIcon } from '../../ustc-ui/Icon/ConsolidatedCaseIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextView } from '../../ustc-ui/Text/TextView';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

const getCaseRow = ({
  formattedCase,
  get,
  indentMemberCase = false,
  trialSequences,
  trialStatusOptions,
}) => {
  return (
    <React.Fragment className="hoverable" key={formattedCase.docketNumber}>
      <tr className="vertical-align-middle-row">
        <td className="consolidated-case-column">
          <div className={indentMemberCase ? 'margin-left-2' : ''}>
            <ConsolidatedCaseIcon caseItem={formattedCase} />
          </div>
        </td>
        <td>
          <div className={indentMemberCase ? 'margin-left-2' : ''}>
            <CaseLink formattedCase={formattedCase} />
          </div>
        </td>
        <td>
          {formattedCase.isManuallyAdded && (
            <span aria-label="manually added indicator">
              <FontAwesomeIcon className="mini-success" icon="calendar-plus" />
            </span>
          )}
        </td>
        <td className="minw-80">{formattedCase.caseTitle}</td>
        <td>
          {formattedCase.privatePractitioners.map(practitioner => (
            <div key={practitioner.userId}>{practitioner.name}</div>
          ))}
        </td>
        <td>
          {formattedCase.irsPractitioners.map(respondent => (
            <div key={respondent.userId}>{respondent.name}</div>
          ))}
        </td>
        <td className="minw-10">{formattedCase.filingPartiesCode}</td>
        <td className="minw-30">
          <BindedSelect
            aria-label="trial status"
            bind={`trialSessionWorkingCopy.caseMetadata.${formattedCase.docketNumber}.trialStatus`}
            id={`trialSessionWorkingCopy-${formattedCase.docketNumber}`}
            // onBlur={() => {
            //   trialSequences.toggleShowDeprecatedSequence();
            // }}
            onChange={value => {
              console.log('1');
              trialSequences.autoSaveTrialSessionWorkingCopySequence({
                key: `caseMetadata.${formattedCase.docketNumber}.trialStatus`,
                value,
              });
            }}
            // onToggle={() => {
            //   trialSequences.toggleShowDeprecatedSequence();
            // }}
          >
            <option value="">-Trial Status-</option>
            {Object.keys(trialStatusOptions).map(key => {
              // if (!allowDeprecated) {
              //   if (!trialStatusOptions[key].deprecated) {
              //     return (
              //       <option key={key} value={key}>
              //         {trialStatusOptions[key].label}
              //       </option>
              //     );
              //   }
              // } else {
              //   return (
              //     <option key={key} value={key}>
              //       {trialStatusOptions[key].label}
              //     </option>
              //   );
              // }
              // {
              //   console.log(
              //     // get(state.trialSessionWorkingCopy.caseMetadata[formattedCase.docketNumber].trialStatus
              //     'get(state.trialSessionWorkingCopy.caseMetadata[formattedCase.docketNumber].trialStatus',
              //     get(
              //       state.trialSessionWorkingCopy.caseMetadata[
              //         formattedCase.docketNumber
              //       ].trialStatus,
              //     ),
              //   );
              // }
              if (
                get(
                  state.trialSessionWorkingCopy.caseMetadata[
                    formattedCase.docketNumber
                  ].trialStatus,
                ) &&
                trialStatusOptions[
                  get(
                    state.trialSessionWorkingCopy.caseMetadata[
                      formattedCase.docketNumber
                    ].trialStatus,
                  )
                ].deprecated
              ) {
                console.log(
                  'get(state.trialSessionWorkingCopy.caseMetadata[formattedCase.docketNumber].trialStatus',
                  get(
                    state.trialSessionWorkingCopy.caseMetadata[
                      formattedCase.docketNumber
                    ].trialStatus,
                  ),
                );
                console.log('trialStatusOptions[key]', trialStatusOptions[key]);
                if (
                  !trialStatusOptions[key].deprecated ||
                  get(
                    state.trialSessionWorkingCopy.caseMetadata[
                      formattedCase.docketNumber
                    ].trialStatus,
                  ) === key
                ) {
                  return (
                    <option key={key} value={key}>
                      {trialStatusOptions[key].label}
                    </option>
                  );
                }
              } else if (!trialStatusOptions[key].deprecated) {
                return (
                  <option key={key} value={key}>
                    {trialStatusOptions[key].label}
                  </option>
                );
              }
            })}
          </BindedSelect>
        </td>
        <td className="no-wrap">
          {!formattedCase.userNotes && (
            <Button
              link
              className="margin-top-1"
              icon="plus-circle"
              id={`add-note-${formattedCase.docketNumber}`}
              onClick={() => {
                trialSequences.openAddEditUserCaseNoteModalFromListSequence({
                  docketNumber: formattedCase.docketNumber,
                  docketNumberWithSuffix: formattedCase.docketNumberWithSuffix,
                });
              }}
            >
              Add Note
            </Button>
          )}
        </td>
      </tr>
      {formattedCase.calendarNotes && (
        <tr className="notes-row">
          <td></td>
          <td></td>
          <td className="font-body-2xs" colSpan="5">
            <span className="text-bold margin-right-1">Calendar notes:</span>
            {formattedCase.calendarNotes}
          </td>
          <td></td>
        </tr>
      )}
      {formattedCase.userNotes && (
        <tr className="notes-row">
          <td></td>
          <td></td>
          <td className="font-body-2xs" colSpan="4">
            <span className="text-bold margin-right-1">Notes:</span>
            <TextView
              bind={`trialSessionWorkingCopy.userNotes.${formattedCase.docketNumber}.notes`}
            />
          </td>
          <td className="no-wrap text-align-right">
            <Button
              link
              className="red-warning"
              icon="trash"
              onClick={() => {
                trialSequences.openDeleteUserCaseNoteConfirmModalSequence({
                  docketNumber: formattedCase.docketNumber,
                });
              }}
            >
              Delete Note
            </Button>
          </td>

          <td className="no-wrap text-align-right">
            <Button
              link
              icon="edit"
              onClick={() => {
                trialSequences.openAddEditUserCaseNoteModalFromListSequence({
                  docketNumber: formattedCase.docketNumber,
                });
              }}
            >
              Edit Note
            </Button>
          </td>
        </tr>
      )}
      {formattedCase.consolidatedCases &&
        formattedCase.consolidatedCases.map(memberCase =>
          getCaseRow({
            formattedCase: memberCase,
            indentMemberCase: true,
            trialSequences,
            trialStatusOptions,
          }),
        )}
    </React.Fragment>
  );
};

export const CaseListRowTrialSession = connect(
  {
    // allowDeprecated: state.allowDeprecated,
    autoSaveTrialSessionWorkingCopySequence:
      sequences.autoSaveTrialSessionWorkingCopySequence,
    openAddEditUserCaseNoteModalFromListSequence:
      sequences.openAddEditUserCaseNoteModalFromListSequence,
    openDeleteUserCaseNoteConfirmModalSequence:
      sequences.openDeleteUserCaseNoteConfirmModalSequence,
    toggleShowDeprecatedSequence: sequences.toggleShowDeprecatedSequence,
    trialStatusOptions: state.trialSessionWorkingCopyHelper.trialStatusOptions,
  },
  ({
    // allowDeprecated,
    autoSaveTrialSessionWorkingCopySequence,
    formattedCase,
    get,
    openAddEditUserCaseNoteModalFromListSequence,
    openDeleteUserCaseNoteConfirmModalSequence,
    toggleShowDeprecatedSequence,
    trialStatusOptions,
  }) =>
    getCaseRow({
      // allowDeprecated,
      formattedCase,
      get,
      trialSequences: {
        autoSaveTrialSessionWorkingCopySequence,
        openAddEditUserCaseNoteModalFromListSequence,
        openDeleteUserCaseNoteConfirmModalSequence,
        toggleShowDeprecatedSequence,
      },
      trialStatusOptions,
    }),
);

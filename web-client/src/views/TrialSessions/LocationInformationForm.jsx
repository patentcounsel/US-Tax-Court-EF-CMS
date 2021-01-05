import { FormGroup } from '../../ustc-ui/FormGroup/FormGroup';
import { InPersonProceedingForm } from './InPersonProceedingForm';
import { RemoteProceedingForm } from './RemoteProceedingForm';
import { TrialCityOptions } from '../TrialCityOptions';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';

import React from 'react';

export const LocationInformationForm = connect(
  {
    TRIAL_SESSION_PROCEEDING_TYPES:
      state.constants.TRIAL_SESSION_PROCEEDING_TYPES,
    form: state.form,
    updateTrialSessionFormDataSequence:
      sequences.updateTrialSessionFormDataSequence,
    validateTrialSessionSequence: sequences.validateTrialSessionSequence,
    validationErrors: state.validationErrors,
  },
  function LocationInformationForm({
    form,
    TRIAL_SESSION_PROCEEDING_TYPES,
    updateTrialSessionFormDataSequence,
    validateTrialSessionSequence,
    validationErrors,
  }) {
    return (
      <>
        <h2 className="margin-top-4">Location Information</h2>
        <div className="blue-container">
          <FormGroup errorText={validationErrors.startTime}>
            <fieldset className="start-time usa-fieldset margin-bottom-0">
              <legend className="usa-legend" id="proceeding-type-legend">
                Proceeding type
              </legend>
              {Object.values(TRIAL_SESSION_PROCEEDING_TYPES).map(option => (
                <div className="usa-radio usa-radio__inline" key={option}>
                  <input
                    aria-describedby="proceeding-type-legend"
                    checked={form.proceedingType === option}
                    className="usa-radio__input"
                    id={`${option}-proceeding`}
                    name="proceedingType"
                    type="radio"
                    value={option}
                    onBlur={() => {
                      validateTrialSessionSequence();
                    }}
                    onChange={e => {
                      updateTrialSessionFormDataSequence({
                        key: e.target.name,
                        value: e.target.value,
                      });
                    }}
                  />
                  <label
                    aria-label={option}
                    className="usa-radio__label smaller-padding-right"
                    htmlFor={`${option}-proceeding`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </fieldset>
          </FormGroup>

          <FormGroup errorText={validationErrors.trialLocation}>
            <label className="usa-label" htmlFor="trial-location">
              Trial location
            </label>
            <select
              className="usa-select"
              id="trial-location"
              name="trialLocation"
              value={form.trialLocation}
              onChange={e => {
                updateTrialSessionFormDataSequence({
                  key: e.target.name,
                  value: e.target.value || null,
                });
                validateTrialSessionSequence();
              }}
            >
              <option value="">-- Select --</option>
              <TrialCityOptions />
            </select>
          </FormGroup>

          {form.proceedingType === TRIAL_SESSION_PROCEEDING_TYPES.inPerson && (
            <InPersonProceedingForm />
          )}
          {form.proceedingType === TRIAL_SESSION_PROCEEDING_TYPES.remote && (
            <RemoteProceedingForm />
          )}
        </div>
      </>
    );
  },
);

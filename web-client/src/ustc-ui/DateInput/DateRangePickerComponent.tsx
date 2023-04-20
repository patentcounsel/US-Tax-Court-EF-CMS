import { FormGroup } from '../FormGroup/FormGroup';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import datePicker from '../../../../node_modules/uswds/src/js/components/date-picker';
import dateRangePicker from '../../../../node_modules/uswds/src/js/components/date-range-picker';

export const DateRangePickerComponent = ({
  endDateErrorText,
  endLabel,
  endName,
  endPickerCls,
  endValue,
  formGroupCls,
  onChangeEnd,
  onChangeStart,
  onInputEnd,
  onInputStart,
  rangePickerCls,
  startDateErrorText,
  startLabel,
  startName,
  startPickerCls,
  startValue,
}: {
  endDateErrorText?: string;
  endLabel?: string;
  endName: string;
  endPickerCls?: string;
  endValue: string;
  formGroupCls?: string;
  rangePickerCls?: string;
  onChangeEnd: Function;
  onChangeStart: Function;
  onInputStart: Function;
  onInputEnd: Function;
  startDateErrorText?: string;
  startPickerCls?: string;
  startLabel?: string;
  startName: string;
  startValue: string;
}) => {
  const dateRangePickerRef = useRef();
  const startDatePickerRef = useRef();
  const endDatePickerRef = useRef();

  const startDateInputRef = useRef();
  const endDateInputRef = useRef();

  useEffect(() => {
    if (
      startDatePickerRef.current &&
      endDatePickerRef.current &&
      dateRangePickerRef.current
    ) {
      datePicker.on(startDatePickerRef.current);
      datePicker.on(endDatePickerRef.current);
      dateRangePicker.on(dateRangePickerRef.current);
    } else if (
      startDatePickerRef.current ||
      (endDatePickerRef.current && dateRangePickerRef.current)
    ) {
      datePicker.on(startDatePickerRef.current);
      datePicker.on(endDatePickerRef.current);
      dateRangePicker.on(dateRangePickerRef.current);
    }
  }, [dateRangePickerRef]);

  useEffect(() => {
    const startInput = window.document.getElementById(
      `${startName}-date-start`,
    );
    const startHiddenInput = window.document.querySelector(
      `input[name="${startName}-date-start"]`,
    );
    if (!startValue && startInput) {
      startInput.value = '';
      startHiddenInput.value = '';
      const backspaceEvent = new CustomEvent('change', {
        bubbles: true,
        cancelable: true,
        detail: { value: '' },
      });
      startInput.dispatchEvent(backspaceEvent);
      startHiddenInput.dispatchEvent(backspaceEvent);
    }
  }, [startValue]);

  useEffect(() => {
    const endInput = window.document.getElementById(`${endName}-date-end`);
    const endHiddenInput = window.document.querySelector(
      `input[name="${endName}-date-end"]`,
    );
    if (!endValue && endInput) {
      endInput.value = '';
      endHiddenInput.value = '';
      const backspaceEvent = new CustomEvent('change', {
        bubbles: true,
        cancelable: true,
        detail: { value: '' },
      });
      endInput.dispatchEvent(backspaceEvent);
      endHiddenInput.dispatchEvent(backspaceEvent);
    }
  }, [endValue]);

  useEffect(() => {
    if (startDateInputRef.current && endDateInputRef.current) {
      window.document
        .getElementById(`${endName}-date-end`)
        .addEventListener('change', onChangeEnd);
      window.document
        .getElementById(`${startName}-date-start`)
        .addEventListener('change', onChangeStart);
      window.document
        .getElementById(`${startName}-date-start`)
        .addEventListener('input', onInputStart);
      window.document
        .getElementById(`${endName}-date-end`)
        .addEventListener('input', onInputEnd);
    }
  }, [startDateInputRef, endDateInputRef]);

  return (
    <FormGroup className={formGroupCls} formGroupRef={dateRangePickerRef}>
      <div className={classNames('usa-date-range-picker', rangePickerCls)}>
        <div className={startPickerCls}>
          <FormGroup
            errorText={startDateErrorText}
            formGroupRef={startDatePickerRef}
          >
            <label
              className="usa-label"
              htmlFor={`${startName}-date-start`}
              id={`${startName}-date-start-label`}
            >
              {startLabel || 'Start date'}{' '}
            </label>
            <div className="usa-date-picker">
              <input
                aria-describedby={`${startName}-date-start-label ${startName}-date-start-hint`}
                className="usa-input"
                id={`${startName}-date-start`}
                name={`${startName}-date-start`}
                placeholder="MM/DD/YYYY"
                ref={startDateInputRef}
                type="text"
              />
            </div>
          </FormGroup>
        </div>

        <div className={endPickerCls}>
          <FormGroup
            errorText={endDateErrorText}
            formGroupRef={endDatePickerRef}
          >
            <label
              className="usa-label"
              htmlFor={`${endName}-date-end`}
              id={`${endName}-date-end-label`}
            >
              {endLabel || 'End date'}{' '}
            </label>
            <div className="usa-date-picker">
              <input
                aria-describedby={`${endName}-date-end-label ${endName}-date-end-hint`}
                className="usa-input"
                id={`${endName}-date-end`}
                name={`${endName}-date-end`}
                placeholder="MM/DD/YYYY"
                ref={endDateInputRef}
                type="text"
              />
            </div>
          </FormGroup>
        </div>
      </div>
    </FormGroup>
  );
};

DateRangePickerComponent.displayName = 'DateRangePickerComponent';

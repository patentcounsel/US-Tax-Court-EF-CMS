import { ConfirmModal } from '../../ustc-ui/Modal/ConfirmModal';
import { FormGroup } from '../../ustc-ui/FormGroup/FormGroup';
import { MessageModalAttachments } from './MessageModalAttachments';
import { connect } from '@web-client/presenter/shared.cerebral';
import { sequences } from '@web-client/presenter/app.cerebral';
import { state } from '@web-client/presenter/app.cerebral';
import React from 'react';

export const CreateMessageModalDialog = connect(
  {
    constants: state.constants,
    createMessageModalHelper: state.createMessageModalHelper,
    form: state.modal.form,
    messageModalHelper: state.messageModalHelper,
    showChambersSelect: state.modal.showChambersSelect,
    updateChambersInCreateMessageModalSequence:
      sequences.updateChambersInCreateMessageModalSequence,
    updateModalFormValueSequence: sequences.updateModalFormValueSequence,
    updateSectionInCreateMessageModalSequence:
      sequences.updateSectionInCreateMessageModalSequence,
    validateCreateMessageInModalSequence:
      sequences.validateCreateMessageInModalSequence,
    validationErrors: state.validationErrors,
  },
  function CreateMessageModalDialog({
    createMessageModalHelper,
    form,
    messageModalHelper,
    onConfirmSequence = 'createMessageSequence',
    showChambersSelect,
    title = 'Create Message',
    updateChambersInCreateMessageModalSequence,
    updateModalFormValueSequence,
    updateSectionInCreateMessageModalSequence,
    validateCreateMessageInModalSequence,
    validationErrors,
  }) {
    return (
      <ConfirmModal
        cancelLabel="Cancel"
        className="ustc-create-message-modal"
        confirmLabel="Send"
        preventCancelOnBlur={true}
        title={title}
        onCancelSequence="clearModalFormSequence"
        onConfirmSequence={onConfirmSequence}
      >
        <FormGroup
          errorText={!showChambersSelect && validationErrors.toSection}
        >
          <label className="usa-label" htmlFor="toSection">
            Select a section
          </label>

          <select
            className="usa-select"
            id="toSection"
            name="toSection"
            onChange={e => {
              updateSectionInCreateMessageModalSequence({
                key: e.target.name,
                value: e.target.value,
              });
              validateCreateMessageInModalSequence();
            }}
          >
            <option value="">- Select -</option>
            {messageModalHelper.sectionListWithoutSupervisorRole.map(
              section => (
                <option key={section} value={section}>
                  {messageModalHelper.sectionDisplay(section)}
                </option>
              ),
            )}
          </select>
        </FormGroup>

        {showChambersSelect && (
          <FormGroup
            errorText={validationErrors.toSection && 'Select a chamber'}
          >
            <label className="usa-label" htmlFor="chambers">
              Select chambers
            </label>
            <select
              className="usa-select"
              id="chambers"
              name="chambers"
              onChange={e => {
                updateChambersInCreateMessageModalSequence({
                  key: 'toSection',
                  value: e.target.value,
                });
                validateCreateMessageInModalSequence();
              }}
            >
              <option value="">- Select -</option>
              {messageModalHelper.chambersSections.map(section => (
                <option key={section} value={section}>
                  {messageModalHelper.chambersDisplay(section)}
                </option>
              ))}
            </select>
          </FormGroup>
        )}

        <FormGroup errorText={validationErrors.toUserId}>
          <label className="usa-label" htmlFor="toUserId">
            Select recipient
          </label>
          <select
            aria-disabled={!form.toSection ? 'true' : 'false'}
            className="usa-select"
            disabled={!form.toSection}
            id="toUserId"
            name="toUserId"
            onChange={e => {
              updateModalFormValueSequence({
                key: e.target.name,
                value: e.target.value,
              });
              validateCreateMessageInModalSequence();
            }}
          >
            <option value="">- Select -</option>
            {createMessageModalHelper.formattedUsers.map(user => (
              <option key={user.userId} value={user.userId}>
                {user.name}
              </option>
            ))}
          </select>
        </FormGroup>

        <FormGroup errorText={validationErrors.subject}>
          <label className="usa-label" htmlFor="subject">
            Subject line
          </label>
          <input
            className="usa-input"
            id="subject"
            maxLength="250"
            name="subject"
            type="text"
            value={form.subject || ''}
            onChange={e => {
              updateModalFormValueSequence({
                key: e.target.name,
                value: e.target.value,
              });
              validateCreateMessageInModalSequence();
            }}
          />
        </FormGroup>

        <FormGroup errorText={validationErrors.message}>
          <label className="usa-label" htmlFor="message">
            Add message
          </label>
          <textarea
            className="usa-textarea ustc-message-modal-text-area"
            id="message"
            name="message"
            onChange={e => {
              updateModalFormValueSequence({
                key: e.target.name,
                value: e.target.value,
              });
              validateCreateMessageInModalSequence();
            }}
          />
        </FormGroup>

        <MessageModalAttachments />
      </ConfirmModal>
    );
  },
);

CreateMessageModalDialog.displayName = 'CreateMessageModalDialog';

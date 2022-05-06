import { Button } from '../../ustc-ui/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';
import classNames from 'classnames';

export const MessagesSectionInbox = connect(
  {
    formattedMessages: state.formattedMessages.messages,
    sortSectionMessagesSequence: sequences.sortSectionMessagesSequence,
    tableSort: state.tableSort,
  },
  function MessagesSectionInbox({
    formattedMessages,
    sortSectionMessagesSequence,
    tableSort,
  }) {
    return (
      <>
        <table className="usa-table ustc-table subsection">
          <thead>
            <tr>
              <th aria-label="Docket Number" className="small" colSpan="2">
                {/* TODO: this should be put into a abstracted component */}
                <Button
                  link
                  className="sortable-header-button margin-right-0"
                  onClick={() => {
                    sortSectionMessagesSequence({
                      sortField: 'docketNumber',
                    });
                  }}
                >
                  <span
                    className={classNames(
                      'margin-right-105',
                      tableSort.sortField === 'docketNumber' && 'sortActive',
                    )}
                  >
                    Docket No.
                  </span>
                  {(tableSort.sortField === 'docketNumber' &&
                    tableSort.sortOrder === 'desc' && (
                      <FontAwesomeIcon
                        icon="caret-up"
                        title="in ascending order"
                      />
                    )) || (
                    <FontAwesomeIcon
                      icon="caret-down"
                      title="in descending order"
                    />
                  )}
                </Button>
              </th>

              <th className="small">Received</th>
              <th>Message</th>
              <th>Case Title</th>
              <th>Case Status</th>
              <th>To</th>
              <th>From</th>
              <th className="small">Section</th>
            </tr>
          </thead>
          {formattedMessages.map(message => {
            return (
              <tbody key={message.messageId}>
                <tr key={message.messageId}>
                  <td aria-hidden="true" className="focus-toggle" />
                  <td className="message-queue-row small">
                    {message.docketNumberWithSuffix}
                  </td>
                  <td className="message-queue-row small">
                    <span className="no-wrap">
                      {message.createdAtFormatted}
                    </span>
                  </td>
                  <td className="message-queue-row message-subject">
                    <div className="message-document-title">
                      <Button
                        link
                        className="padding-0"
                        href={message.messageDetailLink}
                      >
                        {message.subject}
                      </Button>
                    </div>
                    <div className="message-document-detail">
                      {message.message}
                    </div>
                  </td>
                  <td className="message-queue-row max-width-25">
                    {message.caseTitle}
                  </td>
                  <td className="message-queue-row">{message.caseStatus}</td>
                  <td className="message-queue-row to">{message.to}</td>
                  <td className="message-queue-row from">{message.from}</td>
                  <td className="message-queue-row small">
                    {message.fromSection}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        {formattedMessages.length === 0 && <div>There are no messages.</div>}
      </>
    );
  },
);

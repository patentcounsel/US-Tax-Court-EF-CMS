import {
  ALPHABETICALLY_ASCENDING,
  ALPHABETICALLY_DESCENDING,
  CHRONOLOGICALLY_ASCENDING,
  CHRONOLOGICALLY_DESCENDING,
} from './sortConstants';
import { ASCENDING, DESCENDING } from '../../presenter/presenterConstants';
import { Button } from '../../ustc-ui/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SortableColumnHeaderButton } from '../../ustc-ui/SortableColumnHeaderButton/SortableColumnHeaderButton';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const MessagesSectionOutbox = connect(
  {
    formattedMessages: state.formattedMessages.messages,
    showSortableHeaders: state.showSortableHeaders,
    sortSectionMessagesSequence: sequences.sortSectionMessagesSequence,
  },
  function MessagesSectionOutbox({
    formattedMessages,
    showSortableHeaders,
    sortSectionMessagesSequence,
  }) {
    const hasMessages = formattedMessages.length > 0;
    return (
      <>
        <table className="usa-table ustc-table subsection">
          <thead>
            <tr>
              <th aria-hidden="true" className="consolidated-case-column"></th>
              {showSortableHeaders && (
                <th aria-label="Docket Number" className="small" colSpan="2">
                  <SortableColumnHeaderButton
                    ascText={CHRONOLOGICALLY_ASCENDING}
                    defaultSort={DESCENDING}
                    descText={CHRONOLOGICALLY_DESCENDING}
                    hasRows={hasMessages}
                    sortField="docketNumber"
                    title="Docket No."
                    onClickSequence={sortSectionMessagesSequence}
                  />
                </th>
              )}
              {!showSortableHeaders && (
                <th aria-label="Docket Number" className="small" colSpan="2">
                  Docket No.
                </th>
              )}
              {showSortableHeaders && (
                <th className="small">
                  <SortableColumnHeaderButton
                    ascText={CHRONOLOGICALLY_ASCENDING}
                    defaultSort={DESCENDING}
                    descText={CHRONOLOGICALLY_DESCENDING}
                    hasRows={hasMessages}
                    sortField="createdAt"
                    title="Sent"
                    onClickSequence={sortSectionMessagesSequence}
                  />
                </th>
              )}
              {!showSortableHeaders && <th className="small">Sent</th>}
              {showSortableHeaders && (
                <th>
                  <SortableColumnHeaderButton
                    ascText={ALPHABETICALLY_ASCENDING}
                    defaultSort={ASCENDING}
                    descText={ALPHABETICALLY_DESCENDING}
                    hasRows={hasMessages}
                    sortField="subject"
                    title="Message"
                    onClickSequence={sortSectionMessagesSequence}
                  />
                </th>
              )}
              {!showSortableHeaders && <th>Message</th>}
              <th>Case Title</th>
              <th>Case Status</th>
              <th>To</th>
              <th>From</th>
              <th>Section</th>
            </tr>
          </thead>
          {formattedMessages.map(message => (
            <MessageOutboxRow
              caseStatus={message.caseStatus}
              caseTitle={message.caseTitle}
              createdAtFormatted={message.createdAtFormatted}
              docketNumberWithSuffix={message.docketNumberWithSuffix}
              from={message.from}
              key={message.messageId}
              message={message.message}
              messageDetailLink={message.messageDetailLink}
              messageId={message.messageId}
              subject={message.subject}
              to={message.to}
              toSection={message.toSection}
            />
          ))}
        </table>
        {!hasMessages && <div>There are no messages.</div>}
      </>
    );
  },
);

const MessageOutboxRow = React.memo(function MessageOutboxRow({
  caseStatus,
  caseTitle,
  createdAtFormatted,
  docketNumberWithSuffix,
  from,
  message,
  messageDetailLink,
  subject,
  to,
  toSection,
}) {
  return (
    <tbody>
      <tr>
        {/* what abt focus-toggle class */}
        <td className="consolidated-case-column">
          {message.inConsolidatedGroup && (
            <FontAwesomeIcon className="fa-icon-blue" icon="copy" />
          )}
        </td>
        <td className="message-queue-row small">{docketNumberWithSuffix}</td>
        <td className="message-queue-row small">
          <span className="no-wrap">{createdAtFormatted}</span>
        </td>
        <td className="message-queue-row message-subject">
          <div className="message-document-title">
            <Button link className="padding-0" href={messageDetailLink}>
              {subject}
            </Button>
          </div>

          <div className="message-document-detail">{message}</div>
        </td>
        <td className="message-queue-row max-width-25">{caseTitle}</td>
        <td className="message-queue-row">{caseStatus}</td>
        <td className="message-queue-row to">{to}</td>
        <td className="message-queue-row from">{from}</td>
        <td className="message-queue-row small">{toSection}</td>
      </tr>
    </tbody>
  );
});

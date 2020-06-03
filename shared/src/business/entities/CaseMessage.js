const joi = require('@hapi/joi');
const {
  joiValidationDecorator,
} = require('../../utilities/JoiValidationDecorator');
const { CHAMBERS_SECTIONS, SECTIONS } = require('./WorkQueue');
const { createISODateString } = require('../utilities/DateHandler');
const { getTimestampSchema } = require('../../utilities/dateSchema');
const joiStrictTimestamp = getTimestampSchema();

/**
 * constructor
 *
 * @param {object} rawMessage the raw message data
 * @constructor
 */
function CaseMessage(rawMessage, { applicationContext }) {
  if (!applicationContext) {
    throw new TypeError('applicationContext must be defined');
  }

  this.caseId = rawMessage.caseId;
  this.createdAt = rawMessage.createdAt || createISODateString();
  this.entityName = 'CaseMessage';
  this.from = rawMessage.from;
  this.fromSection = rawMessage.fromSection;
  this.fromUserId = rawMessage.fromUserId;
  this.message = rawMessage.message;
  this.messageId = rawMessage.messageId || applicationContext.getUniqueId();
  this.subject = rawMessage.subject;
  this.to = rawMessage.to;
  this.toSection = rawMessage.toSection;
  this.toUserId = rawMessage.toUserId;
}

CaseMessage.validationName = 'CaseMessage';

joiValidationDecorator(
  CaseMessage,
  joi.object().keys({
    caseId: joi
      .string()
      .uuid({
        version: ['uuidv4'],
      })
      .required()
      .description('ID of the case the message is attached to.'),
    createdAt: joiStrictTimestamp
      .required()
      .description('When the message was created.'),
    entityName: joi.string().valid('CaseMessage').required(),
    from: joi
      .string()
      .max(100)
      .required()
      .description('The name of the user who sent the message.'),
    fromSection: joi
      .string()
      .valid(...SECTIONS, ...CHAMBERS_SECTIONS)
      .required()
      .description('The section of the user who sent the message.'),
    fromUserId: joi
      .string()
      .uuid({
        version: ['uuidv4'],
      })
      .required()
      .description('The ID of the user who sent the message.'),
    message: joi.string().max(500).required().description('The message text.'),
    messageId: joi
      .string()
      .uuid({
        version: ['uuidv4'],
      })
      .required()
      .description(
        'A unique ID generated by the system to represent the message.',
      ),
    subject: joi
      .string()
      .max(100)
      .required()
      .description('The subject line of the message.'),
    to: joi
      .string()
      .max(100)
      .optional()
      .allow(null)
      .description('The name of the user who is the recipient of the message.'),
    toSection: joi
      .string()
      .valid(...SECTIONS, ...CHAMBERS_SECTIONS)
      .optional()
      .description(
        'The section of the user who is the recipient of the message.',
      ),
    toUserId: joi
      .string()
      .uuid({
        version: ['uuidv4'],
      })
      .optional()
      .allow(null)
      .description('The ID of the user who is the recipient of the message.'),
  }),
);

module.exports = { CaseMessage };

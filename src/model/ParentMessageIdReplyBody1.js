/*
 * dev-ef-cms
 * Documents API for U.S. Tax Court EF-CMS
 *
 * OpenAPI spec version: 2019-03-06T15:30:48Z
 * Contact: webmaster@ustaxcourt.gov
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.35
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from '../ApiClient';

/**
 * The ParentMessageIdReplyBody1 model module.
 * @module model/ParentMessageIdReplyBody1
 * @version 2019-03-06T15:30:48Z
 */
export class ParentMessageIdReplyBody1 {
  /**
   * Constructs a new <code>ParentMessageIdReplyBody1</code>.
   * @alias module:model/ParentMessageIdReplyBody1
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ParentMessageIdReplyBody1</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ParentMessageIdReplyBody1} obj Optional instance to populate.
   * @return {module:model/ParentMessageIdReplyBody1} The populated <code>ParentMessageIdReplyBody1</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ParentMessageIdReplyBody1();
      if (data.hasOwnProperty('attachments'))
        obj.attachments = ApiClient.convertToType(data['attachments'], Array);
      if (data.hasOwnProperty('docketNumber'))
        obj.docketNumber = ApiClient.convertToType(data['docketNumber'], 'String');
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('subject'))
        obj.subject = ApiClient.convertToType(data['subject'], 'String');
      if (data.hasOwnProperty('toSection'))
        obj.toSection = ApiClient.convertToType(data['toSection'], 'String');
      if (data.hasOwnProperty('toUserId'))
        obj.toUserId = ApiClient.convertToType(data['toUserId'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Array} attachments
 */
ParentMessageIdReplyBody1.prototype.attachments = undefined;

/**
 * @member {String} docketNumber
 */
ParentMessageIdReplyBody1.prototype.docketNumber = undefined;

/**
 * @member {String} message
 */
ParentMessageIdReplyBody1.prototype.message = undefined;

/**
 * @member {String} subject
 */
ParentMessageIdReplyBody1.prototype.subject = undefined;

/**
 * @member {String} toSection
 */
ParentMessageIdReplyBody1.prototype.toSection = undefined;

/**
 * @member {String} toUserId
 */
ParentMessageIdReplyBody1.prototype.toUserId = undefined;


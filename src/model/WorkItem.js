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
import {WorkItemDocument} from './WorkItemDocument';
import {WorkItemMessages} from './WorkItemMessages';

/**
 * The WorkItem model module.
 * @module model/WorkItem
 * @version 2019-03-06T15:30:48Z
 */
export class WorkItem {
  /**
   * Constructs a new <code>WorkItem</code>.
   * a workItem response
   * @alias module:model/WorkItem
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>WorkItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/WorkItem} obj Optional instance to populate.
   * @return {module:model/WorkItem} The populated <code>WorkItem</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new WorkItem();
      if (data.hasOwnProperty('createdAt'))
        obj.createdAt = ApiClient.convertToType(data['createdAt'], 'String');
      if (data.hasOwnProperty('assigneeName'))
        obj.assigneeName = ApiClient.convertToType(data['assigneeName'], 'String');
      if (data.hasOwnProperty('document'))
        obj.document = WorkItemDocument.constructFromObject(data['document']);
      if (data.hasOwnProperty('messages'))
        obj.messages = ApiClient.convertToType(data['messages'], [WorkItemMessages]);
      if (data.hasOwnProperty('workItemId'))
        obj.workItemId = ApiClient.convertToType(data['workItemId'], 'String');
      if (data.hasOwnProperty('assigneeId'))
        obj.assigneeId = ApiClient.convertToType(data['assigneeId'], 'String');
      if (data.hasOwnProperty('docketNumber'))
        obj.docketNumber = ApiClient.convertToType(data['docketNumber'], 'String');
      if (data.hasOwnProperty('sentBy'))
        obj.sentBy = ApiClient.convertToType(data['sentBy'], 'String');
      if (data.hasOwnProperty('updatedAt'))
        obj.updatedAt = ApiClient.convertToType(data['updatedAt'], 'String');
    }
    return obj;
  }
}

/**
 * date workItem created
 * @member {String} createdAt
 */
WorkItem.prototype.createdAt = undefined;

/**
 * the name of the user currently assigned the work item
 * @member {String} assigneeName
 */
WorkItem.prototype.assigneeName = undefined;

/**
 * @member {module:model/WorkItemDocument} document
 */
WorkItem.prototype.document = undefined;

/**
 * array of messages associated with the workitem
 * @member {Array.<module:model/WorkItemMessages>} messages
 */
WorkItem.prototype.messages = undefined;

/**
 * id of work item
 * @member {String} workItemId
 */
WorkItem.prototype.workItemId = undefined;

/**
 * id of user currently assigned the work item
 * @member {String} assigneeId
 */
WorkItem.prototype.assigneeId = undefined;

/**
 * date workItem created
 * @member {String} docketNumber
 */
WorkItem.prototype.docketNumber = undefined;

/**
 * the user or system function that generate or sent this original work item
 * @member {String} sentBy
 */
WorkItem.prototype.sentBy = undefined;

/**
 * date workItem created
 * @member {String} updatedAt
 */
WorkItem.prototype.updatedAt = undefined;


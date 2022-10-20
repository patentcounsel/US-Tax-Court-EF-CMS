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
 * The TrialSessionWorkingCopy model module.
 * @module model/TrialSessionWorkingCopy
 * @version 2019-03-06T15:30:48Z
 */
export class TrialSessionWorkingCopy {
  /**
   * Constructs a new <code>TrialSessionWorkingCopy</code>.
   * a trial session
   * @alias module:model/TrialSessionWorkingCopy
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>TrialSessionWorkingCopy</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TrialSessionWorkingCopy} obj Optional instance to populate.
   * @return {module:model/TrialSessionWorkingCopy} The populated <code>TrialSessionWorkingCopy</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new TrialSessionWorkingCopy();
      if (data.hasOwnProperty('sort'))
        obj.sort = ApiClient.convertToType(data['sort'], 'String');
      if (data.hasOwnProperty('sortOrder'))
        obj.sortOrder = ApiClient.convertToType(data['sortOrder'], 'String');
      if (data.hasOwnProperty('caseMetadata'))
        obj.caseMetadata = ApiClient.convertToType(data['caseMetadata'], Object);
      if (data.hasOwnProperty('filters'))
        obj.filters = ApiClient.convertToType(data['filters'], Object);
      if (data.hasOwnProperty('trialSessionId'))
        obj.trialSessionId = ApiClient.convertToType(data['trialSessionId'], 'String');
    }
    return obj;
  }
}

/**
 * field to sort the cases by
 * @member {String} sort
 */
TrialSessionWorkingCopy.prototype.sort = undefined;

/**
 * sort order
 * @member {String} sortOrder
 */
TrialSessionWorkingCopy.prototype.sortOrder = undefined;

/**
 * map of cases to trial statuses
 * @member {Object} caseMetadata
 */
TrialSessionWorkingCopy.prototype.caseMetadata = undefined;

/**
 * trial status filters with boolean values
 * @member {Object} filters
 */
TrialSessionWorkingCopy.prototype.filters = undefined;

/**
 * id of the trial session
 * @member {String} trialSessionId
 */
TrialSessionWorkingCopy.prototype.trialSessionId = undefined;


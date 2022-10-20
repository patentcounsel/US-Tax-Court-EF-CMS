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
 * The TrialSession model module.
 * @module model/TrialSession
 * @version 2019-03-06T15:30:48Z
 */
export class TrialSession {
  /**
   * Constructs a new <code>TrialSession</code>.
   * a trial session
   * @alias module:model/TrialSession
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>TrialSession</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TrialSession} obj Optional instance to populate.
   * @return {module:model/TrialSession} The populated <code>TrialSession</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new TrialSession();
      if (data.hasOwnProperty('createdAt'))
        obj.createdAt = ApiClient.convertToType(data['createdAt'], 'String');
      if (data.hasOwnProperty('sessionType'))
        obj.sessionType = ApiClient.convertToType(data['sessionType'], 'String');
      if (data.hasOwnProperty('maxCases'))
        obj.maxCases = ApiClient.convertToType(data['maxCases'], 'String');
      if (data.hasOwnProperty('startDate'))
        obj.startDate = ApiClient.convertToType(data['startDate'], 'String');
      if (data.hasOwnProperty('startTime'))
        obj.startTime = ApiClient.convertToType(data['startTime'], 'String');
      if (data.hasOwnProperty('trialLocation'))
        obj.trialLocation = ApiClient.convertToType(data['trialLocation'], 'String');
      if (data.hasOwnProperty('trialSessionId'))
        obj.trialSessionId = ApiClient.convertToType(data['trialSessionId'], 'String');
    }
    return obj;
  }
}

/**
 * date trial session created
 * @member {String} createdAt
 */
TrialSession.prototype.createdAt = undefined;

/**
 * type of the session
 * @member {String} sessionType
 */
TrialSession.prototype.sessionType = undefined;

/**
 * max number of cases on the session
 * @member {String} maxCases
 */
TrialSession.prototype.maxCases = undefined;

/**
 * start date of the session
 * @member {String} startDate
 */
TrialSession.prototype.startDate = undefined;

/**
 * start time of the session
 * @member {String} startTime
 */
TrialSession.prototype.startTime = undefined;

/**
 * location of the session
 * @member {String} trialLocation
 */
TrialSession.prototype.trialLocation = undefined;

/**
 * id of trial session
 * @member {String} trialSessionId
 */
TrialSession.prototype.trialSessionId = undefined;


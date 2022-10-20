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
import {HealthDynamo} from './HealthDynamo';
import {HealthS3} from './HealthS3';

/**
 * The Health model module.
 * @module model/Health
 * @version 2019-03-06T15:30:48Z
 */
export class Health {
  /**
   * Constructs a new <code>Health</code>.
   * @alias module:model/Health
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>Health</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Health} obj Optional instance to populate.
   * @return {module:model/Health} The populated <code>Health</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Health();
      if (data.hasOwnProperty('clamAV'))
        obj.clamAV = ApiClient.convertToType(data['clamAV'], 'Boolean');
      if (data.hasOwnProperty('cognito'))
        obj.cognito = ApiClient.convertToType(data['cognito'], 'Boolean');
      if (data.hasOwnProperty('dynamo'))
        obj.dynamo = HealthDynamo.constructFromObject(data['dynamo']);
      if (data.hasOwnProperty('dynamsoft'))
        obj.dynamsoft = ApiClient.convertToType(data['dynamsoft'], 'Boolean');
      if (data.hasOwnProperty('elasticsearch'))
        obj.elasticsearch = ApiClient.convertToType(data['elasticsearch'], 'Boolean');
      if (data.hasOwnProperty('emailService'))
        obj.emailService = ApiClient.convertToType(data['emailService'], 'Boolean');
      if (data.hasOwnProperty('s3'))
        obj.s3 = HealthS3.constructFromObject(data['s3']);
    }
    return obj;
  }
}

/**
 * the status of clamav
 * @member {Boolean} clamAV
 */
Health.prototype.clamAV = undefined;

/**
 * the status of cognito ui
 * @member {Boolean} cognito
 */
Health.prototype.cognito = undefined;

/**
 * @member {module:model/HealthDynamo} dynamo
 */
Health.prototype.dynamo = undefined;

/**
 * the status of static hosted dynamsoft files
 * @member {Boolean} dynamsoft
 */
Health.prototype.dynamsoft = undefined;

/**
 * the status of elasticsearch
 * @member {Boolean} elasticsearch
 */
Health.prototype.elasticsearch = undefined;

/**
 * the status of ses
 * @member {Boolean} emailService
 */
Health.prototype.emailService = undefined;

/**
 * @member {module:model/HealthS3} s3
 */
Health.prototype.s3 = undefined;


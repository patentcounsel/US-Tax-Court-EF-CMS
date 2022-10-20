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
 * The CasePetitioners model module.
 * @module model/CasePetitioners
 * @version 2019-03-06T15:30:48Z
 */
export class CasePetitioners {
  /**
   * Constructs a new <code>CasePetitioners</code>.
   * @alias module:model/CasePetitioners
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CasePetitioners</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CasePetitioners} obj Optional instance to populate.
   * @return {module:model/CasePetitioners} The populated <code>CasePetitioners</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CasePetitioners();
      if (data.hasOwnProperty('userId'))
        obj.userId = ApiClient.convertToType(data['userId'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} userId
 */
CasePetitioners.prototype.userId = undefined;


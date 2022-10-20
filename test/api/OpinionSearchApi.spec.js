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
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.DevEfCms);
  }
}(this, function(expect, DevEfCms) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new DevEfCms.OpinionSearchApi();
  });

  describe('(package)', function() {
    describe('OpinionSearchApi', function() {
      describe('publicApiOpinionSearchGet', function() {
        it('should call publicApiOpinionSearchGet successfully', function(done) {
          // TODO: uncomment publicApiOpinionSearchGet call and complete the assertions
          /*

          instance.publicApiOpinionSearchGet(function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.Document);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
    });
  });

}));

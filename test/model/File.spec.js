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

  describe('(package)', function() {
    describe('File', function() {
      beforeEach(function() {
        instance = new DevEfCms.File();
      });

      it('should create an instance of File', function() {
        // TODO: update the code to test File
        expect(instance).to.be.a(DevEfCms.File);
      });

      it('should have the property fileId (base name: "fileId")', function() {
        // TODO: update the code to test the property fileId
        expect(instance).to.have.property('fileId');
        // expect(instance.fileId).to.be(expectedValueLiteral);
      });

      it('should have the property url (base name: "url")', function() {
        // TODO: update the code to test the property url
        expect(instance).to.have.property('url');
        // expect(instance.url).to.be(expectedValueLiteral);
      });

    });
  });

}));

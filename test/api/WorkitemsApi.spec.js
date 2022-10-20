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
    instance = new DevEfCms.WorkitemsApi();
  });

  describe('(package)', function() {
    describe('WorkitemsApi', function() {
      describe('apiNotificationsGet', function() {
        it('should call apiNotificationsGet successfully', function(done) {
          // TODO: uncomment apiNotificationsGet call and complete the assertions
          /*

          instance.apiNotificationsGet(function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.Notifications);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('caseDocumentsDocketNumberDocketEntryIdCoversheetPost', function() {
        it('should call caseDocumentsDocketNumberDocketEntryIdCoversheetPost successfully', function(done) {
          // TODO: uncomment, update parameter values for caseDocumentsDocketNumberDocketEntryIdCoversheetPost call
          /*

          instance.caseDocumentsDocketNumberDocketEntryIdCoversheetPost(docketNumber, docketEntryId, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('caseDocumentsDocketNumberDocketEntryIdWorkItemsPost', function() {
        it('should call caseDocumentsDocketNumberDocketEntryIdWorkItemsPost successfully', function(done) {
          // TODO: uncomment, update parameter values for caseDocumentsDocketNumberDocketEntryIdWorkItemsPost call and complete the assertions
          /*

          instance.caseDocumentsDocketNumberDocketEntryIdWorkItemsPost(docketNumber, docketEntryId, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.WorkItem);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('sectionsSectionDocumentQcInboxGet', function() {
        it('should call sectionsSectionDocumentQcInboxGet successfully', function(done) {
          // TODO: uncomment, update parameter values for sectionsSectionDocumentQcInboxGet call and complete the assertions
          /*
          var opts = {};

          instance.sectionsSectionDocumentQcInboxGet(section, opts, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.WorkItem);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('sectionsSectionDocumentQcServedGet', function() {
        it('should call sectionsSectionDocumentQcServedGet successfully', function(done) {
          // TODO: uncomment, update parameter values for sectionsSectionDocumentQcServedGet call and complete the assertions
          /*

          instance.sectionsSectionDocumentQcServedGet(section, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.WorkItem);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('sectionsSectionUsersGet', function() {
        it('should call sectionsSectionUsersGet successfully', function(done) {
          // TODO: uncomment, update parameter values for sectionsSectionUsersGet call and complete the assertions
          /*

          instance.sectionsSectionUsersGet(section, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.User);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('usersInternalGet', function() {
        it('should call usersInternalGet successfully', function(done) {
          // TODO: uncomment usersInternalGet call and complete the assertions
          /*

          instance.usersInternalGet(function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.User);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('usersUserIdDocumentQcInboxGet', function() {
        it('should call usersUserIdDocumentQcInboxGet successfully', function(done) {
          // TODO: uncomment, update parameter values for usersUserIdDocumentQcInboxGet call and complete the assertions
          /*

          instance.usersUserIdDocumentQcInboxGet(userId, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.WorkItem);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('usersUserIdDocumentQcServedGet', function() {
        it('should call usersUserIdDocumentQcServedGet successfully', function(done) {
          // TODO: uncomment, update parameter values for usersUserIdDocumentQcServedGet call and complete the assertions
          /*

          instance.usersUserIdDocumentQcServedGet(userId, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.WorkItem);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('workItemsPut', function() {
        it('should call workItemsPut successfully', function(done) {
          // TODO: uncomment workItemsPut call and complete the assertions
          /*

          instance.workItemsPut(function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.WorkItem);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('workItemsWorkItemIdAssigneePut', function() {
        it('should call workItemsWorkItemIdAssigneePut successfully', function(done) {
          // TODO: uncomment, update parameter values for workItemsWorkItemIdAssigneePut call and complete the assertions
          /*

          instance.workItemsWorkItemIdAssigneePut(workItemId, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.WorkItem);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('workItemsWorkItemIdCompletePut', function() {
        it('should call workItemsWorkItemIdCompletePut successfully', function(done) {
          // TODO: uncomment, update parameter values for workItemsWorkItemIdCompletePut call and complete the assertions
          /*

          instance.workItemsWorkItemIdCompletePut(workItemId, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.WorkItem);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('workItemsWorkItemIdGet', function() {
        it('should call workItemsWorkItemIdGet successfully', function(done) {
          // TODO: uncomment, update parameter values for workItemsWorkItemIdGet call and complete the assertions
          /*

          instance.workItemsWorkItemIdGet(workItemId, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.WorkItem);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('workItemsWorkItemIdPut', function() {
        it('should call workItemsWorkItemIdPut successfully', function(done) {
          // TODO: uncomment, update parameter values for workItemsWorkItemIdPut call and complete the assertions
          /*

          instance.workItemsWorkItemIdPut(workItemId, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.WorkItem);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('workItemsWorkItemIdReadPost', function() {
        it('should call workItemsWorkItemIdReadPost successfully', function(done) {
          // TODO: uncomment, update parameter values for workItemsWorkItemIdReadPost call and complete the assertions
          /*

          instance.workItemsWorkItemIdReadPost(workItemId, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(DevEfCms.WorkItem);

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

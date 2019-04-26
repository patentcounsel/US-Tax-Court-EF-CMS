const sinon = require('sinon');
const {
  submitCaseAssociationRequest,
} = require('./submitCaseAssociationRequestInteractor');

describe('submitCaseAssociationRequest', () => {
  let applicationContext;

  let caseRecord = {
    caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
  };

  it('should throw when not authorized', async () => {
    let error;
    try {
      applicationContext = {
        environment: { stage: 'local' },
        getCurrentUser: () => {
          return {
            name: 'Olivia Jade',
            role: 'seniorattorney',
            userId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
          };
        },
        getPersistenceGateway: () => ({
          createMappingRecord: async () => caseRecord,
        }),
      };
      await submitCaseAssociationRequest({
        applicationContext,
        documentMetadata: {
          caseId: caseRecord.caseId,
          documentType: 'Memorandum in Support',
        },
        primaryDocumentFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      });
    } catch (err) {
      error = err;
    }
    expect(error.message).toContain('Unauthorized');
  });

  it('should add mapping', async () => {
    let createMappingRecordSpy = sinon.spy();

    applicationContext = {
      environment: { stage: 'local' },
      getCurrentUser: () => {
        return {
          name: 'Olivia Jade',
          role: 'practitioner',
          userId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
        };
      },
      getPersistenceGateway: () => ({
        createMappingRecord: createMappingRecordSpy,
      }),
    };

    await submitCaseAssociationRequest({
      applicationContext,
      documentMetadata: {
        caseId: caseRecord.caseId,
      },
      primaryDocumentFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    });

    expect(createMappingRecordSpy.called).toEqual(true);
  });
});

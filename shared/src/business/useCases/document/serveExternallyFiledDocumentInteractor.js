const {
  aggregatePartiesForService,
} = require('../../utilities/aggregatePartiesForService');
const {
  isAuthorized,
  ROLE_PERMISSIONS,
} = require('../../../authorization/authorizationClientService');
const { addCoverToPdf } = require('../addCoversheetInteractor');
const { ALLOWLIST_FEATURE_FLAGS } = require('../../entities/EntityConstants');
const { Case } = require('../../entities/cases/Case');
const { DocketEntry } = require('../../entities/DocketEntry');
const { UnauthorizedError } = require('../../../errors/errors');

/**
 * serveExternallyFiledDocumentInteractor
 *
 * @param {object} applicationContext the application context
 * @param {object} providers the providers object
 * @param {string} providers.consolidatedGroupDocketNumbers the consolidated group's docket numbers
 * @param {string} providers.docketNumber the docket number of the case containing the document to serve
 * @param {string} providers.docketEntryId the id of the docket entry to serve
 * @returns {object} the paper service pdf url
 */
exports.serveExternallyFiledDocumentInteractor = async (
  applicationContext,
  { consolidatedGroupDocketNumbers, docketEntryId, docketNumber },
) => {
  const authorizedUser = applicationContext.getCurrentUser();

  if (!isAuthorized(authorizedUser, ROLE_PERMISSIONS.SERVE_DOCUMENT)) {
    throw new UnauthorizedError('Unauthorized');
  }

  const user = await applicationContext
    .getPersistenceGateway()
    .getUserById({ applicationContext, userId: authorizedUser.userId });

  const isCaseConsolidationFeatureOn = await applicationContext
    .getUseCases()
    .getFeatureFlagValueInteractor(applicationContext, {
      featureFlag:
        ALLOWLIST_FEATURE_FLAGS.CONSOLIDATED_CASES_PROPAGATE_DOCKET_ENTRIES.key,
    });

  if (!isCaseConsolidationFeatureOn) {
    consolidatedGroupDocketNumbers = [docketNumber];
  }

  const caseToUpdate = await applicationContext
    .getPersistenceGateway()
    .getCaseByDocketNumber({
      applicationContext,
      docketNumber,
    });
  const caseEntity = new Case(caseToUpdate, { applicationContext });

  let currentDocketEntry = caseEntity.getDocketEntryById({
    docketEntryId,
  });

  if (currentDocketEntry.isPendingService) {
    throw new Error('Docket entry is already being served');
  } else {
    await applicationContext
      .getPersistenceGateway()
      .updateDocketEntryPendingServiceStatus({
        applicationContext,
        docketEntryId: currentDocketEntry.docketEntryId,
        docketNumber: caseToUpdate.docketNumber,
        status: true,
      });
  }

  try {
    const servedParties = aggregatePartiesForService(caseEntity);

    let caseEntities = [];

    //TODO sorry for ugly
    for (let docketNo of consolidatedGroupDocketNumbers) {
      const aCase = await applicationContext
        .getPersistenceGateway()
        .getCaseByDocketNumber({
          applicationContext,
          docketNumber: docketNo,
        });

      let aCaseEntity = new Case(aCase, { applicationContext });
      caseEntities.push(aCaseEntity);
    }

    let filedByFromLeadCase;
    let serviceResults;

    const filedDocumentPromises = caseEntities.map(async rawCase => {
      if (rawCase.docketNumber === rawCase.leadDocketNumber) {
        currentDocketEntry.setAsServed(servedParties.all).validate();
        currentDocketEntry.setAsProcessingStatusAsCompleted();
        filedByFromLeadCase = currentDocketEntry.filedBy;

        caseEntity.updateDocketEntry(currentDocketEntry);
      } else {
        // add a new docket entry rather than update it
        currentDocketEntry = new DocketEntry(
          {
            ...currentDocketEntry,
            docketEntryId: applicationContext.getUniqueId(),
          },
          { applicationContext },
        );

        caseEntity.addDocketEntry(currentDocketEntry);
      }

      if (filedByFromLeadCase) {
        currentDocketEntry.filedBy = filedByFromLeadCase;
      }

      const { Body: pdfData } = await applicationContext
        .getStorageClient()
        .getObject({
          Bucket: applicationContext.environment.documentsBucketName,
          Key: docketEntryId,
        })
        .promise();

      const { pdfData: servedDocWithCover } = await addCoverToPdf({
        applicationContext,
        caseEntity,
        docketEntryEntity: currentDocketEntry,
        pdfData,
      });

      await applicationContext.getPersistenceGateway().saveDocumentFromLambda({
        applicationContext,
        document: servedDocWithCover,
        key: docketEntryId,
      });

      const workItemToUpdate = currentDocketEntry.workItem;

      if (workItemToUpdate) {
        workItemToUpdate.setAsCompleted({
          message: 'completed',
          user,
        });

        workItemToUpdate.assignToUser({
          assigneeId: user.userId,
          assigneeName: user.name,
          section: user.section,
          sentBy: user.name,
          sentBySection: user.section,
          sentByUserId: user.userId,
        });

        await applicationContext
          .getPersistenceGateway()
          .saveWorkItemForDocketClerkFilingExternalDocument({
            applicationContext,
            workItem: workItemToUpdate.validate().toRawObject(),
          });
      }

      await applicationContext.getUseCaseHelpers().updateCaseAndAssociations({
        applicationContext,
        caseToUpdate: caseEntity,
      });

      serviceResults = await applicationContext
        .getUseCaseHelpers()
        .serveDocumentAndGetPaperServicePdf({
          applicationContext,
          caseEntities,
          docketEntryId: currentDocketEntry.docketEntryId,
        });

      await applicationContext
        .getPersistenceGateway()
        .updateDocketEntryPendingServiceStatus({
          applicationContext,
          docketEntryId: currentDocketEntry.docketEntryId,
          docketNumber: caseToUpdate.docketNumber,
          status: false,
        });
    });

    caseEntities = await Promise.all(filedDocumentPromises);

    console.log('21234234caseEntities', caseEntities);

    return serviceResults;
  } catch (e) {
    await applicationContext
      .getPersistenceGateway()
      .updateDocketEntryPendingServiceStatus({
        applicationContext,
        docketEntryId: currentDocketEntry.docketEntryId,
        docketNumber: caseToUpdate.docketNumber,
        status: false,
      });

    throw e;
  }
};

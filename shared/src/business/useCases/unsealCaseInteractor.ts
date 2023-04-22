import { Case } from '../entities/cases/Case';
import {
  ROLE_PERMISSIONS,
  isAuthorized,
} from '../../authorization/authorizationClientService';
import {
  ServiceUnavailableError,
  UnauthorizedError,
} from '../../errors/errors';
import { withLocking } from '../useCaseHelper/acquireLock';

/**
 * unsealCase
 *
 * @param {object} applicationContext the application context
 * @param {object} providers the providers object
 * @param {string} providers.docketNumber the docket number of the case to update
 * @returns {Promise<object>} the updated case data
 */
export const unsealCase = async (
  applicationContext: IApplicationContext,
  { docketNumber }: { docketNumber: string },
) => {
  const user = applicationContext.getCurrentUser();

  if (!isAuthorized(user, ROLE_PERMISSIONS.UNSEAL_CASE)) {
    throw new UnauthorizedError('Unauthorized for unsealing cases');
  }

  const oldCase = await applicationContext
    .getPersistenceGateway()
    .getCaseByDocketNumber({ applicationContext, docketNumber });

  const newCase = new Case(oldCase, { applicationContext });

  newCase.setAsUnsealed();

  const updatedCase = await applicationContext
    .getUseCaseHelpers()
    .updateCaseAndAssociations({
      applicationContext,
      caseToUpdate: newCase,
    });

  return new Case(updatedCase, { applicationContext }).validate().toRawObject();
};

export const unsealCaseInteractor = withLocking(
  unsealCase,
  (_applicationContext, { docketNumber }) => ({
    identifier: docketNumber,
    prefix: 'case',
  }),
  new ServiceUnavailableError('The case is currently being updated'),
);

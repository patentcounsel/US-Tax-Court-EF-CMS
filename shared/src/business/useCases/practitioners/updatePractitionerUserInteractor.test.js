const {
  applicationContext,
} = require('../../test/createTestApplicationContext');
const {
  updatePractitionerUserInteractor,
} = require('./updatePractitionerUserInteractor');
const { UnauthorizedError } = require('../../../errors/errors');
const { User } = require('../../entities/User');

const mockUser = {
  admissionsDate: '2019-03-01T21:40:46.415Z',
  admissionsStatus: 'Active',
  barNumber: 'AB1111',
  birthYear: 2019,
  email: 'ab@example.com',
  employer: 'Private',
  firmName: 'GW Law Offices',
  firstName: 'Test',
  lastName: 'Attorney',
  name: 'Test Attorney',
  originalBarState: 'Oklahoma',
  practitionerType: 'Attorney',
  role: User.ROLES.privatePractitioner,
  userId: 'practitioner1@example.com',
};

describe('update practitioner user', () => {
  let testUser;

  beforeEach(() => {
    testUser = {
      role: 'admissionsclerk',
      userId: 'admissionsclerk',
    };

    applicationContext.environment.stage = 'local';
    applicationContext.getCurrentUser.mockImplementation(() => testUser);
    applicationContext
      .getPersistenceGateway()
      .updatePractitionerUser.mockResolvedValue(mockUser);
    applicationContext
      .getPersistenceGateway()
      .getUserById.mockResolvedValue(mockUser);
    applicationContext
      .getPersistenceGateway()
      .getCasesByUser.mockResolvedValue([]);
  });

  it('updates the practitioner user and overrides a bar number or email passed in with the old user data', async () => {
    const updatedUser = await updatePractitionerUserInteractor({
      applicationContext,
      user: { ...mockUser, barNumber: 'AB2222', email: 'bc@example.com' },
    });
    expect(updatedUser).toBeDefined();
    expect(
      applicationContext.getPersistenceGateway().updatePractitionerUser,
    ).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway().updatePractitionerUser.mock
        .calls[0][0],
    ).toMatchObject({ user: mockUser });
  });

  it('throws unauthorized for a non-internal user', async () => {
    testUser = {
      role: User.ROLES.petitioner,
      userId: 'petitioner',
    };

    await expect(
      updatePractitionerUserInteractor({
        applicationContext,
        user: mockUser,
      }),
    ).rejects.toThrow(UnauthorizedError);
  });
});

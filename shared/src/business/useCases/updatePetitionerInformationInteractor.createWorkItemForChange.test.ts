import {
  CASE_STATUS_TYPES,
  CONTACT_TYPES,
  PARTY_TYPES,
  SERVICE_INDICATOR_TYPES,
} from '../entities/EntityConstants';
import { MOCK_CASE } from '../../test/mockCase';
import { MOCK_PRACTITIONER, docketClerkUser } from '../../test/mockUsers';
import { User } from '../entities/User';
import { UserCase } from '../entities/UserCase';
import { applicationContext } from '../test/createTestApplicationContext';
import { updatePetitionerInformationInteractor } from './updatePetitionerInformationInteractor';
jest.mock('./addCoverToPdf');
import { addCoverToPdf } from './addCoverToPdf';

describe('updatePetitionerInformationInteractor createWorkItemForChange', () => {
  let mockUser;
  let mockCase;
  const PRIMARY_CONTACT_ID = MOCK_CASE.petitioners[0].contactId;

  const mockPetitioners = [
    {
      ...MOCK_CASE.petitioners[0],
      contactType: CONTACT_TYPES.petitioner,
      name: 'Test Primary Petitioner',
    },
    {
      ...MOCK_CASE.petitioners[0],
      contactId: '56387318-0092-49a3-8cc1-921b0432bd16',
      contactType: CONTACT_TYPES.petitioner,
      name: 'Test Secondary Petitioner',
    },
  ];

  const basePractitioner = {
    ...MOCK_PRACTITIONER,
    representing: [mockPetitioners[0].contactId],
  };

  beforeAll(() => {
    (addCoverToPdf as jest.Mock).mockResolvedValue({});

    applicationContext.getCurrentUser.mockImplementation(
      () => new User(mockUser),
    );

    applicationContext
      .getUseCaseHelpers()
      .addExistingUserToCase.mockImplementation(({ caseEntity }) => caseEntity);

    applicationContext
      .getUseCaseHelpers()
      .createUserForContact.mockImplementation(() => new UserCase(mockCase));
  });

  beforeEach(() => {
    mockUser = docketClerkUser;

    mockCase = {
      ...MOCK_CASE,
      petitioners: mockPetitioners,
      privatePractitioners: [],
      status: CASE_STATUS_TYPES.generalDocket,
    };

    applicationContext
      .getPersistenceGateway()
      .getCaseByDocketNumber.mockImplementation(() => mockCase);
  });

  it('should create a work item for the NCA when the petitioner is unrepresented', async () => {
    mockCase = {
      ...mockCase,
      partyType: PARTY_TYPES.petitioner,
      petitioners: [mockPetitioners[0]],
      privatePractitioners: [
        {
          ...basePractitioner,
          representing: ['6c5b79e0-2429-4ebc-8e9c-483d0282d4e0'],
        },
      ],
    };

    await updatePetitionerInformationInteractor(applicationContext, {
      docketNumber: MOCK_CASE.docketNumber,
      updatedPetitionerData: {
        ...mockPetitioners[0],
        address1: 'A Changed Street',
      },
    });

    expect(
      applicationContext.getPersistenceGateway().updateDocketEntry.mock
        .calls[0][0].document,
    ).toMatchObject({
      additionalInfo: 'for Test Primary Petitioner',
      eventCode: 'NCA',
      workItem: expect.anything(),
    });

    expect(
      applicationContext.getPersistenceGateway().saveWorkItem,
    ).toHaveBeenCalled();
  });

  it('should NOT create a work item for the NCA when the petitioner is represented and their service preference is NOT paper', async () => {
    mockCase = {
      ...mockCase,
      partyType: PARTY_TYPES.petitioner,
      petitioners: [mockPetitioners[0]],
      privatePractitioners: [
        { ...basePractitioner, representing: [PRIMARY_CONTACT_ID] },
      ],
    };

    await updatePetitionerInformationInteractor(applicationContext, {
      docketNumber: MOCK_CASE.docketNumber,
      updatedPetitionerData: {
        ...mockPetitioners[0],
        address1: 'A Changed Street',
      },
    });

    expect(
      applicationContext.getPersistenceGateway().updateDocketEntry.mock
        .calls[0][0].document,
    ).toMatchObject({
      additionalInfo: 'for Test Primary Petitioner',
      eventCode: 'NCA',
      workItem: undefined,
    });

    expect(
      applicationContext.getPersistenceGateway().saveWorkItem,
    ).not.toHaveBeenCalled();
  });

  it('should create a work item for the NCA when the petitioner is represented and their service preference is paper', async () => {
    mockCase = {
      ...mockCase,
      partyType: PARTY_TYPES.petitioner,
      petitioners: [mockPetitioners[0]],
      privatePractitioners: [
        { ...basePractitioner, representing: [PRIMARY_CONTACT_ID] },
      ],
    };

    await updatePetitionerInformationInteractor(applicationContext, {
      docketNumber: MOCK_CASE.docketNumber,
      updatedPetitionerData: {
        ...mockPetitioners[0],
        address1: 'A Changed Street',
        serviceIndicator: SERVICE_INDICATOR_TYPES.SI_PAPER,
      },
    });

    expect(
      applicationContext.getPersistenceGateway().updateDocketEntry.mock
        .calls[0][0].document,
    ).toMatchObject({
      additionalInfo: 'for Test Primary Petitioner',
      eventCode: 'NCA',
      workItem: expect.anything(),
    });

    expect(
      applicationContext.getPersistenceGateway().saveWorkItem,
    ).toHaveBeenCalled();
  });

  it('should create a work item for the NCA when the petitioner is represented and a private practitioner on the case requests paper service', async () => {
    mockCase = {
      ...mockCase,
      privatePractitioners: [
        {
          ...basePractitioner,
          representing: [PRIMARY_CONTACT_ID],
          serviceIndicator: SERVICE_INDICATOR_TYPES.SI_PAPER,
        },
      ],
    };

    await updatePetitionerInformationInteractor(applicationContext, {
      docketNumber: MOCK_CASE.docketNumber,
      updatedPetitionerData: {
        ...mockPetitioners[1],
        address1: 'A Changed Street',
      },
    });

    expect(
      applicationContext.getPersistenceGateway().updateDocketEntry.mock
        .calls[0][0].document,
    ).toMatchObject({
      additionalInfo: 'for Test Secondary Petitioner',
      eventCode: 'NCA',
      workItem: expect.anything(),
    });

    expect(
      applicationContext.getPersistenceGateway().saveWorkItem,
    ).toHaveBeenCalled();
  });
});

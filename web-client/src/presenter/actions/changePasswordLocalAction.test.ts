import { applicationContextForClient as applicationContext } from '../../../../shared/src/business/test/createTestApplicationContext';
import { changePasswordLocalAction } from './changePasswordLocalAction';
import { presenter } from '../presenter-mock';
import { runAction } from 'cerebral/test';

describe('changePasswordLocalAction', () => {
  const userEmail = 'someone@example.com';
  const newPassword = 'Pa$$word!';
  const sessionId = 'fdb445rg4efvbd4';

  const noStub = jest.fn();
  const yesStub = jest.fn();

  beforeAll(() => {
    presenter.providers.applicationContext = applicationContext;

    applicationContext
      .getUseCases()
      .changePasswordLocalInteractor.mockReturnValue({});

    presenter.providers.path = {
      no: noStub,
      yes: yesStub,
    };
  });

  it('should call changePasswordLocalInteractor with the sessionId, the userEmail, and the new password', async () => {
    await runAction(changePasswordLocalAction, {
      modules: {
        presenter,
      },
      state: {
        cognitoLocal: { sessionId, userEmail },
        form: { newPassword },
      },
    });

    expect(
      applicationContext.getUseCases().changePasswordLocalInteractor.mock
        .calls[0][1],
    ).toMatchObject({ newPassword, sessionId, userEmail });
  });

  it('should call path.yes with an alert success when changePasswordLocalInteractor returns an AuthenticationResult', async () => {
    applicationContext
      .getUseCases()
      .changePasswordLocalInteractor.mockReturnValueOnce({
        AuthenticationResult: { IdToken: 'abc', RefreshToken: '123' },
      });

    await runAction(changePasswordLocalAction, {
      modules: {
        presenter,
      },
      state: {
        cognitoLocal: { sessionId, userEmail },
        form: { newPassword },
      },
    });

    expect(yesStub).toHaveBeenCalled();
    expect(yesStub.mock.calls[0][0]).toMatchObject({
      alertSuccess: {
        message: 'Password successfully changed.',
      },
    });
  });

  it('should call path.no with an error when changePasswordLocalInteractor returns no AuthenticationResult', async () => {
    await runAction(changePasswordLocalAction, {
      modules: {
        presenter,
      },
      state: {
        cognitoLocal: { sessionId, userEmail },
        form: { newPassword },
      },
    });

    expect(noStub).toHaveBeenCalled();
  });
});

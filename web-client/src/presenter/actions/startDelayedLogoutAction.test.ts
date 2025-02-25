import { applicationContextForClient as applicationContext } from '@web-client/test/createClientTestApplicationContext';
import { presenter } from '../presenter-mock';
import { runAction } from '@web-client/presenter/test.cerebral';
import { startDelayedLogoutAction } from './startDelayedLogoutAction';

describe('startDelayedLogoutAction', () => {
  beforeAll(() => {
    presenter.providers.applicationContext = applicationContext;
    global.setTimeout = cb => cb();
  });

  it('creates a timer and stores it in state', async () => {
    const result = await runAction(startDelayedLogoutAction, {
      modules: {
        presenter,
      },
      props: {},
      state: {},
    });
    expect(result.state.logoutTimer).not.toBeNull();
    expect(result.state.shouldIdleLogout).toBeTruthy();
  });
});

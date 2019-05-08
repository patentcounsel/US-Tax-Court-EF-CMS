const sinon = require('sinon');
const { refreshToken } = require('./refreshTokenInteractor');

describe('refreshToken', () => {
  let applicationContext;

  it('returns a token', async () => {
    applicationContext = {
      getCognitoClientId: () => 'asdf',
      getCognitoTokenUrl: () => 'http://example.com/oauth2/token',
      getHttpClient: () => ({
        post: sinon.stub().resolves({
          data: {
            id_token: '123',
            refresh_token: 'abc',
          },
        }),
      }),
    };

    let result = await refreshToken({
      applicationContext,
      refreshToken: 'asdf',
    });

    expect(result).toEqual({ token: '123' });
  });
});

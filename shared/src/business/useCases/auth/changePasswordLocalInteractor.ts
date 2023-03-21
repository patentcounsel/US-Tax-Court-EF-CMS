/**
 * changePasswordLocalInteractor
 *
 * @param {object} applicationContext the application context
 * @param {object} auth an object
 * @param {string} auth.newPassword the new password provided by a local user
 * @param {string} auth.sessionId the cognito (local) session id
 * @param {string} auth.userEmail the email of the user changing passwords
 * @returns {Promise} the promise of both the refresh token and the auth token
 */
export const changePasswordLocalInteractor = async (
  applicationContext: IApplicationContext,
  {
    newPassword,
    sessionId,
    userEmail,
  }: { newPassword: string; sessionId: string; userEmail: string },
) => {
  const params = {
    ChallengeName: 'NEW_PASSWORD_REQUIRED',
    ChallengeResponses: {
      NEW_PASSWORD: newPassword,
      USERNAME: userEmail,
    },
    ClientId: 'bvjrggnd3co403c0aahscinne',
    Session: sessionId,
  };

  const result = await applicationContext
    .getCognito()
    .respondToAuthChallenge(params)
    .promise();

  return result;
};

import * as client from '../../dynamodbClientService';
import { type AdminCreateUserRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { ROLES } from '../../../business/entities/EntityConstants';

export const createUserRecords = async ({
  applicationContext,
  newUser,
  userId,
}: {
  applicationContext: IApplicationContext;
  newUser: RawUser;
  userId: string;
}) => {
  await client.put({
    Item: {
      ...newUser,
      pk: `user|${userId}`,
      sk: `user|${userId}`,
      userId,
    },
    applicationContext,
  });

  return {
    ...newUser,
    userId,
  };
};

export const createNewPetitionerUser = async ({
  applicationContext,
  user,
}: {
  applicationContext: IApplicationContext;
  user: RawUser;
}) => {
  const { userId } = user;

  const input: AdminCreateUserRequest = {
    UserAttributes: [
      {
        Name: 'email_verified',
        Value: 'True',
      },
      {
        Name: 'email',
        Value: user.pendingEmail,
      },
      {
        Name: 'custom:role',
        Value: ROLES.petitioner,
      },
      {
        Name: 'name',
        Value: user.name,
      },
      {
        Name: 'custom:userId',
        Value: user.userId,
      },
    ],
    UserPoolId: process.env.USER_POOL_ID,
    Username: user.pendingEmail,
  };

  const createUserParamsLocal = {
    ...input,
    DesiredDeliveryMediums: ['EMAIL'],
    Username: user.userId,
  };

  if (process.env.STAGE !== 'prod') {
    input.TemporaryPassword = process.env.DEFAULT_ACCOUNT_PASS;
  }

  const createUserParams = process.env.USE_COGNITO_LOCAL
    ? createUserParamsLocal
    : input;

  await applicationContext
    .getCognito()
    .adminCreateUser(createUserParams)
    .promise();

  const newUser: RawUser = await createUserRecords({
    applicationContext,
    newUser: user,
    userId,
  });

  return newUser;
};

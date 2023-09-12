import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const dynamodbClient = new DynamoDBClient({ region: 'us-east-1' });
const cognitoClient = new CognitoIdentityProviderClient({
  region: 'us-east-1',
});

type User = {
  role: string;
  email: string;
};

// given a uuid, create a cognito account for that user

// get user from dynamo. need;
// - role
// - email
const getUserFromDynamo = async (userId: string): Promise<User> => {
  const command = new GetItemCommand({
    Key: {
      pk: { S: `user|${userId}` },
      sk: { S: `user|${userId}` },
    },
    TableName: process.env.DYNAMODB_TABLE_NAME,
  });
  console.log({ command });
  const result = await dynamodbClient.send(command);
  console.log({ result });

  if (result.Item) {
    const item = unmarshall(result.Item);
    return {
      email: item.email,
      role: item.role,
    };
  }
  throw new Error('Item not found!');
};

// create user in cognito with default account pass

const createUserInCognito = async (userId: string, user: User) => {
  const command1 = new AdminCreateUserCommand({
    TemporaryPassword: process.env.DEFAULT_ACCOUNT_PASS,
    UserAttributes: [
      {
        Name: 'custom:role',
        Value: user.role,
      },
      {
        Name: 'custom:userId',
        Value: userId,
      },
    ],
    UserPoolId: process.env.COGNITO_USER_POOL,
    Username: user.email,
  });
  const res1 = await cognitoClient.send(command1);
  console.log({ res1 });

  const command2 = new AdminSetUserPasswordCommand({
    Password: process.env.DEFAULT_ACCOUNT_PASS,
    Permanent: true,
    UserPoolId: process.env.COGNITO_USER_POOL,
    Username: user.email,
  });
  const res2 = await cognitoClient.send(command2);
  console.log({ res2 });
};

(async () => {
  const input: string = process.argv[2];
  const userInfo = await getUserFromDynamo(input);
  await createUserInCognito(input, userInfo);
})();

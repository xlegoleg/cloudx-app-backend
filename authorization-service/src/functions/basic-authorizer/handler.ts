import middy from "@middy/core";
import { generatePolicy } from '@libs/generate-policy';
import { parseAuthToken } from '@utils/parse-auth-token';
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

export const basicAuthorizer = async (e: APIGatewayTokenAuthorizerEvent) => {
  console.log('[FN/basicAuthorizer]', e);

  try {
    const { authorizationToken, methodArn } = e

    if (authorizationToken) {
      const token = authorizationToken;
      const { login, password } = parseAuthToken(token)
      if (process.env[login] === password) {
        return generatePolicy(methodArn, 'Allow');
      }
    }
    return generatePolicy();
  } catch (error) {
    console.error('[FN/basicAuthorizer]', error);
    return generatePolicy();
  }
};

export const main = middy(basicAuthorizer);
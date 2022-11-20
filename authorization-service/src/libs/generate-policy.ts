import { APIGatewayAuthorizerResult } from 'aws-lambda'

export type TGeneratePolicyEffect = 'Allow' | 'Deny'

export const generatePolicy = (resource?: string, effect?: TGeneratePolicyEffect, principalId = 'user'): APIGatewayAuthorizerResult => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect ?? 'Deny',
          Resource: resource ?? '*',
        },
      ],
    },
  }
}
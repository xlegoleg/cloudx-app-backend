import { handlerPath } from '@libs/handler-resolver';

const importProductsFile =  {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        parameters: {
          querystring: {
            fileName: true,
          },
        },
        authorizer: {
          name: 'basicAuthorizer',
          arn: '${env:AUTH_FUNC_ARN}',
          type: 'TOKEN',
          resultTtlInSeconds: 0, // - cache-config
          identitySource: 'method.request.header.Authorization', // - where did we get token
        },
      },
    },
  ],
};

export default importProductsFile;


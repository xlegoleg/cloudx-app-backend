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
      },
    },
  ],
};

export default importProductsFile;


import { handlerPath } from '@libs/handler-resolver';

const importFileParser = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: '${env:S3_BUCKET_NAME}',
        event: 's3:ObjectCreated:*',
        existing: true,
        rules: [
          {
            prefix: 'uploaded/',
          },
        ]
      },
    },
  ],
};

export default importFileParser;


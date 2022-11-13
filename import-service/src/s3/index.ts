import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
  region: process.env.REGION,
});

export default s3;
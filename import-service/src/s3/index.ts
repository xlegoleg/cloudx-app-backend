import { S3 } from 'aws-sdk'

const s3 = new S3({
  region: process.env.REGION,
  httpOptions: {
    timeout: 30,
  }
});

export default s3;
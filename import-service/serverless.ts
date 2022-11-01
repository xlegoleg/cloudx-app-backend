import type { AWS } from '@serverless/typescript';
import functions from '@functions/index'

// @ts-ignore
const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      S3_BUCKET_NAME: '${env:S3_BUCKET_NAME}',
      S3_UPlOADED_FOLDER: '${env:S3_UPlOADED_FOLDER}',
      S3_PARSED_FOLDER: '${env:S3_PARSED_FOLDER}',
      REGION: '${env:REGION}',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: 's3:ListBucket',
            Resource: 'arn:aws:s3:::cloudx-import-bucket',
          },
          {
            Effect: 'Allow',
            Action: 's3:*',
            Resource: 'arn:aws:s3:::cloudx-import-bucket/*',
          },
        ],
      },
    },
  },
  functions: functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;

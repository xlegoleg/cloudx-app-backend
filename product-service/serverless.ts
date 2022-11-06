import type { AWS } from '@serverless/typescript';
import functions from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'product-service',
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
      TABLE_PRODUCTS: '${env:TABLE_PRODUCTS}',
      TABLE_STOCKS: '${env:TABLE_STOCKS}',
      CATALOG_SQS: '${env:CATALOG_SQS}',
      CATALOG_PRODUCT_TOPIC_NAME: '${env:CATALOG_PRODUCT_TOPIC_NAME}',
      CATALOG_PRODUCT_TOPIC_ARN: '${env:CATALOG_PRODUCT_TOPIC_ARN}',
      REGION: '${env:REGION}',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: 'dynamodb:*',
            Resource: '*'
          },
          {
            Effect: 'Allow',
            Action: ['sns:Publish'],
            Resource: ['${env:CATALOG_PRODUCT_TOPIC_ARN}']
          }
        ],
      },
    },
  },
  resources: {
    Resources: {
      CatalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: '${env:CATALOG_SQS}',
        }
      },
      CreateProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: '${env:CATALOG_PRODUCT_TOPIC_NAME}',
          Subscription: [
            {
              Endpoint: '${env:TEST_EMAIL}',
              Protocol: 'email'
            }
          ]
        },
      },
      CreateProductTopicSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: '${env:TEST_EMAIL2}',
          Protocol: 'email',
          TopicArn: { Ref: "CreateProductTopic" },
          FilterPolicy: {
            withoutCount: [{ numeric: ['=', 1] }]
          }
        }
      }
    }
  },
  /**
   * To avoid lots of imports, using functions as an object here
   */
  functions: functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
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

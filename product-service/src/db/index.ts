import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const DB_CLIENT = new DynamoDBClient({ region: process.env.RERION });

const DB = DynamoDBDocumentClient.from(DB_CLIENT);

export default DB;

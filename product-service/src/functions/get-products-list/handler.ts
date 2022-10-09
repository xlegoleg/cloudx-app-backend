import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import MOCK from "../../mock/products";

const ERROR_MESSAGE = () => {
  return formatJSONResponse({
    statusCode: 500,
    message: `Products not found`,
  });
}

const getProductsList: APIGatewayProxyHandler = async () => {
  try {
    const records = await MOCK;
    return formatJSONResponse({
      statusCode: 200,
      records,
    });
  } catch (e) {
    ERROR_MESSAGE();
  }
};

export const main = middyfy(getProductsList);

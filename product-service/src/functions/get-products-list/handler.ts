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
    const products = await MOCK;
    return {
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Origin": "*"
      },
      ...formatJSONResponse({
        products,
      })
    };
  } catch (e) {
    ERROR_MESSAGE();
  }
};

export const main = middyfy(getProductsList);

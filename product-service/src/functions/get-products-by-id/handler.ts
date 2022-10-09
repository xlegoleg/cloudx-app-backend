import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import MOCK from "../../mock/products";

const ERROR_MESSAGE = (id) => {
  return formatJSONResponse({
    statusCode: 500,
    message: `Product with id ${id} not found`,
  });
}

const getProductsById: APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters.id
  try {
    const records = await MOCK;
    const product = records.find((i) => i.id == id);
    if (id && product) {
      return {
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Origin": "*"
        },
        ...formatJSONResponse({
          product,
        })
      };
    }
    return ERROR_MESSAGE(id);
  } catch (e) {
    return ERROR_MESSAGE(id);
  }
};

export const main = middyfy(getProductsById);
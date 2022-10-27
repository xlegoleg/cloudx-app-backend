import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import MOCK from "../../mock/products";
import { APIGatewayProxyEvent } from "aws-lambda";

const ERROR_MESSAGE = (id) => {
  return {
    statusCode: 404,
    body: JSON.stringify({
      message: `Product with id ${id} not found`,
    })
  }
}

export const getProductsById = async (event: APIGatewayProxyEvent) => {
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

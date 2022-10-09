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
      return formatJSONResponse({
        statusCode: 200,
        product,
      });
    }
    return ERROR_MESSAGE(id);
  } catch (e) {
    return ERROR_MESSAGE(id);
  }
};

export const main = middyfy(getProductsById);
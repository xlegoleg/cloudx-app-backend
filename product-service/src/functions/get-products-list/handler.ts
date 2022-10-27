import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import MOCK from "../../mock/products";

const ERROR_MESSAGE = () => {
  return {
    statusCode: 404,
    body: JSON.stringify({
      message: `Products not found`,
    })
  }
}

export const getProductsList = async () => {
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


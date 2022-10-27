import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import enableCorsHeaders from "@utils/enable-cors.headers";
import { getProductsListQuery } from "@db/queries/getProductsListQuery";
import { APIGatewayProxyEvent } from "aws-lambda";
import DEFAULT_ERROR from "@utils/default.error";
import NOT_FOUND_ERROR from "@utils/not-found.error";

export const getProductsList = async (e?: APIGatewayProxyEvent) => {
  console.log('[FN/getProductsList]', e);

  try {
    const products = await getProductsListQuery();
    if (products) {
      return {
        headers: {
          ...enableCorsHeaders,
        },
        ...formatJSONResponse({
          products,
        }),
      };
    } else {
      NOT_FOUND_ERROR('No existing products');
    }
  } catch (e) {
    DEFAULT_ERROR();
  }
};

export const main = middyfy(getProductsList);


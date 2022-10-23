import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent } from "aws-lambda";
import enableCorsHeaders from "@utils/enable-cors.headers";
import { getProductByIdQuery } from "@db/queries/getProductByIdQuery";
import NOT_FOUND_ERROR from "@utils/not-found.error";
import DEFAULT_ERROR from "@utils/default.error";

export const getProductsById = async (e: APIGatewayProxyEvent) => {
  const id = e.pathParameters.id

  console.log('[FN/getProductById]', id, e);

  try {
    const product = await getProductByIdQuery(id);
    if (id && product) {
      return {
        headers: {
          ...enableCorsHeaders,
        },
        ...formatJSONResponse({
          product,
        }),
      };
    }
    return NOT_FOUND_ERROR(`Product with id ${id} not found`);
  } catch (e) {
    return DEFAULT_ERROR();
  }
};

export const main = middyfy(getProductsById);

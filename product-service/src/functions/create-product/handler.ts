import { formatJSONResponse } from "@libs/api-gateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { createProductQuery } from "@db/queries/createProductQuery";
import DEFAULT_ERROR from "@utils/default.error";
import { IProduct } from "../../types/product.interface";
import { isNumber } from "lodash";
import { middyfy } from "@libs/lambda";

const isValidProduct = (product: IProduct) => {
  const { title, price, count } = product;
  return !!(title && isNumber(price) && isNumber(count));

}

export const createProduct = async (e: APIGatewayProxyEvent) => {
  const body = JSON.parse(e.body);

  console.log('[FN/createProduct]', e, body);

  try {
    if (isValidProduct(body)) {
      const { productResp, stockResp } = await createProductQuery(body);
      return formatJSONResponse({ ...productResp, ...stockResp });
    } else {
      return formatJSONResponse({ message: 'Product data is not valid'}, 400);
    }
  } catch (error) {
    DEFAULT_ERROR('An error while creating product')
  }
};

export const main = middyfy(createProduct);

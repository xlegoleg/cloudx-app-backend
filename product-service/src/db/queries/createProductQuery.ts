import { IProduct } from "../../types/product.interface";
import DB from "@db/index";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 } from 'uuid'

export const createProductQuery = async (product: IProduct) => {
  const { title, description, price, count } = product;
  const id = v4();

  try {
    const productResp = await DB.send(new PutCommand({
      TableName: process.env.TABLE_PRODUCTS,
      Item: {
        id,
        title,
        description,
        price,
      },
    }));
    const stockResp = await DB.send(new PutCommand({
      TableName: process.env.TABLE_STOCKS,
      Item: { product_id: id, count }
    }));

    return {
      productResp,
      stockResp
    }
  } catch (e) {
    console.error('[DB/createProductQuery]', e);
    throw e;
  }
}
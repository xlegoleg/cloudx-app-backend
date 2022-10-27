import DB from "@db/index";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export const getProductByIdQuery = async (id: string) => {
  const scanProductCommand = DB.send(new GetCommand({
    TableName: process.env.TABLE_PRODUCTS,
    Key: { id: id },
  }));
  const scanStockCommand = DB.send(new GetCommand({
    TableName: process.env.TABLE_STOCKS,
    Key: { product_id: id },
  }));

  try {
    const resp = await Promise.all([scanProductCommand, scanStockCommand]);
    const product = resp[0].Item;
    const stock = resp[1].Item;

    if (product && stock) {
      return {
        ...product,
        count: stock.count,
      }
    }

    return null;
  } catch (e) {
    console.error('[DB/getProductByIdQuery]', e);
    throw e;
  }
};
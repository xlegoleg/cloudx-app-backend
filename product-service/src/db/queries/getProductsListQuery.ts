import DB from "@db/index";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { hashInnerJoin } from 'lodash-joins';

export const getProductsListQuery = async () => {
  const scanProductCommand = DB.send(new ScanCommand({ TableName: process.env.TABLE_PRODUCTS }));
  const scanStockCommand = DB.send(new ScanCommand({ TableName: process.env.TABLE_STOCKS }));

  try {
    const resp = await Promise.all([scanProductCommand, scanStockCommand]);
    const products = resp[0].Items;
    const stocks = resp[1].Items;
    const merged = hashInnerJoin(
        products,
        (v) => { return v.id },
        stocks,
        (v) => { return v.product_id},
    );

    return merged.map((v) => {
      const { product_id, ...rest } = v;
      return rest;
    })
  } catch (e) {
    console.error('[DB/getProductsListQuery]', e);
    throw e;
  }
};
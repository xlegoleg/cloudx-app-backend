import { SQSEvent } from 'aws-lambda';
import middy from '@middy/core';
import DEFAULT_ERROR from '@utils/default.error';
import { formatJSONResponse } from '@libs/api-gateway';
import { createProductQuery } from '@db/queries/createProductQuery';
import SNSService from '@sns/index';
import { IProduct } from '../../types/product.interface';

export const catalogBatchProcess = async (e: SQSEvent) => {
  console.log('[FN/catalogBatchProcess]', e);
  try {
    const createdIds: Array<string> = [];
    const products = e.Records.map((v) => {
      return JSON.parse(v.body);
    })

    const isProductsWithoutCount = products.some((v: IProduct) => !v.count);

    for (const product of products) {
      const id = await createProductQuery(product)
      createdIds.push(id);
    }

    if (products.length === createdIds.length) {
      await SNSService.publicMessage('There are products without count', {
        withoutCount: {
          DataType: 'Number',
          StringValue: isProductsWithoutCount ? '1': '0',
        },
      })
      await SNSService.publicMessage('Products were successfully created');
      return formatJSONResponse({
        productIds: createdIds,
      });
    } else {
      return DEFAULT_ERROR('Error while saving records')
    }
  }
  catch (e) {
    return DEFAULT_ERROR(e);
  }
}

export const main = middy(catalogBatchProcess);
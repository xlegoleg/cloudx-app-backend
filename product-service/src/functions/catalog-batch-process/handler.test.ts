import { mockClient } from 'aws-sdk-client-mock'
import 'aws-sdk-client-mock-jest';
import { PublishCommand } from '@aws-sdk/client-sns'
import { Context, SQSEvent, SQSRecord } from 'aws-lambda';
import { main as catalogBatchProcess } from './handler'
import SNSService from '@sns/index';
import { IProduct } from '../../types/product.interface';

const snsMock = mockClient(SNSService.getInstance())

const products: Array<Omit<IProduct, 'id'>> = [
  {
    title: 'TEST1',
    description: 'TEST_D1',
    price: 11,
    count: 111,
  },
  {
    title: 'TEST2',
    description: 'TEST_D2',
    price: 22,
    count: 222,
  }
]

const event: SQSEvent = {
  Records: [
    {
      body: JSON.stringify(products[0]),
    },
    {
      body: JSON.stringify(products[1]),
    }
  ] as unknown as SQSRecord[],
}

describe('UNIT_TEST: catalogBatchProcess', () => {
  test('SNS should called', async () => {
    await catalogBatchProcess(event, {} as Context)
    expect(snsMock).toHaveReceivedCommandTimes(PublishCommand, 2)
  })
})
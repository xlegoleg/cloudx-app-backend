import { getProductsList } from './handler'

describe('UNIT_TEST: getProductsList', function () {
  it('Verifies successful response', async () => {
    const result = await getProductsList();
    const products = JSON.parse(result.body).products;

    expect(result.statusCode).toEqual(200);
    expect(products.length).toBeTruthy();
  });
});
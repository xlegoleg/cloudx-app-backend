import { APIGatewayProxyEvent } from "aws-lambda";
import { getProductsById } from "@functions/get-products-by-id/handler";

describe('UNIT_TEST: getProductById', function () {
  it('Verifies successful response', async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        id: "1"
      }
    } as any
    const result = await getProductsById(event);
    const expectedData = {
          id: 1,
          title: "ProductOneFromMyBackend",
          price: 10
    };
    const product = JSON.parse(result.body).product;
    expect(result.statusCode).toEqual(200);
    expect(product).toEqual(expectedData);
  });
  it('Verifies 404 response', async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        id: "notExistingId"
      }
    } as any
    const result = await getProductsById(event);
    expect(result.statusCode).toEqual(404);
  });
});
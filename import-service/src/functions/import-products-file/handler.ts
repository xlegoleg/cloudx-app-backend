import { APIGatewayEvent } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import DEFAULT_ERROR from "@utils/default.error";
import s3 from "@s3/index";
import enableCorsHeaders from "@utils/enable-cors.headers";
import { formatJSONResponse } from "@libs/api-gateway";

export const importProductsFile = async (e: APIGatewayEvent) => {
  const fileName = e.queryStringParameters.fileName

  console.log('[FN/importFileParser]', fileName, e);

  try {
    const s3Path = `${process.env.S3_UPlOADED_FOLDER}/${fileName}`
    const requestParams = {
      Bucket: `${process.env.S3_BUCKET_NAME}`,
      Key: s3Path,
      ContentType: 'text/csv',
      Expires: 60,
    }
    const url = await s3.getSignedUrlPromise('putObject', requestParams);

    return {
      headers: {
        ...enableCorsHeaders,
      },
      ...formatJSONResponse({
        url,
      }),
    };
  }
  catch (error) {
    return DEFAULT_ERROR(error);
  }
};

export const main = middyfy(importProductsFile);
import { APIGatewayEvent } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import DEFAULT_ERROR from "@utils/default.error";
import s3 from "@s3/index";
import enableCorsHeaders from "@utils/enable-cors.headers";
import { formatJSONResponse } from "@libs/api-gateway";
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const importProductsFile = async (e: APIGatewayEvent) => {
  const fileName = e.queryStringParameters.fileName

  console.log('[FN/importFileParser]', fileName, e);

  try {
    const s3Path = `${process.env.S3_UPlOADED_FOLDER}/${fileName}`
    const requestParams = {
      Bucket: `${process.env.S3_BUCKET_NAME}`,
      Key: s3Path,
      ContentType: 'text/csv',
    }
    const putCommand = new PutObjectCommand(requestParams);
    const url = await getSignedUrl(s3, putCommand, {
      expiresIn: 3000,
    });

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
    return {
      headers: {
        ...enableCorsHeaders,
      },
      ...DEFAULT_ERROR(error),
    };
  }
};

export const main = middyfy(importProductsFile);
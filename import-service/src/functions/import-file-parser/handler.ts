import DEFAULT_ERROR from "@utils/default.error";
import s3 from "@s3/index";
import middy from "@middy/core";
import { S3Event } from "aws-lambda";
import readCSVFile from '@utils/read-csv-file.util';
import SQSService from '@sqs/index';
import { formatJSONResponse } from '@libs/api-gateway';

export const importFileParser = async (e: S3Event) => {
  const records = e.Records

  console.log('[FN/importFileParser]', records, e);

  try {
    if (!records.length) {
      return DEFAULT_ERROR('Count of records should be more than 0');
    }
    const key = records[0].s3.object.key;

    console.log('[FN/importFileParser/key]', key);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    }
    const copyParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      CopySource: `${process.env.S3_BUCKET_NAME}/${key}`,
      Key: key.replace(process.env.S3_UPlOADED_FOLDER, process.env.S3_PARSED_FOLDER),
    }
    const stream = await s3.getObject(params);

    const parsedRecords = await readCSVFile(stream.Body);

    for (const product of parsedRecords) {
      await SQSService.sendMessage(JSON.stringify(product ?? {}));
    }

    await s3.copyObject(copyParams);
    await s3.deleteObject(params);

    return formatJSONResponse({
      success: true,
    });
  }
  catch (error) {
    return DEFAULT_ERROR(error);
  }
};

export const main = middy(importFileParser);
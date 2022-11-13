const csv = require('csv-parser');

const readFileAsync = async (
    readStream,
) => {
  return new Promise<Array<Record<string, any>>>((resolve, reject) => {
    const records: Array<Record<string, any>> = [];
    readStream
        .pipe(csv())
        .on('data', (chunk) => {
          records.push(chunk);
        })
        .on('error', (error) => {
          console.error('[UTIL/readFileAsync]: ', error);
          reject(error);
        })
        .on('end',() => {
          resolve(records);
        });
  })
};

const readCSVFile = async (
  readStream,
) => {
  try {
    return await readFileAsync(readStream);
  }
  catch (error) {
    console.error('[UTIL/readCSVFile]: ', error);
    throw (error);
  }
};

export default readCSVFile;
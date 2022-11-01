const csv = require('csv-parser');

const readFile = async (
    readStream,
    asyncCallback?: (args?: any) => Promise<any>,
    callback?: (args?: any) => void,
) => {
  return new Promise<void>((resolve, reject) => {
    readStream
        .pipe(csv())
        .on('data', (chunk) => {
          console.log('[UTIL/readFile]: ', chunk);
        })
        .on('error', (error) => {
          console.error('[UTIL/readFile]: ', error);
          reject(error);
        })
        .on('end',() => {
          if (asyncCallback) {
            asyncCallback().then(() => {
              resolve();
            }).catch((e) => {
              reject(e);
            })
          }
          if (callback) {
            callback()
            resolve();
          }
        });
  })
};

export default readFile;
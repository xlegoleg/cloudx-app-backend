import { SQSClient, SendMessageCommand, SendMessageCommandOutput } from '@aws-sdk/client-sqs';

/**
 * @Singleton SQS-Client-Service
 */
class SQS {
  private readonly instance!: SQSClient

  public constructor() {
    this.instance = new SQSClient({
      region: process.env.REGION
    });
  }

  public getInstance(): SQSClient {
    return this.instance;
  }

  public async sendMessage(message: string, queue?: string): Promise<SendMessageCommandOutput> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = {
          MessageBody: message,
          QueueUrl: queue ?? process.env.CATALOG_SQS_URL,
        };
        console.log(params);
        const client = this.getInstance();
        const data = await client.send(new SendMessageCommand(params));
        resolve(data)
      } catch (e) {
        reject(e);
      }
    });
  }
}

const SQSService = new SQS();

export default SQSService;
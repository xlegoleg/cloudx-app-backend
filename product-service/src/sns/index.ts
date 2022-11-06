import { SNSClient, PublishCommand, MessageAttributeValue } from '@aws-sdk/client-sns';

/**
 * @Singleton SNS-Client-Service
 */
class SNSClientService {
  private readonly instance!: SNSClient;

  public constructor() {
    this.instance = new SNSClient({
      region: process.env.REGION,
    });
  }

  public getInstance(): SNSClient {
    return this.instance;
  }

  public publicMessage(message: string, attributes?: Record<string, MessageAttributeValue>, topicName?: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.getInstance().send(new PublishCommand({
          Message: message,
          MessageAttributes: attributes,
          TopicArn: topicName ?? process.env.CATALOG_PRODUCT_TOPIC_ARN,
        }));
        resolve(data)
      } catch (error) {
        reject(error);
      }
    });
  }
}

const SNSService = new SNSClientService();

export default SNSService;

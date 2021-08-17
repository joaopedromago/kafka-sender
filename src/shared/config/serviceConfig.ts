import { config } from 'dotenv';

config();

export const serviceConfig = {
  kafkaUrl: process.env.KAFKA_URL,
  kafkaClientId: process.env.KAFKA_CLIENT_ID,
  kafkaApiKey: process.env.KAFKA_API_KEY,
  kafkaSecret: process.env.KAFKA_SECRET,
  kafkaProtocol: process.env.KAFKA_PROTOCOL,
  kafkaMechanisms: process.env.KAFKA_MECHANISMS,
};

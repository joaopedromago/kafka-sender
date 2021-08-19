import { ClientProviderOptions, Transport } from '@nestjs/microservices';

import { serviceConfig } from 'src/shared/config/serviceConfig';

export const KafkaOptions: ClientProviderOptions = {
  name: 'KAFKA_SERVICE',
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: serviceConfig.kafkaClientId,
      brokers: [serviceConfig.kafkaUrl],
      ssl: process.env.NODE_ENV === 'production',
      sasl: process.env.NODE_ENV === 'production' && {
        username: serviceConfig.kafkaApiKey,
        password: serviceConfig.kafkaSecret,
        mechanism: serviceConfig.kafkaMechanisms as any,
      },
    },
    consumer: {
      groupId: serviceConfig.kafkaClientId,
    },
  },
};

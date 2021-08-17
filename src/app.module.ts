import { Module } from '@nestjs/common';

import { SenderController } from './controllers/sender.controller';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [SenderController],
})
export class AppModule {}

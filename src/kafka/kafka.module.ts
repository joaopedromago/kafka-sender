import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { KafkaOptions } from './kafka.config';
import { KafkaService } from './kafka.service';

@Module({
  imports: [ClientsModule.register([KafkaOptions])],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}

import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { Observable } from 'rxjs';

import { KafkaOptions } from './kafka.config';

@Injectable()
export class KafkaService {
  private readonly logger = new Logger(KafkaService.name);

  constructor(
    @Inject(KafkaOptions.name) private readonly clientKafka: ClientKafka,
  ) {}

  emit<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Observable<TResult> {
    this.logger.verbose(
      `Kafka is emiting to pattern ${pattern} with data ${JSON.stringify(
        data,
      )}`,
    );
    const result = this.clientKafka.emit<TResult, TInput>(pattern, data);

    return result;
  }
}

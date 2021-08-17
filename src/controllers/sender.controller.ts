import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  Body,
} from '@nestjs/common';

import { Response } from 'express';

import { KafkaService } from 'src/kafka/kafka.service';

import { SenderDto } from './sender.dto';

@Controller('sender')
@UsePipes(ValidationPipe)
export class SenderController {
  constructor(private kafkaService: KafkaService) {}

  @Post('/')
  async create(
    @Res() response: Response,
    @Body() sender: SenderDto,
  ): Promise<Response> {
    this.kafkaService.emit(sender.topic, sender.value);

    return response.status(200).send();
  }
}

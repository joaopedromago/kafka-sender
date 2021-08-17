import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as config from 'config';
import { config as dotenvConfig } from 'dotenv';

import { validateEnvs } from 'src/shared/config/dotenv.validator';

import { AppModule } from './app.module';
import { ServerConfig } from './shared/interfaces';

async function bootstrap(): Promise<void> {
  dotenvConfig();
  const envs = validateEnvs();

  const serverConfig: ServerConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const port = envs.PORT || serverConfig.port;

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap();

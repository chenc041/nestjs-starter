import { NestFactory } from '@nestjs/core';
import { AppModule } from '~/app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as process from 'process';

const port = process.env.APP_PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: process.env.NODE_ENV === 'development',
    }),
  );
  // more info https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || 'cookie-secret',
  });
  app.setGlobalPrefix('/api/v1');
  await app.listen(port);
}

bootstrap().then(() => {
  return Logger.log(`This api server is running at: http://localhost:${port}`);
});

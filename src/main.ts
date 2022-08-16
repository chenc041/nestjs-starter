import { NestFactory } from '@nestjs/core';
import { AppModule } from '~/app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const port = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // more info https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.use(cookieParser());
  app.setGlobalPrefix('/api/v1');
  await app.listen(port);
}

bootstrap().then(() => {
  return Logger.log(`This api server is running at: http://localhost:${port}`);
});

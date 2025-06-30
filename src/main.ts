import * as process from 'node:process';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '~/app.module';

const PORT = process.env.APP_PORT || 3001;
const IS_DEV_ENV = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: IS_DEV_ENV,
      trustProxy: true,
    }),
  );
  // more info https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // use interceptors
  // more info https://docs.nestjs.com/techniques/serialization#websockets-and-microservices
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // enable cors
  // more info https://docs.nestjs.com/security/cors
  app.enableCors();
  app.setGlobalPrefix('/api/v1');

  // enable swagger
  const config = new DocumentBuilder()
    .setTitle('Nestjs api document')
    .setDescription('api document by Swagger')
    .setVersion('1.0')
    .addTag('Nestjs starter docs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, '0.0.0.0');
}

bootstrap().then(() => {
  return Logger.log(`This api server is running at: http://localhost:${PORT}`);
});

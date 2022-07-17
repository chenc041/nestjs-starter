import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmTestingModule } from '~/test-utils';
import { ExampleController } from '~/example/example.controller';
import { ExampleService } from '~/example/example.service';
import { UserEntity } from '~/entities/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule(
      TypeOrmTestingModule({
        controllers: [ExampleController],
        providers: [ExampleService],
        entities: [UserEntity],
      }),
    ).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/example/login (POST)', async () => {
    const response = await request(app.getHttpServer()).get('/example/env');
    expect(response.body.env).toEqual('test');
  });
});

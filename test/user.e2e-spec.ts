import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmTestingModule } from '~/test.utils';
import { UserController } from '~/user/user.controller';
import { UserService } from '~/user/user.service';
import { UserEntity } from '~/entities/user.entity';
import { mockUser } from '~/test.mock.data';
import fastifyCookie from '@fastify/cookie';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

describe('UserController (e2e)', () => {
  let app: NestFastifyApplication;
  let token!: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule(
      TypeOrmTestingModule({
        controllers: [UserController],
        providers: [UserService],
        entities: [UserEntity],
      }),
    ).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    app.setGlobalPrefix('/api/v1');
    await app.register(fastifyCookie, {
      secret: 'cookie-secret',
    });
    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    await register(mockUser);
    token = await login(mockUser);
  });

  afterEach(async () => {
    await app.close();
  });

  const register = async (payload: { username: string; password: string }) => {
    await request(app.getHttpServer())
      .post('/api/v1/user/register')
      .send(payload);
  };
  const login = async (payload: { username: string; password: string }) => {
    const userInfo = await request(app.getHttpServer())
      .post('/api/v1/user/login')
      .send(payload);
    return userInfo.body.data.token;
  };

  it('/api/v1/user/login (POST)', async () => {
    expect(token).toBeDefined();
  });

  it('/api/v1/user/currentUser (GET)', async () => {
    const userInfo = await request(app.getHttpServer())
      .get('/api/v1/user/currentUser')
      .set('Cookie', [`Authorization=${token}`])
      .send({});
    expect(userInfo.body.data.username).toBeDefined();
  });
});

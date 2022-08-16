import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmTestingModule } from '~/test-utils';
import { UserController } from '~/user/user.controller';
import { UserService } from '~/user/user.service';
import { UserEntity } from '~/entities/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule(
      TypeOrmTestingModule({
        controllers: [UserController],
        providers: [UserService],
        entities: [UserEntity],
      }),
    ).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const user = { username: 'chenc', password: 'chenc' };
  const register = async (payload) => {
    await request(app.getHttpServer()).post('/user/register').send(payload);
  };
  const login = async (payload) => {
    const userInfo = await request(app.getHttpServer())
      .post('/user/login')
      .send(payload);
    return userInfo.body.data.access_token;
  };

  it('/api/v1/user/login (POST)', async () => {
    await register(user);
    const token = await login(user);
    expect(token).toBeDefined();
  });
});

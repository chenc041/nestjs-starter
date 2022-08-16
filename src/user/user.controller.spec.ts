import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { TypeOrmTestingModule } from '~/test-utils';
import { UserService } from '~/user/user.service';
import { UserEntity } from '~/entities/user.entity';
import { CookieOptions } from 'express';
import { ApiReturnType } from '~/utils';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      TypeOrmTestingModule({
        controllers: [UserController],
        providers: [UserService],
        entities: [UserEntity],
      }),
    ).compile();

    controller = module.get<UserController>(UserController);
  });

  const mockSetCookie = (key: string, value: any, options: CookieOptions) => {
    return console.log(key, value, options);
  };

  const register = async (payload: {
    username: string;
    password: string;
  }): Promise<ApiReturnType<any>> => {
    return await controller.register(payload);
  };

  const login = async (payload: { username: string; password: string }) => {
    return await controller.login(payload, { cookie: mockSetCookie } as any);
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('user should be create success', async () => {
    const result = await register({ username: 'chenc', password: 'chenc' });
    expect(result.data.id).toBeDefined();
  });

  it('should be login success', async () => {
    await register({ username: 'chenc', password: 'chenc' });
    const result = await login({ username: 'chenc', password: 'chenc' });
    expect(result.data.access_token).toBeDefined();
  });
});

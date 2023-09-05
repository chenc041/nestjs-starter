import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { TypeOrmTestingModule } from '~/test.utils';
import { UserService } from '~/user/user.service';
import { UserEntity } from '~/entities/user.entity';
import { HttpResponseType } from '~/utils';
import { mockUser } from '~/test.mock.data';

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

  const mockSetCookie = () => {
    return null;
  };

  const register = async (payload: {
    username: string;
    password: string;
  }): Promise<HttpResponseType> => {
    return await controller.register(payload);
  };

  const login = async (payload: { username: string; password: string }) => {
    return await controller.login(payload, { setCookie: mockSetCookie } as any);
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user success', async () => {
    const result = await register(mockUser);
    expect(result.data.id).toBeDefined();
  });

  it('should be login success', async () => {
    await register(mockUser);
    const result = await login(mockUser);
    expect(result.data.token).toBeDefined();
  });
});

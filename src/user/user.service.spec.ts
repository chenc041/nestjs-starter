import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypeOrmTestingModule } from '~/test.utils';
import { UserController } from '~/user/user.controller';
import { UserEntity } from '~/entities/user.entity';
import { mockUser } from '~/test.mock.data';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      TypeOrmTestingModule({
        controllers: [UserController],
        providers: [UserService],
        entities: [UserEntity],
      }),
    ).compile();

    service = module.get<UserService>(UserService);
  });

  const create = async () => {
    return await service.createUser(mockUser);
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user success', async () => {
    const user = await create();
    expect(user.id).toBeDefined();
  });

  it('should be find one user', async () => {
    await create();
    const user = await service.checkUserExist({ username: 'chenc' });
    expect(user.id).toBeDefined();
  });
});

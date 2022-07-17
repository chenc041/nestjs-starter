import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from '~/example/example.controller';
import { TypeOrmTestingModule } from '~/test-utils';
import { ExampleService } from '~/example/example.service';
import { UserEntity } from '~/entities/user.entity';

describe('ExampleController', () => {
  let appController: ExampleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule(
      TypeOrmTestingModule({
        controllers: [ExampleController],
        providers: [ExampleService],
        entities: [UserEntity],
      }),
    ).compile();

    appController = app.get<ExampleController>(ExampleController);
  });

  describe('login', () => {
    it('should have property access_token', async () => {
      const result = await appController.login({ userId: 1, username: '12' });
      expect(result.access_token).toBeDefined();
    });
  });
});

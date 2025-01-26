import { Test, TestingModule } from '@nestjs/testing';
import { LoggingController } from '~/modules/system/logging/logging.controller';
import { TypeOrmTestingModule } from '~/test.utils';
import { LoggingService } from '~/modules/system/logging/logging.service';
import { LoggingEntity } from '~/entities/logging.entity';
import { UserService } from '~/modules/user/user.service';
import { UserEntity } from '~/entities/user.entity';

describe('LoggingController', () => {
  let controller: LoggingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      TypeOrmTestingModule({
        controllers: [LoggingController],
        providers: [LoggingService, UserService],
        entities: [LoggingEntity, UserEntity],
      }),
    ).compile();

    controller = module.get<LoggingController>(LoggingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

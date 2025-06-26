import { Test, type TestingModule } from '@nestjs/testing';
import { LoggingEntity } from '~/entities/logging.entity';
import { UserEntity } from '~/entities/user.entity';
import { LoggingController } from '~/modules/system/logging/logging.controller';
import { LoggingService } from '~/modules/system/logging/logging.service';
import { UserService } from '~/modules/user/user.service';
import { TypeOrmTestingModule } from '~/test.utils';

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

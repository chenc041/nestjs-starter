import { Test, type TestingModule } from '@nestjs/testing';
import { UserEntity } from '~/entities/user.entity';
import { UserController } from '~/modules/user/user.controller';
import { UserService } from '~/modules/user/user.service';
import { TypeOrmTestingModule } from '~/test.utils';

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

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

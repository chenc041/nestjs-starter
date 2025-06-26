import { Test, type TestingModule } from '@nestjs/testing';
import { UserEntity } from '~/entities/user.entity';
import { UserController } from '~/modules/user/user.controller';
import { UserService } from '~/modules/user/user.service';
import { mockUser } from '~/test.mock.data';
import { TypeOrmTestingModule } from '~/test.utils';

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

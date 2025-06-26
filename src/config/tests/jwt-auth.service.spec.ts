import { Test, type TestingModule } from '@nestjs/testing';
import { JwtAuthService } from '~/config/jwt/jwt-auth.service';
import { TypeOrmTestingModule } from '~/test.utils';

describe('JwtAuthService', () => {
	let service: JwtAuthService;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule(
			TypeOrmTestingModule({
				controllers: [],
				providers: [JwtAuthService],
				entities: [],
			}),
		).compile();
		service = module.get<JwtAuthService>(JwtAuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

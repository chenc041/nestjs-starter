import { Test, TestingModule } from '@nestjs/testing';
import { JwtConfigService } from '~/config/jwt-config/jwt-config.service';
import { TypeOrmTestingModule } from '~/test.utils';

describe('JwtConfigService', () => {
  let service: JwtConfigService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      TypeOrmTestingModule({
        controllers: [],
        providers: [JwtConfigService],
        entities: [],
      }),
    ).compile();
    service = module.get<JwtConfigService>(JwtConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return token', async () => {
    const { token } = await service.signToken({ username: 'chenc', userId: 1 });
    expect(token).toBeDefined();
  });
});

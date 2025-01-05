import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmConfigService } from '~/config.module/typeorm-config/typeorm-config.service';
import { TypeOrmTestingModule } from '~/test.utils';

describe('TypeormConfig', () => {
  let service: TypeOrmConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      TypeOrmTestingModule({
        controllers: [],
        providers: [TypeOrmConfigService],
        entities: [],
      }),
    ).compile();
    service = module.get<TypeOrmConfigService>(TypeOrmConfigService);
  });

  it('should be defined', function () {
    expect(service).toBeDefined();
  });

  it('should be return typeorm config correct', async () => {
    const config = await service.createTypeOrmOptions();
    expect(config.database).toBe('test_app');
  });
});

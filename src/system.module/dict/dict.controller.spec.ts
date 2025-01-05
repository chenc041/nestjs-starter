import { Test, TestingModule } from '@nestjs/testing';
import { DictController } from './dict.controller';

describe('DictController', () => {
  let controller: DictController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DictController],
    }).compile();

    controller = module.get<DictController>(DictController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

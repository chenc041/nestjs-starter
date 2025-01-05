import { Test, TestingModule } from '@nestjs/testing';
import { LoggingController } from './logging.controller';

describe('LoggingController', () => {
  let controller: LoggingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoggingController],
    }).compile();

    controller = module.get<LoggingController>(LoggingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

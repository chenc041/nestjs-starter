import { Module } from '@nestjs/common';
import { DictController } from './dict/dict.controller';
import { LoggingController } from './logging/logging.controller';

@Module({
  controllers: [DictController, LoggingController],
})
export class SystemModule {}

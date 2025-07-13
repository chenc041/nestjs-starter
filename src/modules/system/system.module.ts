import { Module } from '@nestjs/common';
import { DictService } from '~/modules/system/dict/dict.service';
import { LoggingService } from '~/modules/system/logging/logging.service';
import { UserModule } from '~/modules/user/user.module';
import { DictController } from './dict/dict.controller';
import { LoggingController } from './logging/logging.controller';

@Module({
  imports: [UserModule],
  controllers: [DictController, LoggingController],
  providers: [LoggingService, DictService],
  exports: [LoggingService, DictService],
})
export class SystemModule {}

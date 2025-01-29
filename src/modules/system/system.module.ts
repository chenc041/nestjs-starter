import { Module } from '@nestjs/common';
import { DictController } from './dict/dict.controller';
import { LoggingController } from './logging/logging.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictEntity } from '~/entities/dict.entity';
import { LoggingEntity } from '~/entities/logging.entity';
import { LoggingService } from '~/modules/system/logging/logging.service';
import { DictService } from '~/modules/system/dict/dict.service';
import { UserModule } from '~/modules/user/user.module';
import { LoggingRepository } from '~/modules/system/logging/logging.repository';
import { DictRepository } from '~/modules/system/dict/dict.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DictEntity, LoggingEntity]), UserModule],
  controllers: [DictController, LoggingController],
  providers: [LoggingService, DictService, LoggingRepository, DictRepository],
  exports: [LoggingService, DictService],
})
export class SystemModule {}

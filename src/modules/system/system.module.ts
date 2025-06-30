import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictEntity } from '~/entities/dict.entity';
import { LoggingEntity } from '~/entities/logging.entity';
import { DictRepository } from '~/modules/system/dict/dict.repository';
import { DictService } from '~/modules/system/dict/dict.service';
import { LoggingRepository } from '~/modules/system/logging/logging.repository';
import { LoggingService } from '~/modules/system/logging/logging.service';
import { UserModule } from '~/modules/user/user.module';
import { DictController } from './dict/dict.controller';
import { LoggingController } from './logging/logging.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DictEntity, LoggingEntity]), UserModule],
  controllers: [DictController, LoggingController],
  providers: [LoggingService, DictService, LoggingRepository, DictRepository],
  exports: [LoggingService, DictService],
})
export class SystemModule {}

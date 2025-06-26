import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import type { LoggingEntity } from '~/entities/logging.entity';

@Injectable()
export class LoggingRepository extends Repository<LoggingEntity> {}

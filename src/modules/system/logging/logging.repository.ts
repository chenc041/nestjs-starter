import { Repository } from 'typeorm';
import { LoggingEntity } from '~/entities/logging.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingRepository extends Repository<LoggingEntity> {}

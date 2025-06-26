import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import type { DictEntity } from '~/entities/dict.entity';

@Injectable()
export class DictRepository extends Repository<DictEntity> {}

import { DataSource, Repository } from 'typeorm';
import { DictEntity } from '~/entities/dict.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DictRepository extends Repository<DictEntity> {
  constructor(private dataSource: DataSource) {
    super(DictEntity, dataSource.createEntityManager());
  }
}

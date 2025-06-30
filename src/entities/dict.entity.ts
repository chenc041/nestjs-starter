import { Column, Entity } from 'typeorm';
import { BaseTable } from '~/entities/baseTable';

@Entity()
export class DictEntity extends BaseTable {
  @Column({
    type: 'varchar',
    length: 64,
    comment: '字典名称',
  })
  name: string;

  @Column({
    type: 'tinyint',
    comment: '字典状态， 1；启用，0；禁用',
    default: 0,
  })
  status: number;
}

import { Column, CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @CreateDateColumn({
    name: 'create_at',
    comment: '创建时间',
  })
  createAt: string;

  @Index()
  @UpdateDateColumn({
    name: 'update_at',
    comment: '更新时间',
  })
  updateAt: string;

  @Index()
  @Column({
    type: 'tinyint',
    default: 0,
    name: 'is_deleted',
    comment: '是否删除, 0: 未删除,1:已删除',
  })
  isDeleted: number;
}

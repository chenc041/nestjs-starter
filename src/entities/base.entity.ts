import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export abstract class BaseEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'create_at',
    comment: '创建时间',
  })
  createAt: string;

  @UpdateDateColumn({
    name: 'update_at',
    comment: '更新时间',
  })
  updateAt: string;
}

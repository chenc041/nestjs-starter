import {
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CustomBaseEntity {
  @Index()
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
}

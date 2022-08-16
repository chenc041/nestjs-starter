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

  @CreateDateColumn()
  createAt: string;

  @UpdateDateColumn()
  updateAt: string;
}

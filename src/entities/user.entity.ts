import { BaseEntity } from '~/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 128,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 64,
  })
  password: string;
}

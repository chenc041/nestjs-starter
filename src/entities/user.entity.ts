import { CustomBaseEntity } from '~/entities/customBase.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    length: 64,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 64,
  })
  password: string;
}

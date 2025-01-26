import { CustomBaseEntity } from '~/entities/customBase.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { LoggingEntity } from '~/entities/logging.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    length: 64,
    unique: true,
    comment: '用户名',
  })
  username: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 128,
  })
  password: string;

  @OneToMany(() => LoggingEntity, (loginLog) => loginLog.user)
  loginLogs: LoggingEntity[];
}

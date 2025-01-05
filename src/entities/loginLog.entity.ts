import { CustomBaseEntity } from '~/entities/customBase.entity';
import { Entity } from 'typeorm';

@Entity()
class LoginLogEntity extends CustomBaseEntity {
  ip: string;

  browser: string;

  userId: number;

  lastLoginTime: string;
}

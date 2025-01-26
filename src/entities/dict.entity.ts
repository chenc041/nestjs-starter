import { CustomBaseEntity } from '~/entities/customBase.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class DictEntity extends CustomBaseEntity {
  @Column()
  name: string;
  @Column()
  status: number;
}

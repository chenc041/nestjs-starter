import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '~/entities/customBase.entity';

@Entity()
export class DictEntity extends CustomBaseEntity {
	@Column()
	name: string;
	@Column()
	status: number;
}

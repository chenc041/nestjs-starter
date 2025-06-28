import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseTable } from '~/entities/baseTable';
import { LoggingEntity } from '~/entities/logging.entity';

@Entity()
export class UserEntity extends BaseTable {
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

	@OneToMany(
		() => LoggingEntity,
		(loginLog) => loginLog.user,
	)
	loginLogs: LoggingEntity[];
}

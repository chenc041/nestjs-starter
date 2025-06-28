import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseTable } from '~/entities/baseTable';
import { UserEntity } from '~/entities/user.entity';

@Entity()
export class LoggingEntity extends BaseTable {
	@Column({
		length: 64,
		type: 'varchar',
		comment: '访问ip',
	})
	ip: string;

	@Column({
		length: 128,
		comment: '请求地址',
	})
	url: string;

	@Column({
		length: 512,
		name: 'user_agent',
		comment: 'user agent',
	})
	userAgent: string;

	@Column({
		type: 'int',
		comment: '请求耗时; 单位: 毫秒',
	})
	duration: number;

	@Column({
		type: 'varchar',
		length: 32,
		comment: '请求参数类型',
	})
	method: string;

	@Column({
		type: 'simple-json',
		comment: '请求参数, get 类型',
	})
	query: object;

	@Column({
		type: 'simple-json',
		comment: '路由请求参数',
	})
	params: object;

	@Column({
		type: 'simple-json',
		comment: '请求参数, post,put 类型',
	})
	body: object;

	@ManyToOne(
		() => UserEntity,
		(user) => user.loginLogs,
		{
			createForeignKeyConstraints: false,
		},
	)
	@JoinColumn({
		name: 'userId',
	})
	user: UserEntity;
}

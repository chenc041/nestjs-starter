import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import type { UserEntity } from '~/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
	async findByName(name: string) {
		return await this.findOneBy({
			username: name,
			isDeleted: 0,
		});
	}
}

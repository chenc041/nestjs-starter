import { Injectable } from '@nestjs/common';
import type { FindOptionsWhere } from 'typeorm';
import type { UserEntity } from '~/entities/user.entity';
import type { UserRepository } from '~/modules/user/user.repository';

@Injectable()
export class UserService {
	constructor(private usersRepository: UserRepository) {}

	async createUser(payload: { username: string; password: string }) {
		return await this.usersRepository.save(payload);
	}

	async checkUserExist(payload: { username?: string; userId?: number }) {
		const where: FindOptionsWhere<UserEntity> = {};
		if (payload.username) {
			where.username = payload.username;
		}
		if (payload.userId) {
			where.id = payload.userId;
		}
		return await this.usersRepository.findOneBy(where);
	}

	async findUserById(userId: number) {
		return await this.usersRepository.findOneBy({ id: userId, is_deleted: 0 });
	}
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '~/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(payload: { username: string; password: string }) {
    return await this.usersRepository.save(payload);
  }

  async checkUserIsExist(payload: { username: string }) {
    return await this.usersRepository.findOneBy(payload);
  }
}

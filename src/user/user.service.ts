import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '~/entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly httpService: HttpService,
  ) {}

  async createUser(payload: { username: string; password: string }) {
    return await this.usersRepository.save(payload);
  }

  async checkUserIsExist(payload: { username: string }) {
    const where: FindOptionsWhere<UserEntity> = {};
    if (payload.username) {
      where.username = payload.username;
    }
    return await this.usersRepository.findOneBy(where);
  }
}

import { Injectable } from '@nestjs/common';
import { UserEntity } from '~/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  async findByName(name: string) {
    return await this.findOneBy({
      username: name,
      is_deleted: 0,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { UserEntity } from '~/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  async findByName(name: string) {
    return await this.findOneBy({
      username: name,
      is_deleted: 0,
    });
  }
}

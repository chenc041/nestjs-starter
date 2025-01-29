import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggingEntity } from '~/entities/logging.entity';
import { LoggingDto } from '~/modules/system/dto/logging.dto';
import { UserService } from '~/modules/user/user.service';
import { LoggingRepository } from '~/modules/system/logging/logging.repository';

@Injectable()
export class LoggingService {
  constructor(
    @InjectRepository(LoggingEntity)
    protected readonly loggingRepository: LoggingRepository,
    private readonly userService: UserService,
  ) {}

  /**
   * 保存日志信息
   * @param payload
   */
  async save(payload: LoggingDto) {
    const { userId } = payload;
    const user = await this.userService.findUserById(userId);
    return await this.loggingRepository.save({
      ...payload,
      user: user,
    });
  }

  /**
   * 获取日志列表
   */
  async list() {
    return await this.loggingRepository.find({
      relations: ['user'],
    });
  }

  /**
   * 获取日志详细
   * @param id
   */
  async detail(id: number): Promise<LoggingEntity> {
    return await this.loggingRepository.findOneBy({ id: id, is_deleted: 0 });
  }
}

import { Injectable } from '@nestjs/common';
import { Logging, Prisma } from '@/prisma';
import { PrismaService } from '~/setup/prisma/prisma.service';

@Injectable()
export class LoggingService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 保存日志信息
   * @param payload
   */
  async save(payload: Prisma.LoggingCreateInput) {
    return this.prisma.logging.create({
      data: payload,
    });
  }

  /**
   * 获取日志列表
   */
  async list() {
    return this.prisma.logging.findMany({
      include: {
        User: true,
      },
    });
  }

  /**
   * 获取日志详细
   * @param id
   */
  async detail(id: number): Promise<Logging> {
    return this.prisma.logging.findUnique({
      where: {
        id: id,
        isDeleted: false,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/setup/prisma/prisma.service';
import { Prisma, User } from '@/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(payload: { username: string; password: string }) {
    return this.prisma.user.create({
      data: payload,
    });
  }

  async checkUserExist(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
    });
  }
}

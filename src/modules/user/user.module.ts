import { Module } from '@nestjs/common';
import { UserController } from '~/modules/user/user.controller';
import { UserService } from '~/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '~/entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { JwtAuthService } from '~/config/jwt/jwt-auth.service';
import { UserRepository } from '~/modules/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HttpModule],
  controllers: [UserController],
  providers: [UserService, JwtAuthService, UserRepository],
  exports: [UserService],
})
export class UserModule {}

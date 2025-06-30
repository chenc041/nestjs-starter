import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthService } from '~/setup/jwt/jwt-auth.service';
import { UserEntity } from '~/entities/user.entity';
import { UserController } from '~/modules/user/user.controller';
import { UserRepository } from '~/modules/user/user.repository';
import { UserService } from '~/modules/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HttpModule],
  controllers: [UserController],
  providers: [UserService, JwtAuthService, UserRepository],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '~/entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from '~/config/jwt-config/jwt-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HttpModule],
  controllers: [UserController],
  providers: [UserService, JwtService, JwtConfigService],
  exports: [UserService],
})
export class UserModule {}

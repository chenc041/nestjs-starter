import { Module } from '@nestjs/common';
import { UserController } from 'src/user.module/customer/user.controller';
import { UserService } from 'src/user.module/customer/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '~/entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from '~/config.module/jwt-config/jwt-config.service';
import { ManageController } from './manage/manage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HttpModule],
  controllers: [UserController, ManageController],
  providers: [UserService, JwtService, JwtConfigService],
  exports: [UserService],
})
export class UserModule {}

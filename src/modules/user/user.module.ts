import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtAuthService } from '~/setup/jwt/jwt-auth.service';
import { UserController } from '~/modules/user/user.controller';
import { UserService } from '~/modules/user/user.service';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService, JwtAuthService],
  exports: [UserService],
})
export class UserModule {}

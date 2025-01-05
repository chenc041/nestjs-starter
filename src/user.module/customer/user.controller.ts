import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { UserService } from '~/user.module/customer/user.service';
import { JwtConfigService } from '~/config.module/jwt-config/jwt-config.service';
import { LoginDto } from '~/dtos/login.dto';
import {
  comparePassword,
  generatePassword,
  HttpResponse,
  HttpResponseType,
} from '~/utils';
import { omit } from 'lodash';
import { GetUser } from '~/decorators/user.decorator';
import { JwtAuthGuard } from '~/config.module/jwt-config/jwtAuth.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserType } from '~/base.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(
    private readonly jwt: JwtConfigService,
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('login')
  async login(
    @Body() user: LoginDto,
  ): Promise<HttpResponseType<{ token: string }>> {
    const userInfo = await this.userService.checkUserExist({
      username: user.username,
    });
    if (userInfo) {
      const match = await comparePassword(user.password, userInfo.password);
      if (match) {
        const { username, id } = userInfo;
        const { token } = await this.jwt.signToken({ username, userId: id });
        return new HttpResponse({
          data: {
            token,
          },
        });
      }
      return new HttpResponse({
        statusCode: 10002,
      });
    }
    return new HttpResponse({
      statusCode: 10001,
    });
  }

  @Post('register')
  async register(@Body() user: LoginDto) {
    const exist = await this.userService.checkUserExist({
      username: user.username,
    });
    if (exist) {
      return new HttpResponse({
        statusCode: 10003,
      });
    }
    const password = await generatePassword(user.password);
    const result = await this.userService.createUser({ ...user, password });
    return new HttpResponse({
      data: omit(result, 'password'),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('currentUser')
  async currentUser(@GetUser() user: UserType) {
    return new HttpResponse({
      data: omit(user, 'password'),
    });
  }

  @Get('logout')
  async logout() {
    return new HttpResponse({
      statusCode: 10000,
    });
  }

  @Get('log')
  log() {
    this.logger.warn('this is warn level');
    this.logger.debug('this is debug level');
    this.logger.info('this is info level');
    this.logger.error('this is error level');
    return 'log';
  }
}

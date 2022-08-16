import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '~/user/user.service';
import { JwtConfigService } from '~/config/jwt-config/jwt-config.service';
import { LoginDto } from '~/dtos/login.dto';
import {
  apiReturn,
  ApiReturnType,
  comparePassword,
  generatePassword,
} from '~/utils';
import { omit } from 'lodash';
import { User } from '~/decorators/user.decorator';
import { JwtAuthGuard } from '~/config/jwt-config/jwtAuth.guard';
import { SetCookies } from '~/decorators/cookies.decorator';
import { Response } from 'express';
import { AUTH_COOKIES_KEY } from '~/constants';

@Controller('user')
export class UserController {
  constructor(
    private readonly jwt: JwtConfigService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Body() user: LoginDto,
    @SetCookies() setCookie: Response,
  ): Promise<ApiReturnType<{ access_token: string }>> {
    const userInfo = await this.userService.checkUserIsExist({
      username: user.username,
    });
    if (userInfo) {
      const isMatch = await comparePassword(user.password, userInfo.password);
      if (isMatch) {
        const { username, id } = userInfo;
        const token = await this.jwt.signToken({ username, userId: id });
        setCookie.cookie(AUTH_COOKIES_KEY, token.access_token, {
          httpOnly: true,
        });
        return apiReturn({
          data: token,
        });
      }
      return apiReturn({
        statusCode: 10002,
      });
    } else {
      return apiReturn({
        statusCode: 10001,
      });
    }
  }

  @Post('register')
  async register(@Body() user: LoginDto) {
    const isExist = await this.userService.checkUserIsExist({
      username: user.username,
    });
    if (isExist) {
      return apiReturn({
        statusCode: 10003,
      });
    }
    const password = await generatePassword(user.password);
    const result = await this.userService.createUser({ ...user, password });
    return apiReturn({
      data: result,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('currentUser')
  async currentUser(@User() user: any) {
    return apiReturn({
      data: omit(user, 'password'),
    });
  }

  @Get('logout')
  async logout(@SetCookies() setCookie: Response) {
    setCookie.cookie(AUTH_COOKIES_KEY, '', {
      expires: new Date(0),
    });
    return apiReturn({
      statusCode: 10000,
    });
  }
}

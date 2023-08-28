import {
  Res,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { UserService } from '~/user/user.service';
import { JwtConfigService } from '~/config/jwt-config/jwt-config.service';
import { LoginDto } from '~/dtos/login.dto';
import {
  HttpReturn,
  HttpReturnType,
  comparePassword,
  generatePassword,
} from '~/utils';
import { omit } from 'lodash';
import { GetUser } from '~/decorators/user.decorator';
import { JwtAuthGuard } from '~/config/jwt-config/jwtAuth.guard';
import { AUTH_COOKIES_KEY } from '~/constants';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { Cache } from 'cache-manager';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { UserType } from '~/base.type';
import { FastifyReply } from 'fastify';

@Controller('user')
export class UserController {
  constructor(
    private readonly jwt: JwtConfigService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('login')
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<HttpReturnType<{ token: string }>> {
    const userInfo = await this.userService.checkUserExist({
      username: user.username,
    });
    if (userInfo) {
      const match = await comparePassword(user.password, userInfo.password);
      if (match) {
        const { username, id } = userInfo;
        const { token } = await this.jwt.signToken({ username, userId: id });
        response.setCookie(AUTH_COOKIES_KEY, token, {
          httpOnly: true,
        });
        return HttpReturn({
          data: {
            token,
          },
        });
      }
      return HttpReturn({
        statusCode: 10002,
      });
    }
    return HttpReturn({
      statusCode: 10001,
    });
  }

  @Post('register')
  async register(@Body() user: LoginDto) {
    const exist = await this.userService.checkUserExist({
      username: user.username,
    });
    if (exist) {
      return HttpReturn({
        statusCode: 10003,
      });
    }
    const password = await generatePassword(user.password);
    const result = await this.userService.createUser({ ...user, password });
    return HttpReturn({
      data: omit(result, 'password'),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('currentUser')
  async currentUser(@GetUser() user: UserType) {
    return HttpReturn({
      data: omit(user, 'password'),
    });
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: FastifyReply) {
    response.setCookie(AUTH_COOKIES_KEY, '', {
      expires: new Date(0),
    });
    return HttpReturn({
      statusCode: 10000,
    });
  }

  @Get('cache')
  async cache() {
    await this.cacheManager.set('test', 'chenc');
    return await this.cacheManager.get('test');
  }

  @Get('log')
  log() {
    this.logger.warn('this is warn level');
    this.logger.debug('this is debug level');
    this.logger.info('this is info level');
    this.logger.error('this is error level');
    return 'log';
  }

  @UseInterceptors(CacheInterceptor) // auto cache
  @Get('http')
  http(): Observable<Record<any, any>> {
    return this.httpService
      .get('https://api.github.com/users/chenc041')
      .pipe(map((val) => val.data));
  }
}

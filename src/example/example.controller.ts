import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtConfigService } from '~/config/jwt-config/jwt-config.service';
import { User } from '~/decorators/user.decorator';
import { JwtAuthGuard } from '~/config/jwt-config/jwtAuth.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { ExampleService } from '~/example/example.service';
import { LoginDto } from '~/dtos/login.dto';

@Controller('example')
export class ExampleController {
  constructor(
    private readonly jwt: JwtConfigService,
    private readonly exampleService: ExampleService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('login')
  login(@Body() login: LoginDto) {
    console.log(login, 'login');
    return this.jwt.login(login);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current/user')
  currentUser(@User() user) {
    return user;
  }

  @Get('env')
  getFromEnv() {
    const env = this.configService.get('NODE_ENV');
    return {
      env,
    };
  }

  @Get('env/file')
  getFromEnvFile() {
    const name = this.configService.get('NAME');
    return {
      name,
    };
  }

  @Get('info/log')
  recordInfoLog() {
    this.logger.info('hello, info');
    return {
      log: 'info',
    };
  }

  @Get('error/log')
  recordErrorLog() {
    this.logger.error('ops');
    return {
      log: 'error',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('create/user')
  async createUser(@Body() user: { name: string; id?: number }) {
    return await this.exampleService.createOrUpdateUser(user);
  }
}

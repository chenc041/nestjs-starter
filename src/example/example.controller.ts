import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { JwtConfigService } from 'src/config/jwt-config/jwt-config.service';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/config/jwt-config/jwtAuth.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';

@Controller('example')
export class ExampleController {
  constructor(
    private readonly jwt: JwtConfigService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('login')
  login() {
    return this.jwt.login({ username: '1', userId: '2' });
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
}

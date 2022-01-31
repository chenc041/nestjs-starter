import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { JwtConfigService } from 'src/config/jwt-config/jwt-config.service';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/config/jwt-config/jwtAuth.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('example')
export class ExampleController {
  constructor(
    private readonly jwt: JwtConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('login')
  login() {
    return this.jwt.login({ username: '1', userId: '2' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('current/user')
  currentUser(@User() user) {
    this.logger.info('12');
    this.logger.error('ops');
    return user;
  }
}

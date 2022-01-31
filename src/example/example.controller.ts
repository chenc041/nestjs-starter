import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtConfigService } from 'src/config/jwt-config/jwt-config.service';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/config/jwt-config/jwtAuth.guard';

@Controller('example')
export class ExampleController {
  constructor(private readonly jwt: JwtConfigService) {}

  @Get('login')
  login() {
    return this.jwt.login({ username: '1', userId: '2' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('current/user')
  currentUser(@User() user) {
    return user;
  }
}

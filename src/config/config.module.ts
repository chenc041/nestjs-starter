import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from './winston-config/winston-config.service';
import { JwtConfigService } from './jwt-config/jwt-config.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/config/jwt-config/jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy, JwtConfigService, WinstonConfigService],
  exports: [JwtConfigService, WinstonConfigService],
})
export class ConfigModule {}

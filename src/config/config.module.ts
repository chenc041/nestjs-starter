import { CacheModule, Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from '~/config/winston-config/winston-config.service';
import { JwtConfigService } from './jwt-config/jwt-config.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '~/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '~/config/jwt-config/jwt.strategy';
import { ConfigModule as LoadEnvModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmConfigService } from '~/config/typeorm-config/typeorm-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    HttpModule,
    /**
     * default cache store is in-memory cache
     * if you want using other cache store, please read docs https://docs.nestjs.com/techniques/caching#different-stores
     */
    CacheModule.register({
      isGlobal: true,
      ttl: 3600 * 2,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    LoadEnvModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(
          __dirname,
          '..',
          `../.${process.env.NODE_ENV || 'development'}.env`,
        ),
      ],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [JwtStrategy, JwtConfigService, WinstonConfigService],
  exports: [JwtConfigService, WinstonConfigService],
})
export class ConfigModule {}

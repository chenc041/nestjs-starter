import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from '~/config/winston-config/winston-config.service';
import { JwtConfigService } from './jwt-config/jwt-config.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule as LoadEnvModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmConfigService } from '~/config/typeorm-config/typeorm-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import * as process from 'process';

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
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          signOptions: { expiresIn: configService.get<string>('JWT_EXPIRED') },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtConfigService, WinstonConfigService, JwtService],
  exports: [JwtConfigService, WinstonConfigService, JwtService],
})
export class ConfigModule {}

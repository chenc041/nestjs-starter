import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from '~/config/winston-config/winston-config.service';
import { JwtConfigService } from './jwt-config/jwt-config.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule as LoadEnvModule } from '@nestjs/config';
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
     * TTL is milliseconds
     */
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60 * 1000,
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
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
    JwtModule.register({}),
  ],
  providers: [JwtConfigService, WinstonConfigService, JwtService],
  exports: [JwtConfigService, WinstonConfigService, JwtService],
})
export class ConfigModule {}

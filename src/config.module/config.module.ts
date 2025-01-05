import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from '~/config.module/winston-config/winston-config.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule as LoadEnvModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmConfigService } from '~/config.module/typeorm-config/typeorm-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';

@Global()
@Module({
  imports: [
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
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class ConfigModule {}

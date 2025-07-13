import { join } from 'node:path';
import * as process from 'node:process';
import { Global, Module } from '@nestjs/common';
import { ConfigModule as LoadEnvModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from '~/setup/winston/winston-config.service';
import { PrismaService } from '~/setup/prisma/prisma.service';

@Global()
@Module({
  imports: [
    LoadEnvModule.forRoot({
      isGlobal: true,
      envFilePath: [join(__dirname, '..', `../.${process.env.NODE_ENV || 'development'}.env`)],
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [PrismaService],
  providers: [PrismaService],
})
export class SetupModule {}

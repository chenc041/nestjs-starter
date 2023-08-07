import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { WinstonModule } from 'nest-winston';
import { ConfigModule as LoadEnvModule, ConfigService } from '@nestjs/config';
import { WinstonConfigService } from '~/config/winston-config/winston-config.service';
import { JwtConfigService } from '~/config/jwt-config/jwt-config.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import * as process from 'process';

const { register: PassportRegister } = PassportModule;

export const TypeOrmTestingModule = ({
  controllers,
  providers,
  entities,
}: {
  controllers: any[];
  providers: any[];
  entities: any[];
}) => {
  return {
    imports: [
      HttpModule,
      CacheModule.register({
        isGlobal: true,
      }),
      TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        entities: [join(__dirname, '../src/entities/*.entity.{ts,js}')],
      }),
      TypeOrmModule.forFeature(entities),
      JwtModule.registerAsync({
        useFactory: async (configService: ConfigService) => {
          return {
            signOptions: {
              expiresIn: configService.get<string>('JWT_EXPIRED'),
            },
          };
        },
        inject: [ConfigService],
      }),
      LoadEnvModule.forRoot({
        isGlobal: true,
        envFilePath: [
          join(__dirname, `../.${process.env.NODE_ENV || 'development'}.env`),
        ],
      }),
      PassportRegister({ defaultStrategy: 'jwt' }),
      WinstonModule.forRootAsync({
        useClass: WinstonConfigService,
      }),
    ],
    controllers: controllers,
    providers: [
      JwtConfigService,
      WinstonConfigService,
      JwtService,
      ...providers,
    ],
  };
};

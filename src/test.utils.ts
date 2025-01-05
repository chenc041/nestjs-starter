import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { WinstonModule } from 'nest-winston';
import { ConfigModule as LoadEnvModule } from '@nestjs/config';
import { WinstonConfigService } from '~/config.module/winston-config/winston-config.service';
import { JwtConfigService } from '~/config.module/jwt-config/jwt-config.service';
import { HttpModule } from '@nestjs/axios';
import * as process from 'process';

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
      TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        entities: [join(__dirname, '../src/entities/*.entity.{ts,js}')],
      }),
      TypeOrmModule.forFeature(entities),
      JwtModule.register({
        global: true,
      }),
      LoadEnvModule.forRoot({
        isGlobal: true,
        envFilePath: [
          join(__dirname, `../.${process.env.NODE_ENV || 'development'}.env`),
        ],
      }),
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

import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { WinstonModule } from 'nest-winston';
import { ConfigModule as LoadEnvModule } from '@nestjs/config';
import { WinstonConfigService } from '~/config/winston/winston-config.service';
import { JwtAuthService } from '~/config/jwt/jwt-auth.service';
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
        envFilePath: [join(__dirname, `../.${process.env.NODE_ENV || 'development'}.env`)],
      }),
      WinstonModule.forRootAsync({
        useClass: WinstonConfigService,
      }),
    ],
    controllers: controllers,
    providers: [JwtAuthService, WinstonConfigService, ...providers],
  };
};

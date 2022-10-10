import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '~/constants';
import { PassportModule } from '@nestjs/passport';
import { WinstonModule } from 'nest-winston';
import { ConfigModule as LoadEnvModule } from '@nestjs/config';
import { WinstonConfigService } from '~/config/winston-config/winston-config.service';
import { JwtConfigService } from '~/config/jwt-config/jwt-config.service';
import { JwtStrategy } from '~/config/jwt-config/jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/common';

const { register: jwtRegister } = JwtModule;
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
      jwtRegister({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '10h' },
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
      JwtStrategy,
      ...providers,
    ],
  };
};

import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '~/constants';
import { ConfigModule as LoadEnvModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from '~/config/winston-config/winston-config.service';
import { JwtConfigService } from '~/config/jwt-config/jwt-config.service';

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
      TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        entities: [join(__dirname, '../../entities/*.entity.{ts,js}')],
      }),
      TypeOrmModule.forFeature(entities),
      jwtRegister({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '10h' },
      }),
      LoadEnvModule.forRoot({
        isGlobal: true,
        envFilePath: [
          join(
            __dirname,
            '..',
            `../../env/.${process.env.NODE_ENV || 'development'}.env`,
          ),
        ],
      }),
      PassportRegister({ defaultStrategy: 'jwt' }),
      WinstonModule.forRootAsync({
        useClass: WinstonConfigService,
      }),
    ],
    controllers: controllers,
    providers: [JwtConfigService, WinstonConfigService, ...providers],
  };
};

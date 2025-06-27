import { join } from 'node:path';
import * as process from 'node:process';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule as LoadEnvModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { WinstonModule } from 'nest-winston';
import { JwtAuthService } from '~/config/jwt/jwt-auth.service';
import { WinstonConfigService } from '~/config/winston/winston-config.service';
import type { Type } from '@nestjs/common';

export const TypeOrmTestingModule = ({
	controllers,
	providers,
	entities,
}: {
	controllers: Type<unknown>[];
	providers: Type<unknown>[];
	entities: EntityClassOrSchema[];
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

import { join } from 'node:path';
import * as process from 'node:process';
import { Module } from '@nestjs/common';
import { ConfigModule as LoadEnvModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from '~/setup/winston/winston-config.service';

@Module({
	imports: [
		LoadEnvModule.forRoot({
			isGlobal: true,
			envFilePath: [join(__dirname, '..', `../.${process.env.NODE_ENV || 'development'}.env`)],
		}),
		TypeOrmModule.forRootAsync({
			useFactory: async (configService: ConfigService) => {
				return {
					type: 'mysql',
					host: configService.get('DB_HOST'),
					port: +configService.get('DB_PORT'),
					username: configService.get('DB_USERNAME'),
					password: configService.get('DB_PASSWORD'),
					database: configService.get('DB_NAME'),
					synchronize: configService.get('DB_TYPEORM_SYNC') === 'true',
					logging: configService.get('DB_TYPEORM_LOG') === 'true',
					entities: [`dist/entities/*.entity{.ts,.js}`],
				};
			},
			inject: [ConfigService],
		}),
		WinstonModule.forRootAsync({
			useClass: WinstonConfigService,
			inject: [ConfigService],
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
})
export class SetupModule {}

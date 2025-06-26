import { join } from 'node:path';
import * as process from 'node:process';
import { Global, Module } from '@nestjs/common';
import { ConfigService, ConfigModule as LoadEnvModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { TypeOrmConfigService } from '~/config/typeorm/typeorm-config.service';
import { WinstonConfigService } from '~/config/winston/winston-config.service';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfigService,
		}),
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
})
export class ConfigModule {}

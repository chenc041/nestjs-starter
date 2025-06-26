import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '~/common/interceptor/logging.interceptor';
import { ConfigModule } from '~/config/config.module';
import { LoggingService } from '~/modules/system/logging/logging.service';
import { SystemModule } from '~/modules/system/system.module';
import { UserModule } from '~/modules/user/user.module';

@Module({
	imports: [ConfigModule, UserModule, SystemModule],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useFactory: (loggingService: LoggingService) => {
				return new LoggingInterceptor(loggingService);
			},
			inject: [LoggingService],
		},
	],
})
export class AppModule {}

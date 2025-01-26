import { Module } from '@nestjs/common';
import { ConfigModule } from '~/config/config.module';
import { UserModule } from '~/modules/user/user.module';
import { SystemModule } from '~/modules/system/system.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '~/common/interceptor/logging.interceptor';
import { LoggingService } from '~/modules/system/logging/logging.service';

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

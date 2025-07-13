import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '~/common/interceptor/logging.interceptor';
import { SetupModule } from '~/setup/setup.module';
import { SystemModule } from '~/modules/system/system.module';
import { UserModule } from '~/modules/user/user.module';
import { PrismaService } from '~/setup/prisma/prisma.service';

@Module({
  imports: [SetupModule, UserModule, SystemModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: (prismaService: PrismaService) => {
        return new LoggingInterceptor(prismaService);
      },
      inject: [PrismaService],
    },
  ],
})
export class AppModule {}

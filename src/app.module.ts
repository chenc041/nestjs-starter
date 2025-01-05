import { Module } from '@nestjs/common';
import { ConfigModule } from '~/config.module/config.module';
import { UserModule } from '~/user.module/user.module';
import { SystemModule } from '~/system.module/system.module';

@Module({
  imports: [ConfigModule, UserModule, SystemModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '~/config/config.module';
import { ExampleModule } from '~/example/example.module';

@Module({
  imports: [ConfigModule, ExampleModule],
})
export class AppModule {}

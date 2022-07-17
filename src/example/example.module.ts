import { Module } from '@nestjs/common';
import { ExampleController } from '~/example/example.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '~/entities/user.entity';
import { ExampleService } from '~/example/example.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}

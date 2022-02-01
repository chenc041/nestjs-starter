import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ExampleService } from './example.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}

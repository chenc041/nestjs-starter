import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

export class LoggingDto {
  @ApiProperty()
  @IsString()
  ip: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsString()
  query: object;

  @ApiProperty()
  @IsString()
  params: object;

  @ApiProperty()
  @IsString()
  body: object;

  @ApiProperty()
  @IsObject()
  userAgent: string;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  method: string;
}

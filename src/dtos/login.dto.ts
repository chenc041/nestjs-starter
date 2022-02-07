import { IsString, IsNumber } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @IsNumber()
  userId: number;
}

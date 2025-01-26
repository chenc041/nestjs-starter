import { IsInt, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  page: number;

  @IsInt()
  @IsPositive()
  @Min(1)
  limit: number;
}

import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class NutriScoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

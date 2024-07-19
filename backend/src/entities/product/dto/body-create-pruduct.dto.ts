import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsJSON,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { NutriScoreDto } from './nutritiscore.dto';
import { Type } from 'class-transformer';

export class BodyCreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  urlBannerImage: string;

  @IsNumber()
  @IsNotEmpty()
  categoryProductId: number;

  @IsNumber()
  @IsNotEmpty()
  conservationTime: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NutriScoreDto)
  nutriscore: NutriScoreDto[];

  @IsNumber()
  @IsNotEmpty()
  harvestStartMounth: number;

  @IsNumber()
  @IsNotEmpty()
  harvestEndMounth: number;
}

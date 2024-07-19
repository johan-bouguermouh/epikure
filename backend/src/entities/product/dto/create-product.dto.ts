import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsJSON,
  IsObject,
} from 'class-validator';
import { NutriScoreDto } from './nutritiscore.dto';
import { CategoryProduct } from 'src/entities/category-product/category-product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsNumber()
  @IsNotEmpty()
  urlBannerImage: string;

  @IsObject()
  categoryProduct: CategoryProduct;

  @IsNumber()
  @IsNotEmpty()
  conservationTime: number;

  @IsJSON()
  nutriscore: NutriScoreDto[];

  @IsNumber()
  @IsNotEmpty()
  harvestStartMounth: number;

  @IsNumber()
  @IsNotEmpty()
  harvestEndMounth: number;
}

import { Expose } from 'class-transformer';
import { NutriScoreDto } from './nutritiscore.dto';
import { CategoryProduct } from 'src/entities/category-product/category-product.entity';
import { PublicPlaceDto } from 'src/entities/place/dto/public-place.dto';
import { Product } from '../product.entity';

export class InfoProductDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  nutriscore: NutriScoreDto[];

  @Expose()
  categoryProduct: CategoryProduct;

  @Expose()
  harvestStartMounth: number;

  @Expose()
  harvestEndMounth: number;

  @Expose()
  thumbnail: string;

  @Expose()
  urlBannerImage: string;

  @Expose()
  conservationTime: number;

  @Expose()
  findPlaces: PublicPlaceDto[];

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}

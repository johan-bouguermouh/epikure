import { Exclude, Expose } from 'class-transformer';
import { CategoryProduct } from 'src/entities/category-product/category-product.entity';
import { Product } from '../product.entity';
import { NutriScoreDto } from './nutritiscore.dto';
import { CommandProduct } from 'src/entities/command-product/command-product.entity';
import { Guest } from 'src/entities/guest/guest.entity';

class PublicProductDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  categoryProduct: CategoryProduct;

  @Expose()
  thumbnail: string;

  @Exclude()
  harvestStartMounth: Number;

  @Exclude()
  harvestEndMounth: Number;

  @Exclude()
  conservationTime: Number;

  @Exclude()
  nutriscore: NutriScoreDto[];

  @Exclude()
  commandProducts: CommandProduct[];

  @Exclude()
  guests: Guest[];

  setPublicProduct(product: Product): void {
    const { id, name, categoryProduct, thumbnail } = product;
    this.id = id;
    this.name = name;
    this.categoryProduct = categoryProduct;
    this.thumbnail = thumbnail;
  }

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}

export { PublicProductDto };

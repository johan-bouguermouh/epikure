import { Module } from '@nestjs/common';
import { categoryProductProviders } from './category-product.provider';
import { CategoryProductService } from './category-product.service';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryProductController } from './category-product.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...categoryProductProviders, CategoryProductService],
  controllers: [CategoryProductController],
})
export class CategoryProductModule {}

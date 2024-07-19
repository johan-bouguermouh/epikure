import { Module } from '@nestjs/common';
import { productProviders } from './product.provider';
import { ProductService } from './product.service';
import { DatabaseModule } from 'src/database/database.module';
import { ProductController } from './product.controller';
import { categoryProductProviders } from '../category-product/category-product.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...productProviders, ProductService, ...categoryProductProviders],
  controllers: [ProductController],
  exports: [...productProviders, ProductService],
})
export class ProductModule {}

import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryProduct } from './category-product.entity';

@Injectable()
export class CategoryProductService {
  constructor(
    @Inject('CATEGORY_PRODUCT_REPOSITORY')
    private categoryProductRepository: Repository<CategoryProduct>,
  ) {}

  async create(name: string): Promise<CategoryProduct> {
    const categoryProduct = new CategoryProduct();
    categoryProduct.name = name;

    return this.categoryProductRepository.save(categoryProduct);
  }

  async findAll(): Promise<CategoryProduct[]> {
    return this.categoryProductRepository.find();
  }
}

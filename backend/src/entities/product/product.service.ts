import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CategoryProduct } from '../category-product/category-product.entity';
import { BodyCreateProductDto } from './dto/body-create-pruduct.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,

    @Inject('CATEGORY_PRODUCT_REPOSITORY')
    private categoryProductRepository: Repository<CategoryProduct>,
  ) {}

  async create(BodyCreateProduct: BodyCreateProductDto): Promise<Product> {
    const { categoryProductId, ...productData } = BodyCreateProduct;
    const categoryProduct: CategoryProduct =
      await this.categoryProductRepository.findOne({
        where: { id: categoryProductId },
      });
    const product = new Product();
    product.setProduct({ ...productData, categoryProduct } as CreateProductDto);

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }
}

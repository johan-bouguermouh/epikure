import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CategoryProduct } from '../category-product/category-product.entity';
import { BodyCreateProductDto } from './dto/body-create-pruduct.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { plainToClass } from 'class-transformer';
import { ClassDeclaration } from 'typescript';
import { PublicProductDto } from './dto/public-product.dto';

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
    return this.productRepository.find({
      relations: ['categoryProduct'],
    });
  }

  async findAllBySeason(season?: number): Promise<PublicProductDto[]> {
    const dateNow = new Date();
    season = season ? season : dateNow.getMonth();

    console.log('season', season);

    const products = await this.productRepository.find({
      relations: ['categoryProduct'],
    });

    const filteredProducts = filterProductByPeriodHarvest(products, season);

    console.log('filteredProducts', filteredProducts);

    return filteredProducts.map((product) => new PublicProductDto(product));
  }

  async insertCategoryProduct(name: string): Promise<CategoryProduct> {
    const categoryProduct = new CategoryProduct();
    categoryProduct.name = name;
    return this.categoryProductRepository.save(categoryProduct);
  }

  async findAllCategoryProduct(): Promise<CategoryProduct[]> {
    return this.categoryProductRepository.find();
  }
}

export function filterProductByPeriodHarvest(
  products: Product[],
  month?: number,
): Product[] {
  const dateNow = new Date();
  const numberMonthNow = month ? month : dateNow.getMonth();

  const filteredProducts: Product[] = products.filter((product) => {
    if (
      product.harvestStartMounth.valueOf() <= numberMonthNow &&
      product.harvestEndMounth.valueOf() >= numberMonthNow
    ) {
      return product;
    }
  });

  return filteredProducts;
}

export function sanitizeToPublicProduct(
  products: Product[],
): PublicProductDto[] {
  return products.map((product) => {
    const publicProduct = new PublicProductDto(product);
    return publicProduct;
  });
}

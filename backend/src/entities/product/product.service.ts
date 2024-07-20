import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CategoryProduct } from '../category-product/category-product.entity';
import { BodyCreateProductDto } from './dto/body-create-pruduct.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { plainToClass } from 'class-transformer';

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

  async insertCategoryProduct(name: string): Promise<CategoryProduct> {
    const categoryProduct = new CategoryProduct();
    categoryProduct.name = name;
    return this.categoryProductRepository.save(categoryProduct);
  }

  async findAllCategoryProduct(): Promise<CategoryProduct[]> {
    return this.categoryProductRepository.find();
  }

  filterProductByPeriodHarvest(
    products: Product[],
    ProductDto?: new () => any,
  ): Product[] | any[] {
    const dateNow = new Date();
    const numberMounthNow = dateNow.getMonth();

    const filteredProducts = products.filter((product) => {
      if (
        product.harvestStartMounth.valueOf() <= numberMounthNow &&
        product.harvestEndMounth.valueOf() >= numberMounthNow
      ) {
        return product;
      }
    });

    if (ProductDto) {
      return filteredProducts.map((product) =>
        plainToClass(ProductDto, product),
      );
    }

    return filteredProducts;
  }
}

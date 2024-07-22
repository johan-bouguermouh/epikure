import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { BodyCreateProductDto } from './dto/body-create-pruduct.dto';
import { CategoryProduct } from '../category-product/category-product.entity';
import { PublicProductDto } from './dto/public-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() bodyCreateProductDto: BodyCreateProductDto,
  ): Promise<Product> {
    return this.productService.create(bodyCreateProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/season')
  async findAllBySeason(
    @Query('month') month: number,
  ): Promise<PublicProductDto[]> {
    return this.productService.findAllBySeason(month);
  }

  @Post('/category')
  async addCategoryProduct(
    @Body() body: { name: string },
  ): Promise<CategoryProduct> {
    return this.productService.insertCategoryProduct(body.name);
  }

  @Get('/category')
  async findAllCategoryProduct(): Promise<CategoryProduct[]> {
    return this.productService.findAllCategoryProduct();
  }
}
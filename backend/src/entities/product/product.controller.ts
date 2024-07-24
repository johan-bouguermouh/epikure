import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { BodyCreateProductDto } from './dto/body-create-pruduct.dto';
import { CategoryProduct } from '../category-product/category-product.entity';
import { PublicProductDto } from './dto/public-product.dto';
import { Coordinates } from 'src/utils/distance.service';
import { InfoProductDto } from './dto/info-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/category')
  async findAllCategoryProduct(): Promise<CategoryProduct[]> {
    return this.productService.findAllCategoryProduct();
  }

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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ): Promise<InfoProductDto | Product> {
    if (!latitude || !longitude) {
      return this.productService.findOne(id);
    } else {
      const coord: Coordinates = { latitude, longitude };
      return this.productService.findOne(id, coord);
    }
  }

  @Post('/category')
  async addCategoryProduct(
    @Body() body: { name: string },
  ): Promise<CategoryProduct> {
    return this.productService.insertCategoryProduct(body.name);
  }
}

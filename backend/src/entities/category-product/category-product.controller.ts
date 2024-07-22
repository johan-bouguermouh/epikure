import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { CategoryProduct } from './category-product.entity';

@Controller('category-product')
export class CategoryProductController {
  constructor(
    private readonly categoryProductService: CategoryProductService,
  ) {}

  @Post()
  async create(
    @Body() bodyCreateCategoryProductDto: { name: string },
  ): Promise<CategoryProduct> {
    return this.categoryProductService.create(
      bodyCreateCategoryProductDto.name,
    );
  }

  @Get()
  async findAll(): Promise<CategoryProduct[]> {
    return this.categoryProductService.findAll();
  }
}

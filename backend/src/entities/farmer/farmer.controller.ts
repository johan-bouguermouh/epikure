import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { FarmerService } from './farmer.services';
import { Farmer } from './farmer.entity';
import { GetIforFarmerDto } from './dto/get-ifor-farmer.dto';
import { BodyCreateFarmerDto } from './dto/body-create-farmer.dto';
import { BodyUpdateProductFarmerDto } from './dto/body-update-product-farme.dto';
import { query } from 'express';
import { Coordinates } from 'src/utils/distance.service';
import { Public } from 'src/decorator/public-acess.decorator';

@Controller('farmer')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Post()
  async create(
    @Body() BodyCreateFarmerDto: BodyCreateFarmerDto,
  ): Promise<Farmer> {
    return this.farmerService.create(BodyCreateFarmerDto);
  }

  @Get()
  async findAll(): Promise<Farmer[]> {
    return this.farmerService.findAll();
  }

  @Post('info')
  async getInfoFarmer(@Body() body: GetIforFarmerDto): Promise<any> {
    return await this.farmerService.getInfoFarmer(
      body.denomination,
      body.siretOrSiren,
    );
  }

  @Put('products')
  async updateProductFarmer(
    @Body() body: BodyUpdateProductFarmerDto,
  ): Promise<Farmer> {
    return await this.farmerService.updateFarmerProducts(body);
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/public/:id')
  async getPublicFarmer(
    @Param('id') id: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ): Promise<any> {
    const coord: Coordinates = { latitude, longitude };
    return await this.farmerService.getPublicFarmer(id, coord);
  }

  @Public()
  @Get(':id/products')
  async getProducts(@Param('id') id: number): Promise<any> {
    return await this.farmerService.getProducts(id);
  }

  @Public()
  @Get(':id/places')
  async getPlaces(@Param('id') id: number): Promise<any> {
    return await this.farmerService.getPlaces(id);
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farme.dto';
import { FarmerService } from './farmer.services';
import { Farmer } from './farmer.entity';
import { GetIforFarmerDto } from './dto/get-ifor-farmer.dto';
import { BodyCreateFarmerDto } from './dto/body-create-farmer.dto';

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
      body.siretorSiren,
    );
  }
}

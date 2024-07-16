import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { PlaceService } from './place.service.dto';
import { Place } from './place.entity';
import { BodyCreatePlaceDto } from './dto/body-create-place.dto';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  async create(@Body() bodyCreatePlace: BodyCreatePlaceDto): Promise<string> {
    return this.placeService.create(bodyCreatePlace);
  }

  @Get()
  async findAll(): Promise<Place[]> {
    return this.placeService.findAll();
  }
}

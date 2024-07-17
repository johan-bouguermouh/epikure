import { Controller, Get, Post, Body, Put, Query, Param } from '@nestjs/common';
import { PlaceService } from './place.service';
import { Place } from './place.entity';
import { BodyCreatePlaceDto } from './dto/body-create-place.dto';
import { QueryParamsAutocompleteDto } from './dto/query-params-autocomplete.dto';
import { QueryParamsPlaceIdDto } from './dto/query-params-placeid.dto';

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

  @Get('auto-complete')
  async getAutoCompletePlace(
    @Query() params: QueryParamsAutocompleteDto,
  ): Promise<any> {
    return this.placeService.getAutoCompletePlace(params);
  }

  @Get('details/:placeId')
  async getDetailsPlace(@Param() params: QueryParamsPlaceIdDto): Promise<any> {
    return this.placeService.getPlaceByPlaceId(params);
  }
}

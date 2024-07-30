import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Query,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { Place } from './place.entity';
import { BodyCreatePlaceDto } from './dto/body-create-place.dto';
import { QueryParamsAutocompleteDto } from './dto/query-params-autocomplete.dto';
import { QueryParamsPlaceIdDto } from './dto/query-params-placeid.dto';
import { PublicPlaceDto } from './dto/public-place.dto';
import { Farmer } from '../farmer/farmer.entity';
import { Public } from 'src/decorator/public-acess.decorator';

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

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('map')
  async findAllMap(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ): Promise<PublicPlaceDto[]> {
    return this.placeService.findAllByPosition(latitude, longitude);
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<Place> {
    return this.placeService.findOne(id);
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/info/:id')
  async getPlaceInfo(@Param('id') id: number): Promise<any> {
    return this.placeService.getPlaceInfo(id);
  }

  @Get('auto-complete')
  async getAutoCompletePlace(
    @Query() params: QueryParamsAutocompleteDto,
  ): Promise<any> {
    return this.placeService.getAutoCompletePlace(params);
  }

  @Public()
  @Get('details/:placeId')
  async getDetailsPlace(@Param() params: QueryParamsPlaceIdDto): Promise<any> {
    return this.placeService.getPlaceByPlaceId(params);
  }
}

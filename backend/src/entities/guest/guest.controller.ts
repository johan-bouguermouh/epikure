import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  Delete,
} from '@nestjs/common';
import { GuestService } from './guest.service';
import { Guest } from './guest.entity';
import { CreateGuestDto } from './dto/create-guest.dto';
import { PublicFarmerDto } from '../farmer/dto/public-farmer.dto';
import { BodyGuestAddProductDto } from './dto/body-add-product.dto';
import { PublicProductDto } from '../product/dto/public-product.dto';
import { BodyGuestAddPlaceDto } from './dto/body-add-place.dto';
import { PublicPlaceDto } from '../place/dto/public-place.dto';
import { BodyGuestAddFarmerDto } from './dto/body-add-farmer.dto';
import { Public } from 'src/decorator/public-acess.decorator';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post()
  async create(@Body() uuid: CreateGuestDto): Promise<Guest> {
    return this.guestService.create(uuid);
  }

  @Public()
  @Get()
  async findAll(): Promise<Guest[]> {
    return this.guestService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<Guest> {
    return this.guestService.findOne(uuid);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':uuid/products')
  async findProducts(@Param('uuid') uuid: string): Promise<PublicProductDto[]> {
    return this.guestService.findProducts(uuid);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':uuid/places')
  async findPlaces(
    @Param('uuid') uuid: string,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ): Promise<PublicPlaceDto[]> {
    return this.guestService.findPlaces(uuid, latitude, longitude);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':uuid/farmers')
  async findFarmers(
    @Param('uuid') uuid: string,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ): Promise<PublicFarmerDto[]> {
    return this.guestService.findFarmers(uuid, latitude, longitude);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':uuid/products')
  async guestAddOneProduct(
    @Param('uuid') uuid: string,
    @Body() body: BodyGuestAddProductDto,
  ): Promise<PublicProductDto> {
    const { productId } = body;
    return this.guestService.addFavoriteProduct(uuid, productId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':uuid/places')
  async guestAddOnePlace(
    @Param('uuid') uuid: string,
    @Body() body: BodyGuestAddPlaceDto,
  ): Promise<PublicPlaceDto> {
    body;
    return this.guestService.addFavoritePlace(uuid, body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':uuid/farmers')
  async guestAddOneFarmer(
    @Param('uuid') uuid: string,
    @Body() body: BodyGuestAddFarmerDto,
  ): Promise<PublicFarmerDto> {
    return this.guestService.addFavoriteFarmer(uuid, body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':uuid/farmers/:farmerId')
  async guestDeleteOneFarmer(
    @Param('uuid') uuid: string,
    @Param('farmerId') farmerId: number,
  ): Promise<PublicFarmerDto[]> {
    return this.guestService.deleteMyFavoriteFarmer(uuid, farmerId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':uuid/places/:placeId')
  async guestDeleteOnePlace(
    @Param('uuid') uuid: string,
    @Param('placeId') placeId: number,
  ): Promise<PublicPlaceDto[]> {
    return this.guestService.deleteMyFavoritePlace(uuid, placeId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':uuid/products/:productId')
  async guestDeleteOneProduct(
    @Param('uuid') uuid: string,
    @Param('productId') productId: number,
  ): Promise<PublicProductDto[]> {
    return this.guestService.deleteMyFavoriteProduct(uuid, productId);
  }
}

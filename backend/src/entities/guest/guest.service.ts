// Création du service User
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Guest } from './guest.entity';
import { CreateGuestDto } from './dto/create-guest.dto';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { Farmer } from '../farmer/farmer.entity';
import { Place } from '../place/place.entity';
import { PublicFarmerDto } from '../farmer/dto/public-farmer.dto';
import { PublicProductDto } from '../product/dto/public-product.dto';
import { PublicPlaceDto } from '../place/dto/public-place.dto';
import { BodyGuestAddPlaceDto } from './dto/body-add-place.dto';
import { BodyGuestAddFarmerDto } from './dto/body-add-farmer.dto';

@Injectable()
export class GuestService {
  constructor(
    @Inject('GUEST_REPOSITORY')
    private guestRepository: Repository<Guest>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('FARMER_REPOSITORY')
    private farmerRepository: Repository<Farmer>,
    @Inject('PLACE_REPOSITORY')
    private placeRepository: Repository<Place>,
  ) {}

  async create(createGuestDto: CreateGuestDto): Promise<Guest> {
    const guest = new Guest();
    guest.uuid = createGuestDto.uuid;
    return this.guestRepository.save(guest);
  }

  async updateLastConnection(uuid: string): Promise<Guest> {
    const guest = await this.guestRepository.findOne({
      where: { uuid },
    });
    guest.lastConnection = new Date();
    return this.guestRepository.save(guest);
  }

  async findAll(): Promise<Guest[]> {
    return this.guestRepository.find({
      relations: ['user', 'products', 'farmers', 'places'],
    });
  }

  async findOne(uuid: string): Promise<Guest> {
    return this.guestRepository.findOne({
      where: { uuid },
      relations: ['user', 'products', 'farmers', 'places'],
    });
  }

  async linkGuestToUser(uuid: string, user: User): Promise<Guest> {
    const guest = await this.guestRepository.findOne({
      where: { uuid },
    });
    guest.user = user;
    return this.guestRepository.save(guest);
  }

  async updateFavoriteProducts(
    uuid: string,
    productIds: number[],
  ): Promise<Guest> {
    const guest = await this.guestRepository.findOne({
      where: { uuid },
      relations: ['products'],
    });

    const newProducts: Product[] = await this.productRepository.find({
      where: { id: In(productIds) },
    });

    guest.products = newProducts;

    return this.guestRepository.save(guest);
  }

  async addFavoriteProduct(
    uuid: string,
    productId: number,
  ): Promise<PublicProductDto> {
    const guest = await this.guestRepository.findOne({
      where: { uuid },
      relations: ['products'],
    });

    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    guest.products.push(product);

    const newGuest = await this.guestRepository.save(guest);
    return new PublicProductDto(product);
  }

  async addFavoriteFarmer(
    uuid: string,
    body: BodyGuestAddFarmerDto,
  ): Promise<PublicFarmerDto> {
    const { farmerId, userLatitude, userLongitude } = body;
    const guest = await this.guestRepository.findOne({
      where: { uuid },
      relations: ['farmers'],
    });

    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    const farmer = await this.farmerRepository.findOne({
      where: { id: farmerId },
    });

    guest.farmers.push(farmer);

    const newGuest = await this.guestRepository.save(guest);
    const newFarmer = new PublicFarmerDto(farmer);

    if (userLatitude && userLongitude) {
      newFarmer.setDistance(userLongitude, userLatitude);
    }

    return newFarmer;
  }

  async addFavoritePlace(
    uuid: string,
    body: BodyGuestAddPlaceDto,
  ): Promise<PublicPlaceDto> {
    const { placeId, userLatitude, userLongitude } = body;

    const guest = await this.guestRepository.findOne({
      where: { uuid },
      relations: ['places'],
    });

    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    const place = await this.placeRepository.findOne({
      where: { id: placeId },
    });

    guest.places.push(place);

    await this.guestRepository.save(guest);

    const newPlace = new PublicPlaceDto(place);
    if (userLatitude && userLongitude) {
      newPlace.setDistance(userLongitude, userLatitude);
    }

    return newPlace;
  }

  async updateFavoriteFarmers(
    uuid: string,
    farmerIds: number[],
  ): Promise<Guest> {
    const guest = await this.guestRepository.findOne({
      where: { uuid },
      relations: ['farmers'],
    });

    const newFarmers: Farmer[] = await this.farmerRepository.find({
      where: { id: In(farmerIds) },
    });

    guest.farmers = newFarmers;

    return this.guestRepository.save(guest);
  }

  async updateFavoritePlaces(uuid: string, placeIds: number[]): Promise<Guest> {
    const guest = await this.guestRepository.findOne({
      where: { uuid },
      relations: ['places'],
    });

    const newPlaces: Place[] = await this.placeRepository.find({
      where: { id: In(placeIds) },
    });

    guest.places = newPlaces;

    return this.guestRepository.save(guest);
  }

  async deleteMyFavoriteProduct(
    uuid: string,
    productId: number,
  ): Promise<PublicProductDto[]> {
    productId = Number(productId);
    const guest = await this.guestRepository.findOne({
      where: { uuid },
      relations: ['products'],
    });

    guest.products = guest.products.filter(
      (product) => product.id !== productId,
    );

    const { products } = await this.guestRepository.save(guest);

    return products.map((product) => new PublicProductDto(product));
  }

  async deleteMyFavoriteFarmer(
    uuid: string,
    farmerId: number,
  ): Promise<PublicFarmerDto[]> {
    //on passe le farmerId en number pour éviter les erreurs de comparaison
    farmerId = Number(farmerId);
    const guest = await this.guestRepository.findOne({
      where: { uuid },
      relations: ['farmers'],
    });

    guest.farmers = guest.farmers.filter((farmer) => farmer.id !== farmerId);

    const { farmers } = await this.guestRepository.save(guest);

    return farmers.map((farmer) => new PublicFarmerDto(farmer));
  }

  async deleteMyFavoritePlace(
    uuid: string,
    placeId: number,
  ): Promise<PublicPlaceDto[]> {
    const guest = await this.guestRepository.findOne({
      where: { uuid },
      relations: ['places'],
    });

    placeId = Number(placeId);

    guest.places = guest.places.filter((place) => place.id !== placeId);

    const { places } = await this.guestRepository.save(guest);

    return places.map((place) => new PublicPlaceDto(place));
  }

  async findProducts(uuid: string): Promise<PublicProductDto[]> {
    const { products } = await this.guestRepository.findOne({
      where: { uuid },
      relations: ['products'],
    });

    if (!products) {
      throw new NotFoundException('Products not found');
    }

    return products.map((product) => new PublicProductDto(product));
  }

  async findFarmers(
    uuid: string,
    latitude?: number,
    longitude?: number,
  ): Promise<PublicFarmerDto[]> {
    //on limite le type de données que l'on récupère
    const guest = await this.guestRepository.findOne({
      where: { uuid },
      relations: ['farmers'],
    });

    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    const { farmers } = guest;

    if (!farmers) {
      throw new NotFoundException('Farmers not found');
    }

    const publicFarmers = farmers.map((farmer) => {
      const publicFarmer = new PublicFarmerDto(farmer);

      if (latitude && longitude) {
        publicFarmer.setDistance(longitude, latitude);
      }

      return publicFarmer;
    });

    return publicFarmers;
  }

  async findPlaces(
    uuid: string,
    latitude?: number,
    longitude?: number,
  ): Promise<PublicPlaceDto[]> {
    const { places } = await this.guestRepository.findOne({
      where: { uuid },
      relations: ['places'],
    });

    if (!places) {
      throw new NotFoundException('Places not found');
    }

    const sanitazePlaces = places.map((place) => {
      const publicPlace = new PublicPlaceDto(place);

      if (latitude && longitude) {
        publicPlace.setDistance(longitude, latitude);
      }

      return publicPlace;
    });

    return sanitazePlaces;
  }
}

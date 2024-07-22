import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Farmer } from './farmer.entity';
import { User } from '../user/user.entity';
import { BodyCreateFarmerDto } from './dto/body-create-farmer.dto';
import { Product } from '../product/product.entity';
import { BodyUpdateProductFarmerDto } from './dto/body-update-product-farme.dto';
import { haversineDistance } from 'src/utils/distance.service';
import { isOpen } from 'src/utils/openHourPlaces.service';
import { PublicProductDto } from '../product/dto/public-product.dto';
import {
  filterProductByPeriodHarvest,
  sanitizeToPublicProduct,
} from '../product/product.service';
import { filterCommandPlaceByCurrentCommand } from '../command/command.service';
import { Command } from '../command/command.entity';
import { cleanDuplicatedPlaceByCommand } from '../place/place.service';
import { PublicPlaceDto } from '../place/dto/public-place.dto';
import { Place } from '../place/place.entity';

//on créer l'interface pour le siret et le siren
interface SiretOrSiren {
  type: string;
  number: string;
}

export function isSiretOrSiren(siretOrSiren: string): SiretOrSiren {
  if (siretOrSiren.length === 14) {
    return {
      type: 'siret',
      number: siretOrSiren,
    };
  } else if (siretOrSiren.length === 9) {
    return {
      type: 'siren',
      number: siretOrSiren,
    };
  } else throw new Error('Le siret ou le siren est incorrect');
}

@Injectable()
export class FarmerService {
  constructor(
    @Inject('FARMER_REPOSITORY')
    private farmerRepository: Repository<Farmer>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async create(BodyCreateFarmerDto: BodyCreateFarmerDto): Promise<Farmer> {
    const { userId, ...farmerData } = BodyCreateFarmerDto;
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isFarmer === false) {
      throw new NotFoundException('User is not a farmer');
    }

    const farmer = new Farmer();
    farmer.setFarmer({ ...farmerData, user });

    return this.farmerRepository.save(farmer);
  }

  async findAll(): Promise<Farmer[]> {
    return this.farmerRepository.find({
      relations: ['places', 'products'],
    });
  }

  async getInfoFarmer(
    denomination: string,
    siretorSiren: string,
  ): Promise<any> {
    //On verifi si on récupère le siret ou le siren en question

    const siretOrSirenNumber: SiretOrSiren = isSiretOrSiren(siretorSiren);

    const response: any = await fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=?${denomination}`,
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    switch (siretOrSirenNumber.type) {
      case 'siret':
        return response.results.filter(
          (etablissement: any) => etablissement.siege.siret === siretorSiren,
        );
      case 'siren':
        return response.results.filter(
          (etablissement: any) => etablissement.siren === siretorSiren,
        );
      default:
        return response.etablissement;
    }
  }

  async updateFarmerProducts(
    body: BodyUpdateProductFarmerDto,
  ): Promise<Farmer> {
    const { farmerId, productIds } = body;
    const farmer = await this.farmerRepository.findOne({
      where: { id: farmerId },
      relations: ['products'],
    });

    if (!farmer) {
      throw new NotFoundException('Farmer not found');
    }

    const newProducts = await this.productRepository.find({
      where: { id: In(productIds) },
    });

    await this.farmerRepository
      .createQueryBuilder()
      .relation(Farmer, 'products')
      .of(farmer)
      .addAndRemove(
        newProducts.map((product) => product.id),
        farmer.products.map((product) => product.id),
      );

    farmer.products = newProducts;
    return this.farmerRepository.save(farmer);
  }

  async getPublicFarmer(id: number, query: any): Promise<any> {
    const dateNow = new Date();
    const numberMounthNow = dateNow.getMonth() + 1;
    const userLatitude = 43.3101197;
    const userLongitude = 5.3632159;

    const farmer = await this.farmerRepository.findOne({
      where: { id },
      relations: [
        'command',
        'command.commandProducts',
        'command.commandProducts.product',
        'command.commandProducts.product.categoryProduct',
        'command.places',
        'products',
        'products.categoryProduct',
      ],
    });

    if (!farmer) {
      throw new NotFoundException('Farmer not found');
    }

    const filteredProducts: Product[] = filterProductByPeriodHarvest(
      farmer.products,
    );
    const simplifyProducts: PublicProductDto[] =
      sanitizeToPublicProduct(filteredProducts);

    const filteredPlacesByCurrentCommand: Command[] =
      filterCommandPlaceByCurrentCommand(farmer.command);

    const currentPlacesWithProducts: PublicPlaceDto[] =
      cleanDuplicatedPlaceByCommand(
        filteredPlacesByCurrentCommand,
        (places: Place[]) => {
          return places.map((place) => {
            const { latitude, longitude } = place;
            const distance = haversineDistance(
              { latitude: userLatitude, longitude: userLongitude },
              { latitude, longitude },
            );
            return {
              id: place.id,
              name: place.name,
              distance: Math.round(distance),
              opening: isOpen(place.openingHours),
            };
          });
        },
      );

    //On splimpifie la vue du farmer
    let simplifyFarmer: any = {
      id: farmer.id,
      publicName: farmer.publicName,
      avatarUrl: farmer.avatarUrl,
      bannerUrl: farmer.bannerUrl,
      shortDescription: farmer.shortDescription,
      description: farmer.description,
      localisation: {
        latitude: farmer.latitude,
        longitude: farmer.longitude,
      },
      products: simplifyProducts,
      places: currentPlacesWithProducts,
    };

    return simplifyFarmer;
  }

  async getProducts(id: number): Promise<any> {
    const farmer = await this.farmerRepository.findOne({
      where: { id },
      relations: ['products', 'products.categoryProduct'],
    });

    if (!farmer) {
      throw new NotFoundException('Farmer not found');
    }

    return farmer.products;
  }

  async getPlaces(id: number): Promise<any> {
    const farmer = await this.farmerRepository.findOne({
      where: { id },
      relations: ['places'],
    });

    if (!farmer) {
      throw new NotFoundException('Farmer not found');
    }

    return farmer.places;
  }
}

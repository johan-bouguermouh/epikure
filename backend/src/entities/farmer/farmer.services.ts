import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Farmer } from './farmer.entity';
import { CreateFarmerDto } from './dto/create-farme.dto';
import { Interface } from 'readline';
import { User } from '../user/user.entity';
import { BodyCreateFarmerDto } from './dto/body-create-farmer.dto';
import { Product } from '../product/product.entity';
import { BodyUpdateProductFarmerDto } from './dto/body-update-product-farme.dto';

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

    console.log('on verifie que le User soit présent', farmer);
    return this.farmerRepository.save(farmer);
  }

  async findAll(): Promise<Farmer[]> {
    return this.farmerRepository.find();
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

    console.log(response);

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

    console.log(newProducts);

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
}

import { Injectable, Inject } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Farmer } from './farmer.entity';
import { CreateFarmerDto } from './dto/create-farme.dto';
import { Interface } from 'readline';

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
  ) {}

  async create(createFarmerDto: CreateFarmerDto): Promise<Farmer> {
    const farmer = new Farmer();
    farmer.setFarmer(createFarmerDto);
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

    switch (siretOrSirenNumber.type) {
      case 'siret':
        return response.filter(
          (etablissement: any) => etablissement.siege.siret === siretorSiren,
        );
      case 'siren':
        return response.filter(
          (etablissement: any) => etablissement.siren === siretorSiren,
        );
      default:
        return response.etablissement;
    }
  }
}

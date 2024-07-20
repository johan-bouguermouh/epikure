import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Command } from './command.entity';
import { In, Repository } from 'typeorm';
import { CommandProduct } from 'src/entities/command-product/command-product.entity';
import { Product } from '../product/product.entity';
import { Farmer } from '../farmer/farmer.entity';
import { BodyCreateCommandDto } from './dto/create-command.dto';
import { Place } from '../place/place.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CommandService {
  constructor(
    @Inject('COMMAND_REPOSITORY')
    private commandRepository: Repository<Command>,
    @Inject('COMMAND_PRODUCT_REPOSITORY')
    private commandProductRepository: Repository<CommandProduct>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('FARMER_REPOSITORY')
    private farmerRepository: Repository<Farmer>,
    @Inject('PLACE_REPOSITORY')
    private placeRepository: Repository<Place>,
  ) {}

  async create(command: BodyCreateCommandDto): Promise<any> {
    const { farmerId, productIds, placeIds, startedDate } = command;

    // avant toute chose on verifie si le farmer existe
    const farmer = await this.farmerRepository.findOne({
      where: { id: farmerId },
    });

    if (!farmer) {
      throw new NotFoundException('Farmer not found');
    }

    //On créer un object date pour la date de la commande
    const startedDateObject = new Date(startedDate);

    const resultProducts: Product[] = await this.productRepository.find({
      where: { id: In(productIds) },
    });

    if (resultProducts.length !== productIds.length) {
      throw new NotFoundException('Product not found');
    }

    const places: Place[] = await this.placeRepository.find({
      where: { id: In(placeIds) },
    });

    if (places.length !== placeIds.length) {
      throw new NotFoundException('Place not found');
    }

    //On save la commande en base
    const newCommand = new Command();
    newCommand.startedDate = startedDateObject;
    newCommand.farmer = farmer;
    newCommand.places = places;
    const resultCommand = await this.commandRepository.save(newCommand);

    // on prépare toute nos commades products en bouclans sur les produits
    const commandProducts: CommandProduct[] = resultProducts.map((product) => {
      const commandProduct = new CommandProduct();
      commandProduct.setCommandProductByProduct(
        product,
        startedDateObject,
        resultCommand,
      );
      return commandProduct;
    });

    //On save les commandProducts en base
    await this.commandProductRepository.save(commandProducts);

    return this.commandRepository
      .createQueryBuilder('command')
      .leftJoinAndSelect('command.commandProducts', 'commandProduct')
      .leftJoinAndSelect('commandProduct.product', 'product')
      .leftJoinAndSelect('product.categoryProduct', 'categoryProduct')
      .leftJoin('command.places', 'place')
      .addSelect([
        'place.id',
        'place.googlePlaceId',
        'place.address',
        'place.name',
        'place.urlImage',
      ])
      .where('command.id = :id', { id: resultCommand.id })
      .getOne();
  }

  async findAll(): Promise<Command[]> {
    return this.commandRepository.find({
      relations: ['commandProducts', 'commandProducts.product', 'farmer'],
    });
  }

  async findOne(id: number): Promise<Command> {
    const command = await this.commandRepository.findOne({
      where: { id },
      relations: [
        'commandProducts',
        'commandProducts.product',
        'farmer',
        'places',
      ],
    });

    if (!command) {
      throw new NotFoundException('Command not found');
    }
    return command;
  }

  async update(id: number, command: Command): Promise<Command> {
    await this.commandRepository.update(id, command);
    return this.commandRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<Command> {
    const command = await this.commandRepository.findOne({
      where: { id },
    });

    if (!command) {
      throw new NotFoundException('Command not found');
    }
    await this.commandRepository.remove(command);
    return command;
  }

  async findByFarmer(id: number): Promise<Command[]> {
    return this.commandRepository.find({
      where: { farmer: { id } },
      relations: ['commandProducts', 'commandProducts.product', 'places'],
    });
  }

  async findByPlace(id: number): Promise<Command[]> {
    return this.commandRepository.find({
      where: { places: { id } },
      relations: ['commandProducts', 'commandProducts.product', 'farmer'],
    });
  }

  filterCommandPlaceByCurrentCommand<T>(
    commands: Command[],
    CommandDto?: new () => T,
  ): T[] {
    const dateNow = new Date();
    const filteredPlacesByCurrentCommand = commands.filter((command) => {
      const dateCommand = new Date(command.startedDate);
      const commandProductWhereDLCisNotPassed = command.commandProducts.filter(
        (commandProduct) => {
          const dateDLC = new Date(commandProduct.endedDate);
          return dateDLC > dateNow;
        },
      );
      if (
        commandProductWhereDLCisNotPassed.length > 0 &&
        dateCommand < dateNow
      ) {
        return true;
      } else return false;
    });

    if (CommandDto) {
      return filteredPlacesByCurrentCommand.map((command) =>
        plainToClass(CommandDto, command),
      );
    }

    return filteredPlacesByCurrentCommand as unknown as T[];
  }
}

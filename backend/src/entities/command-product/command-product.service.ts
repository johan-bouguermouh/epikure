import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CommandProduct } from './command-product.entity';
import { Product } from 'src/entities/product/product.entity';
import { Command } from 'src/entities/command/command.entity';

@Injectable()
export class CommandProductService {
  constructor(
    @Inject('COMMAND_PRODUCT_REPOSITORY')
    private commandProductRepository: Repository<CommandProduct>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('COMMAND_REPOSITORY')
    private commandRepository: Repository<Command>,
  ) {}

  async create(commandId: number, productId: number): Promise<CommandProduct> {
    const command = await this.commandRepository.findOne({
      where: { id: commandId },
    });

    if (!command) {
      throw new NotFoundException('Command not found');
    }

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const commandProduct = new CommandProduct();
    commandProduct.command = command;
    commandProduct.product = product;

    return this.commandProductRepository.save(commandProduct);
  }

  async findAll(): Promise<CommandProduct[]> {
    return this.commandProductRepository.find();
  }

  async findOne(id: number): Promise<CommandProduct> {
    return this.commandProductRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.commandProductRepository.delete(id);
  }
}

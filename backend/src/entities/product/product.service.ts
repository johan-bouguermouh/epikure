import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CategoryProduct } from '../category-product/category-product.entity';
import { BodyCreateProductDto } from './dto/body-create-pruduct.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { plainToClass } from 'class-transformer';
import { ClassDeclaration } from 'typescript';
import { PublicProductDto } from './dto/public-product.dto';
import { Place } from '../place/place.entity';
import { Command } from '../command/command.entity';
import { Coordinates } from 'src/utils/distance.service';
import { PublicPlaceDto } from '../place/dto/public-place.dto';
import { find } from 'rxjs';
import { InfoProductDto } from './dto/info-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,

    @Inject('CATEGORY_PRODUCT_REPOSITORY')
    private categoryProductRepository: Repository<CategoryProduct>,
  ) {}

  async create(BodyCreateProduct: BodyCreateProductDto): Promise<Product> {
    const { categoryProductId, ...productData } = BodyCreateProduct;
    const categoryProduct: CategoryProduct =
      await this.categoryProductRepository.findOne({
        where: { id: categoryProductId },
      });
    const product = new Product();
    product.setProduct({ ...productData, categoryProduct } as CreateProductDto);

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['categoryProduct'],
    });
  }

  async findAllBySeason(season?: number): Promise<PublicProductDto[]> {
    const dateNow = new Date();
    season = season ? season : dateNow.getMonth();

    const products = await this.productRepository.find({
      relations: ['categoryProduct'],
    });

    const filteredProducts = filterProductByPeriodHarvest(products, season);

    return filteredProducts.map((product) => new PublicProductDto(product));
  }

  async findOne(id: number, coord?: Coordinates): Promise<InfoProductDto> {
    const result: Product = await this.productRepository.findOne({
      where: { id },
      relations: [
        'categoryProduct',
        'commandProducts',
        'commandProducts.command',
        'commandProducts.command.places',
      ],
    });
    const dateNow = new Date();

    // On filtre les produits par rapport dont la endedDate est supérieur à la date actuelle
    const commandProductsFiltered = result.commandProducts.filter(
      (commandProduct) => {
        //On s'assure que tous startedDate et endedDate sont bien des dates sinon on les convertis
        if (typeof commandProduct.command.startedDate === 'string') {
          commandProduct.command.startedDate = new Date(
            commandProduct.command.startedDate,
          );
        }
        if (typeof commandProduct.endedDate === 'string') {
          commandProduct.endedDate = new Date(commandProduct.endedDate);
        }

        if (
          commandProduct.command.startedDate.valueOf() < dateNow.valueOf() &&
          commandProduct.endedDate.valueOf() > dateNow.valueOf()
        ) {
          return commandProduct;
        }
      },
    );

    const places: Place[] = commandProductsFiltered
      .map((CommandProduct) => {
        return CommandProduct.command.places;
      })
      .flat();

    //on suprimme les doublons
    const placesFiltered = places.filter(
      (place, index, self) =>
        index === self.findIndex((t) => t.id === place.id),
    );

    let publicPlaces: PublicPlaceDto[] = placesFiltered.map((place) => {
      const publicPlace = new PublicPlaceDto(place);
      if (coord) {
        publicPlace.setDistance(coord.latitude, coord.longitude);
      }
      return publicPlace;
    });

    if (coord) {
      publicPlaces.sort((a, b) => a.distance - b.distance);
      publicPlaces = publicPlaces.filter((place) => place.distance < 30000);
    }
    // on créer un nouvelle object pour le produit
    let newProdctTypes: InfoProductDto = {
      id: result.id,
      name: result.name,
      description: result.description,
      nutriscore: result.nutriscore,
      categoryProduct: result.categoryProduct,
      harvestStartMounth: result.harvestStartMounth.valueOf(),
      harvestEndMounth: result.harvestEndMounth.valueOf(),
      thumbnail: result.thumbnail,
      urlBannerImage: result.urlBannerImage,
      conservationTime: result.conservationTime.valueOf(),
      findPlaces: publicPlaces,
    };

    return newProdctTypes;
  }

  async insertCategoryProduct(name: string): Promise<CategoryProduct> {
    const categoryProduct = new CategoryProduct();
    categoryProduct.name = name;
    return this.categoryProductRepository.save(categoryProduct);
  }

  async findAllCategoryProduct(): Promise<CategoryProduct[]> {
    return this.categoryProductRepository.find();
  }
}

export function filterProductByPeriodHarvest(
  products: Product[],
  month?: number,
): Product[] {
  const dateNow = new Date();
  const numberMonthNow = month ? month : dateNow.getMonth();

  const filteredProducts: Product[] = products.filter((product) => {
    if (
      product.harvestStartMounth.valueOf() <= numberMonthNow &&
      product.harvestEndMounth.valueOf() >= numberMonthNow
    ) {
      return product;
    }
  });

  return filteredProducts;
}

export function sanitizeToPublicProduct(
  products: Product[],
): PublicProductDto[] {
  return products.map((product) => {
    const publicProduct = new PublicProductDto(product);
    return publicProduct;
  });
}

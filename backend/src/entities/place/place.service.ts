import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Place } from './place.entity';
import { BodyCreatePlaceDto } from './dto/body-create-place.dto';
import { UploadModule } from 'src/upload/upload.module';
import { UploadService } from 'src/upload/services/upload.service';
import { Farmer } from '../farmer/farmer.entity';
import { QueryParamsAutocompleteDto } from './dto/query-params-autocomplete.dto';
import { findPlaceById } from 'src/utils/googleApi.service';
import { QueryParamsPlaceIdDto } from './dto/query-params-placeid.dto';
import { Command } from '../command/command.entity';
import { PublicPlaceDto } from './dto/public-place.dto';
import { PublicProductDto } from '../product/dto/public-product.dto';
import { PublicFarmerDto } from '../farmer/dto/public-farmer.dto';

interface AuthorAttribution {
  displayName: string;
  uri: string;
  photoUri: string;
}

interface PhotoAPIGoogle {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: AuthorAttribution[];
}

@Injectable()
export class PlaceService {
  constructor(
    @Inject('PLACE_REPOSITORY')
    private placeRepository: Repository<Place>,
    private uploadService: UploadService,
    @Inject('FARMER_REPOSITORY')
    private farmerRepository: Repository<Farmer>,
  ) {}

  async create(bodyCreatePlace: BodyCreatePlaceDto): Promise<any> {
    const { farmerIds, placeId } = bodyCreatePlace;
    //on récupère la clef API dans le .env
    const API_KEY = process.env.GOOGLE_API_KEY;

    //on récupère le farmer
    const farmers: Farmer[] = await this.farmerRepository.find({
      where: { id: In(farmerIds) },
    });

    if (farmers.length === 0) {
      throw new NotFoundException('Farmer not found');
    }

    //on récupère les données
    const placeData = await findPlaceById(placeId);

    if (!placeData || placeData.error) {
      if (placeData.error) {
        throw new NotFoundException(placeData.error);
      }
      throw new NotFoundException('Place not found');
    }

    let image = {
      url: 'https://cdn.midjourney.com/0105acd1-f5e2-474b-a908-baf9c1302250/0_0.png',
    };

    if (placeData.photos && placeData.photos.length > 0) {
      //on traite l'image pour la stocker en local
      const imagePlace: PhotoAPIGoogle = placeData.photos[0];
      const cleanUrl = imagePlace.name.split('/photos/')[1];

      const urlthumb = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${cleanUrl}&key=${API_KEY}`;
      const resultImage = await fetch(urlthumb);
      const arrayBuffer = await resultImage.arrayBuffer();
      const buffer: Buffer = Buffer.from(arrayBuffer);

      //à présent on utilise notre service upload pour stocker l'image
      image = await this.uploadService.uploadImage({
        fieldname: 'image',
        originalname: cleanUrl,
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: buffer.length,
        buffer: buffer,
      });

      if (process.env.MODE === 'dev') {
        image.url = image.url.replace('minio', 'http://localhost');
      }
    }

    // fini par créer le place
    const newPlace = new Place();
    newPlace.googlePlaceId = placeId;
    newPlace.name = placeData.displayName.text;
    newPlace.address = placeData.formattedAddress;
    newPlace.latitude = placeData.location.latitude;
    newPlace.longitude = placeData.location.longitude;
    newPlace.urlImage = image.url;
    newPlace.openingHours = { periods: placeData.regularOpeningHours.periods };
    newPlace.rating = placeData.rating;
    newPlace.farmers = farmers;

    return this.placeRepository.save(newPlace);
  }

  async findAll(): Promise<Place[]> {
    return this.placeRepository.find();
  }

  async findOne(id: number): Promise<Place> {
    return this.placeRepository.findOne({
      where: { id },
      relations: ['farmers', 'guests'],
    });
  }

  async findAllByPosition(
    latitude: number,
    longitude: number,
  ): Promise<PublicPlaceDto[]> {
    if (!latitude || !longitude) {
      throw new NotFoundException('Latitude and longitude are required');
    }

    const places: Place[] = await this.placeRepository.find();

    return places
      .map((place) => {
        const publicPlace = new PublicPlaceDto(place);
        publicPlace.setDistance(latitude, longitude);
        return publicPlace;
      })
      .filter((place: PublicPlaceDto) => Number(place.distance) < 30000);
  }

  async getAutoCompletePlace(params: QueryParamsAutocompleteDto): Promise<any> {
    //on récupère la clef API dans le .env
    const API_KEY = process.env.GOOGLE_API_KEY;

    const { input, location } = params;
    const radius = 100000;

    //on verfifie avant si nous avons pas la place enregistrer en base en utilisant le like de SQL
    const places = await this.placeRepository
      .createQueryBuilder('place')
      .where('place.name like :input', { input: `%${input}%` })
      .getMany();

    //on prépare la requête pour google place API
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input,
    )}&location=${location}&radius=${radius}&key=${API_KEY}`;
    //on fait la requête
    const response = await fetch(url, {
      method: 'GET',
    });

    //on récupère les données
    const placeData = await response.json();

    return placeData;
  }

  async getPlaceByPlaceId(params: QueryParamsPlaceIdDto): Promise<Place> {
    const { placeId } = params;
    const API_KEY = process.env.GOOGLE_API_KEY;

    const place = await this.placeRepository.findOne({
      where: { googlePlaceId: placeId },
    });

    if (place) {
      return place;
    }

    const placeData = await findPlaceById(placeId);

    if (!placeData || placeData.error) {
      if (placeData.error) {
        throw new NotFoundException(placeData.error);
      }
      throw new NotFoundException('Place not found');
    }

    let resultImage = {
      url: 'https://cdn.midjourney.com/0105acd1-f5e2-474b-a908-baf9c1302250/0_0.png',
    };

    if (placeData.photos && placeData.photos.length > 0) {
      //On traite l'iamge pour qu'elle puisse être tourner au client
      const imagePlace: PhotoAPIGoogle = placeData.photos[0];
      const cleanUrl = imagePlace.name.split('/photos/')[1];

      const urlthumb = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${cleanUrl}&key=${API_KEY}`;
      resultImage = await fetch(urlthumb);
    }

    const newPlace = new Place();
    newPlace.googlePlaceId = placeId;
    newPlace.name = placeData.displayName.text;
    newPlace.address = placeData.formattedAddress;
    newPlace.latitude = placeData.location.latitude;
    newPlace.longitude = placeData.location.longitude;
    newPlace.urlImage = resultImage.url;
    newPlace.openingHours = { periods: placeData.regularOpeningHours };
    newPlace.rating = placeData.rating;

    return newPlace;
  }

  async getPlaceInfo(id: number): Promise<any> {
    const newDate = new Date();
    newDate.setHours(0, 0, 0, 0);

    const place = await this.placeRepository.findOne({
      where: { id },
      relations: [
        'commands',
        'commands.commandProducts',
        'commands.commandProducts.product',
        'commands.commandProducts.product.categoryProduct',
        'commands.farmer',
      ],
    });

    if (!place) {
      throw new NotFoundException('Place not found');
    }

    const { commands, ...rest } = place;
    const currentCommands: Command[] = commands.filter((command: Command) => {
      const startedDate = new Date(command.startedDate);
      return startedDate >= newDate;
    });

    let currentCommandsProducts = [];
    currentCommands.forEach((command) => {
      const { farmer } = command;
      command.commandProducts.forEach((commandProduct) => {
        const { product, endedDate } = commandProduct;
        const endedDateProduct = new Date(endedDate);
        if (endedDateProduct >= newDate) {
          currentCommandsProducts.push({
            product: new PublicProductDto(product),
            farmer: new PublicFarmerDto(farmer),
          });
        }
      });
    });

    const aggragateFarmersByProduct = currentCommandsProducts.reduce(
      (acc, { product, farmer }) => {
        if (!acc[product.id]) {
          acc[product.id] = [];
        }
        acc[product.id].push(farmer);
        return acc;
      },
      {},
    );

    //on enleve les produit en doublon
    const currentProducts = currentCommandsProducts.filter(
      (product, index, self) =>
        index === self.findIndex((t) => t.product.id === product.product.id),
    );

    const currentProductsDto = currentProducts.map((product) => {
      const farmers = aggragateFarmersByProduct[product.product.id];
      return { ...product, farmers };
    });

    const newResult = {
      ...rest,
      command: currentProductsDto.map((element) => {
        const { product, farmers } = element;
        return { ...product, farmers };
      }),
    };
    return newResult;
  }
}

// create inerface of callBack
interface PlaceCallBack {
  (place: Place[]): any;
}

export function cleanDuplicatedPlaceByCommand<T>(
  commands: Command[],
  callBack?: PlaceCallBack,
): T[] {
  let currentPlacesWithProducts: Place[] = [];

  commands.forEach((command) => {
    const { places } = command;
    places.forEach((place) => {
      if (
        currentPlacesWithProducts.find(
          (currentPlace) => currentPlace.id === place.id,
        ) === undefined
      )
        currentPlacesWithProducts.push(place);
    });
  });

  if (callBack) {
    return callBack(currentPlacesWithProducts);
  }

  return currentPlacesWithProducts as unknown as T[];
}

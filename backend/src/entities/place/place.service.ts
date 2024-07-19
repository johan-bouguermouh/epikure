import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Place } from './place.entity';
import { BodyCreatePlaceDto } from './dto/body-create-place.dto';
import { UploadModule } from 'src/upload/upload.module';
import { UploadService } from 'src/upload/services/upload.service';
import { Farmer } from '../farmer/farmer.entity';
import { QueryParamsAutocompleteDto } from './dto/query-params-autocomplete.dto';
import { findPlaceById } from 'src/utils/googleApi.service';
import { QueryParamsPlaceIdDto } from './dto/query-params-placeid.dto';

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
    const { farmerId, placeId } = bodyCreatePlace;
    //on récupère la clef API dans le .env
    const API_KEY = process.env.GOOGLE_API_KEY;

    //on récupère le farmer
    const farmer = await this.farmerRepository.findOne({
      where: { id: farmerId },
    });

    if (!farmer) {
      throw new NotFoundException('Farmer not found');
    }

    //on récupère les données
    const placeData = await findPlaceById(placeId);

    //on traite l'image pour la stocker en local
    const imagePlace: PhotoAPIGoogle = placeData.photos[0];
    const cleanUrl = imagePlace.name.split('/photos/')[1];

    const urlthumb = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${cleanUrl}&key=${API_KEY}`;
    const resultImage = await fetch(urlthumb);
    const arrayBuffer = await resultImage.arrayBuffer();
    const buffer: Buffer = Buffer.from(arrayBuffer);

    //à présent on utilise notre service upload pour stocker l'image
    let image = await this.uploadService.uploadImage({
      fieldname: 'image',
      originalname: cleanUrl,
      encoding: '7bit',
      mimetype: 'image/jpeg',
      size: buffer.length,
      buffer: buffer,
    });

    //si on est en mode dev on change minio par http://localhost:
    if (process.env.MODE === 'dev') {
      image.url = image.url.replace('minio', 'http://localhost');
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
    newPlace.farmers = [farmer];

    return this.placeRepository.save(newPlace);
  }

  async findAll(): Promise<Place[]> {
    return this.placeRepository.find();
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

    //On traite l'iamge pour qu'elle puisse être tourner au client
    const imagePlace: PhotoAPIGoogle = placeData.photos[0];
    const cleanUrl = imagePlace.name.split('/photos/')[1];

    const urlthumb = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${cleanUrl}&key=${API_KEY}`;
    const resultImage = await fetch(urlthumb);

    const newPlace = new Place();
    newPlace.googlePlaceId = placeId;
    newPlace.name = placeData.displayName.text;
    newPlace.address = placeData.formattedAddress;
    newPlace.latitude = placeData.location.latitude;
    newPlace.longitude = placeData.location.longitude;
    newPlace.urlImage = resultImage.url;
    newPlace.openingHours = { periods: placeData.regularOpeningHours.periods };
    newPlace.rating = placeData.rating;

    return newPlace;
  }
}
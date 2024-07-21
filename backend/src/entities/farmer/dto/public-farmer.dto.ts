//On utilise class-transformer pour transformer les objets en DTO lors du retour
import { Expose, Exclude, Transform } from 'class-transformer';
import { User } from 'src/entities/user/user.entity';
import { Farmer } from '../farmer.entity';
import { Product } from 'src/entities/product/product.entity';
import { sanitizeToPublicProduct } from 'src/entities/product/product.service';
import { PublicProductDto } from 'src/entities/product/dto/public-product.dto';
import { Command } from 'src/entities/command/command.entity';
import { Place } from 'src/entities/place/place.entity';
import { Guest } from 'src/entities/guest/guest.entity';
import { haversineDistance } from 'src/utils/distance.service';

export class PublicFarmerDto {
  @Expose()
  id: number;

  @Exclude()
  user: User;

  @Exclude()
  socialReasonName: string;

  @Exclude()
  siretNumber: string;

  @Exclude()
  sireneNumber: string;

  @Expose()
  address: string;

  @Expose()
  zipCode: string;

  @Expose()
  city: string;

  @Expose()
  isBio: boolean;

  @Exclude()
  managerLastName: string;

  @Exclude()
  managerFirstName: string;

  @Expose()
  publicName: string;

  @Expose()
  avatarUrl: string;

  @Expose()
  bannerUrl: string;

  @Expose()
  description: string;

  @Expose()
  shortDescription: string;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Transform(({ value }) => sanitizeToPublicProduct(value))
  products: Product[];

  @Exclude()
  command: Command[];

  @Exclude()
  places: Place[];

  @Exclude()
  guests: Guest[];

  @Expose()
  distance: number;

  constructor(partial: Partial<Farmer>) {
    Object.assign(this, partial);
  }

  setDistance(userLongitude: number, userLatitude: number): void {
    this.distance = haversineDistance(
      { latitude: this.latitude, longitude: this.longitude },
      { latitude: userLatitude, longitude: userLongitude },
    );
  }
}

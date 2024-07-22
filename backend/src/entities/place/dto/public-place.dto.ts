import { Exclude, Expose, Transform } from 'class-transformer';
import { isOpen } from 'src/utils/openHourPlaces.service';
import { resultSearchPlaceIsOpen } from 'src/utils/openHourPlaces.service';
import { OpeningHoursDto } from './openinghours.dto';
import { Farmer } from 'src/entities/farmer/farmer.entity';
import { Guest } from 'src/entities/guest/guest.entity';
import { Place } from '../place.entity';
import { haversineDistance } from 'src/utils/distance.service';

export class PublicPlaceDto {
  @Expose()
  id: string;

  @Expose()
  googlePlaceId: string;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Expose()
  urlImage: string;

  @Expose()
  distance: number;

  @Transform(({ value }) => isOpen(value))
  openingHours: OpeningHoursDto;

  @Expose()
  rating: number;

  @Exclude()
  farmers: Farmer[];

  @Exclude()
  guests: Guest[];

  constructor(partial: Partial<Place>) {
    Object.assign(this, partial);
  }

  setDistance(userLongitude: number, userLatitude: number): void {
    this.distance = haversineDistance(
      { latitude: this.latitude, longitude: this.longitude },
      { latitude: userLatitude, longitude: userLongitude },
    );
  }
}

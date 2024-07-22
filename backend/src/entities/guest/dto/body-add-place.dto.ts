import { IsNumber, IsOptional } from 'class-validator';

export class BodyGuestAddPlaceDto {
  @IsNumber()
  placeId: number;

  @IsOptional()
  @IsNumber()
  userLatitude: number;

  @IsOptional()
  @IsNumber()
  userLongitude: number;
}

import { IsNumber, IsOptional } from 'class-validator';

export class BodyGuestAddFarmerDto {
  @IsNumber()
  farmerId: number;

  @IsOptional()
  @IsNumber()
  userLatitude: number;

  @IsOptional()
  @IsNumber()
  userLongitude: number;
}

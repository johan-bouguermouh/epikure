import { IsNumberString, IsString } from 'class-validator';

export class GetIforFarmerDto {
  @IsString()
  denomination: string;

  @IsNumberString()
  siretorSiren: string;
}
import { IsArray, IsNumber, IsString } from 'class-validator';

export class BodyCreatePlaceDto {
  /** Id google de l'endroit */
  @IsString()
  placeId: string;

  /** Id du farmer a l'origine de la demande */
  @IsArray()
  @IsNumber({}, { each: true })
  farmerIds: number[];
}

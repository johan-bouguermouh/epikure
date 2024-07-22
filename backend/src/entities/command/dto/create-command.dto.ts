import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  MaxDate,
  MinDate,
} from 'class-validator';

export class BodyCreateCommandDto {
  @IsNumber()
  farmerId: number;

  @Type(() => Date) // cast to Date type
  @MinDate(() => new Date(), {
    message: () =>
      `La date  de la commande doit être supérieur à la date du jour`,
  })
  startedDate: Date;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  productIds: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  placeIds: number[];
}

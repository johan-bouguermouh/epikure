import { Type } from 'class-transformer';
import {
  IsNumber,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';

export class BodyUpdateProductFarmerDto {
  @IsNumber()
  farmerId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  productIds: number[];
}

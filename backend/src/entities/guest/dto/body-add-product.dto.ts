import { IsNumber } from 'class-validator';

export class BodyGuestAddProductDto {
  @IsNumber()
  productId: number;
}

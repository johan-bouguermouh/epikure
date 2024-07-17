import { IsString } from 'class-validator';

export class QueryParamsPlaceIdDto {
  @IsString()
  placeId: string;
}

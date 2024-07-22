import { IsString, Matches } from 'class-validator';

export class QueryParamsAutocompleteDto {
  @IsString()
  input: string;

  //Location : permet de récupérer latitude et longitude sour format "latitude,longitude"
  @IsString()
  @Matches(/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/, {
    message: 'Location must be in the format "latitude,longitude"',
  })
  location: string;
}

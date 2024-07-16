import { IsInt, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TimeDto {
  @IsInt()
  @IsNotEmpty()
  day: number;

  @IsInt()
  @IsNotEmpty()
  hour: number;

  @IsInt()
  @IsNotEmpty()
  minute: number;
}

class PeriodDto {
  @ValidateNested()
  @Type(() => TimeDto)
  open: TimeDto;

  @ValidateNested()
  @Type(() => TimeDto)
  close: TimeDto;
}

export class OpeningHoursDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PeriodDto)
  periods: PeriodDto[];
}

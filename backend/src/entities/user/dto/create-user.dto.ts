//Création du DTO CreateUser
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Email is invalid',
    },
  )
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'Password is too weak',
    },
  )
  password: string;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isFarmer: boolean;

  @IsInt()
  role: number;
}

export class bodyCreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Email is invalid',
    },
  )
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'Password is too weak',
    },
  )
  password: string;

  @IsOptional()
  isFarmer: boolean;
}

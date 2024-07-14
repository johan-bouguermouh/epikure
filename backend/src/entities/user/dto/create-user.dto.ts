//Création du DTO CreateUser
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email is invalid',
    },
  )
  email: string;
}

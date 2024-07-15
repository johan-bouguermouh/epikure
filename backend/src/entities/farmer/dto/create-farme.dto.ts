import { IsBoolean, IsNumber } from '@nestjs/class-validator';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  IsNumberString,
  isNumberString,
  isNumber,
} from 'class-validator';

export class CreateFarmerDto {
  @IsString()
  socialReasonName: string;

  /**
   * Création du regex pour le SIRET
   * 	^[0-9]{9}$
   */
  @IsNumberString()
  siretNumber: string;

  /**
   * Création du regex pour le SIREN
   * 	^[0-9]{14}$
   */
  @IsNumberString()
  sireneNumber: string;

  /**
   * Adresse du producteur
   */
  @IsString()
  address: string;

  /**
   * Code postal du producteur
   */
  @IsNumberString()
  zipCode: string;

  /**
   * Ville du producteur
   */
  @IsString()
  city: string;

  /**
   * Si le producteur et bio
   */
  @IsBoolean()
  isBio: boolean;

  /**
   * Nom de famille du gérant d'entreprise
   */
  @IsString()
  managerLastName: string;

  /**
   * Prénom du gérant d'entreprise
   */
  @IsString()
  managerFirstName: string;

  /**
   * Nom présenté sur la fiche publique du producteur
   */
  @IsString()
  publicName: string;

  /**
   * Url de son image avatar
   */
  @IsOptional()
  @IsString()
  avatarUrl: string;

  /**
   * Url de sa banniere de présentation de sa fiche publique
   */
  @IsOptional()
  @IsString()
  bannerUrl: string;

  /**
   * Description du producteur
   */
  @IsString()
  description: string;

  /**
   * Présentation courte du producteur
   */
  @IsString()
  shortDescription: string;

  /**
   * Position de la latitude du producteur en float
   */
  @IsNumber()
  latitude: number;

  /**
   * Position de la longitude du producteur en float
   */
  @IsNumber()
  longitude: number;
}

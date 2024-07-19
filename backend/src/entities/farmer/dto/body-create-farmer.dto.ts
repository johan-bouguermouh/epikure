import { IsBoolean, IsNumber } from '@nestjs/class-validator';
import { IsString, IsOptional, IsNumberString, IsInt } from 'class-validator';

export class BodyCreateFarmerDto {
  @IsString()
  socialReasonName: string;

  /** Id du compte principale de l'utilisateur */
  @IsInt()
  userId: number;

  /** Création du regex pour le SIRET */
  @IsNumberString()
  siretNumber: string;

  /** Création du regex pour le SIREN */
  @IsNumberString()
  sireneNumber: string;

  /** Adresse du producteur */
  @IsString()
  address: string;

  /** Code postal du producteur */
  @IsNumberString()
  zipCode: string;

  /** Ville du producteur */
  @IsString()
  city: string;

  /** Si le producteur et bio */
  @IsBoolean()
  isBio: boolean;

  /** Nom de famille du gérant d'entreprise */
  @IsString()
  managerLastName: string;

  /** Prénom du gérant d'entreprise */
  @IsString()
  managerFirstName: string;

  /** Nom présenté sur la fiche publique du producteur */
  @IsString()
  publicName: string;

  /** Url de son image avatar */
  @IsOptional()
  @IsString()
  avatarUrl: string;

  /** Url de sa banniere de présentation de sa fiche publique */
  @IsOptional()
  @IsString()
  bannerUrl: string;

  /**  Description du producteur */
  @IsString()
  description: string;

  /** Description courte du producteur */
  @IsString()
  shortDescription: string;

  /** Position de la latitude du producteur en float */
  @IsNumber()
  latitude: number;

  /** Position de la longitude du producteur en float */
  @IsNumber()
  longitude: number;
}

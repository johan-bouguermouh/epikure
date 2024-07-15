import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CreateFarmerDto } from './dto/create-farme.dto';

@Entity()
export class Farmer {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Raison social du producteur
   */
  @Column({ nullable: false, length: 255 })
  socialReasonName: string;

  /**
   * Numéro de siret du producteur
   */
  @Column({ nullable: false, length: 14 })
  siretNumber: string;

  /**
   * Sirène du producteur
   */
  @Column({ nullable: false, length: 9 })
  sireneNumber: string;

  /**
   * Adresse du producteur
   */
  @Column({ nullable: false, length: 255 })
  address: string;

  /**
   * Code postal du producteur
   */
  @Column({ nullable: false, length: 5 })
  zipCode: string;

  /**
   * Ville du producteur
   */
  @Column({ nullable: false, length: 255 })
  city: string;

  /**
   * Si le producteur et bio
   */
  @Column({ default: false })
  isBio: boolean;

  /**
   * Nom de famille du gérant d'entreprise
   */
  @Column({ nullable: false, length: 255 })
  managerLastName: string;

  /**
   * Prénom du gérant d'entreprise
   */
  @Column({ nullable: false, length: 255 })
  managerFirstName: string;

  /**
   * Nom présenté sur la fiche publique du producteur
   */
  @Column({ nullable: false, length: 255 })
  publicName: string;

  /**
   * Url de son image avatar
   */
  @Column({ nullable: true, length: 255 })
  avatarUrl: string;

  /**
   * Url de sa banniere de présentation de sa fiche publique
   */
  @Column({ nullable: true, length: 255 })
  bannerUrl: string;

  /**
   * Description du producteur
   */
  @Column({ nullable: true, length: 720 })
  description: string;

  /**
   * Présentation courte du producteur
   */
  @Column({ nullable: true, length: 255 })
  shortDescription: string;

  /**
   * Position de la latitude du producteur en float
   */
  @Column({ nullable: true })
  latitude: number;

  /**
   * Position de la longitude du producteur en float
   */
  @Column({ nullable: true })
  longitude: number;

  setFarmer(farmer: Farmer | CreateFarmerDto) {
    this.socialReasonName = farmer.socialReasonName;
    this.siretNumber = farmer.siretNumber;
    this.sireneNumber = farmer.sireneNumber;
    this.address = farmer.address;
    this.zipCode = farmer.zipCode;
    this.city = farmer.city;
    this.isBio = farmer.isBio;
    this.managerLastName = farmer.managerLastName;
    this.managerFirstName = farmer.managerFirstName;
    this.publicName = farmer.publicName;
    this.avatarUrl = farmer.avatarUrl;
    this.bannerUrl = farmer.bannerUrl;
    this.description = farmer.description;
    this.shortDescription = farmer.shortDescription;
    this.latitude = farmer.latitude;
    this.longitude = farmer.longitude;
  }
}

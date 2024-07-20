import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { OpeningHoursDto } from './dto/openinghours.dto';
import { Farmer } from '../farmer/farmer.entity';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  /** Id du Magasin sur Google Place API */
  @Column({ nullable: false, length: 255, unique: true })
  googlePlaceId: string;

  /** Nom du magasin */
  @Column({ nullable: false, length: 255 })
  name: string;

  /** Adresse du magasin */
  @Column({ nullable: false, length: 255 })
  address: string;

  /**
   * Position de la latitude du producteur en float
   */
  @Column('decimal', { precision: 10, scale: 8 })
  latitude: number;

  /**
   * Position de la longitude du producteur en float
   */
  @Column('decimal', { precision: 10, scale: 8 })
  longitude: number;

  /** url de l'image du magasin */
  @Column({ nullable: false })
  urlImage: string;

  /** Heure regulière douverture du magasin souformat json */
  @Column({ type: 'simple-json', nullable: false })
  openingHours: OpeningHoursDto;

  /** Note google du magasin */
  @Column('decimal', { precision: 2, scale: 1 })
  rating: number;

  @ManyToMany(() => Farmer, (farmer) => farmer.places)
  @JoinTable()
  farmers: Farmer[];
}

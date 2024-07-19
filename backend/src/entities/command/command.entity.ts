import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Place } from '../place/place.entity';
import { Farmer } from '../farmer/farmer.entity';
import { CommandProduct } from 'src/entities/command-product/command-product.entity';

@Entity()
export class Command {
  @PrimaryGeneratedColumn()
  id: number;

  /** Date de la commande */
  @Column({ nullable: false, type: 'date' })
  startedDate: Date;

  /** places ayant reçuent la commande */
  @ManyToMany(() => Place)
  @JoinTable()
  places: Place[];

  /** Producteur a l'origine de la commande */
  @ManyToOne(() => Farmer)
  @JoinColumn()
  farmer: Farmer;

  @OneToMany(() => CommandProduct, (commandProduct) => commandProduct.command)
  commandProducts: CommandProduct[];

  /** date de création de la commande */
  @CreateDateColumn()
  createdAt: Date;

  /** date de modification de la commande */
  @UpdateDateColumn()
  updatedAt: Date;
}

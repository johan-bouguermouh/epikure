import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Index,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Farmer } from '../farmer/farmer.entity';
import { Product } from '../product/product.entity';
import { Place } from '../place/place.entity';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  //@Index({ unique: true })
  @Column({ nullable: false, length: 255, unique: true })
  uuid: string;

  /** la collone peux être null */
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Product, (product) => product.guests)
  @JoinTable()
  products: Product[];

  @ManyToMany(() => Farmer, (farmer) => farmer.guests)
  @JoinTable()
  farmers: Farmer[];

  @ManyToMany(() => Place, (place) => place.guests)
  @JoinTable()
  places: Place[];

  /**On met la date de la création */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  /**On met la date de la dernière mise à jour */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  /**On met la date de la dernière connexion */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastConnection: Date;
}

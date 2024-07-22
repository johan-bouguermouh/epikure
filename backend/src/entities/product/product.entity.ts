import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { CategoryProduct } from '../category-product/category-product.entity';
import { NutriScoreDto } from './dto/nutritiscore.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { CommandProduct } from 'src/entities/command-product/command-product.entity';
import { Guest } from '../guest/guest.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  /** Nom du produit */
  @Column({ nullable: false, length: 255 })
  name: string;

  /** Courte description du produit */
  @Column({ nullable: false, length: 1000 })
  description: string;

  /** Appartenance à une catégorie */
  @ManyToOne(() => CategoryProduct)
  @JoinColumn()
  categoryProduct: CategoryProduct;

  /** Date de début de récolte */
  @Column({ nullable: false })
  harvestStartMounth: Number;

  /** Date de fin de récolte */
  @Column({ nullable: false })
  harvestEndMounth: Number;

  /** Url de la Miniature du produit */
  @Column({ nullable: false })
  thumbnail: string;

  /** Url de la banière du produit */
  @Column({ nullable: true, default: null })
  urlBannerImage: string;

  /** Temps de conservation du produit en nombre de jours */
  @Column({ nullable: false })
  conservationTime: Number;

  /** Nutriscore du produit */
  @Column({ type: 'simple-json', nullable: false })
  nutriscore: NutriScoreDto[];

  @OneToMany(() => CommandProduct, (commandProduct) => commandProduct.product)
  commandProducts: CommandProduct[];

  @ManyToMany(() => Guest, (guest) => guest.products)
  guests: Guest[];

  setProduct(product: Product | CreateProductDto) {
    this.name = product.name;
    this.description = product.description;
    this.categoryProduct = product.categoryProduct;
    this.harvestStartMounth = product.harvestStartMounth;
    this.harvestEndMounth = product.harvestEndMounth;
    this.thumbnail = product.thumbnail;
    this.urlBannerImage = product.urlBannerImage;
    this.conservationTime = product.conservationTime;
    this.nutriscore = product.nutriscore;
  }
}

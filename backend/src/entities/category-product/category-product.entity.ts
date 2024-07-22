import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
@Unique(['name'])
export class CategoryProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 255 })
  name: string;

  @OneToMany(() => Product, (product) => product.categoryProduct)
  products: Product[];
}

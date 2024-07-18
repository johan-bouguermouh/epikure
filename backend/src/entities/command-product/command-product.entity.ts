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
  OneToOne,
} from 'typeorm';
import { Product } from 'src/entities/product/product.entity';
import { Command } from 'src/entities/command/command.entity';

@Entity()
export class CommandProduct {
  @PrimaryGeneratedColumn()
  id: number;

  /** Date de fin de marchée de la commande */
  @Column({ nullable: false, type: 'date' })
  endedDate: Date;

  /** Commande concernée */
  @ManyToOne(() => Command)
  @JoinColumn()
  command: Command;

  /** Produit commandé */
  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  /** date de création de la commande */
  @CreateDateColumn()
  createdAt: Date;

  /** date de modification de la commande */
  @UpdateDateColumn()
  updatedAt: Date;

  /** Setter */
  setCommandProductByProduct(
    product: Product,
    startedDate: Date,
    command: Command,
  ) {
    let { conservationTime } = product;
    const endedDate = new Date(startedDate);

    console.log('startedDate', startedDate);
    console.log('conservationTime', conservationTime);
    //On passe conservationTime en number
    conservationTime = Number(conservationTime);
    //On ajoute le nombre de jours de conservation au startedDate
    endedDate.setDate(endedDate.getDate() + conservationTime.valueOf());

    console.log('retour endedDate', endedDate);

    this.product = product;
    this.endedDate = endedDate;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.command = command;
  }
}

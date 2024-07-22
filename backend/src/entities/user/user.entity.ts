import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 255 })
  email: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isFarmer: boolean;

  /**
   * Création de la relation avec Role
   * default => 1
   */
  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  /**
   * Création du password
   */
  @Column({ nullable: false, length: 255 })
  password: string;
}

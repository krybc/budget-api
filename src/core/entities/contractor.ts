import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from './transaction';
import { DateTime } from 'luxon';

@Entity()
export class Contractor {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: DateTime;

  @UpdateDateColumn()
  updatedAt: DateTime;

  @Column()
  name: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  city: string;

  @OneToMany((type) => Transaction, (transaction) => transaction.contractor, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];
}

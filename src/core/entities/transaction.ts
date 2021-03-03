import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category';
import { Contractor } from './contractor';
import { Account } from './account';
import { DateTime } from 'luxon';
import { DateTimeTransformer } from '../typeorm/date-time.transformer';
import { DecimalTransformer } from '../typeorm/decimal.transformer';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: DateTime;

  @UpdateDateColumn()
  updatedAt: DateTime;

  @ManyToOne((type) => Category, (category) => category.transactions)
  category: Category;

  @ManyToOne((type) => Account, (account) => account.transactions)
  account: Account;

  @ManyToOne((type) => Contractor, (contractor) => contractor.transactions)
  contractor: Contractor;

  @Column({ type: 'date', transformer: new DateTimeTransformer() })
  date: DateTime;

  @Column({
    type: 'decimal',
    nullable: true,
    default: 0,
    transformer: new DecimalTransformer(),
  })
  income: number;

  @Column({
    type: 'decimal',
    nullable: true,
    default: 0,
    transformer: new DecimalTransformer(),
  })
  expense: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from './transaction';
import { DecimalTransformer } from '../typeorm/decimal.transformer';
import { DateTime } from 'luxon';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: DateTime;

  @UpdateDateColumn()
  updatedAt: DateTime;

  @Column()
  name: string;

  @Column({
    type: 'decimal',
    default: 0,
    transformer: new DecimalTransformer(),
  })
  amount: number;

  @OneToMany((type) => Transaction, (transaction) => transaction.account, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];
}

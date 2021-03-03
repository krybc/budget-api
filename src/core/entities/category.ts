import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from './transaction';
import { DateTime } from 'luxon';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: DateTime;

  @UpdateDateColumn()
  updatedAt: DateTime;

  @ManyToOne((type) => Category, (parent) => parent.childrens)
  parent: Category;

  @Column()
  name: string;

  @Column({ type: 'smallint' })
  type: number;

  @Column({ type: 'smallint' })
  order: number;

  @OneToMany((type) => Transaction, (transaction) => transaction.category, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];

  @OneToMany((type) => Category, (category) => category.parent, {
    onDelete: 'CASCADE',
  })
  childrens: Category[];
}

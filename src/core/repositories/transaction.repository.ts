import { EntityRepository, Repository } from 'typeorm';
import { Transaction } from '../entities/transaction';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {}

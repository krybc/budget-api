import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { TransactionRepository } from '../../core/repositories/transaction.repository';
import { TransactionFactory } from '../factory/transaction.factory';
import { CreateTransactionRequestDto } from '../dto/create-transaction.request.dto';
import { UpdateTransactionRequestDto } from '../dto/update-transaction.request.dto';
import { TransactionResponseDtoFactory } from '../factory/transaction.response.dto.factory';
import { Account } from '../../core/entities/account';
import { AccountRepository } from '../../core/repositories/account.repository';
import { TransactionsListFiltersDto } from '../dto/transactions-list-filters.dto';

@Injectable()
export class TransactionsService {
  private transactionRepository: TransactionRepository;
  private accountRepository: AccountRepository;

  constructor(
    private connection: Connection,
    private transactionFactory: TransactionFactory,
  ) {
    this.transactionRepository = connection.getCustomRepository(
      TransactionRepository,
    );
    this.accountRepository = connection.getCustomRepository(AccountRepository);
  }

  async create(dto: CreateTransactionRequestDto) {
    const input = await this.transactionFactory.fromCreateDto(dto);
    const output = await this.transactionRepository.save(input);
    this.updateAccountAmount(null, output, output.account);
    return TransactionResponseDtoFactory.formEntity(output);
  }

  async update(dto: UpdateTransactionRequestDto) {
    const initialTransaction = await this.transactionRepository.findOne(
      { id: dto.id },
      { relations: ['account', 'category', 'contractor'] },
    );

    const pricesBefore = {
      income: initialTransaction.income,
      expense: initialTransaction.expense,
    };

    if (!initialTransaction) {
      throw new NotFoundException('Transaction not found');
    }

    const transaction = await this.transactionFactory.fromUpdateDto(
      initialTransaction,
      dto,
    );

    const result = await this.transactionRepository.save(transaction);
    this.updateAccountAmount(pricesBefore, result, result.account);
    return TransactionResponseDtoFactory.formEntity(result);
  }

  async delete(id: number) {
    const transaction = await this.transactionRepository.findOne(
      { id },
      { relations: ['account'] },
    );

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const result = await this.transactionRepository.remove(transaction);
    this.updateAccountAmount(transaction, null, transaction.account);

    return result;
  }

  async getOneById(id: number) {
    const output = await this.transactionRepository.findOne(
      { id: id },
      { relations: ['account'] },
    );
    return TransactionResponseDtoFactory.formEntity(output);
  }

  async getList(filters: TransactionsListFiltersDto) {
    let where = {};
    if (filters.dateFrom && filters.dateTo) {
      where = { date: Between(filters.dateFrom, filters.dateTo) };
    } else if (filters.dateFrom) {
      where = { date: MoreThanOrEqual(filters.dateFrom) };
    } else if (filters.dateTo) {
      where = { date: LessThanOrEqual(filters.dateTo) };
    }

    const transactions = await this.transactionRepository.find({
      relations: ['account', 'category', 'contractor'],
      where,
      order: { date: 'DESC' },
      take: filters.limit,
    });
    return transactions.map((item) =>
      TransactionResponseDtoFactory.formEntity(item),
    );
  }

  private updateAccountAmount(
    transactionBefore: { income: number; expense: number } | null,
    transactionAfter: { income: number; expense: number } | null,
    account: Account,
  ): void {
    let amountChange = 0;

    if (!transactionBefore) {
      amountChange = transactionAfter.income - transactionAfter.expense;
    } else if (!transactionAfter) {
      amountChange = transactionBefore.expense - transactionBefore.income;
    } else {
      amountChange =
        transactionAfter.income -
        transactionBefore.income +
        (transactionBefore.expense - transactionAfter.expense);
    }

    account.amount = account.amount += amountChange;
    this.accountRepository.save(account);
  }
}

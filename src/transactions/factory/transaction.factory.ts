import { Injectable } from '@nestjs/common';
import { ContractorRepository } from '../../core/repositories/contractor.repository';
import { Connection } from 'typeorm';
import { CreateTransactionRequestDto } from '../dto/create-transaction.request.dto';
import { UpdateTransactionRequestDto } from '../dto/update-transaction.request.dto';
import { Transaction } from '../../core/entities/transaction';
import { AccountRepository } from '../../core/repositories/account.repository';
import { CategoryRepository } from '../../core/repositories/category.repository';
import { TransactionRepository } from '../../core/repositories/transaction.repository';

@Injectable()
export class TransactionFactory {
  private accountRepository: AccountRepository;
  private categoryRepository: CategoryRepository;
  private contractorRepository: ContractorRepository;
  private transactionRepository: TransactionRepository;

  constructor(private connection: Connection) {
    this.accountRepository = connection.getCustomRepository(AccountRepository);
    this.categoryRepository = connection.getCustomRepository(
      CategoryRepository,
    );
    this.contractorRepository = connection.getCustomRepository(
      ContractorRepository,
    );
    this.transactionRepository = connection.getCustomRepository(
      TransactionRepository,
    );
  }

  async fromCreateDto(dto: CreateTransactionRequestDto): Promise<Transaction> {
    const transaction = Object.assign(new Transaction(), dto);

    transaction.account = dto.accountId
      ? await this.accountRepository.findOne({ id: dto.accountId })
      : null;
    transaction.category = dto.categoryId
      ? await this.categoryRepository.findOne({ id: dto.categoryId })
      : null;
    transaction.contractor = dto.contractorId
      ? await this.contractorRepository.findOne({ id: dto.contractorId })
      : null;

    return transaction;
  }

  async fromUpdateDto(
    transaction: Transaction,
    dto: UpdateTransactionRequestDto,
  ): Promise<Transaction> {
    if (dto.accountId && dto.accountId !== transaction.account.id) {
      transaction.account = await this.accountRepository.findOne({
        id: dto.accountId,
      });
    }

    if (dto.categoryId && dto.categoryId !== transaction.category.id) {
      transaction.category = await this.categoryRepository.findOne({
        id: dto.categoryId,
      });
    }

    if (dto.contractorId && dto.contractorId !== transaction.contractor.id) {
      transaction.contractor = await this.contractorRepository.findOne({
        id: dto.contractorId,
      });
    }

    transaction.date = dto.date;
    transaction.income = dto.income;
    transaction.expense = dto.expense;

    return transaction;
  }
}

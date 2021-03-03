import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AccountRepository } from '../../core/repositories/account.repository';
import { CreateAccountRequestDto } from '../dto/create-account.request.dto';
import { Account } from '../../core/entities/account';
import { UpdateAccountRequestDto } from '../dto/update-account.request.dto';

@Injectable()
export class AccountFactory {
  private accountRepository: AccountRepository;

  constructor(private connection: Connection) {
    this.accountRepository = connection.getCustomRepository(AccountRepository);
  }

  async fromCreateDto(dto: CreateAccountRequestDto): Promise<Account> {
    return Object.assign(new Account(), dto);
  }

  async fromUpdateDto(dto: UpdateAccountRequestDto): Promise<Account> {
    const account = await this.accountRepository.findOne({ id: dto.id });

    account.name = dto.name;
    account.amount = dto.amount;

    return account;
  }
}

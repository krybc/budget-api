import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AccountRepository } from '../../core/repositories/account.repository';
import { AccountFactory } from '../factories/account.factory';
import { CreateAccountRequestDto } from '../dto/create-account.request.dto';
import { UpdateAccountRequestDto } from '../dto/update-account.request.dto';

@Injectable()
export class AccountsService {
  private accountRepository: AccountRepository;

  constructor(
    private connection: Connection,
    private accountFactory: AccountFactory,
  ) {
    this.accountRepository = connection.getCustomRepository(AccountRepository);
  }

  async create(dto: CreateAccountRequestDto) {
    const account = await this.accountFactory.fromCreateDto(dto);
    return await this.accountRepository.save(account);
  }

  async update(dto: UpdateAccountRequestDto) {
    const account = await this.accountFactory.fromUpdateDto(dto);
    return await this.accountRepository.save(account);
  }

  async delete(id: number) {
    const category = await this.accountRepository.findOne({ id });

    if (!category) {
      throw new NotFoundException('Account not found');
    }

    return await this.accountRepository.remove(category);
  }

  async getOneById(id: number) {
    return await this.accountRepository.findOne({
      id: id,
    });
  }

  async getList() {
    return await this.accountRepository.find();
  }
}

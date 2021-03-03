import { Transaction } from '../../core/entities/transaction';
import { TransactionResponseDto } from '../dto/transaction.response.dto';

export class TransactionResponseDtoFactory {
  static formEntity(entity: Transaction): TransactionResponseDto {
    const result = new TransactionResponseDto();
    result.id = entity.id;
    result.accountId = entity.account.id;
    result.categoryId = entity.category.id;
    result.contractorId = entity.contractor.id;
    result.date = entity.date;
    result.income = entity.income;
    result.expense = entity.expense;
    result.description = entity.description;

    return result;
  }
}

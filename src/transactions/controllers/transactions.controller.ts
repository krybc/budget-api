import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionsService } from '../services/transactions.service';
import { CreateTransactionRequestDto } from '../dto/create-transaction.request.dto';
import { UpdateTransactionRequestDto } from '../dto/update-transaction.request.dto';
import { plainToClass } from 'class-transformer';
import { TransactionsListFiltersDto } from '../dto/transactions-list-filters.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() dto: CreateTransactionRequestDto) {
    return await this.transactionsService.create(
      plainToClass(CreateTransactionRequestDto, dto),
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTransactionRequestDto,
  ) {
    dto.id = parseInt(id);
    return this.transactionsService.update(
      plainToClass(UpdateTransactionRequestDto, dto),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.transactionsService.delete(parseInt(id));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.transactionsService.getOneById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async list(@Query() filters: TransactionsListFiltersDto) {
    return this.transactionsService.getList(
      plainToClass(TransactionsListFiltersDto, filters),
    );
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import { CreateAccountRequestDto } from '../dto/create-account.request.dto';
import { UpdateAccountRequestDto } from '../dto/update-account.request.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post()
  async create(@Body() dto: CreateAccountRequestDto) {
    return this.accountsService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAccountRequestDto) {
    dto.id = parseInt(id);
    return this.accountsService.update(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.accountsService.delete(parseInt(id));
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.accountsService.getOneById(id);
  }

  @Get()
  async list() {
    return this.accountsService.getList();
  }
}

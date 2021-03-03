import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ContractorsService } from '../services/contractors.service';
import { CreateContractorRequestDto } from '../dto/create-contractor.request.dto';
import { UpdateContractorRequestDto } from '../dto/update-contractor.request.dto';

@Controller('contractors')
export class ContractorsController {
  constructor(private contractorsService: ContractorsService) {}

  @Post()
  async create(@Body() dto: CreateContractorRequestDto) {
    return this.contractorsService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateContractorRequestDto,
  ) {
    dto.id = parseInt(id);
    return this.contractorsService.update(dto);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.contractorsService.getOneById(id);
  }

  @Get()
  async list() {
    return this.contractorsService.getList();
  }
}

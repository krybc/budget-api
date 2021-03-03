import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ContractorRepository } from '../../core/repositories/contractor.repository';
import { ContractorFactory } from '../factories/contractor.factory';
import { CreateContractorRequestDto } from '../dto/create-contractor.request.dto';
import { UpdateContractorRequestDto } from '../dto/update-contractor.request.dto';

@Injectable()
export class ContractorsService {
  private contractorRepository: ContractorRepository;

  constructor(
    private connection: Connection,
    private contractorFactory: ContractorFactory,
  ) {
    this.contractorRepository = connection.getCustomRepository(
      ContractorRepository,
    );
  }

  async create(dto: CreateContractorRequestDto) {
    const account = await this.contractorFactory.fromCreateDto(dto);
    return await this.contractorRepository.save(account);
  }

  async update(dto: UpdateContractorRequestDto) {
    const account = await this.contractorFactory.fromUpdateDto(dto);
    return await this.contractorRepository.save(account);
  }

  async getOneById(id: number) {
    return await this.contractorRepository.findOne({
      id: id,
    });
  }

  async getList() {
    return await this.contractorRepository.find();
  }
}

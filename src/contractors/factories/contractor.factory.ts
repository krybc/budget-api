import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ContractorRepository } from '../../core/repositories/contractor.repository';
import { UpdateContractorRequestDto } from '../dto/update-contractor.request.dto';
import { CreateContractorRequestDto } from '../dto/create-contractor.request.dto';
import { Contractor } from '../../core/entities/contractor';

@Injectable()
export class ContractorFactory {
  private contractorRepository: ContractorRepository;

  constructor(private connection: Connection) {
    this.contractorRepository = connection.getCustomRepository(
      ContractorRepository,
    );
  }

  async fromCreateDto(dto: CreateContractorRequestDto): Promise<Contractor> {
    return Object.assign(new Contractor(), dto);
  }

  async fromUpdateDto(dto: UpdateContractorRequestDto): Promise<Contractor> {
    const contractor = await this.contractorRepository.findOne({ id: dto.id });

    contractor.name = dto.name;
    contractor.street = dto.street;
    contractor.city = dto.city;

    return contractor;
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { Contractor } from '../entities/contractor';

@EntityRepository(Contractor)
export class ContractorRepository extends Repository<Contractor> {}

import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/category';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}

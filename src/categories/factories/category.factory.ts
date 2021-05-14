import { CreateCategoryRequestDto } from '../dto/create-category.request.dto';
import { Category } from '../../core/entities/category';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoryRequestDto } from '../dto/update-category.request.dto';
import { CategoryRepository } from '../../core/repositories/category.repository';
import { Connection } from 'typeorm';

@Injectable()
export class CategoryFactory {
  private categoryRepository: CategoryRepository;

  constructor(private connection: Connection) {
    this.categoryRepository = connection.getCustomRepository(
      CategoryRepository,
    );
  }

  async fromCreateDto(dto: CreateCategoryRequestDto): Promise<Category> {
    if (dto.parentId) {
      const parent = await this.categoryRepository.findOne({
        id: dto.parentId,
      });
      if (!parent) {
        throw new NotFoundException('Parent category not found');
      }

      return Object.assign(new Category(), dto, { parent });
    }

    const lastCategory = await this.categoryRepository.findOne(
      { parent: parent ?? null },
      { order: { sequence: 'DESC' } },
    );

    dto.sequence = lastCategory ? ++lastCategory.sequence : 0;

    return Object.assign(new Category(), dto);
  }

  async fromUpdateDto(dto: UpdateCategoryRequestDto): Promise<Category> {
    const category = await this.categoryRepository.findOne(
      { id: dto.id },
      { relations: ['parent'] },
    );
    if (dto.parentId && dto.parentId !== category.parent.id) {
      const parent = await this.categoryRepository.findOne({
        id: dto.parentId,
      });
      if (!parent) {
        throw new NotFoundException('Parent category not found');
      }

      category.parent = parent;
    }

    category.name = dto.name;
    category.type = dto.type;
    category.sequence = dto.sequence;

    return category;
  }
}

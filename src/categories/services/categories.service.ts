import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection, MoreThanOrEqual } from 'typeorm';
import { CreateCategoryRequestDto } from '../dto/create-category.request.dto';
import { CategoryFactory } from '../factories/category.factory';
import { CategoryRepository } from '../../core/repositories/category.repository';
import { UpdateCategoryRequestDto } from '../dto/update-category.request.dto';
import { Category } from '../../core/entities/category';
import { CategoryResponseDtoFactory } from '../factories/category.response.dto.factory';

@Injectable()
export class CategoriesService {
  private categoryRepository: CategoryRepository;

  constructor(
    private connection: Connection,
    private categoryFactory: CategoryFactory,
  ) {
    this.categoryRepository = connection.getCustomRepository(
      CategoryRepository,
    );
  }

  async create(dto: CreateCategoryRequestDto) {
    const category = await this.categoryRepository.save(
      await this.categoryFactory.fromCreateDto(dto),
    );
    return CategoryResponseDtoFactory.fromEntity(category);
  }

  async update(dto: UpdateCategoryRequestDto) {
    const category = await this.categoryRepository.save(
      await this.categoryFactory.fromUpdateDto(dto),
    );

    return CategoryResponseDtoFactory.fromEntity(category);
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findOne({ id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return await this.categoryRepository.remove(category);
  }

  async getOneById(id: number) {
    const category = await this.categoryRepository.findOne(
      {
        id,
      },
      { relations: ['parent'] },
    );

    return CategoryResponseDtoFactory.fromEntity(category);
  }

  async getList() {
    const categories = await this.categoryRepository.find({
      relations: ['parent'],
      order: { sequence: 'ASC' },
    });

    return categories.map((item) =>
      CategoryResponseDtoFactory.fromEntity(item),
    );
  }

  async getTree(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['childrens'],
    });
  }

  async changeOrder(id: number, sequence: number) {
    const category = await this.categoryRepository.findOne(
      { id },
      { relations: ['parent'] },
    );

    const categoriesToChangeSequence = await this.getCategoriesToChangeSequence(
      category,
      sequence,
    );

    for (const item of categoriesToChangeSequence) {
      await this.categoryRepository.save(item);
    }

    category.sequence = sequence;
    return await this.categoryRepository.save(category);
  }

  private async getCategoriesToChangeSequence(
    category: Category,
    sequence: number,
  ): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      where: {
        parent: category.parent,
      },
      order: { sequence: 'ASC' },
    });

    categories.splice(
      categories.indexOf(categories.find((it) => it.id === category.id)),
      1,
    );

    let index = 1;
    for (const item of categories) {
      if (index !== sequence) {
        item.sequence = index;
      } else {
        ++index;
        item.sequence = index;
      }

      index++;
    }

    return categories;
  }
}

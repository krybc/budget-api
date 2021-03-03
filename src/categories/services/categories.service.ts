import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
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
        id: id,
      },
      { relations: ['parent'] },
    );

    return CategoryResponseDtoFactory.fromEntity(category);
  }

  async getList() {
    const categories = await this.categoryRepository.find({
      relations: ['parent'],
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
}

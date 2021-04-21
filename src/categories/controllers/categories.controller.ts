import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryRequestDto } from '../dto/create-category.request.dto';
import { CategoriesService } from '../services/categories.service';
import { UpdateCategoryRequestDto } from '../dto/update-category.request.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() dto: CreateCategoryRequestDto) {
    return this.categoriesService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryRequestDto) {
    dto.id = parseInt(id);
    return this.categoriesService.update(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoriesService.delete(parseInt(id));
  }

  @Get('tree')
  async tree() {
    return this.categoriesService.getTree();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.categoriesService.getOneById(id);
  }

  @Get()
  async list() {
    return this.categoriesService.getList();
  }

  @Patch(':id/order/:sequence')
  async order(
    @Param('id') idParam: string,
    @Param('sequence') sequenceParam: string,
  ) {
    const id = parseInt(idParam);
    const sequence = parseInt(sequenceParam);
    this.categoriesService.changeOrder(id, sequence);
  }
}

import { Category } from '../../core/entities/category';
import { CategoryResponseDto } from '../dto/category.response.dto';

export class CategoryResponseDtoFactory {
  public static fromEntity(entity: Category): CategoryResponseDto {
    const result = new CategoryResponseDto();
    result.id = entity.id;
    result.name = entity.name;
    result.parentId = entity.parent ? entity.parent.id : null;
    result.type = entity.type;
    result.sequence = entity.sequence;

    return result;
  }
}

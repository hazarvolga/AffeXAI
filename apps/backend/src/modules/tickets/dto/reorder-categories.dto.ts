import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CategoryOrderDto {
  @ApiProperty({ description: 'Category ID' })
  id: string;

  @ApiProperty({ description: 'New order value' })
  order: number;

  @ApiProperty({ description: 'Parent category ID', required: false })
  parentId?: string;
}

export class ReorderCategoriesDto {
  @ApiProperty({ description: 'Array of category IDs with new order values', type: [CategoryOrderDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryOrderDto)
  categories: CategoryOrderDto[];
}

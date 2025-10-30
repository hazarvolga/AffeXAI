import { IsString, IsOptional, IsBoolean, IsInt, IsUUID, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketCategoryDto {
  @ApiProperty({ description: 'Category name', example: 'Technical Support' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Category description', required: false, example: 'Issues related to software bugs and errors' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Parent category ID for nested categories', required: false })
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiProperty({ description: 'Hex color code (e.g., #FF5733)', required: false, example: '#FF5733' })
  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'Color must be a valid hex color code (e.g., #FF5733)' })
  color?: string;

  @ApiProperty({ description: 'Lucide icon name (e.g., FolderTree, Bug, Zap)', required: false, example: 'FolderTree' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ description: 'Display order for sorting', default: 0 })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiProperty({ description: 'Whether category is active', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

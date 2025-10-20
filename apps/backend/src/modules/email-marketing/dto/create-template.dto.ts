import { IsString, IsOptional, MinLength, IsBoolean, IsEnum } from 'class-validator';
import { CreateTemplateDto as ICreateTemplateDto, TemplateType } from '@affexai/shared-types';

export class CreateTemplateDto implements ICreateTemplateDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;

  @IsEnum(TemplateType)
  @IsOptional()
  type?: TemplateType | string;

  @IsString()
  @IsOptional()
  fileTemplateName?: string;

  @IsOptional()
  variables?: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
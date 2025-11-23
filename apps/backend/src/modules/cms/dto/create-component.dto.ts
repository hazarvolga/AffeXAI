import { IsString, IsEnum, IsUUID, IsOptional, IsInt, IsObject } from 'class-validator';
import { ComponentType } from '@affexai/shared-types';

export class CreateComponentDto {
  @IsUUID()
  pageId: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;

  @IsEnum(ComponentType)
  type: ComponentType;

  @IsObject()
  props: any;

  @IsOptional()
  @IsInt()
  orderIndex?: number;
}
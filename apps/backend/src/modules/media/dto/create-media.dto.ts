import { IsString, IsOptional, IsEnum, IsBoolean, IsInt, Min } from 'class-validator';
import { MediaType, StorageType } from '@affexai/shared-types';

export class CreateMediaDto {
  @IsString()
  filename: string;

  @IsString()
  originalName: string;

  @IsString()
  mimeType: string;

  @IsInt()
  @Min(0)
  size: number;

  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @IsEnum(MediaType)
  @IsOptional()
  type?: MediaType;

  @IsEnum(StorageType)
  @IsOptional()
  storageType?: StorageType;

  @IsString()
  @IsOptional()
  altText?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
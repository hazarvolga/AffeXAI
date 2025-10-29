import { IsString, IsNotEmpty, IsOptional, IsBoolean, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { FormSchema } from '../entities/ticket-form-definition.entity';

/**
 * DTO for creating a new ticket form definition
 */
export class CreateTicketFormDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested()
  @Type(() => Object)
  schema: FormSchema;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean = false;
}

/**
 * DTO for updating an existing ticket form definition
 */
export class UpdateTicketFormDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested()
  @Type(() => Object)
  @IsOptional()
  schema?: FormSchema;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;

  @IsString()
  @IsOptional()
  changeLog?: string; // Description of changes for version history
}

/**
 * DTO for toggling form active status
 */
export class ToggleFormActiveDto {
  @IsBoolean()
  isActive: boolean;
}

/**
 * DTO for reverting to a previous version
 */
export class RevertToVersionDto {
  @IsString()
  @IsOptional()
  changeLog?: string;
}

/**
 * DTO for pagination and filtering form definitions
 */
export class GetFormDefinitionsDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;

  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  isActive?: boolean;
}

/**
 * DTO for getting form versions
 */
export class GetFormVersionsDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 20;
}

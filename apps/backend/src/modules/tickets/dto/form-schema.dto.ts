import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsArray,
  ValidateNested,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Field type enum for validation
 */
export enum FieldType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  NUMBER = 'number',
  EMAIL = 'email',
  URL = 'url',
  DATE = 'date',
  DATETIME = 'datetime',
  TIME = 'time',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  FILE = 'file',
  FILE_MULTIPLE = 'file-multiple',
  FILE_SINGLE = 'file-single',
  RICHTEXT = 'richtext',
  HTML = 'html',
  EDD_ORDER = 'edd-order',
  EDD_PRODUCT = 'edd-product'
}

/**
 * Field option DTO
 */
export class FieldOptionDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsOptional()
  labelEn?: string;

  @IsNotEmpty()
  value: string | number | boolean;
}

/**
 * Field validation DTO
 */
export class FieldValidationDto {
  @IsNumber()
  @IsOptional()
  min?: number;

  @IsNumber()
  @IsOptional()
  max?: number;

  @IsNumber()
  @IsOptional()
  minLength?: number;

  @IsNumber()
  @IsOptional()
  maxLength?: number;

  @IsString()
  @IsOptional()
  pattern?: string;

  @IsNumber()
  @IsOptional()
  maxFiles?: number;

  @IsNumber()
  @IsOptional()
  maxFileSize?: number;
}

/**
 * Field conditional DTO
 */
export class FieldConditionalDto {
  @IsOptional()
  visibleIf?: any;

  @IsOptional()
  requiredIf?: any;

  @IsOptional()
  enabledIf?: any;
}

/**
 * Field metadata DTO
 */
export class FieldMetadataDto {
  @IsInt()
  @Min(0)
  order: number;

  @IsString()
  @IsOptional()
  width?: 'full' | 'half' | 'third';

  @IsString()
  @IsOptional()
  category?: string;

  @IsBoolean()
  @IsOptional()
  agentOnly?: boolean;

  @IsInt()
  @IsOptional()
  rows?: number;

  @IsString()
  @IsOptional()
  helpText?: string;

  @IsString()
  @IsOptional()
  helpTextEn?: string;
}

/**
 * Form field DTO
 */
export class FormFieldDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsOptional()
  labelEn?: string;

  @IsEnum(FieldType)
  type: FieldType;

  @IsBoolean()
  required: boolean;

  @IsString()
  @IsOptional()
  placeholder?: string;

  @IsString()
  @IsOptional()
  placeholderEn?: string;

  @IsString()
  @IsOptional()
  helpText?: string;

  @IsString()
  @IsOptional()
  helpTextEn?: string;

  @IsOptional()
  defaultValue?: any;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldOptionDto)
  @IsOptional()
  options?: FieldOptionDto[];

  @IsString()
  @IsOptional()
  dataSource?: string;

  @IsString()
  @IsOptional()
  loadAfter?: string;

  @IsBoolean()
  @IsOptional()
  autoFill?: boolean;

  @IsNumber()
  @IsOptional()
  ticketListWidth?: number;

  @IsString()
  @IsOptional()
  dateDisplayAs?: 'date' | 'relative';

  @IsString()
  @IsOptional()
  dateFormat?: string;

  @IsBoolean()
  @IsOptional()
  hasPersonalInfo?: boolean;

  @ValidateNested()
  @Type(() => FieldValidationDto)
  @IsOptional()
  validation?: FieldValidationDto;

  @ValidateNested()
  @Type(() => FieldConditionalDto)
  @IsOptional()
  conditional?: FieldConditionalDto;

  @ValidateNested()
  @Type(() => FieldMetadataDto)
  metadata: FieldMetadataDto;
}

/**
 * Conditional logic action DTO
 */
export class ConditionalActionDto {
  @IsEnum(['show', 'hide', 'require', 'enable', 'disable', 'setValue'])
  type: 'show' | 'hide' | 'require' | 'enable' | 'disable' | 'setValue';

  @IsArray()
  @IsString({ each: true })
  targetFieldIds: string[];

  @IsOptional()
  value?: any;
}

/**
 * Conditional logic DTO
 */
export class ConditionalLogicDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  condition: any;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConditionalActionDto)
  actions: ConditionalActionDto[];
}

/**
 * Form schema DTO - Main validation class
 */
export class FormSchemaDto {
  @IsString()
  @IsNotEmpty()
  formId: string;

  @IsString()
  @IsNotEmpty()
  formName: string;

  @IsInt()
  @Min(1)
  version: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FormFieldDto)
  fields: FormFieldDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConditionalLogicDto)
  @IsOptional()
  conditionalLogic?: ConditionalLogicDto[];
}

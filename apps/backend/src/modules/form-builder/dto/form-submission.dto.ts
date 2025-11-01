import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsObject,
  IsEnum,
  IsDateString,
  IsInt,
  Min,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum SubmissionStatus {
  PENDING = 'pending',
  PROCESSED = 'processed',
  FAILED = 'failed',
  ARCHIVED = 'archived',
}

/**
 * DTO for creating a form submission
 */
export class CreateFormSubmissionDto {
  @ApiProperty({ description: 'Form definition ID' })
  @IsUUID()
  @IsNotEmpty()
  formId: string;

  @ApiProperty({ description: 'Submitted form data (JSON object)' })
  @IsObject()
  @IsNotEmpty()
  submittedData: any;

  @ApiProperty({
    description: 'Source module',
    example: 'tickets',
    enum: ['tickets', 'events', 'certificates', 'cms'],
  })
  @IsString()
  @IsNotEmpty()
  sourceModule: string;

  @ApiPropertyOptional({ description: 'Source record ID (e.g., ticket ID)' })
  @IsUUID()
  @IsOptional()
  sourceRecordId?: string;

  @ApiPropertyOptional({ description: 'Submitter user ID' })
  @IsUUID()
  @IsOptional()
  submittedBy?: string;

  @ApiPropertyOptional({ description: 'Submitter IP address' })
  @IsString()
  @IsOptional()
  submitterIp?: string;

  @ApiPropertyOptional({ description: 'Submitter user agent' })
  @IsString()
  @IsOptional()
  submitterUserAgent?: string;
}

/**
 * DTO for updating a form submission
 */
export class UpdateFormSubmissionDto {
  @ApiPropertyOptional({
    description: 'Submission status',
    enum: SubmissionStatus,
  })
  @IsEnum(SubmissionStatus)
  @IsOptional()
  status?: SubmissionStatus;

  @ApiPropertyOptional({ description: 'Processing notes' })
  @IsString()
  @IsOptional()
  processingNotes?: string;
}

/**
 * DTO for marking submission as processed
 */
export class ProcessSubmissionDto {
  @ApiProperty({ description: 'User ID who processed the submission' })
  @IsUUID()
  @IsNotEmpty()
  processedBy: string;

  @ApiPropertyOptional({ description: 'Processing notes' })
  @IsString()
  @IsOptional()
  processingNotes?: string;
}

/**
 * DTO for filtering form submissions
 */
export class FormSubmissionFiltersDto {
  @ApiPropertyOptional({ description: 'Form ID filter' })
  @IsUUID()
  @IsOptional()
  formId?: string;

  @ApiPropertyOptional({ description: 'Source module filter' })
  @IsString()
  @IsOptional()
  sourceModule?: string;

  @ApiPropertyOptional({ description: 'Source record ID filter' })
  @IsUUID()
  @IsOptional()
  sourceRecordId?: string;

  @ApiPropertyOptional({ description: 'Status filter', enum: SubmissionStatus })
  @IsEnum(SubmissionStatus)
  @IsOptional()
  status?: SubmissionStatus;

  @ApiPropertyOptional({ description: 'Submitted by user ID filter' })
  @IsUUID()
  @IsOptional()
  submittedBy?: string;

  @ApiPropertyOptional({ description: 'Start date filter (ISO 8601)' })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ description: 'End date filter (ISO 8601)' })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    default: 20,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 20;
}

/**
 * DTO for export options
 */
export class ExportSubmissionsDto {
  @ApiPropertyOptional({ description: 'Form ID filter' })
  @IsUUID()
  @IsOptional()
  formId?: string;

  @ApiPropertyOptional({ description: 'Source module filter' })
  @IsString()
  @IsOptional()
  sourceModule?: string;

  @ApiPropertyOptional({ description: 'Status filter', enum: SubmissionStatus })
  @IsEnum(SubmissionStatus)
  @IsOptional()
  status?: SubmissionStatus;

  @ApiPropertyOptional({ description: 'Start date filter (ISO 8601)' })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ description: 'End date filter (ISO 8601)' })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    description: 'Export format',
    enum: ['excel', 'csv', 'json'],
    default: 'excel',
  })
  @IsEnum(['excel', 'csv', 'json'])
  @IsNotEmpty()
  format: 'excel' | 'csv' | 'json' = 'excel';

  @ApiPropertyOptional({
    description: 'Include metadata sheet (Excel/JSON only)',
    default: true,
  })
  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  includeMetadata?: boolean = true;
}

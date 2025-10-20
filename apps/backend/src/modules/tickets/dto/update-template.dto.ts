import { PartialType } from '@nestjs/swagger';
import { CreateTemplateDto } from './create-template.dto';

/**
 * DTO for updating a ticket template
 */
export class UpdateTemplateDto extends PartialType(CreateTemplateDto) {}

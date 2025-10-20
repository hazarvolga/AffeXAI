import { PartialType } from '@nestjs/mapped-types';
import { CreateTemplateDto } from './create-template.dto';
import { UpdateTemplateDto as IUpdateTemplateDto } from '@affexai/shared-types';

export class UpdateTemplateDto extends PartialType(CreateTemplateDto) implements Partial<IUpdateTemplateDto> {}
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAiPreferenceDto } from './create-user-ai-preference.dto';

export class UpdateUserAiPreferenceDto extends PartialType(CreateUserAiPreferenceDto) {}

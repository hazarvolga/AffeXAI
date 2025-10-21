import { IsEnum, IsString, IsBoolean, IsOptional, MaxLength } from 'class-validator';
import { AiProvider, AiModule } from '../entities/user-ai-preference.entity';

export class CreateUserAiPreferenceDto {
  @IsEnum(AiModule)
  module: AiModule;

  @IsEnum(AiProvider)
  provider: AiProvider;

  @IsString()
  @MaxLength(100)
  model: string;

  @IsOptional()
  @IsString()
  apiKey?: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}

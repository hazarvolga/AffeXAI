import { IsString, IsBoolean, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Supported AI Models
 */
export enum AiModel {
  GPT_4 = 'gpt-4',
  GPT_4_TURBO = 'gpt-4-turbo',
  GPT_4O = 'gpt-4o',
  GPT_3_5_TURBO = 'gpt-3.5-turbo',
  CLAUDE_3_OPUS = 'claude-3-opus-20240229',
  CLAUDE_3_SONNET = 'claude-3-sonnet-20240229',
  CLAUDE_3_HAIKU = 'claude-3-haiku-20240307',
}

/**
 * AI Module Settings
 * Used for each AI-powered module (emailMarketing, social, support, analytics)
 */
export class AiModuleSettingsDto {
  @IsOptional()
  @IsString()
  apiKey?: string; // Module-specific API key (optional if using global)

  @IsEnum(AiModel)
  model: AiModel;

  @IsBoolean()
  enabled: boolean;

  @IsOptional()
  @IsString()
  provider?: 'openai' | 'anthropic'; // Auto-detected from model, but can override
}

/**
 * Complete AI Settings
 */
export class AiSettingsDto {
  @IsBoolean()
  useSingleApiKey: boolean; // If true, all modules use global.apiKey

  @IsOptional()
  @ValidateNested()
  @Type(() => AiModuleSettingsDto)
  global?: AiModuleSettingsDto; // Global AI settings (used when useSingleApiKey=true)

  @ValidateNested()
  @Type(() => AiModuleSettingsDto)
  emailMarketing: AiModuleSettingsDto;

  @ValidateNested()
  @Type(() => AiModuleSettingsDto)
  social: AiModuleSettingsDto;

  @ValidateNested()
  @Type(() => AiModuleSettingsDto)
  support: AiModuleSettingsDto;

  @ValidateNested()
  @Type(() => AiModuleSettingsDto)
  analytics: AiModuleSettingsDto;
}

/**
 * Masked AI Settings (for frontend - API keys hidden)
 */
export class AiSettingsMaskedDto extends AiSettingsDto {
  static mask(settings: AiSettingsDto): AiSettingsMaskedDto {
    const masked = JSON.parse(JSON.stringify(settings)) as AiSettingsMaskedDto;

    // Mask global API key
    if (masked.global?.apiKey) {
      masked.global.apiKey = '***' + masked.global.apiKey.slice(-4);
    }

    // Mask module-specific API keys
    if (masked.emailMarketing?.apiKey) {
      masked.emailMarketing.apiKey = '***' + masked.emailMarketing.apiKey.slice(-4);
    }
    if (masked.social?.apiKey) {
      masked.social.apiKey = '***' + masked.social.apiKey.slice(-4);
    }
    if (masked.support?.apiKey) {
      masked.support.apiKey = '***' + masked.support.apiKey.slice(-4);
    }
    if (masked.analytics?.apiKey) {
      masked.analytics.apiKey = '***' + masked.analytics.apiKey.slice(-4);
    }

    return masked;
  }
}

/**
 * AI Connection Test Result
 */
export class AiConnectionTestDto {
  @IsBoolean()
  success: boolean;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  provider?: string; // openai, anthropic

  @IsOptional()
  @IsString()
  model?: string; // actual model tested
}

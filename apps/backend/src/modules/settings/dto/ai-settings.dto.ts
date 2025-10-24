import { IsString, IsBoolean, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Supported AI Providers
 */
export enum AiProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GOOGLE = 'google',
  OPENROUTER = 'openrouter',
  LOCAL = 'local',
}

/**
 * Supported AI Models
 */
export enum AiModel {
  // OpenAI Models
  GPT_4 = 'gpt-4',
  GPT_4_TURBO = 'gpt-4-turbo',
  GPT_4O = 'gpt-4o',
  GPT_3_5_TURBO = 'gpt-3.5-turbo',
  
  // Anthropic Models
  CLAUDE_3_5_SONNET = 'claude-3-5-sonnet-20241022',
  CLAUDE_3_OPUS = 'claude-3-opus-20240229',
  CLAUDE_3_SONNET = 'claude-3-sonnet-20240229',
  CLAUDE_3_HAIKU = 'claude-3-haiku-20240307',
  
  // Google Models
  GEMINI_PRO = 'gemini-pro',
  GEMINI_PRO_VISION = 'gemini-pro-vision',
  GEMINI_1_5_PRO = 'gemini-1.5-pro',
  GEMINI_1_5_FLASH = 'gemini-1.5-flash',
  
  // OpenRouter Models (Popular ones)
  OPENROUTER_GPT_4 = 'openai/gpt-4',
  OPENROUTER_CLAUDE_3_5_SONNET = 'anthropic/claude-3.5-sonnet',
  OPENROUTER_LLAMA_3_1_70B = 'meta-llama/llama-3.1-70b-instruct',
  
  // Local Models (Ollama)
  LOCAL_LLAMA_3_1 = 'llama3.1',
  LOCAL_MISTRAL = 'mistral',
  LOCAL_CODELLAMA = 'codellama',
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
  @IsEnum(AiProvider)
  provider?: AiProvider; // Auto-detected from model, but can override
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

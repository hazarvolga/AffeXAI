/**
 * Supported AI Models
 */
export declare enum AiModel {
    GPT_4 = "gpt-4",
    GPT_4_TURBO = "gpt-4-turbo",
    GPT_4O = "gpt-4o",
    GPT_3_5_TURBO = "gpt-3.5-turbo",
    CLAUDE_3_OPUS = "claude-3-opus-20240229",
    CLAUDE_3_SONNET = "claude-3-sonnet-20240229",
    CLAUDE_3_HAIKU = "claude-3-haiku-20240307"
}
/**
 * AI Module Settings
 * Used for each AI-powered module (emailMarketing, social, support, analytics)
 */
export declare class AiModuleSettingsDto {
    apiKey?: string;
    model: AiModel;
    enabled: boolean;
    provider?: 'openai' | 'anthropic';
}
/**
 * Complete AI Settings
 */
export declare class AiSettingsDto {
    useSingleApiKey: boolean;
    global?: AiModuleSettingsDto;
    emailMarketing: AiModuleSettingsDto;
    social: AiModuleSettingsDto;
    support: AiModuleSettingsDto;
    analytics: AiModuleSettingsDto;
}
/**
 * Masked AI Settings (for frontend - API keys hidden)
 */
export declare class AiSettingsMaskedDto extends AiSettingsDto {
    static mask(settings: AiSettingsDto): AiSettingsMaskedDto;
}
/**
 * AI Connection Test Result
 */
export declare class AiConnectionTestDto {
    success: boolean;
    message: string;
    provider?: string;
    model?: string;
}
//# sourceMappingURL=ai-settings.dto.d.ts.map
/**
 * Supported AI Providers
 */
export declare enum AiProvider {
    OPENAI = "openai",
    ANTHROPIC = "anthropic",
    GOOGLE = "google",
    OPENROUTER = "openrouter",
    LOCAL = "local"
}
/**
 * Supported AI Models
 */
export declare enum AiModel {
    GPT_4 = "gpt-4",
    GPT_4_TURBO = "gpt-4-turbo",
    GPT_4O = "gpt-4o",
    GPT_3_5_TURBO = "gpt-3.5-turbo",
    CLAUDE_3_5_SONNET = "claude-3-5-sonnet-20241022",
    CLAUDE_3_OPUS = "claude-3-opus-20240229",
    CLAUDE_3_SONNET = "claude-3-sonnet-20240229",
    CLAUDE_3_HAIKU = "claude-3-haiku-20240307",
    GEMINI_PRO = "gemini-pro",
    GEMINI_PRO_VISION = "gemini-pro-vision",
    GEMINI_1_5_PRO = "gemini-1.5-pro",
    GEMINI_1_5_FLASH = "gemini-1.5-flash",
    OPENROUTER_GPT_4 = "openai/gpt-4",
    OPENROUTER_CLAUDE_3_5_SONNET = "anthropic/claude-3.5-sonnet",
    OPENROUTER_LLAMA_3_1_70B = "meta-llama/llama-3.1-70b-instruct",
    LOCAL_LLAMA_3_1 = "llama3.1",
    LOCAL_MISTRAL = "mistral",
    LOCAL_CODELLAMA = "codellama"
}
/**
 * AI Module Settings
 * Used for each AI-powered module (emailMarketing, social, support, analytics)
 */
export declare class AiModuleSettingsDto {
    apiKey?: string;
    model: AiModel;
    enabled: boolean;
    provider?: AiProvider;
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
export interface Contact {
    address: string;
    phone: string;
    email: string;
}
export interface SocialMedia {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    pinterest?: string;
    tiktok?: string;
    [key: string]: string | undefined;
}
export interface Seo {
    defaultTitle: string;
    defaultDescription: string;
}
export interface SiteSettings {
    companyName: string;
    logoUrl: string;
    logoDarkUrl: string;
    contact: Contact;
    socialMedia: SocialMedia;
    seo: Seo;
}
export type AiModel = 'gpt-4' | 'gpt-4-turbo' | 'gpt-4o' | 'gpt-3.5-turbo' | 'claude-3-5-sonnet-20241022' | 'claude-3-opus-20240229' | 'claude-3-sonnet-20240229' | 'claude-3-haiku-20240307' | 'gemini-pro' | 'gemini-pro-vision' | 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'openai/gpt-4' | 'anthropic/claude-3.5-sonnet' | 'meta-llama/llama-3.1-70b-instruct' | 'llama3.1' | 'mistral' | 'codellama';
export type AiProvider = 'openai' | 'anthropic' | 'google' | 'openrouter' | 'local';
export interface AiModuleSettings {
    apiKey?: string;
    model: AiModel;
    enabled: boolean;
    provider?: AiProvider;
}
export interface AiSettings {
    useSingleApiKey: boolean;
    global?: AiModuleSettings;
    emailMarketing: AiModuleSettings;
    social: AiModuleSettings;
    support: AiModuleSettings;
    analytics: AiModuleSettings;
}
export interface AiConnectionTestResult {
    success: boolean;
    message: string;
    provider?: AiProvider;
    model?: AiModel;
}
/**
 * Settings Service
 * Handles site settings API operations with unified HTTP client
 * Note: Uses getWrapped() because backend uses global ApiResponse wrapper
 */
declare class SettingsService {
    /**
     * Get site settings
     */
    getSiteSettings(): Promise<SiteSettings>;
    /**
     * Get AI settings (returns masked API keys)
     */
    getAiSettings(): Promise<AiSettings>;
    /**
     * Update AI settings
     */
    updateAiSettings(settings: AiSettings): Promise<{
        message: string;
    }>;
    /**
     * Test AI connection for specific module
     */
    testAiConnection(module: 'emailMarketing' | 'social' | 'support' | 'analytics'): Promise<AiConnectionTestResult>;
}
export declare const settingsService: SettingsService;
export default settingsService;
//# sourceMappingURL=settingsService.d.ts.map
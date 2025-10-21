import { Repository } from 'typeorm';
import { Setting, SettingCategory } from './entities/setting.entity';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SiteSettingsDto } from './dto/site-settings.dto';
import { EmailSettingsDto, EmailSettingsMaskedDto } from './dto/email-settings.dto';
import { AiSettingsDto, AiSettingsMaskedDto, AiModel } from './dto/ai-settings.dto';
export declare class SettingsService {
    private settingsRepository;
    private readonly logger;
    constructor(settingsRepository: Repository<Setting>);
    create(createSettingDto: CreateSettingDto): Promise<Setting>;
    findAll(): Promise<Setting[]>;
    findOne(id: string): Promise<Setting>;
    findByCategory(category: SettingCategory): Promise<Setting[]>;
    findByKeyAndCategory(key: string, category: SettingCategory): Promise<Setting | null>;
    update(id: string, updateSettingDto: UpdateSettingDto): Promise<Setting>;
    remove(id: string): Promise<void>;
    getSiteSettings(): Promise<SiteSettingsDto>;
    updateSiteSettings(settingsDto: SiteSettingsDto): Promise<SiteSettingsDto>;
    /**
     * Get email settings from database
     * Returns decrypted values for API keys
     */
    getEmailSettings(): Promise<EmailSettingsDto>;
    /**
     * Get masked email settings (for frontend)
     */
    getEmailSettingsMasked(): Promise<EmailSettingsMaskedDto>;
    /**
     * Update email settings
     * Automatically encrypts API keys
     */
    updateEmailSettings(settingsDto: EmailSettingsDto): Promise<EmailSettingsDto>;
    /**
     * Helper: Get decrypted value for a key
     */
    private getDecryptedValue;
    /**
     * Helper: Update or create setting with automatic encryption
     */
    private updateOrCreateSettingEncrypted;
    private getSettingValue;
    private updateOrCreateSetting;
    /**
     * Get AI settings from database
     * Returns decrypted API keys
     */
    getAiSettings(): Promise<AiSettingsDto>;
    /**
     * Get masked AI settings (for frontend)
     */
    getAiSettingsMasked(): Promise<AiSettingsMaskedDto>;
    /**
     * Update AI settings
     * Automatically encrypts API keys
     */
    updateAiSettings(settingsDto: AiSettingsDto): Promise<void>;
    /**
     * Get API key for specific module
     * Returns global key if useSingleApiKey=true, otherwise module-specific key
     */
    getAiApiKeyForModule(module: 'emailMarketing' | 'social' | 'support' | 'analytics'): Promise<string | null>;
    /**
     * Get AI model for specific module
     */
    getAiModelForModule(module: 'emailMarketing' | 'social' | 'support' | 'analytics'): Promise<AiModel>;
    /**
     * Helper: Determine provider from model name
     */
    private getProviderFromModel;
}
//# sourceMappingURL=settings.service.d.ts.map
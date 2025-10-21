import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SiteSettingsDto } from './dto/site-settings.dto';
import { EmailSettingsDto, EmailSettingsMaskedDto } from './dto/email-settings.dto';
import { AiSettingsDto, AiSettingsMaskedDto, AiConnectionTestDto } from './dto/ai-settings.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    create(createSettingDto: CreateSettingDto): Promise<import("./entities/setting.entity").Setting>;
    findAll(): Promise<import("./entities/setting.entity").Setting[]>;
    findOne(id: string): Promise<import("./entities/setting.entity").Setting>;
    update(id: string, updateSettingDto: UpdateSettingDto): Promise<import("./entities/setting.entity").Setting>;
    remove(id: string): Promise<void>;
    getSiteSettings(): Promise<SiteSettingsDto>;
    updateSiteSettings(siteSettingsDto: SiteSettingsDto): Promise<SiteSettingsDto>;
    getEmailSettings(): Promise<EmailSettingsDto>;
    getEmailSettingsMasked(): Promise<EmailSettingsMaskedDto>;
    updateEmailSettings(emailSettingsDto: EmailSettingsDto): Promise<EmailSettingsDto>;
    getAiSettings(): Promise<AiSettingsMaskedDto>;
    updateAiSettings(aiSettingsDto: AiSettingsDto): Promise<{
        message: string;
    }>;
    testAiConnection(module: 'emailMarketing' | 'social' | 'support' | 'analytics'): Promise<AiConnectionTestDto>;
}
//# sourceMappingURL=settings.controller.d.ts.map
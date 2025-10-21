import { TemplateFileService } from './template-file.service';
import { SettingsService } from '../../settings/settings.service';
export declare class TemplatePreviewService {
    private readonly templateFileService;
    private readonly settingsService;
    constructor(templateFileService: TemplateFileService, settingsService: SettingsService);
    previewTemplate(templateId: string, templateType?: 'file' | 'db'): Promise<string>;
    private injectSiteSettings;
}
//# sourceMappingURL=template-preview.service.d.ts.map
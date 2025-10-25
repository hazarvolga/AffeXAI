"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const setting_entity_1 = require("./entities/setting.entity");
const email_settings_dto_1 = require("./dto/email-settings.dto");
const ai_settings_dto_1 = require("./dto/ai-settings.dto");
let SettingsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SettingsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SettingsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        settingsRepository;
        logger = new common_1.Logger(SettingsService.name);
        constructor(settingsRepository) {
            this.settingsRepository = settingsRepository;
        }
        async create(createSettingDto) {
            const setting = this.settingsRepository.create(createSettingDto);
            return this.settingsRepository.save(setting);
        }
        async findAll() {
            return this.settingsRepository.find();
        }
        async findOne(id) {
            const setting = await this.settingsRepository.findOne({ where: { id } });
            if (!setting) {
                throw new common_1.NotFoundException(`Setting with ID ${id} not found`);
            }
            return setting;
        }
        async findByCategory(category) {
            return this.settingsRepository.find({ where: { category } });
        }
        async findByKeyAndCategory(key, category) {
            return this.settingsRepository.findOne({ where: { key, category } });
        }
        async update(id, updateSettingDto) {
            const setting = await this.findOne(id);
            Object.assign(setting, updateSettingDto);
            return this.settingsRepository.save(setting);
        }
        async remove(id) {
            const setting = await this.findOne(id);
            await this.settingsRepository.remove(setting);
        }
        // Site settings specific methods
        async getSiteSettings() {
            const settings = await this.settingsRepository.find();
            // Convert flat settings to nested structure
            const siteSettings = {
                companyName: this.getSettingValue(settings, setting_entity_1.SettingCategory.COMPANY, 'companyName', 'Aluplan Program Sistemleri'),
                logoUrl: this.getSettingValue(settings, setting_entity_1.SettingCategory.COMPANY, 'logoUrl', 'https://placehold.co/140x40/f7f7f7/1a1a1a?text=Aluplan'),
                logoDarkUrl: this.getSettingValue(settings, setting_entity_1.SettingCategory.COMPANY, 'logoDarkUrl', 'https://placehold.co/140x40/171717/f0f0f0?text=Aluplan'),
                contact: {
                    address: this.getSettingValue(settings, setting_entity_1.SettingCategory.COMPANY, 'contact.address', 'Örnek Mah. Teknoloji Cad. No:123, Ataşehir/İstanbul'),
                    phone: this.getSettingValue(settings, setting_entity_1.SettingCategory.COMPANY, 'contact.phone', '+90 216 123 45 67'),
                    email: this.getSettingValue(settings, setting_entity_1.SettingCategory.COMPANY, 'contact.email', 'info@aluplan.com.tr'),
                },
                socialMedia: {
                    facebook: this.getSettingValue(settings, setting_entity_1.SettingCategory.SOCIAL_MEDIA, 'facebook', 'https://www.facebook.com/aluplan'),
                    linkedin: this.getSettingValue(settings, setting_entity_1.SettingCategory.SOCIAL_MEDIA, 'linkedin', 'https://www.linkedin.com/company/aluplan'),
                    twitter: this.getSettingValue(settings, setting_entity_1.SettingCategory.SOCIAL_MEDIA, 'twitter', ''),
                    youtube: this.getSettingValue(settings, setting_entity_1.SettingCategory.SOCIAL_MEDIA, 'youtube', 'https://www.youtube.com/aluplan'),
                    instagram: this.getSettingValue(settings, setting_entity_1.SettingCategory.SOCIAL_MEDIA, 'instagram', 'https://www.instagram.com/aluplan'),
                },
                seo: {
                    defaultTitle: this.getSettingValue(settings, setting_entity_1.SettingCategory.COMPANY, 'seo.defaultTitle', 'Aluplan Digital - AEC Çözümleri'),
                    defaultDescription: this.getSettingValue(settings, setting_entity_1.SettingCategory.COMPANY, 'seo.defaultDescription', 'AEC profesyonelleri için en gelişmiş dijital çözümler ve uzman desteği.'),
                },
            };
            return siteSettings;
        }
        async updateSiteSettings(settingsDto) {
            // Update company settings
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.COMPANY, 'companyName', settingsDto.companyName);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.COMPANY, 'logoUrl', settingsDto.logoUrl);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.COMPANY, 'logoDarkUrl', settingsDto.logoDarkUrl);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.COMPANY, 'contact.address', settingsDto.contact.address);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.COMPANY, 'contact.phone', settingsDto.contact.phone);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.COMPANY, 'contact.email', settingsDto.contact.email);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.COMPANY, 'seo.defaultTitle', settingsDto.seo.defaultTitle);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.COMPANY, 'seo.defaultDescription', settingsDto.seo.defaultDescription);
            // Update social media settings
            for (const [platform, url] of Object.entries(settingsDto.socialMedia)) {
                if (url !== undefined) {
                    await this.updateOrCreateSetting(setting_entity_1.SettingCategory.SOCIAL_MEDIA, platform, url);
                }
            }
            return settingsDto;
        }
        // ============ EMAIL SETTINGS METHODS ============
        /**
         * Get email settings from database
         * Returns decrypted values for API keys
         */
        async getEmailSettings() {
            const settings = await this.findByCategory(setting_entity_1.SettingCategory.EMAIL);
            const emailSettings = {
                provider: this.getSettingValue(settings, setting_entity_1.SettingCategory.EMAIL, 'provider', 'resend'),
                transactional: {
                    domain: this.getSettingValue(settings, setting_entity_1.SettingCategory.EMAIL, 'transactional.domain', 'tx.aluplan.tr'),
                    fromName: this.getSettingValue(settings, setting_entity_1.SettingCategory.EMAIL, 'transactional.fromName', 'Aluplan'),
                    fromEmail: this.getSettingValue(settings, setting_entity_1.SettingCategory.EMAIL, 'transactional.fromEmail', 'noreply@tx.aluplan.tr'),
                    replyToEmail: this.getSettingValue(settings, setting_entity_1.SettingCategory.EMAIL, 'transactional.replyToEmail', 'destek@aluplan.tr'),
                },
                marketing: {
                    domain: this.getSettingValue(settings, setting_entity_1.SettingCategory.EMAIL, 'marketing.domain', 'news.aluplan.tr'),
                    fromName: this.getSettingValue(settings, setting_entity_1.SettingCategory.EMAIL, 'marketing.fromName', 'Aluplan Newsletter'),
                    fromEmail: this.getSettingValue(settings, setting_entity_1.SettingCategory.EMAIL, 'marketing.fromEmail', 'newsletter@news.aluplan.tr'),
                    replyToEmail: this.getSettingValue(settings, setting_entity_1.SettingCategory.EMAIL, 'marketing.replyToEmail', 'iletisim@aluplan.tr'),
                },
                tracking: {
                    clickTracking: this.getSettingValue(settings, setting_entity_1.SettingCategory.EMAIL, 'tracking.clickTracking', 'false') === 'true',
                    openTracking: this.getSettingValue(settings, setting_entity_1.SettingCategory.EMAIL, 'tracking.openTracking', 'true') === 'true',
                },
                rateLimit: {
                    transactional: parseInt(this.getSettingValue(settings, setting_entity_1.SettingCategory.EMAIL, 'rateLimit.transactional', '1000')),
                    marketing: parseInt(this.getSettingValue(settings, setting_entity_1.SettingCategory.EMAIL, 'rateLimit.marketing', '500')),
                },
            };
            // Add provider-specific config (decrypted)
            switch (emailSettings.provider) {
                case email_settings_dto_1.EmailProvider.RESEND:
                    const resendApiKey = await this.getDecryptedValue('resend.apiKey', setting_entity_1.SettingCategory.EMAIL);
                    if (resendApiKey) {
                        emailSettings.resend = { apiKey: resendApiKey };
                    }
                    break;
                case email_settings_dto_1.EmailProvider.SENDGRID:
                    const sendgridApiKey = await this.getDecryptedValue('sendgrid.apiKey', setting_entity_1.SettingCategory.EMAIL);
                    if (sendgridApiKey) {
                        emailSettings.sendgrid = { apiKey: sendgridApiKey };
                    }
                    break;
                // Add other providers as needed
            }
            return emailSettings;
        }
        /**
         * Get masked email settings (for frontend)
         */
        async getEmailSettingsMasked() {
            const settings = await this.getEmailSettings();
            return email_settings_dto_1.EmailSettingsMaskedDto.mask(settings);
        }
        /**
         * Update email settings
         * Automatically encrypts API keys
         */
        async updateEmailSettings(settingsDto) {
            // Update basic settings
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'provider', settingsDto.provider);
            // Transactional settings
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'transactional.domain', settingsDto.transactional.domain);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'transactional.fromName', settingsDto.transactional.fromName);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'transactional.fromEmail', settingsDto.transactional.fromEmail);
            if (settingsDto.transactional.replyToEmail) {
                await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'transactional.replyToEmail', settingsDto.transactional.replyToEmail);
            }
            // Marketing settings
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'marketing.domain', settingsDto.marketing.domain);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'marketing.fromName', settingsDto.marketing.fromName);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'marketing.fromEmail', settingsDto.marketing.fromEmail);
            if (settingsDto.marketing.replyToEmail) {
                await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'marketing.replyToEmail', settingsDto.marketing.replyToEmail);
            }
            // Tracking settings
            if (settingsDto.tracking) {
                await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'tracking.clickTracking', String(settingsDto.tracking.clickTracking));
                await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'tracking.openTracking', String(settingsDto.tracking.openTracking));
            }
            // Rate limit settings
            if (settingsDto.rateLimit) {
                await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'rateLimit.transactional', String(settingsDto.rateLimit.transactional));
                await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'rateLimit.marketing', String(settingsDto.rateLimit.marketing));
            }
            // Provider-specific config (will be encrypted automatically)
            if (settingsDto.resend?.apiKey) {
                await this.updateOrCreateSettingEncrypted(setting_entity_1.SettingCategory.EMAIL, 'resend.apiKey', settingsDto.resend.apiKey);
            }
            if (settingsDto.sendgrid?.apiKey) {
                await this.updateOrCreateSettingEncrypted(setting_entity_1.SettingCategory.EMAIL, 'sendgrid.apiKey', settingsDto.sendgrid.apiKey);
            }
            if (settingsDto.postmark?.apiKey) {
                await this.updateOrCreateSettingEncrypted(setting_entity_1.SettingCategory.EMAIL, 'postmark.apiKey', settingsDto.postmark.apiKey);
            }
            if (settingsDto.mailgun?.apiKey) {
                await this.updateOrCreateSettingEncrypted(setting_entity_1.SettingCategory.EMAIL, 'mailgun.apiKey', settingsDto.mailgun.apiKey);
                if (settingsDto.mailgun.domain) {
                    await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'mailgun.domain', settingsDto.mailgun.domain);
                }
            }
            if (settingsDto.ses?.accessKey && settingsDto.ses?.secretKey) {
                await this.updateOrCreateSettingEncrypted(setting_entity_1.SettingCategory.EMAIL, 'ses.accessKey', settingsDto.ses.accessKey);
                await this.updateOrCreateSettingEncrypted(setting_entity_1.SettingCategory.EMAIL, 'ses.secretKey', settingsDto.ses.secretKey);
                if (settingsDto.ses.region) {
                    await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'ses.region', settingsDto.ses.region);
                }
            }
            if (settingsDto.smtp) {
                await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'smtp.host', settingsDto.smtp.host);
                await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'smtp.port', String(settingsDto.smtp.port));
                await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'smtp.user', settingsDto.smtp.user);
                await this.updateOrCreateSettingEncrypted(setting_entity_1.SettingCategory.EMAIL, 'smtp.password', settingsDto.smtp.password);
                await this.updateOrCreateSetting(setting_entity_1.SettingCategory.EMAIL, 'smtp.secure', String(settingsDto.smtp.secure));
            }
            this.logger.log('Email settings updated successfully');
            return settingsDto;
        }
        /**
         * Helper: Get decrypted value for a key
         */
        async getDecryptedValue(key, category) {
            const setting = await this.findByKeyAndCategory(key, category);
            return setting ? setting.getDecryptedValue() : null;
        }
        /**
         * Helper: Update or create setting with automatic encryption
         */
        async updateOrCreateSettingEncrypted(category, key, plainValue) {
            const existingSetting = await this.findByKeyAndCategory(key, category);
            if (existingSetting) {
                // Update with encryption
                existingSetting.setEncryptedValue(plainValue);
                await this.settingsRepository.save(existingSetting);
            }
            else {
                // Create new with encryption
                const newSetting = this.settingsRepository.create({ category, key, value: '' });
                newSetting.setEncryptedValue(plainValue);
                await this.settingsRepository.save(newSetting);
            }
        }
        getSettingValue(settings, category, key, defaultValue) {
            const setting = settings.find(s => s.category === category && s.key === key);
            if (!setting)
                return defaultValue;
            // Return decrypted value if encrypted
            return setting.isEncrypted ? setting.getDecryptedValue() : setting.value;
        }
        async updateOrCreateSetting(category, key, value) {
            const existingSetting = await this.findByKeyAndCategory(key, category);
            if (existingSetting) {
                await this.update(existingSetting.id, { value });
            }
            else {
                await this.create({ category, key, value });
            }
        }
        // ============ AI SETTINGS METHODS ============
        /**
         * Get AI settings from database
         * Returns decrypted API keys
         */
        async getAiSettings() {
            const settings = await this.findByCategory(setting_entity_1.SettingCategory.AI);
            const aiSettings = {
                useSingleApiKey: this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'global.useSingleKey', 'false') === 'true',
                emailMarketing: {
                    apiKey: (await this.getDecryptedValue('emailMarketing.apiKey', setting_entity_1.SettingCategory.AI)) || undefined,
                    model: this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'emailMarketing.model', ai_settings_dto_1.AiModel.GPT_4_TURBO),
                    enabled: this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'emailMarketing.enabled', 'true') === 'true',
                    provider: this.getProviderFromModel(this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'emailMarketing.model', ai_settings_dto_1.AiModel.GPT_4_TURBO)),
                },
                social: {
                    apiKey: (await this.getDecryptedValue('social.apiKey', setting_entity_1.SettingCategory.AI)) || undefined,
                    model: this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'social.model', ai_settings_dto_1.AiModel.GPT_4_TURBO),
                    enabled: this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'social.enabled', 'false') === 'true',
                    provider: this.getProviderFromModel(this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'social.model', ai_settings_dto_1.AiModel.GPT_4_TURBO)),
                },
                support: {
                    apiKey: (await this.getDecryptedValue('support.apiKey', setting_entity_1.SettingCategory.AI)) || undefined,
                    model: this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'support.model', ai_settings_dto_1.AiModel.GPT_4_TURBO),
                    enabled: this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'support.enabled', 'false') === 'true',
                    provider: this.getProviderFromModel(this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'support.model', ai_settings_dto_1.AiModel.GPT_4_TURBO)),
                },
                analytics: {
                    apiKey: (await this.getDecryptedValue('analytics.apiKey', setting_entity_1.SettingCategory.AI)) || undefined,
                    model: this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'analytics.model', ai_settings_dto_1.AiModel.GPT_4_TURBO),
                    enabled: this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'analytics.enabled', 'false') === 'true',
                    provider: this.getProviderFromModel(this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'analytics.model', ai_settings_dto_1.AiModel.GPT_4_TURBO)),
                },
            };
            // Add global settings if using single API key
            if (aiSettings.useSingleApiKey) {
                aiSettings.global = {
                    apiKey: (await this.getDecryptedValue('global.apiKey', setting_entity_1.SettingCategory.AI)) || undefined,
                    model: this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'global.model', ai_settings_dto_1.AiModel.GPT_4_TURBO),
                    enabled: true,
                    provider: this.getProviderFromModel(this.getSettingValue(settings, setting_entity_1.SettingCategory.AI, 'global.model', ai_settings_dto_1.AiModel.GPT_4_TURBO)),
                };
            }
            return aiSettings;
        }
        /**
         * Get masked AI settings (for frontend)
         */
        async getAiSettingsMasked() {
            const settings = await this.getAiSettings();
            return ai_settings_dto_1.AiSettingsMaskedDto.mask(settings);
        }
        /**
         * Update AI settings
         * Automatically encrypts API keys
         */
        async updateAiSettings(settingsDto) {
            // Update global settings
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.AI, 'global.useSingleKey', String(settingsDto.useSingleApiKey));
            if (settingsDto.useSingleApiKey && settingsDto.global) {
                if (settingsDto.global.apiKey) {
                    await this.updateOrCreateSettingEncrypted(setting_entity_1.SettingCategory.AI, 'global.apiKey', settingsDto.global.apiKey);
                }
                await this.updateOrCreateSetting(setting_entity_1.SettingCategory.AI, 'global.model', settingsDto.global.model);
            }
            // Update Email Marketing settings
            if (settingsDto.emailMarketing.apiKey) {
                await this.updateOrCreateSettingEncrypted(setting_entity_1.SettingCategory.AI, 'emailMarketing.apiKey', settingsDto.emailMarketing.apiKey);
            }
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.AI, 'emailMarketing.model', settingsDto.emailMarketing.model);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.AI, 'emailMarketing.enabled', String(settingsDto.emailMarketing.enabled));
            // Update Social Media settings
            if (settingsDto.social.apiKey) {
                await this.updateOrCreateSettingEncrypted(setting_entity_1.SettingCategory.AI, 'social.apiKey', settingsDto.social.apiKey);
            }
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.AI, 'social.model', settingsDto.social.model);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.AI, 'social.enabled', String(settingsDto.social.enabled));
            // Update Support settings
            if (settingsDto.support.apiKey) {
                await this.updateOrCreateSettingEncrypted(setting_entity_1.SettingCategory.AI, 'support.apiKey', settingsDto.support.apiKey);
            }
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.AI, 'support.model', settingsDto.support.model);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.AI, 'support.enabled', String(settingsDto.support.enabled));
            // Update Analytics settings
            if (settingsDto.analytics.apiKey) {
                await this.updateOrCreateSettingEncrypted(setting_entity_1.SettingCategory.AI, 'analytics.apiKey', settingsDto.analytics.apiKey);
            }
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.AI, 'analytics.model', settingsDto.analytics.model);
            await this.updateOrCreateSetting(setting_entity_1.SettingCategory.AI, 'analytics.enabled', String(settingsDto.analytics.enabled));
            this.logger.log('AI settings updated successfully');
        }
        /**
         * Get API key for specific module
         * Returns global key if useSingleApiKey=true, otherwise module-specific key
         */
        async getAiApiKeyForModule(module) {
            const settings = await this.getAiSettings();
            // If module is disabled, return null
            if (!settings[module]?.enabled) {
                this.logger.warn(`AI module '${module}' is disabled`);
                return null;
            }
            // Use global key if configured
            if (settings.useSingleApiKey && settings.global?.apiKey) {
                return settings.global.apiKey;
            }
            // Use module-specific key
            return settings[module]?.apiKey || null;
        }
        /**
         * Get AI model for specific module
         */
        async getAiModelForModule(module) {
            const settings = await this.getAiSettings();
            // Use global model if configured
            if (settings.useSingleApiKey && settings.global?.model) {
                return settings.global.model;
            }
            // Use module-specific model
            return settings[module]?.model || ai_settings_dto_1.AiModel.GPT_4_TURBO;
        }
        /**
         * Helper: Determine provider from model name
         */
        getProviderFromModel(model) {
            if (model.startsWith('gpt-') || model.includes('openai/')) {
                return ai_settings_dto_1.AiProvider.OPENAI;
            }
            if (model.startsWith('claude-') || model.includes('anthropic/')) {
                return ai_settings_dto_1.AiProvider.ANTHROPIC;
            }
            if (model.startsWith('gemini-') || model.includes('google/')) {
                return ai_settings_dto_1.AiProvider.GOOGLE;
            }
            if (model.includes('/') && !model.startsWith('gpt-') && !model.startsWith('claude-')) {
                return ai_settings_dto_1.AiProvider.OPENROUTER;
            }
            if (['llama3.1', 'mistral', 'codellama'].includes(model)) {
                return ai_settings_dto_1.AiProvider.LOCAL;
            }
            return ai_settings_dto_1.AiProvider.OPENAI; // default fallback
        }
    };
    return SettingsService = _classThis;
})();
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map
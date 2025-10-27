import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting, SettingCategory } from './entities/setting.entity';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SiteSettingsDto } from './dto/site-settings.dto';
import {
  EmailSettingsDto,
  EmailSettingsMaskedDto,
  EmailProvider,
} from './dto/email-settings.dto';
import {
  AiSettingsDto,
  AiSettingsMaskedDto,
  AiModel,
  AiProvider,
  AiConnectionTestDto,
} from './dto/ai-settings.dto';
import { ApiKeyDetector } from './utils/api-key-detector';
import { KeyManagementService } from '../../shared/services/key-management.service';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(
    @InjectRepository(Setting)
    private settingsRepository: Repository<Setting>,
    private keyManagementService: KeyManagementService,
  ) {}

  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    const setting = this.settingsRepository.create(createSettingDto);
    return this.settingsRepository.save(setting);
  }

  async findAll(): Promise<Setting[]> {
    return this.settingsRepository.find();
  }

  async findOne(id: string): Promise<Setting> {
    const setting = await this.settingsRepository.findOne({ where: { id } });
    if (!setting) {
      throw new NotFoundException(`Setting with ID ${id} not found`);
    }
    return setting;
  }

  async findByCategory(category: SettingCategory): Promise<Setting[]> {
    return this.settingsRepository.find({ where: { category } });
  }

  async findByKeyAndCategory(key: string, category: SettingCategory): Promise<Setting | null> {
    return this.settingsRepository.findOne({ where: { key, category } });
  }

  async update(id: string, updateSettingDto: UpdateSettingDto): Promise<Setting> {
    const setting = await this.findOne(id);
    Object.assign(setting, updateSettingDto);
    return this.settingsRepository.save(setting);
  }

  async remove(id: string): Promise<void> {
    const setting = await this.findOne(id);
    await this.settingsRepository.remove(setting);
  }

  // Site settings specific methods
  async getSiteSettings(): Promise<SiteSettingsDto> {
    const settings = await this.settingsRepository.find();
    
    // Convert flat settings to nested structure
    const siteSettings: SiteSettingsDto = {
      companyName: this.getSettingValue(settings, SettingCategory.COMPANY, 'companyName', 'Aluplan Program Sistemleri'),
      logoUrl: this.getSettingValue(settings, SettingCategory.COMPANY, 'logoUrl', 'https://placehold.co/140x40/f7f7f7/1a1a1a?text=Aluplan'),
      logoDarkUrl: this.getSettingValue(settings, SettingCategory.COMPANY, 'logoDarkUrl', 'https://placehold.co/140x40/171717/f0f0f0?text=Aluplan'),
      contact: {
        address: this.getSettingValue(settings, SettingCategory.COMPANY, 'contact.address', 'Örnek Mah. Teknoloji Cad. No:123, Ataşehir/İstanbul'),
        phone: this.getSettingValue(settings, SettingCategory.COMPANY, 'contact.phone', '+90 216 123 45 67'),
        email: this.getSettingValue(settings, SettingCategory.COMPANY, 'contact.email', 'info@aluplan.com.tr'),
      },
      socialMedia: {
        facebook: this.getSettingValue(settings, SettingCategory.SOCIAL_MEDIA, 'facebook', 'https://www.facebook.com/aluplan'),
        linkedin: this.getSettingValue(settings, SettingCategory.SOCIAL_MEDIA, 'linkedin', 'https://www.linkedin.com/company/aluplan'),
        twitter: this.getSettingValue(settings, SettingCategory.SOCIAL_MEDIA, 'twitter', ''),
        youtube: this.getSettingValue(settings, SettingCategory.SOCIAL_MEDIA, 'youtube', 'https://www.youtube.com/aluplan'),
        instagram: this.getSettingValue(settings, SettingCategory.SOCIAL_MEDIA, 'instagram', 'https://www.instagram.com/aluplan'),
      },
      seo: {
        defaultTitle: this.getSettingValue(settings, SettingCategory.COMPANY, 'seo.defaultTitle', 'Aluplan Digital - AEC Çözümleri'),
        defaultDescription: this.getSettingValue(settings, SettingCategory.COMPANY, 'seo.defaultDescription', 'AEC profesyonelleri için en gelişmiş dijital çözümler ve uzman desteği.'),
      },
    };

    return siteSettings;
  }

  async updateSiteSettings(settingsDto: SiteSettingsDto): Promise<SiteSettingsDto> {
    // Update company settings
    await this.updateOrCreateSetting(SettingCategory.COMPANY, 'companyName', settingsDto.companyName);
    await this.updateOrCreateSetting(SettingCategory.COMPANY, 'logoUrl', settingsDto.logoUrl);
    await this.updateOrCreateSetting(SettingCategory.COMPANY, 'logoDarkUrl', settingsDto.logoDarkUrl);
    await this.updateOrCreateSetting(SettingCategory.COMPANY, 'contact.address', settingsDto.contact.address);
    await this.updateOrCreateSetting(SettingCategory.COMPANY, 'contact.phone', settingsDto.contact.phone);
    await this.updateOrCreateSetting(SettingCategory.COMPANY, 'contact.email', settingsDto.contact.email);
    await this.updateOrCreateSetting(SettingCategory.COMPANY, 'seo.defaultTitle', settingsDto.seo.defaultTitle);
    await this.updateOrCreateSetting(SettingCategory.COMPANY, 'seo.defaultDescription', settingsDto.seo.defaultDescription);

    // Update social media settings
    for (const [platform, url] of Object.entries(settingsDto.socialMedia)) {
      if (url !== undefined) {
        await this.updateOrCreateSetting(SettingCategory.SOCIAL_MEDIA, platform, url);
      }
    }

    return settingsDto;
  }

  // ============ EMAIL SETTINGS METHODS ============

  /**
   * Get email settings from database
   * Returns decrypted values for API keys
   */
  async getEmailSettings(): Promise<EmailSettingsDto> {
    const settings = await this.findByCategory(SettingCategory.EMAIL);

    const emailSettings: EmailSettingsDto = {
      provider: this.getSettingValue(settings, SettingCategory.EMAIL, 'provider', 'resend') as EmailProvider,
      transactional: {
        domain: this.getSettingValue(settings, SettingCategory.EMAIL, 'transactional.domain', 'tx.aluplan.tr'),
        fromName: this.getSettingValue(settings, SettingCategory.EMAIL, 'transactional.fromName', 'Aluplan'),
        fromEmail: this.getSettingValue(settings, SettingCategory.EMAIL, 'transactional.fromEmail', 'noreply@tx.aluplan.tr'),
        replyToEmail: this.getSettingValue(settings, SettingCategory.EMAIL, 'transactional.replyToEmail', 'destek@aluplan.tr'),
      },
      marketing: {
        domain: this.getSettingValue(settings, SettingCategory.EMAIL, 'marketing.domain', 'news.aluplan.tr'),
        fromName: this.getSettingValue(settings, SettingCategory.EMAIL, 'marketing.fromName', 'Aluplan Newsletter'),
        fromEmail: this.getSettingValue(settings, SettingCategory.EMAIL, 'marketing.fromEmail', 'newsletter@news.aluplan.tr'),
        replyToEmail: this.getSettingValue(settings, SettingCategory.EMAIL, 'marketing.replyToEmail', 'iletisim@aluplan.tr'),
      },
      tracking: {
        clickTracking: this.getSettingValue(settings, SettingCategory.EMAIL, 'tracking.clickTracking', 'false') === 'true',
        openTracking: this.getSettingValue(settings, SettingCategory.EMAIL, 'tracking.openTracking', 'true') === 'true',
      },
      rateLimit: {
        transactional: parseInt(this.getSettingValue(settings, SettingCategory.EMAIL, 'rateLimit.transactional', '1000')),
        marketing: parseInt(this.getSettingValue(settings, SettingCategory.EMAIL, 'rateLimit.marketing', '500')),
      },
    };

    // Add provider-specific config (decrypted)
    switch (emailSettings.provider) {
      case EmailProvider.RESEND:
        const resendApiKey = await this.getDecryptedValue('resend.apiKey', SettingCategory.EMAIL);
        if (resendApiKey) {
          emailSettings.resend = { apiKey: resendApiKey };
        }
        break;
      
      case EmailProvider.SENDGRID:
        const sendgridApiKey = await this.getDecryptedValue('sendgrid.apiKey', SettingCategory.EMAIL);
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
  async getEmailSettingsMasked(): Promise<EmailSettingsMaskedDto> {
    const settings = await this.getEmailSettings();
    return EmailSettingsMaskedDto.mask(settings);
  }

  /**
   * Update email settings
   * Automatically encrypts API keys
   */
  async updateEmailSettings(settingsDto: EmailSettingsDto): Promise<EmailSettingsDto> {
    // Update basic settings
    await this.updateOrCreateSetting(SettingCategory.EMAIL, 'provider', settingsDto.provider);
    
    // Transactional settings
    await this.updateOrCreateSetting(SettingCategory.EMAIL, 'transactional.domain', settingsDto.transactional.domain);
    await this.updateOrCreateSetting(SettingCategory.EMAIL, 'transactional.fromName', settingsDto.transactional.fromName);
    await this.updateOrCreateSetting(SettingCategory.EMAIL, 'transactional.fromEmail', settingsDto.transactional.fromEmail);
    if (settingsDto.transactional.replyToEmail) {
      await this.updateOrCreateSetting(SettingCategory.EMAIL, 'transactional.replyToEmail', settingsDto.transactional.replyToEmail);
    }

    // Marketing settings
    await this.updateOrCreateSetting(SettingCategory.EMAIL, 'marketing.domain', settingsDto.marketing.domain);
    await this.updateOrCreateSetting(SettingCategory.EMAIL, 'marketing.fromName', settingsDto.marketing.fromName);
    await this.updateOrCreateSetting(SettingCategory.EMAIL, 'marketing.fromEmail', settingsDto.marketing.fromEmail);
    if (settingsDto.marketing.replyToEmail) {
      await this.updateOrCreateSetting(SettingCategory.EMAIL, 'marketing.replyToEmail', settingsDto.marketing.replyToEmail);
    }

    // Tracking settings
    if (settingsDto.tracking) {
      await this.updateOrCreateSetting(SettingCategory.EMAIL, 'tracking.clickTracking', String(settingsDto.tracking.clickTracking));
      await this.updateOrCreateSetting(SettingCategory.EMAIL, 'tracking.openTracking', String(settingsDto.tracking.openTracking));
    }

    // Rate limit settings
    if (settingsDto.rateLimit) {
      await this.updateOrCreateSetting(SettingCategory.EMAIL, 'rateLimit.transactional', String(settingsDto.rateLimit.transactional));
      await this.updateOrCreateSetting(SettingCategory.EMAIL, 'rateLimit.marketing', String(settingsDto.rateLimit.marketing));
    }

    // Provider-specific config (will be encrypted automatically)
    if (settingsDto.resend?.apiKey) {
      await this.updateOrCreateSettingEncrypted(SettingCategory.EMAIL, 'resend.apiKey', settingsDto.resend.apiKey);
    }
    if (settingsDto.sendgrid?.apiKey) {
      await this.updateOrCreateSettingEncrypted(SettingCategory.EMAIL, 'sendgrid.apiKey', settingsDto.sendgrid.apiKey);
    }
    if (settingsDto.postmark?.apiKey) {
      await this.updateOrCreateSettingEncrypted(SettingCategory.EMAIL, 'postmark.apiKey', settingsDto.postmark.apiKey);
    }
    if (settingsDto.mailgun?.apiKey) {
      await this.updateOrCreateSettingEncrypted(SettingCategory.EMAIL, 'mailgun.apiKey', settingsDto.mailgun.apiKey);
      if (settingsDto.mailgun.domain) {
        await this.updateOrCreateSetting(SettingCategory.EMAIL, 'mailgun.domain', settingsDto.mailgun.domain);
      }
    }
    if (settingsDto.ses?.accessKey && settingsDto.ses?.secretKey) {
      await this.updateOrCreateSettingEncrypted(SettingCategory.EMAIL, 'ses.accessKey', settingsDto.ses.accessKey);
      await this.updateOrCreateSettingEncrypted(SettingCategory.EMAIL, 'ses.secretKey', settingsDto.ses.secretKey);
      if (settingsDto.ses.region) {
        await this.updateOrCreateSetting(SettingCategory.EMAIL, 'ses.region', settingsDto.ses.region);
      }
    }
    if (settingsDto.smtp) {
      await this.updateOrCreateSetting(SettingCategory.EMAIL, 'smtp.host', settingsDto.smtp.host);
      await this.updateOrCreateSetting(SettingCategory.EMAIL, 'smtp.port', String(settingsDto.smtp.port));
      await this.updateOrCreateSetting(SettingCategory.EMAIL, 'smtp.user', settingsDto.smtp.user);
      await this.updateOrCreateSettingEncrypted(SettingCategory.EMAIL, 'smtp.password', settingsDto.smtp.password);
      await this.updateOrCreateSetting(SettingCategory.EMAIL, 'smtp.secure', String(settingsDto.smtp.secure));
    }

    this.logger.log('Email settings updated successfully');
    return settingsDto;
  }

  /**
   * Helper: Get decrypted value for a key
   */
  private async getDecryptedValue(key: string, category: SettingCategory): Promise<string | null> {
    const setting = await this.findByKeyAndCategory(key, category);
    return setting ? setting.getDecryptedValue() : null;
  }

  /**
   * Helper: Update or create setting with automatic encryption
   */
  private async updateOrCreateSettingEncrypted(category: SettingCategory, key: string, plainValue: string): Promise<void> {
    const existingSetting = await this.findByKeyAndCategory(key, category);
    
    if (existingSetting) {
      // Update with encryption
      existingSetting.setEncryptedValue(plainValue);
      await this.settingsRepository.save(existingSetting);
    } else {
      // Create new with encryption
      const newSetting = this.settingsRepository.create({ category, key, value: '' });
      newSetting.setEncryptedValue(plainValue);
      await this.settingsRepository.save(newSetting);
    }
  }

  private getSettingValue(settings: Setting[], category: SettingCategory, key: string, defaultValue: string): string {
    const setting = settings.find(s => s.category === category && s.key === key);
    if (!setting) return defaultValue;
    
    // Return decrypted value if encrypted
    return setting.isEncrypted ? setting.getDecryptedValue() : setting.value;
  }

  private async updateOrCreateSetting(category: SettingCategory, key: string, value: string): Promise<void> {
    const existingSetting = await this.findByKeyAndCategory(key, category);
    
    if (existingSetting) {
      await this.update(existingSetting.id, { value });
    } else {
      await this.create({ category, key, value });
    }
  }

  // ============ AI SETTINGS METHODS ============

  /**
   * Get AI settings from database
   * Returns decrypted API keys
   */
  async getAiSettings(): Promise<AiSettingsDto> {
    const settings = await this.findByCategory(SettingCategory.AI);

    const aiSettings: AiSettingsDto = {
      useSingleApiKey: this.getSettingValue(settings, SettingCategory.AI, 'global.useSingleKey', 'false') === 'true',
      
      emailMarketing: {
        apiKey: (await this.getDecryptedValue('emailMarketing.apiKey', SettingCategory.AI)) || undefined,
        model: this.getSettingValue(settings, SettingCategory.AI, 'emailMarketing.model', AiModel.GPT_4_TURBO) as AiModel,
        enabled: this.getSettingValue(settings, SettingCategory.AI, 'emailMarketing.enabled', 'true') === 'true',
        provider: this.getProviderFromModel(this.getSettingValue(settings, SettingCategory.AI, 'emailMarketing.model', AiModel.GPT_4_TURBO) as AiModel),
      },

      social: {
        apiKey: (await this.getDecryptedValue('social.apiKey', SettingCategory.AI)) || undefined,
        model: this.getSettingValue(settings, SettingCategory.AI, 'social.model', AiModel.GPT_4_TURBO) as AiModel,
        enabled: this.getSettingValue(settings, SettingCategory.AI, 'social.enabled', 'false') === 'true',
        provider: this.getProviderFromModel(this.getSettingValue(settings, SettingCategory.AI, 'social.model', AiModel.GPT_4_TURBO) as AiModel),
      },

      support: {
        apiKey: (await this.getDecryptedValue('support.apiKey', SettingCategory.AI)) || undefined,
        model: this.getSettingValue(settings, SettingCategory.AI, 'support.model', AiModel.GPT_4_TURBO) as AiModel,
        enabled: this.getSettingValue(settings, SettingCategory.AI, 'support.enabled', 'false') === 'true',
        provider: this.getProviderFromModel(this.getSettingValue(settings, SettingCategory.AI, 'support.model', AiModel.GPT_4_TURBO) as AiModel),
      },

      analytics: {
        apiKey: (await this.getDecryptedValue('analytics.apiKey', SettingCategory.AI)) || undefined,
        model: this.getSettingValue(settings, SettingCategory.AI, 'analytics.model', AiModel.GPT_4_TURBO) as AiModel,
        enabled: this.getSettingValue(settings, SettingCategory.AI, 'analytics.enabled', 'false') === 'true',
        provider: this.getProviderFromModel(this.getSettingValue(settings, SettingCategory.AI, 'analytics.model', AiModel.GPT_4_TURBO) as AiModel),
      },
    };

    // Add global settings if using single API key
    if (aiSettings.useSingleApiKey) {
      aiSettings.global = {
        apiKey: (await this.getDecryptedValue('global.apiKey', SettingCategory.AI)) || undefined,
        model: this.getSettingValue(settings, SettingCategory.AI, 'global.model', AiModel.GPT_4_TURBO) as AiModel,
        enabled: true,
        provider: this.getProviderFromModel(this.getSettingValue(settings, SettingCategory.AI, 'global.model', AiModel.GPT_4_TURBO) as AiModel),
      };
    }

    return aiSettings;
  }

  /**
   * Get masked AI settings (for frontend)
   */
  async getAiSettingsMasked(): Promise<AiSettingsMaskedDto> {
    const settings = await this.getAiSettings();
    return AiSettingsMaskedDto.mask(settings);
  }

  /**
   * Update AI settings
   * Automatically encrypts API keys and detects provider from key format
   */
  async updateAiSettings(settingsDto: AiSettingsDto): Promise<void> {
    this.logger.log(`🔧 updateAiSettings called with: ${JSON.stringify({
      useSingleApiKey: settingsDto.useSingleApiKey,
      hasGlobalApiKey: !!settingsDto.global?.apiKey,
      globalApiKeyPreview: settingsDto.global?.apiKey?.substring(0, 10) + '...',
      globalApiKeyLength: settingsDto.global?.apiKey?.length
    })}`);

    // Update global settings
    await this.updateOrCreateSetting(SettingCategory.AI, 'global.useSingleKey', String(settingsDto.useSingleApiKey));

    if (settingsDto.useSingleApiKey && settingsDto.global) {
      // Only update API key if it's not masked (doesn't start with ***)
      if (settingsDto.global.apiKey && !settingsDto.global.apiKey.startsWith('***')) {
        this.logger.log(`💾 Saving global API key: length=${settingsDto.global.apiKey.length}, preview=${settingsDto.global.apiKey.substring(0, 10)}...`);
        await this.updateOrCreateSettingEncrypted(SettingCategory.AI, 'global.apiKey', settingsDto.global.apiKey);

        // Auto-detect provider and model from API key
        const detection = ApiKeyDetector.detect(settingsDto.global.apiKey);

        // Save detected provider
        await this.updateOrCreateSetting(SettingCategory.AI, 'global.provider', detection.provider);

        // Use detected default model if no model specified or if model doesn't match provider
        if (!settingsDto.global.model) {
          await this.updateOrCreateSetting(SettingCategory.AI, 'global.model', detection.defaultModel);
          this.logger.log(`Auto-detected provider: ${detection.provider}, default model: ${detection.defaultModel}`);
        } else {
          await this.updateOrCreateSetting(SettingCategory.AI, 'global.model', settingsDto.global.model);
        }
      } else if (settingsDto.global.model) {
        // Update model even if API key is masked
        await this.updateOrCreateSetting(SettingCategory.AI, 'global.model', settingsDto.global.model);
      }
    }

    // Update Email Marketing settings
    if (settingsDto.emailMarketing.apiKey && !settingsDto.emailMarketing.apiKey.startsWith('***')) {
      await this.updateOrCreateSettingEncrypted(SettingCategory.AI, 'emailMarketing.apiKey', settingsDto.emailMarketing.apiKey);
    }
    await this.updateOrCreateSetting(SettingCategory.AI, 'emailMarketing.model', settingsDto.emailMarketing.model);
    await this.updateOrCreateSetting(SettingCategory.AI, 'emailMarketing.enabled', String(settingsDto.emailMarketing.enabled));

    // Update Social Media settings
    if (settingsDto.social.apiKey && !settingsDto.social.apiKey.startsWith('***')) {
      await this.updateOrCreateSettingEncrypted(SettingCategory.AI, 'social.apiKey', settingsDto.social.apiKey);
    }
    await this.updateOrCreateSetting(SettingCategory.AI, 'social.model', settingsDto.social.model);
    await this.updateOrCreateSetting(SettingCategory.AI, 'social.enabled', String(settingsDto.social.enabled));

    // Update Support settings
    if (settingsDto.support.apiKey && !settingsDto.support.apiKey.startsWith('***')) {
      await this.updateOrCreateSettingEncrypted(SettingCategory.AI, 'support.apiKey', settingsDto.support.apiKey);
    }
    await this.updateOrCreateSetting(SettingCategory.AI, 'support.model', settingsDto.support.model);
    await this.updateOrCreateSetting(SettingCategory.AI, 'support.enabled', String(settingsDto.support.enabled));

    // Update Analytics settings
    if (settingsDto.analytics.apiKey && !settingsDto.analytics.apiKey.startsWith('***')) {
      await this.updateOrCreateSettingEncrypted(SettingCategory.AI, 'analytics.apiKey', settingsDto.analytics.apiKey);
    }
    await this.updateOrCreateSetting(SettingCategory.AI, 'analytics.model', settingsDto.analytics.model);
    await this.updateOrCreateSetting(SettingCategory.AI, 'analytics.enabled', String(settingsDto.analytics.enabled));

    this.logger.log('AI settings updated successfully');
  }


  /**
   * Update AI settings using KEK/DEK pattern (Phase 2 implementation)
   * This is the NEW recommended method that uses Data Encryption Keys per provider
   */
  async updateAiSettingsWithKEKDEK(settingsDto: AiSettingsDto): Promise<void> {
    this.logger.log(`🔐 updateAiSettingsWithKEKDEK called (KEK/DEK pattern)`);

    // Update global settings
    await this.updateOrCreateSetting(SettingCategory.AI, 'global.useSingleKey', String(settingsDto.useSingleApiKey));

    if (settingsDto.useSingleApiKey && settingsDto.global) {
      // Only update API key if it's not masked
      if (settingsDto.global.apiKey && !settingsDto.global.apiKey.startsWith('***')) {
        this.logger.log(`🔐 Encrypting global API key with KEK/DEK pattern`);
        
        // Encrypt using KEK/DEK pattern
        const { encryptedApiKey, encryptedDek } = await this.keyManagementService.encryptApiKey(
          settingsDto.global.apiKey,
          'global'
        );

        // Save encrypted API key
        const setting = await this.findByKeyAndCategory('global.apiKey', SettingCategory.AI);
        if (setting) {
          setting.value = encryptedApiKey;
          setting.isEncrypted = true;
          setting.encryptedDek = encryptedDek;
          setting.provider = 'global';
          setting.dekCreatedAt = new Date();
          setting.dekRotationCount = (setting.dekRotationCount || 0);
          await this.settingsRepository.save(setting);
        } else {
          const newSetting = this.settingsRepository.create({
            category: SettingCategory.AI,
            key: 'global.apiKey',
            value: encryptedApiKey,
            isEncrypted: true,
            encryptedDek,
            provider: 'global',
            dekCreatedAt: new Date(),
            dekRotationCount: 0,
          });
          await this.settingsRepository.save(newSetting);
        }

        // Auto-detect provider and model
        const detection = ApiKeyDetector.detect(settingsDto.global.apiKey);
        await this.updateOrCreateSetting(SettingCategory.AI, 'global.provider', detection.provider);
        
        if (!settingsDto.global.model) {
          await this.updateOrCreateSetting(SettingCategory.AI, 'global.model', detection.defaultModel);
          this.logger.log(`Auto-detected provider: ${detection.provider}, model: ${detection.defaultModel}`);
        } else {
          await this.updateOrCreateSetting(SettingCategory.AI, 'global.model', settingsDto.global.model);
        }
      } else if (settingsDto.global.model) {
        await this.updateOrCreateSetting(SettingCategory.AI, 'global.model', settingsDto.global.model);
      }
    }

    // Update module settings with KEK/DEK pattern
    const modules: Array<'emailMarketing' | 'social' | 'support' | 'analytics'> = [
      'emailMarketing',
      'social', 
      'support',
      'analytics'
    ];

    for (const module of modules) {
      const moduleSettings = settingsDto[module];
      
      if (moduleSettings.apiKey && !moduleSettings.apiKey.startsWith('***')) {
        this.logger.log(`🔐 Encrypting ${module} API key with KEK/DEK pattern`);
        
        const { encryptedApiKey, encryptedDek } = await this.keyManagementService.encryptApiKey(
          moduleSettings.apiKey,
          module
        );

        const setting = await this.findByKeyAndCategory(`${module}.apiKey`, SettingCategory.AI);
        if (setting) {
          setting.value = encryptedApiKey;
          setting.isEncrypted = true;
          setting.encryptedDek = encryptedDek;
          setting.provider = module;
          setting.dekCreatedAt = new Date();
          setting.dekRotationCount = (setting.dekRotationCount || 0);
          await this.settingsRepository.save(setting);
        } else {
          const newSetting = this.settingsRepository.create({
            category: SettingCategory.AI,
            key: `${module}.apiKey`,
            value: encryptedApiKey,
            isEncrypted: true,
            encryptedDek,
            provider: module,
            dekCreatedAt: new Date(),
            dekRotationCount: 0,
          });
          await this.settingsRepository.save(newSetting);
        }
      }

      await this.updateOrCreateSetting(SettingCategory.AI, `${module}.model`, moduleSettings.model);
      await this.updateOrCreateSetting(SettingCategory.AI, `${module}.enabled`, String(moduleSettings.enabled));
    }

    this.logger.log('✅ AI settings updated with KEK/DEK pattern successfully');
  }

  /**
   * Rotate DEK for a provider (key rotation)
   */
  async rotateDEKForProvider(provider: 'openai' | 'anthropic' | 'google' | 'global'): Promise<void> {
    this.logger.log(`🔄 Rotating DEK for provider: ${provider}`);

    // Find the setting for this provider
    const setting = await this.settingsRepository.findOne({
      where: {
        category: SettingCategory.AI,
        provider,
        isEncrypted: true
      }
    });

    if (!setting || !setting.encryptedDek) {
      throw new Error(`No encrypted DEK found for provider: ${provider}`);
    }

    // Decrypt the API key with the old DEK
    const apiKey = await this.keyManagementService.decryptApiKey(
      setting.value,
      setting.encryptedDek,
      provider
    );

    // Rotate the DEK (generates new DEK)
    const rotation = await this.keyManagementService.rotateDEK(provider);

    // Re-encrypt the API key with the new DEK
    const encryptedApiKey = this.keyManagementService.encryptWithDEK(apiKey, rotation.newDek);

    // Update the setting
    setting.value = encryptedApiKey;
    setting.encryptedDek = rotation.newEncryptedDek;
    setting.dekCreatedAt = new Date();
    setting.dekRotationCount = (setting.dekRotationCount || 0) + 1;

    await this.settingsRepository.save(setting);

    this.logger.log(`✅ DEK rotated for ${provider}. Rotation count: ${setting.dekRotationCount}`);
  }

  /**
   * Get API key for specific module
   * Returns global key if useSingleApiKey=true, otherwise module-specific key
   */
  async getAiApiKeyForModule(module: 'emailMarketing' | 'social' | 'support' | 'analytics'): Promise<string | null> {
    const settings = await this.getAiSettings();

    // If module is disabled, return null
    if (!settings[module]?.enabled) {
      this.logger.warn(`AI module '${module}' is disabled`);
      return null;
    }

    // Use global key if configured
    if (settings.useSingleApiKey && settings.global?.apiKey) {
      const key = settings.global.apiKey;
      // TEMPORARY DEBUG: Log key format (first 20 chars)
      console.log(`🔍 [DEBUG] Decrypted API Key format: ${key.substring(0, 20)}... (length: ${key.length})`);
      return key;
    }

    // Use module-specific key
    return settings[module]?.apiKey || null;
  }

  /**
   * Get AI model for specific module
   */
  async getAiModelForModule(module: 'emailMarketing' | 'social' | 'support' | 'analytics'): Promise<AiModel> {
    const settings = await this.getAiSettings();

    // Use global model if configured
    if (settings.useSingleApiKey && settings.global?.model) {
      return settings.global.model;
    }

    // Use module-specific model
    return settings[module]?.model || AiModel.GPT_4_TURBO;
  }

  /**
   * Get AI provider for specific module
   */
  async getAiProviderForModule(module: 'emailMarketing' | 'social' | 'support' | 'analytics'): Promise<AiProvider> {
    const settings = await this.getAiSettings();

    // Use global provider if configured
    if (settings.useSingleApiKey && settings.global?.provider) {
      return settings.global.provider;
    }

    // Use module-specific provider
    return settings[module]?.provider || AiProvider.OPENAI;
  }

  /**
   * Helper: Determine provider from model name
   */
  private getProviderFromModel(model: AiModel): AiProvider {
    if (model.startsWith('gpt-') || model.includes('openai/')) {
      return AiProvider.OPENAI;
    }
    if (model.startsWith('claude-') || model.includes('anthropic/')) {
      return AiProvider.ANTHROPIC;
    }
    if (model.startsWith('gemini-') || model.includes('google/')) {
      return AiProvider.GOOGLE;
    }
    if (model.includes('/') && !model.startsWith('gpt-') && !model.startsWith('claude-')) {
      return AiProvider.OPENROUTER;
    }
    if (['llama3.1', 'mistral', 'codellama'].includes(model)) {
      return AiProvider.LOCAL;
    }
    
    return AiProvider.OPENAI; // default fallback
  }
}
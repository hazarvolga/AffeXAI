import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SiteSettingsDto } from './dto/site-settings.dto';
import { EmailSettingsDto, EmailSettingsMaskedDto } from './dto/email-settings.dto';
import { AiSettingsDto, AiSettingsMaskedDto, AiConnectionTestDto } from './dto/ai-settings.dto';
import { DNSVerificationService, DomainVerificationResult } from './dns-verification.service';

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly dnsVerificationService: DNSVerificationService,
  ) {}

  @Post()
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }

  @Get('individual/:id')
  findOne(@Param('id') id: string) {
    return this.settingsService.findOne(id);
  }

  @Put('individual/:id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(id, updateSettingDto);
  }

  @Delete('individual/:id')
  remove(@Param('id') id: string) {
    return this.settingsService.remove(id);
  }

  // Site settings specific endpoints
  @Get('site')
  getSiteSettings() {
    return this.settingsService.getSiteSettings();
  }

  @Put('site')
  updateSiteSettings(@Body() siteSettingsDto: SiteSettingsDto) {
    return this.settingsService.updateSiteSettings(siteSettingsDto);
  }

  // Email settings endpoints
  @Get('email')
  async getEmailSettings(): Promise<EmailSettingsDto> {
    return this.settingsService.getEmailSettings();
  }

  @Get('email/masked')
  async getEmailSettingsMasked(): Promise<EmailSettingsMaskedDto> {
    return this.settingsService.getEmailSettingsMasked();
  }

  @Put('email')
  async updateEmailSettings(@Body() emailSettingsDto: EmailSettingsDto): Promise<EmailSettingsDto> {
    return this.settingsService.updateEmailSettings(emailSettingsDto);
  }

  // AI settings endpoints
  @Get('ai')
  async getAiSettings(): Promise<AiSettingsMaskedDto> {
    // Return masked version for frontend (hides API keys)
    return this.settingsService.getAiSettingsMasked();
  }

  @Patch('ai')
  async updateAiSettings(@Body() aiSettingsDto: AiSettingsDto): Promise<{ message: string }> {
    await this.settingsService.updateAiSettings(aiSettingsDto);
    return { message: 'AI settings updated successfully' };
  }

  @Post('ai/test/:module')
  async testAiConnection(
    @Param('module') module: 'emailMarketing' | 'social' | 'support' | 'analytics',
  ): Promise<AiConnectionTestDto> {
    // TODO: Implement OpenAI API test in next phase
    // For now, just verify settings exist
    const apiKey = await this.settingsService.getAiApiKeyForModule(module);
    const model = await this.settingsService.getAiModelForModule(module);

    if (!apiKey) {
      return {
        success: false,
        message: `No API key configured for ${module}`,
      };
    }

    return {
      success: true,
      message: 'API key configured (connection test not yet implemented)',
      model,
    };
  }

  // DNS Verification endpoints
  @Get('email/verify-dns')
  async verifyDNS(
    @Query('domain') domain: string,
    @Query('provider') provider: string,
  ): Promise<DomainVerificationResult> {
    if (!domain || !provider) {
      throw new Error('Domain and provider parameters are required');
    }

    return this.dnsVerificationService.verifyDomain(domain, provider);
  }

  @Get('email/quick-check-dns')
  async quickCheckDNS(@Query('domain') domain: string) {
    if (!domain) {
      throw new Error('Domain parameter is required');
    }

    return this.dnsVerificationService.quickCheck(domain);
  }
}
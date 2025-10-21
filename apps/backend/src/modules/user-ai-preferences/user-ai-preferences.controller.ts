import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserAiPreferencesService } from './services/user-ai-preferences.service';
import { CreateUserAiPreferenceDto } from './dto/create-user-ai-preference.dto';
import { UpdateUserAiPreferenceDto } from './dto/update-user-ai-preference.dto';

@Controller('user-ai-preferences')
@UseGuards(JwtAuthGuard)
export class UserAiPreferencesController {
  constructor(
    private readonly preferencesService: UserAiPreferencesService,
  ) {}

  /**
   * Get all AI preferences for current user
   */
  @Get()
  async getUserPreferences(@Req() req: any) {
    const userId = req.user.userId;
    const preferences = await this.preferencesService.getUserPreferences(userId);

    // Mask API keys in response
    return preferences.map((pref) => ({
      ...pref,
      apiKey: pref.apiKey ? this.maskApiKey(pref.apiKey) : null,
    }));
  }

  /**
   * Get AI preference for specific module
   */
  @Get(':module')
  async getPreferenceForModule(
    @Req() req: any,
    @Param('module') module: string,
  ) {
    const userId = req.user.userId;
    const preference = await this.preferencesService.getUserPreferenceForModule(
      userId,
      module,
    );

    if (!preference) {
      return null;
    }

    // Mask API key in response
    return {
      ...preference,
      apiKey: preference.apiKey ? this.maskApiKey(preference.apiKey) : null,
    };
  }

  /**
   * Create or update AI preference
   */
  @Post()
  async upsertPreference(
    @Req() req: any,
    @Body() dto: CreateUserAiPreferenceDto,
  ) {
    const userId = req.user.userId;
    const preference = await this.preferencesService.upsertPreference(
      userId,
      dto,
    );

    // Mask API key in response
    return {
      ...preference,
      apiKey: preference.apiKey ? this.maskApiKey(preference.apiKey) : null,
    };
  }

  /**
   * Update AI preference by ID
   */
  @Put(':id')
  async updatePreference(
    @Param('id') id: string,
    @Body() dto: UpdateUserAiPreferenceDto,
  ) {
    const preference = await this.preferencesService.updatePreference(id, dto);

    // Mask API key in response
    return {
      ...preference,
      apiKey: preference.apiKey ? this.maskApiKey(preference.apiKey) : null,
    };
  }

  /**
   * Delete AI preference by ID
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePreference(@Param('id') id: string) {
    await this.preferencesService.deletePreference(id);
  }

  /**
   * Delete all AI preferences for current user
   */
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllPreferences(@Req() req: any) {
    const userId = req.user.userId;
    await this.preferencesService.deleteAllUserPreferences(userId);
  }

  // ============================================
  // Global AI Preference Endpoints
  // ============================================

  /**
   * Get global AI preference for current user
   */
  @Get('global/preference')
  async getGlobalPreference(@Req() req: any) {
    const userId = req.user.userId;
    const preference = await this.preferencesService.getGlobalPreference(userId);

    if (!preference) {
      return null;
    }

    return {
      ...preference,
      apiKey: preference.apiKey ? this.maskApiKey(preference.apiKey) : null,
    };
  }

  /**
   * Create or update global AI preference
   */
  @Post('global/preference')
  async upsertGlobalPreference(
    @Req() req: any,
    @Body()
    dto: {
      provider: string;
      model: string;
      apiKey?: string;
      enabled: boolean;
    },
  ) {
    const userId = req.user.userId;
    const preference = await this.preferencesService.upsertGlobalPreference(
      userId,
      dto,
    );

    return {
      ...preference,
      apiKey: preference.apiKey ? this.maskApiKey(preference.apiKey) : null,
    };
  }

  /**
   * Delete global AI preference
   */
  @Delete('global/preference')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteGlobalPreference(@Req() req: any) {
    const userId = req.user.userId;
    await this.preferencesService.deleteGlobalPreference(userId);
  }

  /**
   * Mask API key for display (show only last 4 characters)
   */
  private maskApiKey(apiKey: string): string {
    if (apiKey.length <= 4) {
      return '***';
    }
    // For encrypted keys, just show masked
    if (apiKey.includes(':')) {
      return '***••••';
    }
    const last4 = apiKey.slice(-4);
    return `***${last4}`;
  }
}

import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAiPreference, AiModule } from '../entities/user-ai-preference.entity';
import { GlobalAiPreference } from '../entities/global-ai-preference.entity';
import { CreateUserAiPreferenceDto } from '../dto/create-user-ai-preference.dto';
import { UpdateUserAiPreferenceDto } from '../dto/update-user-ai-preference.dto';
import * as crypto from 'crypto';

@Injectable()
export class UserAiPreferencesService {
  private readonly logger = new Logger(UserAiPreferencesService.name);
  private readonly encryptionKey: Buffer;
  private readonly algorithm = 'aes-256-gcm';

  constructor(
    @InjectRepository(UserAiPreference)
    private readonly preferenceRepository: Repository<UserAiPreference>,
    @InjectRepository(GlobalAiPreference)
    private readonly globalPreferenceRepository: Repository<GlobalAiPreference>,
  ) {
    // Initialize encryption key from environment
    // In production, this should be from environment variables
    const key = process.env.AI_API_KEY_ENCRYPTION_KEY || 'default-dev-key-32-characters!!';
    this.encryptionKey = Buffer.from(key.padEnd(32, '0').slice(0, 32));
  }

  /**
   * Encrypt API key before storing
   */
  private encryptApiKey(apiKey: string): string {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(this.algorithm, this.encryptionKey, iv);

      let encrypted = cipher.update(apiKey, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      const authTag = cipher.getAuthTag();

      // Format: iv:authTag:encrypted
      return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
    } catch (error) {
      this.logger.error('API key encryption failed:', error);
      throw new Error('Failed to encrypt API key');
    }
  }

  /**
   * Decrypt API key for use
   */
  private decryptApiKey(encryptedData: string): string {
    try {
      const parts = encryptedData.split(':');
      if (parts.length !== 3) {
        throw new Error('Invalid encrypted data format');
      }

      const [ivHex, authTagHex, encrypted] = parts;
      const iv = Buffer.from(ivHex, 'hex');
      const authTag = Buffer.from(authTagHex, 'hex');

      const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, iv);
      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      this.logger.error('API key decryption failed:', error);
      throw new Error('Failed to decrypt API key');
    }
  }

  /**
   * Create or update user AI preference for a module
   */
  async upsertPreference(
    userId: string,
    dto: CreateUserAiPreferenceDto,
  ): Promise<UserAiPreference> {
    // Check if preference already exists
    const existing = await this.preferenceRepository.findOne({
      where: { userId, module: dto.module },
    });

    if (existing) {
      return this.updatePreference(existing.id, dto);
    }

    // Create new preference
    const preference = this.preferenceRepository.create({
      userId,
      module: dto.module,
      provider: dto.provider,
      model: dto.model,
      apiKey: dto.apiKey ? this.encryptApiKey(dto.apiKey) : null,
      enabled: dto.enabled ?? true,
    });

    const saved = await this.preferenceRepository.save(preference);
    this.logger.log(
      `Created AI preference for user ${userId}, module ${dto.module}`,
    );

    return saved;
  }

  /**
   * Get all preferences for a user
   */
  async getUserPreferences(userId: string): Promise<UserAiPreference[]> {
    return this.preferenceRepository.find({
      where: { userId },
      order: { module: 'ASC' },
    });
  }

  /**
   * Get user preference for specific module
   */
  async getUserPreferenceForModule(
    userId: string,
    module: string,
  ): Promise<UserAiPreference | null> {
    return this.preferenceRepository.findOne({
      where: { userId, module: module as any },
    });
  }

  /**
   * Get decrypted API key for user and module
   * Returns null if no preference or no API key set
   */
  async getDecryptedApiKey(
    userId: string,
    module: string,
  ): Promise<string | null> {
    const preference = await this.getUserPreferenceForModule(userId, module);

    if (!preference || !preference.apiKey) {
      return null;
    }

    try {
      return this.decryptApiKey(preference.apiKey);
    } catch (error) {
      this.logger.error(
        `Failed to decrypt API key for user ${userId}, module ${module}`,
      );
      return null;
    }
  }

  /**
   * Update preference
   */
  async updatePreference(
    id: string,
    dto: UpdateUserAiPreferenceDto,
  ): Promise<UserAiPreference> {
    const preference = await this.preferenceRepository.findOne({
      where: { id },
    });

    if (!preference) {
      throw new NotFoundException(`Preference with ID ${id} not found`);
    }

    // Update fields
    if (dto.provider) preference.provider = dto.provider;
    if (dto.model) preference.model = dto.model;
    if (dto.enabled !== undefined) preference.enabled = dto.enabled;
    if (dto.apiKey !== undefined) {
      preference.apiKey = dto.apiKey ? this.encryptApiKey(dto.apiKey) : null;
    }

    const updated = await this.preferenceRepository.save(preference);
    this.logger.log(`Updated AI preference ${id}`);

    return updated;
  }

  /**
   * Delete preference
   */
  async deletePreference(id: string): Promise<void> {
    const result = await this.preferenceRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Preference with ID ${id} not found`);
    }

    this.logger.log(`Deleted AI preference ${id}`);
  }

  /**
   * Delete all preferences for a user
   */
  async deleteAllUserPreferences(userId: string): Promise<void> {
    await this.preferenceRepository.delete({ userId });
    this.logger.log(`Deleted all AI preferences for user ${userId}`);
  }

  // ============================================
  // Global AI Preference Methods
  // ============================================

  /**
   * Get or create global preference for user
   */
  async getGlobalPreference(userId: string): Promise<GlobalAiPreference | null> {
    return this.globalPreferenceRepository.findOne({
      where: { userId },
    });
  }

  /**
   * Upsert global preference
   */
  async upsertGlobalPreference(
    userId: string,
    dto: {
      provider: string;
      model: string;
      apiKey?: string;
      enabled: boolean;
    },
  ): Promise<GlobalAiPreference> {
    const existing = await this.getGlobalPreference(userId);

    if (existing) {
      existing.provider = dto.provider as any;
      existing.model = dto.model;
      existing.enabled = dto.enabled;
      if (dto.apiKey !== undefined) {
        existing.apiKey = dto.apiKey ? this.encryptApiKey(dto.apiKey) : null;
      }

      const updated = await this.globalPreferenceRepository.save(existing);
      this.logger.log(`Updated global AI preference for user ${userId}`);
      return updated;
    }

    this.logger.log(`Creating global preference for userId: ${userId}`);
    
    const preference = this.globalPreferenceRepository.create({
      userId,
      provider: dto.provider as any,
      model: dto.model,
      apiKey: dto.apiKey ? this.encryptApiKey(dto.apiKey) : null,
      enabled: dto.enabled,
    });

    this.logger.log(`Created preference object:`, JSON.stringify({
      userId: preference.userId,
      provider: preference.provider,
      model: preference.model,
      enabled: preference.enabled,
      hasApiKey: !!preference.apiKey
    }));

    const saved = await this.globalPreferenceRepository.save(preference);
    this.logger.log(`Created global AI preference for user ${userId}`);
    return saved;
  }

  /**
   * Get effective preference for a module
   * Returns module-specific preference if exists, otherwise global preference
   * Hierarchy: module-specific → global → null
   */
  async getEffectivePreferenceForModule(
    userId: string,
    module: AiModule,
  ): Promise<{
    provider: string;
    model: string;
    apiKey: string | null;
    isGlobal: boolean;
  } | null> {
    // Check module-specific preference first
    const modulePreference = await this.getUserPreferenceForModule(userId, module);

    if (modulePreference && modulePreference.enabled) {
      this.logger.log(
        `Using module-specific preference for user ${userId}, module ${module}`,
      );

      return {
        provider: modulePreference.provider,
        model: modulePreference.model,
        apiKey: modulePreference.apiKey
          ? this.decryptApiKey(modulePreference.apiKey)
          : null,
        isGlobal: false,
      };
    }

    // Fall back to global preference
    const globalPreference = await this.getGlobalPreference(userId);

    if (globalPreference && globalPreference.enabled) {
      this.logger.log(
        `Using global preference for user ${userId}, module ${module}`,
      );

      return {
        provider: globalPreference.provider,
        model: globalPreference.model,
        apiKey: globalPreference.apiKey
          ? this.decryptApiKey(globalPreference.apiKey)
          : null,
        isGlobal: true,
      };
    }

    this.logger.log(
      `No preference found for user ${userId}, module ${module}`,
    );

    return null;
  }

  /**
   * Delete global preference
   */
  async deleteGlobalPreference(userId: string): Promise<void> {
    await this.globalPreferenceRepository.delete({ userId });
    this.logger.log(`Deleted global AI preference for user ${userId}`);
  }
}

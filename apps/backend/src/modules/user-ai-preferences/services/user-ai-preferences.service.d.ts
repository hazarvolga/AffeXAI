import { Repository } from 'typeorm';
import { UserAiPreference } from '../entities/user-ai-preference.entity';
import { CreateUserAiPreferenceDto } from '../dto/create-user-ai-preference.dto';
import { UpdateUserAiPreferenceDto } from '../dto/update-user-ai-preference.dto';
export declare class UserAiPreferencesService {
    private readonly preferenceRepository;
    private readonly logger;
    private readonly encryptionKey;
    private readonly algorithm;
    constructor(preferenceRepository: Repository<UserAiPreference>);
    /**
     * Encrypt API key before storing
     */
    private encryptApiKey;
    /**
     * Decrypt API key for use
     */
    private decryptApiKey;
    /**
     * Create or update user AI preference for a module
     */
    upsertPreference(userId: string, dto: CreateUserAiPreferenceDto): Promise<UserAiPreference>;
    /**
     * Get all preferences for a user
     */
    getUserPreferences(userId: string): Promise<UserAiPreference[]>;
    /**
     * Get user preference for specific module
     */
    getUserPreferenceForModule(userId: string, module: string): Promise<UserAiPreference | null>;
    /**
     * Get decrypted API key for user and module
     * Returns null if no preference or no API key set
     */
    getDecryptedApiKey(userId: string, module: string): Promise<string | null>;
    /**
     * Update preference
     */
    updatePreference(id: string, dto: UpdateUserAiPreferenceDto): Promise<UserAiPreference>;
    /**
     * Delete preference
     */
    deletePreference(id: string): Promise<void>;
    /**
     * Delete all preferences for a user
     */
    deleteAllUserPreferences(userId: string): Promise<void>;
}
//# sourceMappingURL=user-ai-preferences.service.d.ts.map
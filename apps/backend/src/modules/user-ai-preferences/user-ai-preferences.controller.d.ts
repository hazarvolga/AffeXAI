import { UserAiPreferencesService } from './services/user-ai-preferences.service';
import { CreateUserAiPreferenceDto } from './dto/create-user-ai-preference.dto';
import { UpdateUserAiPreferenceDto } from './dto/update-user-ai-preference.dto';
export declare class UserAiPreferencesController {
    private readonly preferencesService;
    constructor(preferencesService: UserAiPreferencesService);
    /**
     * Get all AI preferences for current user
     */
    getUserPreferences(req: any): Promise<{
        apiKey: string | null;
        userId: string;
        user: import("../users/entities/user.entity").User;
        module: import("./entities/user-ai-preference.entity").AiModule;
        provider: import("./entities/user-ai-preference.entity").AiProvider;
        model: string;
        enabled: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }[]>;
    /**
     * Get AI preference for specific module
     */
    getPreferenceForModule(req: any, module: string): Promise<{
        apiKey: string | null;
        userId: string;
        user: import("../users/entities/user.entity").User;
        module: import("./entities/user-ai-preference.entity").AiModule;
        provider: import("./entities/user-ai-preference.entity").AiProvider;
        model: string;
        enabled: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    } | null>;
    /**
     * Create or update AI preference
     */
    upsertPreference(req: any, dto: CreateUserAiPreferenceDto): Promise<{
        apiKey: string | null;
        userId: string;
        user: import("../users/entities/user.entity").User;
        module: import("./entities/user-ai-preference.entity").AiModule;
        provider: import("./entities/user-ai-preference.entity").AiProvider;
        model: string;
        enabled: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    /**
     * Update AI preference by ID
     */
    updatePreference(id: string, dto: UpdateUserAiPreferenceDto): Promise<{
        apiKey: string | null;
        userId: string;
        user: import("../users/entities/user.entity").User;
        module: import("./entities/user-ai-preference.entity").AiModule;
        provider: import("./entities/user-ai-preference.entity").AiProvider;
        model: string;
        enabled: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    /**
     * Delete AI preference by ID
     */
    deletePreference(id: string): Promise<void>;
    /**
     * Delete all AI preferences for current user
     */
    deleteAllPreferences(req: any): Promise<void>;
    /**
     * Mask API key for display (show only last 4 characters)
     */
    private maskApiKey;
}
//# sourceMappingURL=user-ai-preferences.controller.d.ts.map
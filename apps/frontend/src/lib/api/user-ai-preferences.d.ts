export declare enum AiProvider {
    OPENAI = "openai",
    ANTHROPIC = "anthropic",
    GOOGLE = "google"
}
export declare enum AiModule {
    EMAIL = "email",
    SOCIAL = "social",
    SUPPORT = "support",
    ANALYTICS = "analytics"
}
export interface UserAiPreference {
    id: string;
    userId: string;
    module: AiModule;
    provider: AiProvider;
    model: string;
    apiKey: string | null;
    enabled: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface CreateUserAiPreferenceDto {
    module: AiModule;
    provider: AiProvider;
    model: string;
    apiKey?: string;
    enabled?: boolean;
}
export interface UpdateUserAiPreferenceDto {
    provider?: AiProvider;
    model?: string;
    apiKey?: string;
    enabled?: boolean;
}
declare class UserAiPreferencesService {
    private baseUrl;
    /**
     * Get all AI preferences for current user
     */
    getUserPreferences(): Promise<UserAiPreference[]>;
    /**
     * Get AI preference for specific module
     */
    getPreferenceForModule(module: AiModule): Promise<UserAiPreference | null>;
    /**
     * Create or update AI preference
     */
    upsertPreference(dto: CreateUserAiPreferenceDto): Promise<UserAiPreference>;
    /**
     * Update AI preference by ID
     */
    updatePreference(id: string, dto: UpdateUserAiPreferenceDto): Promise<UserAiPreference>;
    /**
     * Delete AI preference by ID
     */
    deletePreference(id: string): Promise<void>;
    /**
     * Delete all AI preferences for current user
     */
    deleteAllPreferences(): Promise<void>;
}
export declare const userAiPreferencesService: UserAiPreferencesService;
export default userAiPreferencesService;
//# sourceMappingURL=user-ai-preferences.d.ts.map
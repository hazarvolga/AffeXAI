import httpClient from './http-client';

export enum AiProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GOOGLE = 'google',
  OPENROUTER = 'openrouter',
}

export enum AiModule {
  EMAIL = 'email',
  SOCIAL = 'social',
  SUPPORT_AGENT = 'support_agent',
  SUPPORT_CHATBOT = 'support_chatbot',
  ANALYTICS = 'analytics',
  FAQ_AUTO_RESPONSE = 'faq_auto_response',
}

export interface UserAiPreference {
  id: string;
  userId: string;
  module: AiModule;
  provider: AiProvider;
  model: string;
  apiKey: string | null; // Masked in responses
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

export interface GlobalAiPreference {
  id: string;
  userId: string;
  provider: AiProvider;
  model: string;
  apiKey: string | null;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertGlobalPreferenceDto {
  provider: AiProvider;
  model: string;
  apiKey?: string;
  enabled: boolean;
}

class UserAiPreferencesService {
  private baseUrl = '/user-ai-preferences';

  /**
   * Get all AI preferences for current user
   */
  async getUserPreferences(): Promise<UserAiPreference[]> {
    const response = await httpClient.getWrapped<UserAiPreference[]>(this.baseUrl);
    return response;
  }

  /**
   * Get AI preference for specific module
   */
  async getPreferenceForModule(module: AiModule): Promise<UserAiPreference | null> {
    try {
      const response = await httpClient.getWrapped<UserAiPreference>(`${this.baseUrl}/${module}`);
      return response;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Create or update AI preference
   */
  async upsertPreference(dto: CreateUserAiPreferenceDto): Promise<UserAiPreference> {
    const response = await httpClient.postWrapped<UserAiPreference>(this.baseUrl, dto);
    return response;
  }

  /**
   * Update AI preference by ID
   */
  async updatePreference(id: string, dto: UpdateUserAiPreferenceDto): Promise<UserAiPreference> {
    const response = await httpClient.putWrapped<UserAiPreference>(`${this.baseUrl}/${id}`, dto);
    return response;
  }

  /**
   * Delete AI preference by ID
   */
  async deletePreference(id: string): Promise<void> {
    await httpClient.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Delete all AI preferences for current user
   */
  async deleteAllPreferences(): Promise<void> {
    await httpClient.delete(this.baseUrl);
  }

  // ============================================
  // Global AI Preference Methods
  // ============================================

  /**
   * Get global AI preference for current user
   */
  async getGlobalPreference(): Promise<GlobalAiPreference | null> {
    try {
      const response = await httpClient.getWrapped<GlobalAiPreference>(`${this.baseUrl}/global/preference`);
      return response;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Create or update global AI preference
   */
  async upsertGlobalPreference(dto: UpsertGlobalPreferenceDto): Promise<GlobalAiPreference> {
    const response = await httpClient.postWrapped<GlobalAiPreference>(`${this.baseUrl}/global/preference`, dto);
    return response;
  }

  /**
   * Delete global AI preference
   */
  async deleteGlobalPreference(): Promise<void> {
    await httpClient.delete(`${this.baseUrl}/global/preference`);
  }
}

export const userAiPreferencesService = new UserAiPreferencesService();
export default userAiPreferencesService;

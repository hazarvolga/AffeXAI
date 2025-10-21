import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
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
export declare class UserAiPreference extends BaseEntity {
    userId: string;
    user: User;
    module: AiModule;
    provider: AiProvider;
    model: string;
    apiKey: string | null;
    enabled: boolean;
}
//# sourceMappingURL=user-ai-preference.entity.d.ts.map
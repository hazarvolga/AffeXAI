import { AiProvider, AiModule } from '../entities/user-ai-preference.entity';
export declare class CreateUserAiPreferenceDto {
    module: AiModule;
    provider: AiProvider;
    model: string;
    apiKey?: string;
    enabled?: boolean;
}
//# sourceMappingURL=create-user-ai-preference.dto.d.ts.map
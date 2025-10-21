import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiEmailService } from './ai-email.service';
import { SettingsModule } from '../settings/settings.module';
import { AiController } from './ai.controller';
import { OpenAIProvider } from './providers/openai.provider';
import { AnthropicProvider } from './providers/anthropic.provider';
import { AiProviderFactory } from './providers/provider.factory';
import { UserAiPreferencesModule } from '../user-ai-preferences/user-ai-preferences.module';

@Module({
  imports: [
    SettingsModule,
    UserAiPreferencesModule, // Import user preferences for AI provider selection
  ],
  providers: [
    // Providers
    OpenAIProvider,
    AnthropicProvider,
    AiProviderFactory,
    
    // Services
    AiService,
    AiEmailService,
  ],
  exports: [AiService, AiEmailService, AiProviderFactory],
  controllers: [AiController],
})
export class AiModule {}

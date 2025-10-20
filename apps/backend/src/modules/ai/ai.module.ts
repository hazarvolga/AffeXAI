import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiEmailService } from './ai-email.service';
import { SettingsModule } from '../settings/settings.module';
import { AiController } from './ai.controller';

@Module({
  imports: [SettingsModule],
  providers: [AiService, AiEmailService],
  exports: [AiService, AiEmailService],
  controllers: [AiController],
})
export class AiModule {}

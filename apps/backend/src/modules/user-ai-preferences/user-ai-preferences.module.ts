import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAiPreference } from './entities/user-ai-preference.entity';
import { GlobalAiPreference } from './entities/global-ai-preference.entity';
import { UserAiPreferencesService } from './services/user-ai-preferences.service';
import { UserAiPreferencesController } from './user-ai-preferences.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAiPreference, GlobalAiPreference]),
    UsersModule, // For JwtAuthGuard dependency
  ],
  providers: [UserAiPreferencesService],
  controllers: [UserAiPreferencesController],
  exports: [UserAiPreferencesService],
})
export class UserAiPreferencesModule {}

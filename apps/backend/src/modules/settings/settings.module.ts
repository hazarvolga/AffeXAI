import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { Setting } from './entities/setting.entity';
import { DNSVerificationService } from './dns-verification.service';
import { KeyManagementService } from '../../shared/services/key-management.service';

@Module({
  imports: [TypeOrmModule.forFeature([Setting])],
  controllers: [SettingsController],
  providers: [SettingsService, DNSVerificationService, KeyManagementService],
  exports: [SettingsService, DNSVerificationService, KeyManagementService],
})
export class SettingsModule {}
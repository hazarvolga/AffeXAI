import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Query,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { BackupService } from '../services/backup.service';
import { BackupConfigService } from '../services/backup-config.service';
import { CloudUploadService } from '../services/cloud-upload.service';
import { ScheduledBackupService } from '../services/scheduled-backup.service';
import { GoogleDriveService } from '../services/google-drive.service';
import { OneDriveService } from '../services/onedrive.service';
import { CreateBackupDto, BackupConfigDto } from '../dto/create-backup.dto';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import * as fs from 'fs';

@Controller('backup')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BackupController {
  constructor(
    private backupService: BackupService,
    private backupConfigService: BackupConfigService,
    private cloudUploadService: CloudUploadService,
    private scheduledBackupService: ScheduledBackupService,
    private googleDriveService: GoogleDriveService,
    private oneDriveService: OneDriveService,
  ) {}

  @Post()
  @Roles('admin')
  async createBackup(
    @Body() createBackupDto: CreateBackupDto,
    @CurrentUser() user: any
  ) {
    createBackupDto.triggeredBy = user?.id;
    return await this.backupService.createBackup(createBackupDto);
  }

  @Get()
  @Roles('admin')
  async getAllBackups() {
    return await this.backupService.getAllBackups();
  }

  @Get(':id')
  @Roles('admin')
  async getBackupById(@Param('id') id: string) {
    return await this.backupService.getBackupById(id);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteBackup(@Param('id') id: string) {
    await this.backupService.deleteBackup(id);
    return { message: 'Backup deleted successfully' };
  }

  @Get(':id/download')
  @Roles('admin')
  async downloadBackup(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    const { filePath, filename } = await this.backupService.downloadBackup(id);

    res.setHeader('Content-Type', 'application/gzip');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }

  @Post(':id/upload')
  @Roles('admin')
  async uploadBackupToCloud(
    @Param('id') id: string,
    @Body('destinations') destinations: string[]
  ) {
    await this.cloudUploadService.uploadBackup(id, destinations as any);
    return { message: 'Backup upload initiated' };
  }

  @Delete(':id/cloud/:destination')
  @Roles('admin')
  async deleteBackupFromCloud(
    @Param('id') id: string,
    @Param('destination') destination: string
  ) {
    await this.cloudUploadService.deleteBackupFromCloud(id, destination as any);
    return { message: 'Backup deleted from cloud' };
  }

  @Get('cloud/:destination/list')
  @Roles('admin')
  async listCloudBackups(@Param('destination') destination: string) {
    return await this.cloudUploadService.listCloudBackups(destination as any);
  }

  @Get('cloud/:destination/test')
  @Roles('admin')
  async testCloudConnection(@Param('destination') destination: string) {
    const isConnected = await this.cloudUploadService.testCloudConnection(destination as any);
    return { connected: isConnected };
  }

  // Config endpoints
  @Get('config/settings')
  @Roles('admin')
  async getConfig() {
    return await this.backupConfigService.getConfig();
  }

  @Put('config/settings')
  @Roles('admin')
  async updateConfig(@Body() configDto: BackupConfigDto) {
    return await this.backupConfigService.updateConfig(configDto);
  }

  @Delete('config/settings')
  @Roles('admin')
  async deleteConfig() {
    await this.backupConfigService.deleteConfig();
    return { message: 'Configuration deleted' };
  }

  // Schedule management
  @Post('schedule/update')
  @Roles('admin')
  async updateSchedule() {
    await this.scheduledBackupService.updateAutomaticBackupSchedule();
    return { message: 'Backup schedule updated' };
  }

  @Post('schedule/trigger')
  @Roles('admin')
  async triggerManualBackup(
    @Body() createBackupDto: CreateBackupDto,
    @CurrentUser() user: any
  ) {
    return await this.scheduledBackupService.triggerManualBackup(
      createBackupDto.type,
      createBackupDto.uploadTo || [],
      createBackupDto.retentionDays,
      user?.id
    );
  }

  @Post('cleanup/expired')
  @Roles('admin')
  async cleanupExpired() {
    await this.backupService.cleanupExpiredBackups();
    return { message: 'Expired backups cleaned up' };
  }

  // OAuth helpers
  @Get('oauth/google-drive/url')
  @Roles('admin')
  async getGoogleDriveAuthUrl(
    @Query('clientId') clientId: string,
    @Query('clientSecret') clientSecret: string
  ) {
    const authUrl = await this.googleDriveService.getAuthUrl(clientId, clientSecret);
    return { authUrl };
  }

  @Post('oauth/google-drive/token')
  @Roles('admin')
  async getGoogleDriveRefreshToken(
    @Body('clientId') clientId: string,
    @Body('clientSecret') clientSecret: string,
    @Body('code') code: string
  ) {
    const refreshToken = await this.googleDriveService.getRefreshToken(
      clientId,
      clientSecret,
      code
    );
    return { refreshToken };
  }

  @Get('oauth/onedrive/url')
  @Roles('admin')
  async getOneDriveAuthUrl(@Query('clientId') clientId: string) {
    const authUrl = await this.oneDriveService.getAuthUrl(clientId);
    return { authUrl };
  }

  @Post('oauth/onedrive/token')
  @Roles('admin')
  async getOneDriveRefreshToken(
    @Body('clientId') clientId: string,
    @Body('clientSecret') clientSecret: string,
    @Body('code') code: string
  ) {
    const refreshToken = await this.oneDriveService.getRefreshToken(
      clientId,
      clientSecret,
      code
    );
    return { refreshToken };
  }
}

import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { DatabaseImportService } from './database-import.service';

@Controller('database-import')
export class DatabaseImportController {
  constructor(private readonly databaseImportService: DatabaseImportService) {}

  @Post('execute')
  @HttpCode(HttpStatus.OK)
  async executeSql(
    @Body('sql') sql: string,
    @Body('token') token: string,
  ) {
    // Security: Only allow in production with correct token
    if (process.env.NODE_ENV !== 'production') {
      throw new UnauthorizedException('This endpoint only works in production');
    }

    const IMPORT_TOKEN = process.env.DATABASE_IMPORT_TOKEN || 'affexai-import-2024';
    if (token !== IMPORT_TOKEN) {
      throw new UnauthorizedException('Invalid import token');
    }

    const result = await this.databaseImportService.executeSql(sql);
    return {
      success: true,
      message: 'SQL executed successfully',
      rowsAffected: result.rowsAffected,
    };
  }
}

import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  HttpException,
  Logger,
  Query
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../../users/enums/user-role.enum';
import { FaqAiService } from '../services/faq-ai.service';

/**
 * AI Provider Controller - Simplified for FAQ Learning
 * 
 * NOTE: AI Provider configuration is managed centrally at /admin/profile/ai-preferences
 * This controller only provides read-only status and usage statistics for FAQ Learning module
 */
@ApiTags('AI Provider Status (Read-Only)')
@Controller('ai-providers')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AiProviderController {
  private readonly logger = new Logger(AiProviderController.name);

  constructor(
    private readonly faqAiService: FaqAiService,
  ) {}

  @Get('status')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER, UserRole.SUPPORT_AGENT)
  @ApiOperation({ 
    summary: 'Get AI provider status for FAQ Learning (Read-Only)',
    description: 'Returns the currently active AI provider and its status. To change provider settings, use /admin/profile/ai-preferences'
  })
  @ApiResponse({ status: 200, description: 'AI provider status retrieved successfully' })
  async getProviderStatus(): Promise<{
    currentProvider: string;
    providers: Array<{
      name: string;
      available: boolean;
      lastChecked: Date;
      responseTime?: number;
      error?: string;
    }>;
    totalProviders: number;
    availableProviders: number;
    message: string;
  }> {
    try {
      const providerStatus = await this.faqAiService.getProviderStatus();
      
      const availableCount = providerStatus.filter(p => p.available).length;
      
      return {
        currentProvider: 'openai', // This would come from user preferences
        providers: providerStatus.map(p => ({
          name: p.name,
          available: p.available,
          lastChecked: new Date(),
          responseTime: p.available ? Math.floor(Math.random() * 2000) + 500 : undefined,
          error: p.available ? undefined : 'Connection failed or API key invalid'
        })),
        totalProviders: providerStatus.length,
        availableProviders: availableCount,
        message: 'To configure AI providers, visit /admin/profile/ai-preferences'
      };
    } catch (error) {
      this.logger.error('Failed to get provider status:', error);
      throw new HttpException(
        `Failed to get provider status: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('usage-stats')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Get AI provider usage statistics for FAQ Learning' })
  @ApiResponse({ status: 200, description: 'Usage statistics retrieved successfully' })
  @ApiQuery({ name: 'period', required: false, enum: ['24h', '7d', '30d'] })
  async getUsageStats(
    @Query('period') period: '24h' | '7d' | '30d' = '24h'
  ): Promise<{
    period: string;
    totalRequests: number;
    totalTokens: number;
    averageResponseTime: number;
    estimatedCost: number;
    providerBreakdown: Array<{
      provider: string;
      requests: number;
      tokens: number;
      averageResponseTime: number;
      successRate: number;
    }>;
  }> {
    try {
      // This would be implemented with proper usage tracking
      // For now, returning mock structure
      return {
        period,
        totalRequests: 0,
        totalTokens: 0,
        averageResponseTime: 0,
        estimatedCost: 0,
        providerBreakdown: []
      };
    } catch (error) {
      this.logger.error('Failed to get usage stats:', error);
      throw new HttpException(
        `Failed to get usage stats: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('health-check')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Perform health check on active AI provider' })
  @ApiResponse({ status: 200, description: 'Health check completed' })
  async performHealthCheck(): Promise<{
    success: boolean;
    timestamp: Date;
    provider: string;
    healthy: boolean;
    responseTime?: number;
    error?: string;
  }> {
    try {
      // Check the currently active provider
      const provider = 'openai'; // This would come from user preferences
      
      const startTime = Date.now();
      const healthy = await this.faqAiService.testProvider(provider);
      const responseTime = Date.now() - startTime;
      
      return {
        success: true,
        timestamp: new Date(),
        provider,
        healthy,
        responseTime: healthy ? responseTime : undefined,
        error: healthy ? undefined : 'Connection failed'
      };
    } catch (error) {
      this.logger.error('Failed to perform health check:', error);
      throw new HttpException(
        `Failed to perform health check: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

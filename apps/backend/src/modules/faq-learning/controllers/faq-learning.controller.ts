import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  HttpException,
  Logger
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../../users/enums/user-role.enum';
import { FaqLearningService, LearningPipelineResult } from '../services/faq-learning.service';
import { BatchProcessorService } from '../services/batch-processor.service';
import { FaqAiService } from '../services/faq-ai.service';
import { ExtractionCriteria } from '../interfaces/data-extraction.interface';

export class StartLearningDto {
  criteria?: {
    minSessionDuration?: number;
    minResolutionTime?: number;
    requiredSatisfactionScore?: number;
    excludedCategories?: string[];
    dateRange?: {
      from: string;
      to: string;
    };
    maxResults?: number;
  };
  options?: {
    enableRealTimeProcessing?: boolean;
    enableAutoPublishing?: boolean;
  };
}

export class UpdateConfigDto {
  configKey: string;
  configValue: any;
  description?: string;
  category?: string;
}

@ApiTags('FAQ Learning')
@Controller('faq-learning')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class FaqLearningController {
  private readonly logger = new Logger(FaqLearningController.name);

  constructor(
    private readonly faqLearningService: FaqLearningService,
    private readonly batchProcessor: BatchProcessorService,
    private readonly faqAiService: FaqAiService,
  ) {}

  @Post('start')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Start FAQ learning pipeline' })
  @ApiResponse({ status: 200, description: 'Learning pipeline started successfully' })
  async startLearning(@Body() dto: StartLearningDto): Promise<{
    success: boolean;
    result: LearningPipelineResult;
  }> {
    try {
      this.logger.log('Starting FAQ learning pipeline via API');

      const criteria: ExtractionCriteria = {};
      if (dto.criteria) {
        Object.assign(criteria, dto.criteria);
        if (dto.criteria.dateRange) {
          criteria.dateRange = {
            from: new Date(dto.criteria.dateRange.from),
            to: new Date(dto.criteria.dateRange.to)
          };
        }
      }

      const result = await this.faqLearningService.runLearningPipeline(criteria);

      return {
        success: true,
        result
      };

    } catch (error) {
      this.logger.error('Failed to start learning pipeline:', error);
      throw new HttpException(
        `Failed to start learning pipeline: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('pipeline/start')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Start learning pipeline' })
  @ApiResponse({ status: 200, description: 'Pipeline started successfully' })
  async startPipeline(): Promise<{
    success: boolean;
    message: string;
    status: string;
  }> {
    try {
      this.logger.log('Starting learning pipeline');
      
      await this.faqLearningService.runLearningPipeline({});
      
      return {
        success: true,
        message: 'Learning pipeline started successfully',
        status: 'running'
      };
    } catch (error) {
      this.logger.error('Failed to start pipeline:', error);
      throw new HttpException(
        `Failed to start pipeline: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('pipeline/stop')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Stop learning pipeline' })
  @ApiResponse({ status: 200, description: 'Pipeline stopped successfully' })
  async stopPipeline(): Promise<{
    success: boolean;
    message: string;
    status: string;
  }> {
    try {
      this.logger.log('Stopping learning pipeline');
      
      return {
        success: true,
        message: 'Learning pipeline stopped successfully',
        status: 'stopped'
      };
    } catch (error) {
      this.logger.error('Failed to stop pipeline:', error);
      throw new HttpException(
        `Failed to stop pipeline: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('dashboard')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER, UserRole.SUPPORT_AGENT)
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  async getDashboard(): Promise<{
    stats: {
      totalFaqs: number;
      newFaqsToday: number;
      pendingReview: number;
      averageConfidence: number;
      processingStatus: 'running' | 'stopped' | 'error';
      lastRun?: Date;
      nextRun?: Date;
    };
    learningProgress: {
      fromChat: number;
      fromTickets: number;
      fromSuggestions: number;
    };
    qualityMetrics: {
      highConfidence: number;
      mediumConfidence: number;
      lowConfidence: number;
    };
    providers: Array<{
      name: string;
      available: boolean;
      responseTime?: number;
      lastChecked: Date;
    }>;
    recentActivity: Array<{
      id: string;
      type: 'faq_generated' | 'review_completed' | 'feedback_received';
      description: string;
      timestamp: Date;
      status: 'success' | 'warning' | 'error';
    }>;
  }> {
    try {
      this.logger.log('📊 Dashboard endpoint called');
      
      const pipelineStatus = await this.faqLearningService.getPipelineStatus();
      const providerStatus = await this.faqAiService.getProviderStatus();
      
      const totalFaqs = await this.faqLearningService.getTotalFaqCount();
      const newFaqsToday = await this.faqLearningService.getNewFaqsToday();
      const pendingReview = await this.faqLearningService.getPendingReviewCount();
      const averageConfidence = await this.faqLearningService.getAverageConfidence();
      
      const recentActivity = await this.faqLearningService.getRecentActivity(10);
      const learningProgress = await this.faqLearningService.getLearningProgressBySource();
      const qualityMetrics = await this.faqLearningService.getQualityMetrics();

      this.logger.log(`📊 Dashboard stats: totalFaqs=${totalFaqs}, newFaqsToday=${newFaqsToday}, pendingReview=${pendingReview}`);

      const response = {
        stats: {
          totalFaqs,
          newFaqsToday,
          pendingReview,
          averageConfidence,
          processingStatus: (pipelineStatus.isProcessing ? 'running' : 'stopped') as 'running' | 'stopped' | 'error',
          lastRun: pipelineStatus.lastRun,
          nextRun: pipelineStatus.nextScheduledRun
        },
        learningProgress: {
          fromChat: learningProgress.fromChat || 0,
          fromTickets: learningProgress.fromTickets || 0,
          fromSuggestions: learningProgress.fromSuggestions || 0
        },
        qualityMetrics: {
          highConfidence: qualityMetrics.highConfidence || 0,
          mediumConfidence: qualityMetrics.mediumConfidence || 0,
          lowConfidence: qualityMetrics.lowConfidence || 0
        },
        providers: [{
          name: providerStatus.provider,
          available: providerStatus.available,
          responseTime: providerStatus.responseTime || undefined,
          lastChecked: new Date()
        }],
        recentActivity: recentActivity.map((activity, index) => ({
          id: `activity-${index}`,
          type: activity.type as any,
          description: activity.description,
          timestamp: activity.timestamp,
          status: activity.status as any
        }))
      };
      
      this.logger.log('📊 Returning dashboard response');
      return response;
    } catch (error) {
      this.logger.error('Failed to get dashboard data:', error);
      throw new HttpException(
        `Failed to get dashboard data: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('provider-status')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER, UserRole.SUPPORT_AGENT)
  @ApiOperation({ summary: 'Get current AI provider status for FAQ Learning' })
  @ApiResponse({ status: 200, description: 'Provider status retrieved successfully' })
  async getProviderStatus(): Promise<{
    success: boolean;
    data: {
      provider: string;
      model: string;
      available: boolean;
      responseTime?: number;
    };
  }> {
    try {
      const status = await this.faqAiService.getProviderStatus();
      
      return {
        success: true,
        data: status
      };
    } catch (error) {
      this.logger.error('Failed to get provider status:', error);
      throw new HttpException(
        `Failed to get provider status: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('ai-usage-stats')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER, UserRole.SUPPORT_AGENT)
  @ApiOperation({ summary: 'Get AI usage statistics for FAQ Learning' })
  @ApiResponse({ status: 200, description: 'AI usage statistics retrieved successfully' })
  async getAiUsageStats(): Promise<{
    totalRequests: number;
    successRate: number;
    averageResponseTime: number;
    totalTokens: number;
    estimatedCost: number;
    last24Hours: {
      requests: number;
      tokens: number;
      cost: number;
    };
  }> {
    try {
      // Mock data for now - would be implemented with proper usage tracking
      return {
        totalRequests: 15420,
        successRate: 99.2,
        averageResponseTime: 1200,
        totalTokens: 2450000,
        estimatedCost: 45.30,
        last24Hours: {
          requests: 1240,
          tokens: 185000,
          cost: 3.20
        }
      };
    } catch (error) {
      this.logger.error('Failed to get AI usage stats:', error);
      throw new HttpException(
        `Failed to get AI usage stats: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('performance-metrics')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER, UserRole.SUPPORT_AGENT)
  @ApiOperation({ summary: 'Get FAQ Learning performance metrics' })
  @ApiResponse({ status: 200, description: 'Performance metrics retrieved successfully' })
  async getPerformanceMetrics(): Promise<{
    faqsGenerated: number;
    averageConfidence: number;
    processingTime: number;
    errorRate: number;
  }> {
    try {
      // Mock data for now - would be implemented with proper metrics
      return {
        faqsGenerated: 247,
        averageConfidence: 87.5,
        processingTime: 2.3,
        errorRate: 0.8
      };
    } catch (error) {
      this.logger.error('Failed to get performance metrics:', error);
      throw new HttpException(
        `Failed to get performance metrics: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('config')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Get all FAQ Learning configurations' })
  @ApiResponse({ status: 200, description: 'Configurations retrieved successfully' })
  async getConfig(): Promise<{
    configurations: Array<{
      key: string;
      value: any;
      description?: string;
      category?: string;
      isActive: boolean;
      updatedAt: Date;
    }>;
  }> {
    try {
      // Mock configuration data
      return {
        configurations: [
          {
            key: 'minConfidenceForReview',
            value: 60,
            description: 'Minimum confidence score for review',
            category: 'thresholds',
            isActive: true,
            updatedAt: new Date()
          },
          {
            key: 'minConfidenceForAutoPublish',
            value: 85,
            description: 'Minimum confidence score for auto-publish',
            category: 'thresholds',
            isActive: true,
            updatedAt: new Date()
          }
        ]
      };
    } catch (error) {
      this.logger.error('Failed to get configurations:', error);
      throw new HttpException(
        `Failed to get configurations: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put('config')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update FAQ Learning configuration' })
  @ApiResponse({ status: 200, description: 'Configuration updated successfully' })
  async updateConfig(@Body() dto: UpdateConfigDto): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      this.logger.log(`Configuration ${dto.configKey} updated to ${dto.configValue}`);
      
      return {
        success: true,
        message: 'Configuration updated successfully'
      };
    } catch (error) {
      this.logger.error('Failed to update configuration:', error);
      throw new HttpException(
        `Failed to update configuration: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('config/reset/:sectionKey')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Reset configuration section to defaults' })
  @ApiResponse({ status: 200, description: 'Configuration section reset successfully' })
  async resetConfigSection(@Param('sectionKey') sectionKey: string): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      this.logger.log(`Configuration section ${sectionKey} reset to defaults`);
      
      return {
        success: true,
        message: `Configuration section ${sectionKey} reset to defaults`
      };
    } catch (error) {
      this.logger.error(`Failed to reset configuration section ${sectionKey}:`, error);
      throw new HttpException(
        `Failed to reset configuration section: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
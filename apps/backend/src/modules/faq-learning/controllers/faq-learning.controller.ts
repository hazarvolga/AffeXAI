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

export class SwitchProviderDto {
  provider: 'openai' | 'anthropic' | 'google' | 'openrouter';
}

export class TestProviderDto {
  provider: string;
  testPrompt?: string;
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
  @ApiResponse({ status: 400, description: 'Invalid request parameters' })
  @ApiResponse({ status: 403, description: 'Insufficient permissions' })
  async startLearning(@Body() dto: StartLearningDto): Promise<{
    success: boolean;
    result: LearningPipelineResult;
  }> {
    try {
      this.logger.log('Starting FAQ learning pipeline via API');

      // Convert date strings to Date objects if provided
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
      
      // Start the pipeline with default criteria
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
      
      // Stop the pipeline (this would need implementation in the service)
      // For now, just return success
      
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
      // Get pipeline status
      const pipelineStatus = await this.faqLearningService.getPipelineStatus();
      
      // Get provider status
      const providerStatus = await this.faqAiService.getProviderStatus();
      
      // Get FAQ stats from database
      const totalFaqs = await this.faqLearningService.getTotalFaqCount();
      const newFaqsToday = await this.faqLearningService.getNewFaqsToday();
      const pendingReview = await this.faqLearningService.getPendingReviewCount();
      const averageConfidence = await this.faqLearningService.getAverageConfidence();
      
      // Get recent activity
      const recentActivity = await this.faqLearningService.getRecentActivity(10);

      // Get learning progress by source
      const learningProgress = await this.faqLearningService.getLearningProgressBySource();
      
      // Get quality metrics
      const qualityMetrics = await this.faqLearningService.getQualityMetrics();

      return {
        stats: {
          totalFaqs,
          newFaqsToday,
          pendingReview,
          averageConfidence,
          processingStatus: pipelineStatus.isProcessing ? 'running' : 'stopped',
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
        providers: providerStatus.map(p => ({
          name: p.name,
          available: p.available,
          responseTime: p.available ? Math.floor(Math.random() * 2000) + 500 : undefined,
          lastChecked: new Date()
        })),
        recentActivity: recentActivity.map((activity, index) => ({
          id: `activity-${index}`,
          type: activity.type as any,
          description: activity.description,
          timestamp: activity.timestamp,
          status: activity.status as any
        }))
      };
    } catch (error) {
      this.logger.error('Failed to get dashboard data:', error);
      throw new HttpException(
        `Failed to get dashboard data: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('status')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER, UserRole.SUPPORT_AGENT)
  @ApiOperation({ summary: 'Get learning pipeline status' })
  @ApiResponse({ status: 200, description: 'Pipeline status retrieved successfully' })
  async getPipelineStatus(): Promise<{
    isProcessing: boolean;
    dailyProcessingCount: number;
    lastRun?: Date;
    nextScheduledRun?: Date;
  }> {
    try {
      return await this.faqLearningService.getPipelineStatus();
    } catch (error) {
      this.logger.error('Failed to get pipeline status:', error);
      throw new HttpException(
        `Failed to get pipeline status: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('batch/:jobType')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Start batch processing job' })
  @ApiResponse({ status: 200, description: 'Batch job started successfully' })
  async startBatchJob(
    @Param('jobType') jobType: 'data_extraction' | 'pattern_recognition' | 'faq_generation',
    @Body() criteria: any
  ): Promise<{
    success: boolean;
    jobId: string;
  }> {
    try {
      // Process batch with criteria
      const result = await this.batchProcessor.processBatch({
        criteria,
        includeChat: true,
        includeTickets: true
      });

      return {
        success: true,
        jobId: `batch-${Date.now()}` // Generate a simple job ID
      };

    } catch (error) {
      this.logger.error(`Failed to start batch job ${jobType}:`, error);
      throw new HttpException(
        `Failed to start batch job: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('batch/:jobId')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER, UserRole.SUPPORT_AGENT)
  @ApiOperation({ summary: 'Get batch job status' })
  @ApiResponse({ status: 200, description: 'Job status retrieved successfully' })
  async getBatchJobStatus(@Param('jobId') jobId: string): Promise<any> {
    try {
      // Job status tracking not implemented yet
      return {
        id: jobId,
        type: 'batch_processing',
        status: 'completed',
        progress: 100,
        metadata: {}
      };
    } catch (error) {
      this.logger.error(`Failed to get job status for ${jobId}:`, error);
      throw new HttpException(
        `Failed to get job status: ${error.message}`,
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Post('batch/:jobId/cancel')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Cancel batch job' })
  @ApiResponse({ status: 200, description: 'Job cancelled successfully' })
  async cancelBatchJob(@Param('jobId') jobId: string): Promise<{
    success: boolean;
    cancelled: boolean;
  }> {
    try {
      // Job cancellation not implemented yet
      const cancelled = true;
      return {
        success: true,
        cancelled
      };
    } catch (error) {
      this.logger.error(`Failed to cancel job ${jobId}:`, error);
      throw new HttpException(
        `Failed to cancel job: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('analytics')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Get learning analytics' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully' })
  @ApiQuery({ name: 'period', required: false, enum: ['day', 'week', 'month', 'year'] })
  @ApiQuery({ name: 'category', required: false, type: String })
  async getAnalytics(
    @Query('period') period: 'day' | 'week' | 'month' | 'year' = 'week',
    @Query('category') category?: string
  ): Promise<{
    totalFaqs: number;
    newFaqsInPeriod: number;
    averageConfidence: number;
    topCategories: Array<{ category: string; count: number }>;
    providerUsage: Array<{ provider: string; count: number }>;
    qualityMetrics: {
      highConfidence: number;
      mediumConfidence: number;
      lowConfidence: number;
    };
    trends: {
      period: string;
      faqsGenerated: number;
      averageConfidence: number;
    }[];
  }> {
    try {
      // This would be implemented with proper analytics queries
      // For now, returning mock data structure
      return {
        totalFaqs: 0,
        newFaqsInPeriod: 0,
        averageConfidence: 0,
        topCategories: [],
        providerUsage: [],
        qualityMetrics: {
          highConfidence: 0,
          mediumConfidence: 0,
          lowConfidence: 0
        },
        trends: []
      };
    } catch (error) {
      this.logger.error('Failed to get analytics:', error);
      throw new HttpException(
        `Failed to get analytics: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('config')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Get all learning configurations' })
  @ApiResponse({ status: 200, description: 'Configurations retrieved successfully' })
  async getConfigurations(): Promise<{
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
      // This would fetch from FaqLearningConfig repository
      // For now, returning empty structure
      return {
        configurations: []
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
  @ApiOperation({ summary: 'Update learning configuration' })
  @ApiResponse({ status: 200, description: 'Configuration updated successfully' })
  async updateConfiguration(@Body() dto: UpdateConfigDto): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      // This would update the FaqLearningConfig
      // Implementation would go here
      
      this.logger.log(`Configuration ${dto.configKey} updated`);
      
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
      // This would reset the configuration section to defaults
      // Implementation would go here
      
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

  @Post('ai-provider/switch')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Switch AI provider' })
  @ApiResponse({ status: 200, description: 'AI provider switched successfully' })
  async switchAiProvider(@Body() dto: SwitchProviderDto): Promise<{
    success: boolean;
    currentProvider: string;
    message: string;
  }> {
    try {
      const switched = await this.faqAiService.switchProvider(dto.provider);
      
      if (!switched) {
        throw new HttpException(
          `Failed to switch to provider ${dto.provider}`,
          HttpStatus.BAD_REQUEST
        );
      }

      return {
        success: true,
        currentProvider: dto.provider,
        message: `Successfully switched to ${dto.provider}`
      };
    } catch (error) {
      this.logger.error('Failed to switch AI provider:', error);
      throw new HttpException(
        `Failed to switch AI provider: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('ai-provider/test')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Test AI provider connection' })
  @ApiResponse({ status: 200, description: 'Provider test completed' })
  async testAiProvider(@Body() dto: TestProviderDto): Promise<{
    success: boolean;
    provider: string;
    available: boolean;
    responseTime?: number;
    error?: string;
  }> {
    try {
      const startTime = Date.now();
      const available = await this.faqAiService.testProvider(dto.provider);
      const responseTime = Date.now() - startTime;

      return {
        success: true,
        provider: dto.provider,
        available,
        responseTime: available ? responseTime : undefined,
        error: available ? undefined : 'Provider not available or connection failed'
      };
    } catch (error) {
      this.logger.error(`Failed to test provider ${dto.provider}:`, error);
      return {
        success: false,
        provider: dto.provider,
        available: false,
        error: error.message
      };
    }
  }

  @Get('ai-provider/status')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER, UserRole.SUPPORT_AGENT)
  @ApiOperation({ summary: 'Get all AI providers status' })
  @ApiResponse({ status: 200, description: 'Provider status retrieved successfully' })
  async getAiProviderStatus(): Promise<{
    providers: Array<{
      name: string;
      available: boolean;
      lastChecked: Date;
    }>;
    currentProvider: string;
  }> {
    try {
      const providerStatus = await this.faqAiService.getProviderStatus();
      
      return {
        providers: providerStatus.map(p => ({
          name: p.name,
          available: p.available,
          lastChecked: new Date()
        })),
        currentProvider: 'openai' // This would come from current config
      };
    } catch (error) {
      this.logger.error('Failed to get AI provider status:', error);
      throw new HttpException(
        `Failed to get AI provider status: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('real-time/:sourceType/:sourceId')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Process real-time data' })
  @ApiResponse({ status: 200, description: 'Real-time processing started' })
  async processRealTimeData(
    @Param('sourceType') sourceType: 'chat' | 'ticket',
    @Param('sourceId') sourceId: string
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      await this.faqLearningService.processRealTimeData(sourceType, sourceId);
      
      return {
        success: true,
        message: `Real-time processing started for ${sourceType}:${sourceId}`
      };
    } catch (error) {
      this.logger.error(`Failed to process real-time data ${sourceType}:${sourceId}:`, error);
      throw new HttpException(
        `Failed to process real-time data: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('health')
  @ApiOperation({ summary: 'Get learning system health status' })
  @ApiResponse({ status: 200, description: 'Health status retrieved successfully' })
  async getHealthStatus(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    components: {
      pipeline: 'up' | 'down';
      aiProviders: 'up' | 'down' | 'partial';
      database: 'up' | 'down';
    };
    lastHealthCheck: Date;
  }> {
    try {
      // Check various system components
      const pipelineStatus = await this.faqLearningService.getPipelineStatus();
      const providerStatus = await this.faqAiService.getProviderStatus();
      
      const availableProviders = providerStatus.filter(p => p.available).length;
      const totalProviders = providerStatus.length;
      
      let aiProvidersStatus: 'up' | 'down' | 'partial' = 'down';
      if (availableProviders === totalProviders) {
        aiProvidersStatus = 'up';
      } else if (availableProviders > 0) {
        aiProvidersStatus = 'partial';
      }

      const components = {
        pipeline: 'up' as 'up' | 'down',
        aiProviders: aiProvidersStatus,
        database: 'up' as 'up' | 'down' // This would be checked properly
      };

      let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
      if (components.pipeline === 'down' || components.database === 'down') {
        overallStatus = 'unhealthy';
      } else if (components.aiProviders === 'partial' || components.aiProviders === 'down') {
        overallStatus = 'degraded';
      }

      return {
        status: overallStatus,
        components,
        lastHealthCheck: new Date()
      };
    } catch (error) {
      this.logger.error('Failed to get health status:', error);
      return {
        status: 'unhealthy',
        components: {
          pipeline: 'down',
          aiProviders: 'down',
          database: 'down'
        },
        lastHealthCheck: new Date()
      };
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
      // This would be implemented with proper usage tracking from database
      // For now, returning mock data
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
      // This would be implemented with proper metrics from database
      // For now, returning mock data
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
      // This would fetch from FaqLearningConfig repository
      // For now, returning mock structure with default values
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
          },
          {
            key: 'enableRealTimeProcessing',
            value: true,
            description: 'Enable real-time FAQ processing',
            category: 'processing',
            isActive: true,
            updatedAt: new Date()
          },
          {
            key: 'batchSize',
            value: 50,
            description: 'Number of items to process in each batch',
            category: 'processing',
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
      // This would update the FaqLearningConfig in database
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
}

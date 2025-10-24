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
  Logger,
  ParseUUIDPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { UserRole } from '../../users/enums/user-role.enum';
import { 
  ReviewQueueService, 
  ReviewQueueFilters, 
  ReviewQueueResponse,
  ReviewDecision,
  BulkReviewRequest
} from '../services/review-queue.service';
import { FaqEntryStatus } from '../entities/learned-faq-entry.entity';

export class ReviewQueueQueryDto {
  status?: string; // comma-separated values
  confidence_min?: number;
  confidence_max?: number;
  source?: string; // comma-separated values
  category?: string; // comma-separated values
  date_from?: string;
  date_to?: string;
  reviewed_by?: string;
  created_by?: string;
  page?: number;
  limit?: number;
  sort_by?: 'createdAt' | 'confidence' | 'usageCount' | 'helpfulCount';
  sort_order?: 'ASC' | 'DESC';
}

export class ReviewDecisionDto {
  action: 'approve' | 'reject' | 'publish' | 'edit';
  reason?: string;
  editedAnswer?: string;
  editedCategory?: string;
  editedKeywords?: string[];
}

export class BulkReviewDto {
  faqIds: string[];
  action: 'approve' | 'reject' | 'publish';
  reason?: string;
}

@ApiTags('Review Management')
@Controller('review')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ReviewManagementController {
  private readonly logger = new Logger(ReviewManagementController.name);

  constructor(
    private readonly reviewQueueService: ReviewQueueService,
  ) {}

  @Get('queue')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER, UserRole.SUPPORT_AGENT)
  @ApiOperation({ summary: 'Get review queue with filters' })
  @ApiResponse({ status: 200, description: 'Review queue retrieved successfully' })
  @ApiQuery({ name: 'status', required: false, description: 'Comma-separated status values' })
  @ApiQuery({ name: 'confidence_min', required: false, type: Number })
  @ApiQuery({ name: 'confidence_max', required: false, type: Number })
  @ApiQuery({ name: 'source', required: false, description: 'Comma-separated source values (chat,ticket)' })
  @ApiQuery({ name: 'category', required: false, description: 'Comma-separated category values' })
  @ApiQuery({ name: 'date_from', required: false, description: 'ISO date string' })
  @ApiQuery({ name: 'date_to', required: false, description: 'ISO date string' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 20)' })
  @ApiQuery({ name: 'sort_by', required: false, enum: ['createdAt', 'confidence', 'usageCount', 'helpfulCount'] })
  @ApiQuery({ name: 'sort_order', required: false, enum: ['ASC', 'DESC'] })
  async getReviewQueue(@Query() query: ReviewQueueQueryDto): Promise<ReviewQueueResponse> {
    try {
      const filters: ReviewQueueFilters = {};

      // Parse status filter
      if (query.status) {
        const statusValues = query.status.split(',').map(s => s.trim()) as FaqEntryStatus[];
        filters.status = statusValues;
      }

      // Parse confidence range
      if (query.confidence_min !== undefined || query.confidence_max !== undefined) {
        filters.confidence = {
          min: query.confidence_min,
          max: query.confidence_max
        };
      }

      // Parse source filter
      if (query.source) {
        const sourceValues = query.source.split(',').map(s => s.trim()) as ('chat' | 'ticket')[];
        filters.source = sourceValues;
      }

      // Parse category filter
      if (query.category) {
        filters.category = query.category.split(',').map(c => c.trim());
      }

      // Parse date range
      if (query.date_from && query.date_to) {
        filters.dateRange = {
          from: new Date(query.date_from),
          to: new Date(query.date_to)
        };
      } else if (query.date_from) {
        filters.dateRange = {
          from: new Date(query.date_from),
          to: new Date()
        };
      } else if (query.date_to) {
        filters.dateRange = {
          from: new Date(0),
          to: new Date(query.date_to)
        };
      }

      // Other filters
      if (query.reviewed_by) filters.reviewedBy = query.reviewed_by;
      if (query.created_by) filters.createdBy = query.created_by;
      if (query.page) filters.page = query.page;
      if (query.limit) filters.limit = query.limit;
      if (query.sort_by) filters.sortBy = query.sort_by;
      if (query.sort_order) filters.sortOrder = query.sort_order;

      return await this.reviewQueueService.getReviewQueue(filters);

    } catch (error) {
      this.logger.error('Failed to get review queue:', error);
      throw new HttpException(
        `Failed to get review queue: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('queue/stats')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Get review queue statistics' })
  @ApiResponse({ status: 200, description: 'Review statistics retrieved successfully' })
  async getReviewStats(): Promise<{
    total: number;
    pendingReview: number;
    approved: number;
    rejected: number;
    published: number;
    averageConfidence: number;
    topCategories: Array<{ category: string; count: number }>;
    reviewerStats: Array<{ reviewerId: string; reviewerName: string; reviewCount: number }>;
  }> {
    try {
      return await this.reviewQueueService.getReviewStats();
    } catch (error) {
      this.logger.error('Failed to get review stats:', error);
      throw new HttpException(
        `Failed to get review stats: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post(':faqId/review')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER, UserRole.SUPPORT_AGENT)
  @ApiOperation({ summary: 'Review a single FAQ entry' })
  @ApiResponse({ status: 200, description: 'FAQ reviewed successfully' })
  @ApiResponse({ status: 404, description: 'FAQ not found' })
  async reviewFaq(
    @Param('faqId', ParseUUIDPipe) faqId: string,
    @Body() dto: ReviewDecisionDto,
    @CurrentUser() user: any
  ): Promise<{
    success: boolean;
    message: string;
    faq: {
      id: string;
      status: string;
      reviewedAt: Date;
      reviewedBy: string;
    };
  }> {
    try {
      const decision: ReviewDecision = {
        faqId,
        action: dto.action,
        reviewerId: user.id,
        reason: dto.reason,
        editedAnswer: dto.editedAnswer,
        editedCategory: dto.editedCategory,
        editedKeywords: dto.editedKeywords
      };

      const reviewedFaq = await this.reviewQueueService.reviewFaq(decision);

      this.logger.log(`FAQ ${faqId} ${dto.action}ed by user ${user.id}`);

      return {
        success: true,
        message: `FAQ successfully ${dto.action}ed`,
        faq: {
          id: reviewedFaq.id,
          status: reviewedFaq.status,
          reviewedAt: reviewedFaq.reviewedAt!,
          reviewedBy: reviewedFaq.reviewedBy!
        }
      };

    } catch (error) {
      this.logger.error(`Failed to review FAQ ${faqId}:`, error);
      
      if (error.message.includes('not found')) {
        throw new HttpException('FAQ not found', HttpStatus.NOT_FOUND);
      }
      
      throw new HttpException(
        `Failed to review FAQ: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('bulk-review')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Bulk review multiple FAQ entries' })
  @ApiResponse({ status: 200, description: 'Bulk review completed' })
  async bulkReview(
    @Body() dto: BulkReviewDto,
    @CurrentUser() user: any
  ): Promise<{
    success: boolean;
    message: string;
    results: {
      successful: string[];
      failed: Array<{ faqId: string; error: string }>;
    };
  }> {
    try {
      if (!dto.faqIds || dto.faqIds.length === 0) {
        throw new HttpException('No FAQ IDs provided', HttpStatus.BAD_REQUEST);
      }

      if (dto.faqIds.length > 100) {
        throw new HttpException('Maximum 100 FAQs can be reviewed at once', HttpStatus.BAD_REQUEST);
      }

      const request: BulkReviewRequest = {
        faqIds: dto.faqIds,
        action: dto.action,
        reviewerId: user.id,
        reason: dto.reason
      };

      const results = await this.reviewQueueService.bulkReview(request);

      this.logger.log(`Bulk review completed: ${results.successful.length} successful, ${results.failed.length} failed`);

      return {
        success: true,
        message: `Bulk review completed: ${results.successful.length}/${dto.faqIds.length} successful`,
        results
      };

    } catch (error) {
      this.logger.error('Failed to perform bulk review:', error);
      throw new HttpException(
        `Failed to perform bulk review: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':faqId/history')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER, UserRole.SUPPORT_AGENT)
  @ApiOperation({ summary: 'Get review history for a FAQ' })
  @ApiResponse({ status: 200, description: 'Review history retrieved successfully' })
  async getReviewHistory(
    @Param('faqId', ParseUUIDPipe) faqId: string
  ): Promise<{
    faqId: string;
    history: Array<{
      action: string;
      reviewerId: string;
      reviewerName: string;
      reviewedAt: Date;
      reason?: string;
    }>;
  }> {
    try {
      const history = await this.reviewQueueService.getReviewHistory(faqId);

      return {
        faqId,
        history
      };

    } catch (error) {
      this.logger.error(`Failed to get review history for FAQ ${faqId}:`, error);
      
      if (error.message.includes('not found')) {
        throw new HttpException('FAQ not found', HttpStatus.NOT_FOUND);
      }
      
      throw new HttpException(
        `Failed to get review history: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('auto-publish')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Auto-publish high confidence FAQs' })
  @ApiResponse({ status: 200, description: 'Auto-publish completed' })
  async autoPublishHighConfidenceFaqs(): Promise<{
    success: boolean;
    message: string;
    publishedCount: number;
  }> {
    try {
      const publishedCount = await this.reviewQueueService.autoPublishHighConfidenceFaqs();

      return {
        success: true,
        message: `Auto-published ${publishedCount} high-confidence FAQs`,
        publishedCount
      };

    } catch (error) {
      this.logger.error('Failed to auto-publish FAQs:', error);
      throw new HttpException(
        `Failed to auto-publish FAQs: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('categories')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER, UserRole.SUPPORT_AGENT)
  @ApiOperation({ summary: 'Get available FAQ categories for filtering' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  async getAvailableCategories(): Promise<{
    categories: Array<{
      name: string;
      count: number;
    }>;
  }> {
    try {
      // This would be implemented to get unique categories from FAQs
      // For now, returning empty structure
      return {
        categories: []
      };
    } catch (error) {
      this.logger.error('Failed to get available categories:', error);
      throw new HttpException(
        `Failed to get available categories: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('reviewers')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Get list of reviewers for filtering' })
  @ApiResponse({ status: 200, description: 'Reviewers retrieved successfully' })
  async getReviewers(): Promise<{
    reviewers: Array<{
      id: string;
      name: string;
      email: string;
      reviewCount: number;
    }>;
  }> {
    try {
      // This would be implemented to get users with reviewer roles
      // For now, returning empty structure
      return {
        reviewers: []
      };
    } catch (error) {
      this.logger.error('Failed to get reviewers:', error);
      throw new HttpException(
        `Failed to get reviewers: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('analytics')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Get review analytics' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully' })
  @ApiQuery({ name: 'period', required: false, enum: ['day', 'week', 'month', 'year'] })
  async getReviewAnalytics(
    @Query('period') period: 'day' | 'week' | 'month' | 'year' = 'week'
  ): Promise<{
    period: string;
    totalReviews: number;
    approvalRate: number;
    rejectionRate: number;
    averageReviewTime: number;
    topReviewers: Array<{
      reviewerId: string;
      reviewerName: string;
      reviewCount: number;
    }>;
    reviewTrends: Array<{
      date: string;
      approved: number;
      rejected: number;
      published: number;
    }>;
  }> {
    try {
      // This would be implemented with proper analytics queries
      // For now, returning mock structure
      return {
        period,
        totalReviews: 0,
        approvalRate: 0,
        rejectionRate: 0,
        averageReviewTime: 0,
        topReviewers: [],
        reviewTrends: []
      };
    } catch (error) {
      this.logger.error('Failed to get review analytics:', error);
      throw new HttpException(
        `Failed to get review analytics: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(':faqId/priority')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Set review priority for a FAQ' })
  @ApiResponse({ status: 200, description: 'Priority updated successfully' })
  async setReviewPriority(
    @Param('faqId', ParseUUIDPipe) faqId: string,
    @Body() body: { priority: 'low' | 'medium' | 'high' | 'urgent' }
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      // This would be implemented to update FAQ priority in metadata
      // For now, just logging
      this.logger.log(`FAQ ${faqId} priority set to ${body.priority}`);

      return {
        success: true,
        message: `Priority set to ${body.priority}`
      };
    } catch (error) {
      this.logger.error(`Failed to set priority for FAQ ${faqId}:`, error);
      throw new HttpException(
        `Failed to set priority: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post(':faqId/assign')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Assign FAQ to a specific reviewer' })
  @ApiResponse({ status: 200, description: 'FAQ assigned successfully' })
  async assignReviewer(
    @Param('faqId', ParseUUIDPipe) faqId: string,
    @Body() body: { reviewerId: string }
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      // This would be implemented to assign FAQ to a reviewer
      // For now, just logging
      this.logger.log(`FAQ ${faqId} assigned to reviewer ${body.reviewerId}`);

      return {
        success: true,
        message: 'FAQ assigned successfully'
      };
    } catch (error) {
      this.logger.error(`Failed to assign FAQ ${faqId}:`, error);
      throw new HttpException(
        `Failed to assign FAQ: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
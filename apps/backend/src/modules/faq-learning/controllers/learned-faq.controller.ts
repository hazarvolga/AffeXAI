import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  HttpException,
  Logger,
  ParseUUIDPipe,
  Optional
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In, MoreThanOrEqual } from 'typeorm';
import { LearnedFaqEntry, FaqEntryStatus } from '../entities/learned-faq-entry.entity';
import { FeedbackProcessorService, FeedbackData } from '../services/feedback-processor.service';

export class SearchFaqsDto {
  query?: string;
  category?: string;
  categories?: string; // comma-separated
  limit?: number;
  offset?: number;
  sort_by?: 'relevance' | 'popularity' | 'recent' | 'helpful';
  include_related?: boolean;
}

export class FaqFeedbackDto {
  feedbackType: 'helpful' | 'not_helpful' | 'suggestion' | 'correction';
  rating?: number; // 1-5 scale
  comment?: string;
  suggestedAnswer?: string;
  suggestedCategory?: string;
  suggestedKeywords?: string[];
}

export class FaqSearchResult {
  id: string;
  question: string;
  answer: string;
  category?: string;
  keywords: string[];
  usageCount: number;
  helpfulCount: number;
  notHelpfulCount: number;
  helpfulnessRatio: number;
  confidence: number;
  createdAt: Date;
  relatedFaqs?: Array<{
    id: string;
    question: string;
    similarity: number;
  }>;
}

@ApiTags('Learned FAQs (Public)')
@Controller('faqs')
export class LearnedFaqController {
  private readonly logger = new Logger(LearnedFaqController.name);

  constructor(
    @InjectRepository(LearnedFaqEntry)
    private faqRepository: Repository<LearnedFaqEntry>,
    private feedbackProcessor: FeedbackProcessorService,
  ) {}

  @Get('search')
  @ApiOperation({ summary: 'Search published FAQs' })
  @ApiResponse({ status: 200, description: 'FAQs retrieved successfully' })
  @ApiQuery({ name: 'query', required: false, description: 'Search query' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category' })
  @ApiQuery({ name: 'categories', required: false, description: 'Filter by multiple categories (comma-separated)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of results (default: 20, max: 100)' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Offset for pagination (default: 0)' })
  @ApiQuery({ name: 'sort_by', required: false, enum: ['relevance', 'popularity', 'recent', 'helpful'] })
  @ApiQuery({ name: 'include_related', required: false, type: Boolean, description: 'Include related FAQs' })
  async searchFaqs(@Query() dto: SearchFaqsDto): Promise<{
    faqs: FaqSearchResult[];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  }> {
    try {
      const limit = Math.min(dto.limit || 20, 100);
      const offset = dto.offset || 0;

      const queryBuilder = this.faqRepository.createQueryBuilder('faq')
        .where('faq.status = :status', { status: FaqEntryStatus.PUBLISHED });

      // Text search
      if (dto.query) {
        queryBuilder.andWhere(
          '(faq.question ILIKE :query OR faq.answer ILIKE :query OR :query = ANY(faq.keywords))',
          { query: `%${dto.query}%` }
        );
      }

      // Category filter
      if (dto.category) {
        queryBuilder.andWhere('faq.category = :category', { category: dto.category });
      } else if (dto.categories) {
        const categoryList = dto.categories.split(',').map(c => c.trim());
        queryBuilder.andWhere('faq.category IN (:...categories)', { categories: categoryList });
      }

      // Sorting
      switch (dto.sort_by) {
        case 'popularity':
          queryBuilder.orderBy('faq.usageCount', 'DESC');
          break;
        case 'recent':
          queryBuilder.orderBy('faq.createdAt', 'DESC');
          break;
        case 'helpful':
          queryBuilder.orderBy('faq.helpfulCount', 'DESC');
          break;
        case 'relevance':
        default:
          // For relevance, we'd use full-text search scoring
          // For now, order by confidence and usage
          queryBuilder.orderBy('faq.confidence', 'DESC')
                      .addOrderBy('faq.usageCount', 'DESC');
          break;
      }

      // Get total count
      const total = await queryBuilder.getCount();

      // Apply pagination
      const faqs = await queryBuilder
        .skip(offset)
        .take(limit)
        .getMany();

      // Convert to search results
      const results: FaqSearchResult[] = [];
      
      for (const faq of faqs) {
        const result: FaqSearchResult = {
          id: faq.id,
          question: faq.question,
          answer: faq.answer,
          category: faq.category,
          keywords: faq.keywords,
          usageCount: faq.usageCount,
          helpfulCount: faq.helpfulCount,
          notHelpfulCount: faq.notHelpfulCount,
          helpfulnessRatio: faq.helpfulnessRatio,
          confidence: faq.confidence,
          createdAt: faq.createdAt
        };

        // Include related FAQs if requested
        if (dto.include_related) {
          result.relatedFaqs = await this.findRelatedFaqs(faq.id, faq.keywords, faq.category);
        }

        results.push(result);
      }

      return {
        faqs: results,
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      };

    } catch (error) {
      this.logger.error('Failed to search FAQs:', error);
      throw new HttpException(
        `Failed to search FAQs: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get available FAQ categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  async getCategories(): Promise<{
    categories: Array<{
      name: string;
      count: number;
      description?: string;
    }>;
  }> {
    try {
      const categoryStats = await this.faqRepository
        .createQueryBuilder('faq')
        .select('faq.category', 'name')
        .addSelect('COUNT(*)', 'count')
        .where('faq.status = :status', { status: FaqEntryStatus.PUBLISHED })
        .andWhere('faq.category IS NOT NULL')
        .groupBy('faq.category')
        .orderBy('count', 'DESC')
        .getRawMany();

      const categories = categoryStats.map(stat => ({
        name: stat.name,
        count: parseInt(stat.count),
        description: `${stat.count} FAQs in ${stat.name} category`
      }));

      return { categories };

    } catch (error) {
      this.logger.error('Failed to get categories:', error);
      throw new HttpException(
        `Failed to get categories: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get most popular FAQs' })
  @ApiResponse({ status: 200, description: 'Popular FAQs retrieved successfully' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of results (default: 10, max: 50)' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category' })
  async getPopularFaqs(
    @Query('limit') limit: number = 10,
    @Query('category') category?: string
  ): Promise<{
    faqs: FaqSearchResult[];
  }> {
    try {
      const queryLimit = Math.min(limit, 50);

      const queryBuilder = this.faqRepository.createQueryBuilder('faq')
        .where('faq.status = :status', { status: FaqEntryStatus.PUBLISHED });

      if (category) {
        queryBuilder.andWhere('faq.category = :category', { category });
      }

      const faqs = await queryBuilder
        .orderBy('faq.usageCount', 'DESC')
        .addOrderBy('faq.helpfulCount', 'DESC')
        .take(queryLimit)
        .getMany();

      const results = faqs.map(faq => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        keywords: faq.keywords,
        usageCount: faq.usageCount,
        helpfulCount: faq.helpfulCount,
        notHelpfulCount: faq.notHelpfulCount,
        helpfulnessRatio: faq.helpfulnessRatio,
        confidence: faq.confidence,
        createdAt: faq.createdAt
      }));

      return { faqs: results };

    } catch (error) {
      this.logger.error('Failed to get popular FAQs:', error);
      throw new HttpException(
        `Failed to get popular FAQs: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recently added FAQs' })
  @ApiResponse({ status: 200, description: 'Recent FAQs retrieved successfully' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of results (default: 10, max: 50)' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category' })
  async getRecentFaqs(
    @Query('limit') limit: number = 10,
    @Query('category') category?: string
  ): Promise<{
    faqs: FaqSearchResult[];
  }> {
    try {
      const queryLimit = Math.min(limit, 50);

      const queryBuilder = this.faqRepository.createQueryBuilder('faq')
        .where('faq.status = :status', { status: FaqEntryStatus.PUBLISHED });

      if (category) {
        queryBuilder.andWhere('faq.category = :category', { category });
      }

      const faqs = await queryBuilder
        .orderBy('faq.publishedAt', 'DESC')
        .addOrderBy('faq.createdAt', 'DESC')
        .take(queryLimit)
        .getMany();

      const results = faqs.map(faq => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        keywords: faq.keywords,
        usageCount: faq.usageCount,
        helpfulCount: faq.helpfulCount,
        notHelpfulCount: faq.notHelpfulCount,
        helpfulnessRatio: faq.helpfulnessRatio,
        confidence: faq.confidence,
        createdAt: faq.createdAt
      }));

      return { faqs: results };

    } catch (error) {
      this.logger.error('Failed to get recent FAQs:', error);
      throw new HttpException(
        `Failed to get recent FAQs: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific FAQ by ID' })
  @ApiResponse({ status: 200, description: 'FAQ retrieved successfully' })
  @ApiResponse({ status: 404, description: 'FAQ not found' })
  async getFaqById(@Param('id', ParseUUIDPipe) id: string): Promise<{
    faq: FaqSearchResult & {
      relatedFaqs: Array<{
        id: string;
        question: string;
        similarity: number;
      }>;
    };
  }> {
    try {
      const faq = await this.faqRepository.findOne({
        where: { 
          id, 
          status: FaqEntryStatus.PUBLISHED 
        }
      });

      if (!faq) {
        throw new HttpException('FAQ not found', HttpStatus.NOT_FOUND);
      }

      // Increment usage count
      await this.faqRepository.update(id, { 
        usageCount: faq.usageCount + 1 
      });

      // Get related FAQs
      const relatedFaqs = await this.findRelatedFaqs(faq.id, faq.keywords, faq.category);

      const result = {
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        keywords: faq.keywords,
        usageCount: faq.usageCount + 1, // Include the increment
        helpfulCount: faq.helpfulCount,
        notHelpfulCount: faq.notHelpfulCount,
        helpfulnessRatio: faq.helpfulnessRatio,
        confidence: faq.confidence,
        createdAt: faq.createdAt,
        relatedFaqs
      };

      return { faq: result };

    } catch (error) {
      this.logger.error(`Failed to get FAQ ${id}:`, error);
      
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      
      throw new HttpException(
        `Failed to get FAQ: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post(':id/feedback')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit feedback for a FAQ' })
  @ApiResponse({ status: 200, description: 'Feedback submitted successfully' })
  @ApiResponse({ status: 404, description: 'FAQ not found' })
  async submitFeedback(
    @Param('id', ParseUUIDPipe) faqId: string,
    @Body() dto: FaqFeedbackDto,
    @CurrentUser() user?: any
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      // Verify FAQ exists and is published
      const faq = await this.faqRepository.findOne({
        where: { 
          id: faqId, 
          status: FaqEntryStatus.PUBLISHED 
        }
      });

      if (!faq) {
        throw new HttpException('FAQ not found', HttpStatus.NOT_FOUND);
      }

      // Prepare feedback data
      const feedbackData: FeedbackData = {
        faqId,
        userId: user?.id,
        feedbackType: dto.feedbackType,
        rating: dto.rating,
        comment: dto.comment,
        suggestedAnswer: dto.suggestedAnswer,
        suggestedCategory: dto.suggestedCategory,
        suggestedKeywords: dto.suggestedKeywords,
        context: {
          userAgent: 'web', // This would come from request headers
          sessionId: user?.sessionId
        }
      };

      // Process feedback
      const result = await this.feedbackProcessor.processFeedback(feedbackData);

      if (result.processed) {
        this.logger.log(`Feedback submitted for FAQ ${faqId} by user ${user?.id || 'anonymous'}`);
        
        return {
          success: true,
          message: 'Feedback submitted successfully'
        };
      } else {
        throw new HttpException('Failed to process feedback', HttpStatus.INTERNAL_SERVER_ERROR);
      }

    } catch (error) {
      this.logger.error(`Failed to submit feedback for FAQ ${faqId}:`, error);
      
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      
      throw new HttpException(
        `Failed to submit feedback: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id/related')
  @ApiOperation({ summary: 'Get related FAQs for a specific FAQ' })
  @ApiResponse({ status: 200, description: 'Related FAQs retrieved successfully' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of results (default: 5, max: 20)' })
  async getRelatedFaqs(
    @Param('id', ParseUUIDPipe) faqId: string,
    @Query('limit') limit: number = 5
  ): Promise<{
    relatedFaqs: Array<{
      id: string;
      question: string;
      answer: string;
      category?: string;
      similarity: number;
      usageCount: number;
    }>;
  }> {
    try {
      const queryLimit = Math.min(limit, 20);

      // Get the source FAQ
      const sourceFaq = await this.faqRepository.findOne({
        where: { 
          id: faqId, 
          status: FaqEntryStatus.PUBLISHED 
        }
      });

      if (!sourceFaq) {
        throw new HttpException('FAQ not found', HttpStatus.NOT_FOUND);
      }

      const relatedFaqs = await this.findRelatedFaqs(
        sourceFaq.id, 
        sourceFaq.keywords, 
        sourceFaq.category, 
        queryLimit
      );

      // Get full FAQ details for related FAQs
      const relatedIds = relatedFaqs.map(r => r.id);
      const fullRelatedFaqs = await this.faqRepository.find({
        where: { 
          id: In(relatedIds),
          status: FaqEntryStatus.PUBLISHED 
        }
      });

      const results = relatedFaqs.map(related => {
        const fullFaq = fullRelatedFaqs.find(f => f.id === related.id);
        return {
          id: related.id,
          question: related.question,
          answer: fullFaq?.answer || '',
          category: fullFaq?.category,
          similarity: related.similarity,
          usageCount: fullFaq?.usageCount || 0
        };
      });

      return { relatedFaqs: results };

    } catch (error) {
      this.logger.error(`Failed to get related FAQs for ${faqId}:`, error);
      
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      
      throw new HttpException(
        `Failed to get related FAQs: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('stats/overview')
  @ApiOperation({ summary: 'Get public FAQ statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getFaqStats(): Promise<{
    totalFaqs: number;
    totalCategories: number;
    mostPopularCategory: string;
    averageHelpfulness: number;
    recentlyAdded: number; // Last 30 days
  }> {
    try {
      const totalFaqs = await this.faqRepository.count({
        where: { status: FaqEntryStatus.PUBLISHED }
      });

      const categoryStats = await this.faqRepository
        .createQueryBuilder('faq')
        .select('COUNT(DISTINCT faq.category)', 'totalCategories')
        .addSelect('faq.category', 'mostPopular')
        .addSelect('COUNT(*)', 'count')
        .where('faq.status = :status', { status: FaqEntryStatus.PUBLISHED })
        .andWhere('faq.category IS NOT NULL')
        .groupBy('faq.category')
        .orderBy('count', 'DESC')
        .getRawMany();

      const totalCategories = categoryStats.length;
      const mostPopularCategory = categoryStats[0]?.mostPopular || 'General';

      // Calculate average helpfulness
      const helpfulnessStats = await this.faqRepository
        .createQueryBuilder('faq')
        .select('AVG(CASE WHEN (faq.helpfulCount + faq.notHelpfulCount) > 0 THEN faq.helpfulCount::float / (faq.helpfulCount + faq.notHelpfulCount) ELSE 0 END)', 'avgHelpfulness')
        .where('faq.status = :status', { status: FaqEntryStatus.PUBLISHED })
        .getRawOne();

      const averageHelpfulness = Math.round((parseFloat(helpfulnessStats.avgHelpfulness) || 0) * 100);

      // Recently added (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentlyAdded = await this.faqRepository.count({
        where: {
          status: FaqEntryStatus.PUBLISHED,
          publishedAt: MoreThanOrEqual(thirtyDaysAgo)
        }
      });

      return {
        totalFaqs,
        totalCategories,
        mostPopularCategory,
        averageHelpfulness,
        recentlyAdded
      };

    } catch (error) {
      this.logger.error('Failed to get FAQ stats:', error);
      throw new HttpException(
        `Failed to get FAQ stats: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async findRelatedFaqs(
    faqId: string, 
    keywords: string[], 
    category?: string, 
    limit: number = 5
  ): Promise<Array<{ id: string; question: string; similarity: number }>> {
    try {
      const queryBuilder = this.faqRepository.createQueryBuilder('faq')
        .where('faq.status = :status', { status: FaqEntryStatus.PUBLISHED })
        .andWhere('faq.id != :faqId', { faqId });

      // Prefer same category
      if (category) {
        queryBuilder.andWhere('faq.category = :category', { category });
      }

      // Find FAQs with overlapping keywords
      if (keywords && keywords.length > 0) {
        queryBuilder.andWhere('faq.keywords && :keywords', { keywords });
      }

      const relatedFaqs = await queryBuilder
        .orderBy('faq.usageCount', 'DESC')
        .addOrderBy('faq.helpfulCount', 'DESC')
        .take(limit)
        .getMany();

      // Calculate simple similarity based on keyword overlap
      return relatedFaqs.map(faq => {
        const overlap = faq.keywords.filter(k => keywords.includes(k)).length;
        const similarity = keywords.length > 0 ? overlap / keywords.length : 0;
        
        return {
          id: faq.id,
          question: faq.question,
          similarity: Math.round(similarity * 100) / 100
        };
      }).sort((a, b) => b.similarity - a.similarity);

    } catch (error) {
      this.logger.warn('Failed to find related FAQs:', error);
      return [];
    }
  }
}
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  Logger,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { KnowledgeSourcesService } from '../services/knowledge-sources.service';
import { CreateKnowledgeSourceDto } from '../dto/create-knowledge-source.dto';
import { UpdateKnowledgeSourceDto } from '../dto/update-knowledge-source.dto';
import { QueryKnowledgeSourceDto } from '../dto/query-knowledge-source.dto';
import { SearchKnowledgeSourceDto } from '../dto/search-knowledge-source.dto';

@Controller('knowledge-sources')
@UseGuards(JwtAuthGuard)
export class KnowledgeSourcesController {
  private readonly logger = new Logger(KnowledgeSourcesController.name);

  constructor(
    private readonly knowledgeSourcesService: KnowledgeSourcesService,
  ) {}

  /**
   * Create a new knowledge source
   * POST /knowledge-sources
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDto: CreateKnowledgeSourceDto,
    @CurrentUser() user: any,
  ) {
    this.logger.log(`Creating knowledge source: ${createDto.title} by user: ${user.userId}`);
    // Auto-set uploadedById from authenticated user
    createDto.uploadedById = user.userId;
    const source = await this.knowledgeSourcesService.create(createDto);
    return {
      success: true,
      data: source,
      message: 'Knowledge source created successfully',
    };
  }

  /**
   * Get all knowledge sources with filtering
   * GET /knowledge-sources
   */
  @Get()
  async findAll(@Query() queryDto: QueryKnowledgeSourceDto) {
    const result = await this.knowledgeSourcesService.findAll(queryDto);
    return {
      success: true,
      data: result.data,
      total: result.total,
      page: Math.floor((queryDto.offset || 0) / (queryDto.limit || 20)) + 1,
      limit: queryDto.limit || 20,
    };
  }

  /**
   * Search knowledge sources with full-text search
   * POST /knowledge-sources/search
   */
  @Post('search')
  @HttpCode(HttpStatus.OK)
  async search(@Body() searchDto: SearchKnowledgeSourceDto) {
    this.logger.log(`Searching knowledge sources: "${searchDto.query}"`);
    const results = await this.knowledgeSourcesService.search(searchDto);
    return {
      success: true,
      data: results,
      total: results.length,
    };
  }

  /**
   * Get knowledge source by ID
   * GET /knowledge-sources/:id
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const source = await this.knowledgeSourcesService.findById(id);
    return {
      success: true,
      data: source,
    };
  }

  /**
   * Update knowledge source
   * PUT /knowledge-sources/:id
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateKnowledgeSourceDto,
  ) {
    this.logger.log(`Updating knowledge source: ${id}`);
    const source = await this.knowledgeSourcesService.update(id, updateDto);
    return {
      success: true,
      data: source,
      message: 'Knowledge source updated successfully',
    };
  }

  /**
   * Archive knowledge source (soft delete)
   * PUT /knowledge-sources/:id/archive
   */
  @Put(':id/archive')
  async archive(@Param('id') id: string, @Body('archivedById') archivedById: string) {
    this.logger.log(`Archiving knowledge source: ${id}`);
    const source = await this.knowledgeSourcesService.archive(id, archivedById);
    return {
      success: true,
      data: source,
      message: 'Knowledge source archived successfully',
    };
  }

  /**
   * Delete knowledge source permanently
   * DELETE /knowledge-sources/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    this.logger.log(`Deleting knowledge source: ${id}`);
    await this.knowledgeSourcesService.delete(id);
  }

  /**
   * Update usage statistics
   * POST /knowledge-sources/:id/usage
   */
  @Post(':id/usage')
  @HttpCode(HttpStatus.OK)
  async updateUsage(
    @Param('id') id: string,
    @Body('wasHelpful') wasHelpful: boolean,
    @Body('relevanceScore') relevanceScore?: number,
  ) {
    await this.knowledgeSourcesService.updateUsageStats(id, wasHelpful, relevanceScore);
    return {
      success: true,
      message: 'Usage statistics updated successfully',
    };
  }

  /**
   * Get statistics
   * GET /knowledge-sources/stats/overview
   */
  @Get('stats/overview')
  async getStatistics() {
    const stats = await this.knowledgeSourcesService.getStatistics();
    return {
      success: true,
      data: stats,
    };
  }
}

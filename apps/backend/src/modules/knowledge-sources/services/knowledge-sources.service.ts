import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like, In } from 'typeorm';
import { CompanyKnowledgeSource } from '../entities/company-knowledge-source.entity';
import { CreateKnowledgeSourceDto } from '../dto/create-knowledge-source.dto';
import { UpdateKnowledgeSourceDto } from '../dto/update-knowledge-source.dto';
import { QueryKnowledgeSourceDto } from '../dto/query-knowledge-source.dto';
import { SearchKnowledgeSourceDto } from '../dto/search-knowledge-source.dto';
import { KnowledgeSourceType } from '../entities/enums/knowledge-source-type.enum';
import { KnowledgeSourceStatus } from '../entities/enums/knowledge-source-status.enum';

export interface KnowledgeSourceSearchResult {
  source: CompanyKnowledgeSource;
  relevanceScore: number;
}

@Injectable()
export class KnowledgeSourcesService {
  private readonly logger = new Logger(KnowledgeSourcesService.name);

  constructor(
    @InjectRepository(CompanyKnowledgeSource)
    private readonly knowledgeSourceRepository: Repository<CompanyKnowledgeSource>,
  ) {}

  /**
   * Create a new knowledge source
   */
  async create(createDto: CreateKnowledgeSourceDto): Promise<CompanyKnowledgeSource> {
    this.logger.log(`Creating knowledge source: ${createDto.title}`);

    // Validate source type specific fields
    this.validateSourceTypeFields(createDto);

    const knowledgeSource = this.knowledgeSourceRepository.create({
      ...createDto,
      status: KnowledgeSourceStatus.PENDING,
      extractedContent: createDto.extractedContent || '',
    });

    return await this.knowledgeSourceRepository.save(knowledgeSource);
  }

  /**
   * Find knowledge source by ID
   */
  async findById(id: string): Promise<CompanyKnowledgeSource> {
    const source = await this.knowledgeSourceRepository.findOne({
      where: { id },
      relations: ['uploadedBy', 'archivedBy'],
    });

    if (!source) {
      throw new NotFoundException(`Knowledge source with ID ${id} not found`);
    }

    return source;
  }

  /**
   * Find all knowledge sources with filters
   */
  async findAll(queryDto: QueryKnowledgeSourceDto): Promise<{ data: CompanyKnowledgeSource[]; total: number }> {
    const {
      search,
      sourceType,
      status,
      uploadedById,
      tags,
      enableForFaqLearning,
      enableForChat,
      limit = 20,
      offset = 0,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = queryDto;

    const queryBuilder = this.knowledgeSourceRepository.createQueryBuilder('ks');

    // Apply filters
    if (search) {
      queryBuilder.andWhere(
        '(ks.title ILIKE :search OR ks.description ILIKE :search OR ks.tags ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (sourceType) {
      queryBuilder.andWhere('ks.sourceType = :sourceType', { sourceType });
    }

    if (status) {
      queryBuilder.andWhere('ks.status = :status', { status });
    } else {
      // By default, exclude archived sources
      queryBuilder.andWhere('ks.status != :archived', { archived: KnowledgeSourceStatus.ARCHIVED });
    }

    if (uploadedById) {
      queryBuilder.andWhere('ks.uploadedById = :uploadedById', { uploadedById });
    }

    if (tags) {
      queryBuilder.andWhere('ks.tags ILIKE :tags', { tags: `%${tags}%` });
    }

    if (enableForFaqLearning !== undefined) {
      queryBuilder.andWhere('ks.enableForFaqLearning = :enableForFaqLearning', { enableForFaqLearning });
    }

    if (enableForChat !== undefined) {
      queryBuilder.andWhere('ks.enableForChat = :enableForChat', { enableForChat });
    }

    // Sorting
    queryBuilder.orderBy(`ks.${sortBy}`, sortOrder);

    // Pagination
    queryBuilder.skip(offset).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }

  /**
   * Full-text search on knowledge sources
   */
  async search(searchDto: SearchKnowledgeSourceDto): Promise<KnowledgeSourceSearchResult[]> {
    const { query, limit = 10, minRelevanceScore = 0.3, tags } = searchDto;

    this.logger.log(`Searching knowledge sources: "${query}"`);

    // PostgreSQL full-text search
    const queryBuilder = this.knowledgeSourceRepository
      .createQueryBuilder('ks')
      .select('ks.*')
      .addSelect(
        `ts_rank(
          to_tsvector('english', COALESCE(ks.title, '') || ' ' || COALESCE(ks.extracted_content, '') || ' ' || COALESCE(ks.tags, '')),
          plainto_tsquery('english', :query)
        )`,
        'relevance_score'
      )
      .where(
        `to_tsvector('english', COALESCE(ks.title, '') || ' ' || COALESCE(ks.extracted_content, '') || ' ' || COALESCE(ks.tags, '')) @@ plainto_tsquery('english', :query)`,
        { query }
      )
      .andWhere('ks.status = :status', { status: KnowledgeSourceStatus.ACTIVE })
      .andWhere('ks.enable_for_chat = :enableForChat', { enableForChat: true });

    if (tags) {
      queryBuilder.andWhere('ks.tags ILIKE :tags', { tags: `%${tags}%` });
    }

    queryBuilder
      .orderBy('relevance_score', 'DESC')
      .limit(limit);

    const results = await queryBuilder.getRawMany();

    return results
      .map(row => ({
        source: this.knowledgeSourceRepository.create(row),
        relevanceScore: parseFloat(row.relevance_score),
      }))
      .filter(result => result.relevanceScore >= minRelevanceScore);
  }

  /**
   * Update knowledge source
   */
  async update(id: string, updateDto: UpdateKnowledgeSourceDto): Promise<CompanyKnowledgeSource> {
    const source = await this.findById(id);

    Object.assign(source, updateDto);

    return await this.knowledgeSourceRepository.save(source);
  }

  /**
   * Archive knowledge source (soft delete)
   */
  async archive(id: string, archivedById: string): Promise<CompanyKnowledgeSource> {
    const source = await this.findById(id);

    source.status = KnowledgeSourceStatus.ARCHIVED;
    source.archivedAt = new Date();
    source.archivedById = archivedById;

    return await this.knowledgeSourceRepository.save(source);
  }

  /**
   * Permanently delete knowledge source
   */
  async delete(id: string): Promise<void> {
    const source = await this.findById(id);
    await this.knowledgeSourceRepository.remove(source);
    this.logger.log(`Deleted knowledge source: ${id}`);
  }

  /**
   * Update usage statistics
   */
  async updateUsageStats(
    id: string,
    wasHelpful: boolean,
    relevanceScore?: number
  ): Promise<void> {
    const source = await this.findById(id);

    source.usageCount += 1;

    if (wasHelpful) {
      source.helpfulCount += 1;
    }

    if (relevanceScore !== undefined) {
      // Calculate running average
      const totalScore = source.averageRelevanceScore * (source.usageCount - 1) + relevanceScore;
      source.averageRelevanceScore = totalScore / source.usageCount;
    }

    await this.knowledgeSourceRepository.save(source);
  }

  /**
   * Get statistics for knowledge sources
   */
  async getStatistics(): Promise<{
    total: number;
    byType: Record<KnowledgeSourceType, number>;
    byStatus: Record<KnowledgeSourceStatus, number>;
    avgEffectiveness: number;
  }> {
    const [total, byType, byStatus, effectiveness] = await Promise.all([
      this.knowledgeSourceRepository.count(),
      this.getCountByType(),
      this.getCountByStatus(),
      this.getAverageEffectiveness(),
    ]);

    return {
      total,
      byType,
      byStatus,
      avgEffectiveness: effectiveness,
    };
  }

  /**
   * Validate source type specific fields
   */
  private validateSourceTypeFields(dto: CreateKnowledgeSourceDto): void {
    if (dto.sourceType === KnowledgeSourceType.DOCUMENT) {
      if (!dto.fileName && !dto.filePath) {
        throw new BadRequestException('Document sources require fileName or filePath');
      }
    }

    if (dto.sourceType === KnowledgeSourceType.URL) {
      if (!dto.url) {
        throw new BadRequestException('URL sources require url field');
      }
    }

    if (dto.sourceType === KnowledgeSourceType.TEXT) {
      if (!dto.extractedContent) {
        throw new BadRequestException('Text sources require extractedContent field');
      }
    }
  }

  /**
   * Get count by type
   */
  private async getCountByType(): Promise<Record<KnowledgeSourceType, number>> {
    const results = await this.knowledgeSourceRepository
      .createQueryBuilder('ks')
      .select('ks.sourceType', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('ks.sourceType')
      .getRawMany();

    const counts: Record<string, number> = {};
    results.forEach(r => {
      counts[r.type] = parseInt(r.count, 10);
    });

    return counts as Record<KnowledgeSourceType, number>;
  }

  /**
   * Get count by status
   */
  private async getCountByStatus(): Promise<Record<KnowledgeSourceStatus, number>> {
    const results = await this.knowledgeSourceRepository
      .createQueryBuilder('ks')
      .select('ks.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('ks.status')
      .getRawMany();

    const counts: Record<string, number> = {};
    results.forEach(r => {
      counts[r.status] = parseInt(r.count, 10);
    });

    return counts as Record<KnowledgeSourceStatus, number>;
  }

  /**
   * Get average effectiveness score
   */
  private async getAverageEffectiveness(): Promise<number> {
    const result = await this.knowledgeSourceRepository
      .createQueryBuilder('ks')
      .select('AVG(ks.usage_count * ks.average_relevance_score)', 'avg')
      .where('ks.status = :status', { status: KnowledgeSourceStatus.ACTIVE })
      .getRawOne();

    return parseFloat(result?.avg || '0');
  }
}

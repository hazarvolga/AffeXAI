import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, In } from 'typeorm';
import { ReusableSection } from '../entities/reusable-section.entity';
import { SectionComponent } from '../entities/section-component.entity';
import { ComponentUsageHistory } from '../entities/component-usage-history.entity';
import { ComponentFavorite } from '../entities/component-favorite.entity';
import {
  CreateReusableSectionDto,
  UpdateReusableSectionDto,
  ReusableSectionFilterDto,
  DuplicateReusableSectionDto,
  PaginatedReusableSectionsDto,
  UpdateSectionComponentsDto,
} from '../dto/reusable-section.dto';
import { ReusableComponentsService } from './reusable-components.service';

@Injectable()
export class ReusableSectionsService {
  constructor(
    @InjectRepository(ReusableSection)
    private readonly sectionRepository: Repository<ReusableSection>,
    @InjectRepository(SectionComponent)
    private readonly sectionComponentRepository: Repository<SectionComponent>,
    @InjectRepository(ComponentUsageHistory)
    private readonly usageHistoryRepository: Repository<ComponentUsageHistory>,
    @InjectRepository(ComponentFavorite)
    private readonly favoriteRepository: Repository<ComponentFavorite>,
    private readonly reusableComponentsService: ReusableComponentsService,
  ) {}

  /**
   * Create a new reusable section
   */
  async create(
    dto: CreateReusableSectionDto,
    authorId: string,
  ): Promise<ReusableSection> {
    // Generate unique slug from name
    const slug = await this.generateUniqueSlug(dto.name);

    const { components, ...sectionData } = dto;

    const section = this.sectionRepository.create({
      ...sectionData,
      slug,
      authorId,
    });

    const savedSection = await this.sectionRepository.save(section);

    // Add components if provided
    if (components && components.length > 0) {
      await this.addComponents(savedSection.id, components);
    }

    return await this.findOne(savedSection.id);
  }

  /**
   * Find all reusable sections with filters and pagination
   */
  async findAll(
    filters: ReusableSectionFilterDto,
    userId?: string,
  ): Promise<PaginatedReusableSectionsDto> {
    const {
      search,
      sectionType,
      categoryId,
      tags,
      authorId,
      isPublic,
      isFeatured,
      mySections,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      limit = 20,
      page = 1,
    } = filters;

    const queryBuilder = this.sectionRepository
      .createQueryBuilder('section')
      .leftJoinAndSelect('section.author', 'author')
      .leftJoinAndSelect('section.category', 'category')
      .leftJoinAndSelect('section.components', 'components')
      .leftJoinAndSelect('components.reusableComponent', 'reusableComponent');

    // Apply filters
    if (search) {
      queryBuilder.andWhere(
        '(section.name ILIKE :search OR section.description ILIKE :search OR :search = ANY(section.tags))',
        { search: `%${search}%` },
      );
    }

    if (sectionType) {
      queryBuilder.andWhere('section.sectionType = :sectionType', { sectionType });
    }

    if (categoryId) {
      queryBuilder.andWhere('section.categoryId = :categoryId', { categoryId });
    }

    if (tags && tags.length > 0) {
      queryBuilder.andWhere('section.tags && :tags', { tags });
    }

    if (authorId) {
      queryBuilder.andWhere('section.authorId = :authorId', { authorId });
    }

    if (typeof isPublic === 'boolean') {
      queryBuilder.andWhere('section.isPublic = :isPublic', { isPublic });
    }

    if (typeof isFeatured === 'boolean') {
      queryBuilder.andWhere('section.isFeatured = :isFeatured', { isFeatured });
    }

    if (mySections && userId) {
      queryBuilder.andWhere('section.authorId = :userId', { userId });
    }

    // Apply sorting
    if (sortBy === 'featured') {
      queryBuilder.orderBy('section.isFeatured', sortOrder);
      queryBuilder.addOrderBy('section.usageCount', 'DESC');
    } else if (sortBy === 'usageCount') {
      queryBuilder.orderBy('section.usageCount', sortOrder);
    } else {
      queryBuilder.orderBy(`section.${sortBy}`, sortOrder);
    }

    // Apply pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Find one reusable section by ID
   */
  async findOne(id: string): Promise<ReusableSection> {
    const section = await this.sectionRepository.findOne({
      where: { id },
      relations: [
        'author',
        'category',
        'parentVersion',
        'components',
        'components.reusableComponent',
        'components.children',
      ],
      order: {
        components: {
          orderIndex: 'ASC',
        },
      },
    });

    if (!section) {
      throw new NotFoundException(`Reusable section with ID ${id} not found`);
    }

    return section;
  }

  /**
   * Update a reusable section
   */
  async update(
    id: string,
    dto: UpdateReusableSectionDto,
  ): Promise<ReusableSection> {
    const section = await this.findOne(id);

    // If name changed, regenerate slug
    if (dto.name && dto.name !== section.name) {
      dto['slug'] = await this.generateUniqueSlug(dto.name, id);
    }

    const { components, ...sectionData } = dto;

    Object.assign(section, sectionData);
    section.updatedAt = new Date();

    await this.sectionRepository.save(section);

    // Update components if provided
    if (components !== undefined) {
      // Remove existing components
      await this.sectionComponentRepository.delete({ sectionId: id });

      // Add new components
      if (components.length > 0) {
        await this.addComponents(id, components);
      }
    }

    return await this.findOne(id);
  }

  /**
   * Delete a reusable section
   */
  async remove(id: string): Promise<void> {
    const section = await this.findOne(id);
    await this.sectionRepository.remove(section);
  }

  /**
   * Duplicate a reusable section
   */
  async duplicate(
    id: string,
    dto: DuplicateReusableSectionDto,
    authorId: string,
  ): Promise<ReusableSection> {
    const original = await this.findOne(id);

    const slug = await this.generateUniqueSlug(dto.name);

    const duplicate = this.sectionRepository.create({
      name: dto.name,
      slug,
      description: original.description,
      sectionType: original.sectionType,
      tags: original.tags,
      categoryId: original.categoryId,
      designSystem: original.designSystem,
      layoutOptions: original.layoutOptions,
      constraints: original.constraints,
      thumbnailUrl: original.thumbnailUrl,
      previewConfig: original.previewConfig,
      authorId,
      isPublic: false,
      isFeatured: false,
      parentVersionId: dto.createNewVersion ? original.id : null,
      version: dto.createNewVersion ? original.version + 1 : 1,
    });

    const savedDuplicate = await this.sectionRepository.save(duplicate);

    // Duplicate components
    if (original.components && original.components.length > 0) {
      const componentDtos = original.components.map((comp) => ({
        reusableComponentId: comp.reusableComponentId,
        componentType: comp.componentType,
        blockType: comp.blockType,
        props: comp.props,
        parentId: comp.parentId,
        orderIndex: comp.orderIndex,
        layoutProps: comp.layoutProps,
      }));

      await this.addComponents(savedDuplicate.id, componentDtos);
    }

    return await this.findOne(savedDuplicate.id);
  }

  /**
   * Add components to section
   */
  private async addComponents(
    sectionId: string,
    componentDtos: any[],
  ): Promise<void> {
    if (componentDtos.length === 0) {
      return;
    }

    const componentEntities = componentDtos.map((dto, index) => {
      return {
        sectionId,
        reusableComponentId: dto.reusableComponentId,
        componentType: dto.componentType,
        blockType: dto.blockType,
        props: dto.props,
        parentId: dto.parentId,
        orderIndex: dto.orderIndex ?? index,
        layoutProps: dto.layoutProps,
      };
    });

    await this.sectionComponentRepository.save(componentEntities);
  }

  /**
   * Update section components
   */
  async updateComponents(
    sectionId: string,
    dto: UpdateSectionComponentsDto,
  ): Promise<void> {
    // Verify section exists
    await this.findOne(sectionId);

    // Remove existing components
    await this.sectionComponentRepository.delete({ sectionId });

    // Add new components
    await this.addComponents(sectionId, dto.components);
  }

  /**
   * Get section components
   */
  async getComponents(sectionId: string): Promise<SectionComponent[]> {
    return await this.sectionComponentRepository.find({
      where: { sectionId },
      relations: ['reusableComponent', 'children'],
      order: { orderIndex: 'ASC' },
    });
  }

  /**
   * Increment usage count when section is used
   */
  async incrementUsage(id: string): Promise<number> {
    const section = await this.findOne(id);
    section.usageCount += 1;
    await this.sectionRepository.save(section);
    return section.usageCount;
  }

  /**
   * Track section usage in a page/template
   */
  async trackUsage(
    sectionId: string,
    usedInType: string,
    usedInId: string,
    userId?: string,
  ): Promise<void> {
    // Increment section usage count
    await this.incrementUsage(sectionId);

    // Record usage history
    const history = this.usageHistoryRepository.create({
      usableType: 'reusable_section',
      usableId: sectionId,
      usedInType,
      usedInId,
      userId,
    });

    await this.usageHistoryRepository.save(history);

    // Also track usage of reusable components within the section
    const components = await this.getComponents(sectionId);
    for (const comp of components) {
      if (comp.reusableComponentId) {
        await this.reusableComponentsService.trackUsage(
          comp.reusableComponentId,
          usedInType,
          usedInId,
          userId,
        );
      }
    }
  }

  /**
   * Get usage history for a section
   */
  async getUsageHistory(sectionId: string): Promise<ComponentUsageHistory[]> {
    return await this.usageHistoryRepository.find({
      where: {
        usableType: 'reusable_section',
        usableId: sectionId,
      },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 100,
    });
  }

  /**
   * Add section to favorites
   */
  async addToFavorites(sectionId: string, userId: string): Promise<void> {
    await this.findOne(sectionId);

    const existing = await this.favoriteRepository.findOne({
      where: {
        userId,
        favoritableType: 'reusable_section',
        favoritableId: sectionId,
      },
    });

    if (existing) {
      throw new BadRequestException('Section already in favorites');
    }

    const favorite = this.favoriteRepository.create({
      userId,
      favoritableType: 'reusable_section',
      favoritableId: sectionId,
    });

    await this.favoriteRepository.save(favorite);
  }

  /**
   * Remove section from favorites
   */
  async removeFromFavorites(sectionId: string, userId: string): Promise<void> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        userId,
        favoritableType: 'reusable_section',
        favoritableId: sectionId,
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.favoriteRepository.remove(favorite);
  }

  /**
   * Get user's favorite sections
   */
  async getFavorites(userId: string): Promise<ReusableSection[]> {
    const favorites = await this.favoriteRepository.find({
      where: {
        userId,
        favoritableType: 'reusable_section',
      },
    });

    const sectionIds = favorites.map((f) => f.favoritableId);

    if (sectionIds.length === 0) {
      return [];
    }

    return await this.sectionRepository.find({
      where: { id: In(sectionIds) },
      relations: ['author', 'category', 'components'],
    });
  }

  /**
   * Check if section is favorited by user
   */
  async isFavorited(sectionId: string, userId: string): Promise<boolean> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        userId,
        favoritableType: 'reusable_section',
        favoritableId: sectionId,
      },
    });

    return !!favorite;
  }

  /**
   * Generate unique slug from name
   */
  private async generateUniqueSlug(name: string, excludeId?: string): Promise<string> {
    let slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let counter = 1;
    let finalSlug = slug;

    while (true) {
      const where: FindOptionsWhere<ReusableSection> = { slug: finalSlug };
      if (excludeId) {
        where.id = excludeId as any;
      }

      const existing = await this.sectionRepository.findOne({ where });

      if (!existing || (excludeId && existing.id === excludeId)) {
        break;
      }

      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    return finalSlug;
  }
}

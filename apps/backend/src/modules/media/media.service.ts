import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Media } from './entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { EventBusService } from '../platform-integration/services/event-bus.service';
import { MediaModule, MediaCategory, MediaType } from '@affexai/shared-types';

export interface MediaQueryOptions {
  type?: MediaType;
  module?: MediaModule;
  category?: MediaCategory;
  tags?: string[];
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    private eventBusService: EventBusService,
  ) {}

  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    try {
      const media = this.mediaRepository.create(createMediaDto);
      const savedMedia = await this.mediaRepository.save(media);
      
      // Publish platform event
      await this.eventBusService.publishMediaUploaded(
        savedMedia.id,
        savedMedia.filename,
        savedMedia.size,
        'system', // TODO: Get from auth context
      );
      
      return savedMedia;
    } catch (error) {
      this.logger.error('Error creating media', error.stack);
      throw error;
    }
  }

  async findAll(): Promise<Media[]> {
    try {
      return await this.mediaRepository.find({
        where: { isActive: true },
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error('Error fetching media', error.stack);
      throw error;
    }
  }

  async findOne(id: string): Promise<Media> {
    try {
      const media = await this.mediaRepository.findOne({ where: { id } });
      if (!media) {
        throw new NotFoundException(`Media with ID ${id} not found`);
      }
      return media;
    } catch (error) {
      this.logger.error(`Error fetching media with ID ${id}`, error.stack);
      throw error;
    }
  }

  async update(id: string, updateMediaDto: UpdateMediaDto): Promise<Media> {
    try {
      const media = await this.findOne(id);
      Object.assign(media, updateMediaDto);
      return await this.mediaRepository.save(media);
    } catch (error) {
      this.logger.error(`Error updating media with ID ${id}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const media = await this.findOne(id);
      // Instead of deleting, we mark as inactive
      await this.update(id, { isActive: false });
    } catch (error) {
      this.logger.error(`Error removing media with ID ${id}`, error.stack);
      throw error;
    }
  }

  async findByType(type: string): Promise<Media[]> {
    try {
      return await this.mediaRepository.find({
        where: { type: type as any, isActive: true },
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error(`Error fetching media by type ${type}`, error.stack);
      throw error;
    }
  }

  /**
   * Find media with advanced filtering options
   */
  async findWithFilters(options: MediaQueryOptions): Promise<{ data: Media[]; total: number }> {
    try {
      const { type, module, category, tags, search, isActive = true, page = 1, limit = 50 } = options;

      const queryBuilder = this.mediaRepository.createQueryBuilder('media');

      // Base filters
      queryBuilder.where('media.isActive = :isActive', { isActive });

      if (type) {
        queryBuilder.andWhere('media.type = :type', { type });
      }

      if (module) {
        queryBuilder.andWhere('media.module = :module', { module });
      }

      if (category) {
        queryBuilder.andWhere('media.category = :category', { category });
      }

      // Search in filename, title, description
      if (search) {
        queryBuilder.andWhere(
          '(media.filename ILIKE :search OR media.title ILIKE :search OR media.description ILIKE :search OR media.originalName ILIKE :search)',
          { search: `%${search}%` },
        );
      }

      // Tags filter (PostgreSQL array contains)
      if (tags && tags.length > 0) {
        // For simple-array, we need to search in the comma-separated string
        const tagConditions = tags.map((tag, idx) => `media.tags LIKE :tag${idx}`);
        const tagParams = tags.reduce((acc, tag, idx) => ({ ...acc, [`tag${idx}`]: `%${tag}%` }), {});
        queryBuilder.andWhere(`(${tagConditions.join(' OR ')})`, tagParams);
      }

      // Order and pagination
      queryBuilder.orderBy('media.createdAt', 'DESC');
      queryBuilder.skip((page - 1) * limit);
      queryBuilder.take(limit);

      const [data, total] = await queryBuilder.getManyAndCount();

      return { data, total };
    } catch (error) {
      this.logger.error('Error fetching media with filters', error.stack);
      throw error;
    }
  }

  /**
   * Find media by module
   */
  async findByModule(module: MediaModule): Promise<Media[]> {
    try {
      return await this.mediaRepository.find({
        where: { module, isActive: true },
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error(`Error fetching media by module ${module}`, error.stack);
      throw error;
    }
  }

  /**
   * Find media by category
   */
  async findByCategory(category: MediaCategory): Promise<Media[]> {
    try {
      return await this.mediaRepository.find({
        where: { category, isActive: true },
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error(`Error fetching media by category ${category}`, error.stack);
      throw error;
    }
  }

  /**
   * Get available modules with media count
   */
  async getModulesWithCount(): Promise<{ module: MediaModule; count: number }[]> {
    try {
      const result = await this.mediaRepository
        .createQueryBuilder('media')
        .select('media.module', 'module')
        .addSelect('COUNT(*)', 'count')
        .where('media.isActive = :isActive', { isActive: true })
        .groupBy('media.module')
        .getRawMany();

      return result.map((r) => ({ module: r.module, count: parseInt(r.count, 10) }));
    } catch (error) {
      this.logger.error('Error fetching modules with count', error.stack);
      throw error;
    }
  }

  /**
   * Get available categories with media count
   */
  async getCategoriesWithCount(): Promise<{ category: MediaCategory; count: number }[]> {
    try {
      const result = await this.mediaRepository
        .createQueryBuilder('media')
        .select('media.category', 'category')
        .addSelect('COUNT(*)', 'count')
        .where('media.isActive = :isActive', { isActive: true })
        .groupBy('media.category')
        .getRawMany();

      return result.map((r) => ({ category: r.category, count: parseInt(r.count, 10) }));
    } catch (error) {
      this.logger.error('Error fetching categories with count', error.stack);
      throw error;
    }
  }
}
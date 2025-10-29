import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketFieldLibrary } from '../entities/ticket-field-library.entity';
import { FormField } from '../entities/ticket-form-definition.entity';

export interface CreateFieldLibraryDto {
  name: string;
  fieldConfig: FormField;
  description?: string;
  isActive?: boolean;
  tags?: string[];
}

export interface UpdateFieldLibraryDto {
  name?: string;
  fieldConfig?: FormField;
  description?: string;
  isActive?: boolean;
  tags?: string[];
}

export interface FieldLibraryFilters {
  search?: string;
  isActive?: boolean;
  tags?: string[];
  page?: number;
  limit?: number;
}

@Injectable()
export class TicketFieldLibraryService {
  constructor(
    @InjectRepository(TicketFieldLibrary)
    private readonly fieldLibraryRepository: Repository<TicketFieldLibrary>,
  ) {}

  /**
   * Get all field library entries with optional filters
   */
  async findAll(filters: FieldLibraryFilters = {}) {
    const {
      search,
      isActive,
      tags,
      page = 1,
      limit = 50,
    } = filters;

    const query = this.fieldLibraryRepository
      .createQueryBuilder('field')
      .leftJoinAndSelect('field.creator', 'creator')
      .leftJoinAndSelect('field.updater', 'updater');

    // Search filter
    if (search) {
      query.andWhere(
        '(field.name ILIKE :search OR field.description ILIKE :search OR field.fieldConfig::text ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Active filter
    if (isActive !== undefined) {
      query.andWhere('field.isActive = :isActive', { isActive });
    }

    // Tags filter
    if (tags && tags.length > 0) {
      query.andWhere('field.tags && :tags', { tags });
    }

    // Order by name
    query.orderBy('field.name', 'ASC');

    // Pagination
    const skip = (page - 1) * limit;
    query.skip(skip).take(limit);

    const [items, total] = await query.getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get a single field library entry by ID
   */
  async findOne(id: string): Promise<TicketFieldLibrary> {
    const field = await this.fieldLibraryRepository.findOne({
      where: { id },
      relations: ['creator', 'updater'],
    });

    if (!field) {
      throw new NotFoundException(`Field library entry with ID ${id} not found`);
    }

    return field;
  }

  /**
   * Create a new field library entry
   */
  async create(
    createDto: CreateFieldLibraryDto,
    userId?: string,
  ): Promise<TicketFieldLibrary> {
    // Validate field config
    this.validateFieldConfig(createDto.fieldConfig);

    // Check if name already exists
    const existingField = await this.fieldLibraryRepository.findOne({
      where: { name: createDto.name },
    });

    if (existingField) {
      throw new BadRequestException(
        `Field library entry with name "${createDto.name}" already exists`,
      );
    }

    const field = this.fieldLibraryRepository.create({
      ...createDto,
      createdBy: userId,
      updatedBy: userId,
    });

    return await this.fieldLibraryRepository.save(field);
  }

  /**
   * Update an existing field library entry
   */
  async update(
    id: string,
    updateDto: UpdateFieldLibraryDto,
    userId?: string,
  ): Promise<TicketFieldLibrary> {
    const field = await this.findOne(id);

    // System fields cannot be deleted or have their name changed
    if (field.isSystemField) {
      if (updateDto.name && updateDto.name !== field.name) {
        throw new BadRequestException('Cannot change name of system field');
      }
    }

    // Validate field config if provided
    if (updateDto.fieldConfig) {
      this.validateFieldConfig(updateDto.fieldConfig);
    }

    // Check name uniqueness if changing name
    if (updateDto.name && updateDto.name !== field.name) {
      const existingField = await this.fieldLibraryRepository.findOne({
        where: { name: updateDto.name },
      });

      if (existingField) {
        throw new BadRequestException(
          `Field library entry with name "${updateDto.name}" already exists`,
        );
      }
    }

    Object.assign(field, updateDto);
    field.updatedBy = userId;

    return await this.fieldLibraryRepository.save(field);
  }

  /**
   * Delete a field library entry
   */
  async remove(id: string): Promise<void> {
    const field = await this.findOne(id);

    // System fields cannot be deleted
    if (field.isSystemField) {
      throw new BadRequestException('Cannot delete system field');
    }

    await this.fieldLibraryRepository.remove(field);
  }

  /**
   * Toggle active status
   */
  async toggleActive(id: string, isActive: boolean): Promise<TicketFieldLibrary> {
    const field = await this.findOne(id);
    field.isActive = isActive;
    return await this.fieldLibraryRepository.save(field);
  }

  /**
   * Get all unique tags
   */
  async getAllTags(): Promise<string[]> {
    const result = await this.fieldLibraryRepository
      .createQueryBuilder('field')
      .select('DISTINCT UNNEST(field.tags)', 'tag')
      .getRawMany();

    return result.map(row => row.tag).filter(Boolean);
  }

  /**
   * Validate field configuration
   */
  private validateFieldConfig(fieldConfig: FormField): void {
    if (!fieldConfig.id || !fieldConfig.name || !fieldConfig.label || !fieldConfig.type) {
      throw new BadRequestException('Field config must have id, name, label, and type');
    }

    // Validate field type
    const validTypes = [
      'text', 'textarea', 'number', 'email', 'url', 'date', 'datetime', 'time',
      'select', 'multiselect', 'radio', 'checkbox', 'file', 'file-multiple',
      'file-single', 'richtext', 'html', 'edd-order', 'edd-product',
    ];

    if (!validTypes.includes(fieldConfig.type)) {
      throw new BadRequestException(`Invalid field type: ${fieldConfig.type}`);
    }

    // Validate options for select/radio/checkbox fields
    const needsOptions = ['select', 'multiselect', 'radio', 'checkbox'];
    if (needsOptions.includes(fieldConfig.type)) {
      if (!fieldConfig.options || fieldConfig.options.length === 0) {
        throw new BadRequestException(
          `Field type "${fieldConfig.type}" requires options`,
        );
      }
    }
  }
}

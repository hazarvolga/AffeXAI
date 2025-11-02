import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormDefinition } from '../../form-builder/entities/form-definition.entity';
import { FormVersion } from '../../form-builder/entities/form-version.entity';
import {
  CreateTicketFormDto,
  UpdateTicketFormDto,
  GetFormDefinitionsDto,
  GetFormVersionsDto,
} from '../dto/ticket-form.dto';

@Injectable()
export class TicketFormService {
  constructor(
    @InjectRepository(FormDefinition)
    private readonly formDefinitionRepository: Repository<FormDefinition>,
    @InjectRepository(FormVersion)
    private readonly formVersionRepository: Repository<FormVersion>,
  ) {}

  /**
   * Get all form definitions with pagination and filtering
   */
  async findAll(query: GetFormDefinitionsDto) {
    const { page = 1, limit = 10, isActive } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.formDefinitionRepository
      .createQueryBuilder('form')
      .leftJoinAndSelect('form.creator', 'user')
      .select([
        'form.id',
        'form.name',
        'form.description',
        'form.version',
        'form.schema',
        'form.module',
        'form.formType',
        'form.isActive',
        'form.isDefault',
        'form.allowPublicSubmissions',
        'form.settings',
        'form.createdAt',
        'form.updatedAt',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
      ]);

    if (isActive !== undefined) {
      queryBuilder.andWhere('form.isActive = :isActive', { isActive });
    }

    const [items, total] = await queryBuilder
      .orderBy('form.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    // Add field count to each item
    const itemsWithCount = items.map((item) => ({
      ...item,
      fieldCount: item.schema?.fields?.length || 0,
    }));

    return {
      items: itemsWithCount,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get a single form definition by ID
   */
  async findOne(id: string) {
    const formDefinition = await this.formDefinitionRepository.findOne({
      where: { id },
      relations: ['creator', 'versions'],
    });

    if (!formDefinition) {
      throw new NotFoundException(`Form definition with ID ${id} not found`);
    }

    return formDefinition;
  }

  /**
   * Get the default form definition
   */
  async findDefault() {
    const defaultForm = await this.formDefinitionRepository.findOne({
      where: { isDefault: true, isActive: true },
    });

    if (!defaultForm) {
      throw new NotFoundException('No default form definition found');
    }

    return defaultForm;
  }

  /**
   * Create a new form definition
   */
  async create(createDto: CreateTicketFormDto, userId?: string) {
    // Validate schema
    this.validateFormSchema(createDto.schema);

    // If setting as default, unset other defaults
    if (createDto.isDefault) {
      await this.unsetAllDefaults();
    }

    // Create form definition
    const formDefinition = this.formDefinitionRepository.create({
      ...createDto,
      version: createDto.schema.version || 1,
      createdBy: userId,
    });

    const savedForm = await this.formDefinitionRepository.save(formDefinition);

    // Create initial version
    await this.createVersion(savedForm.id, savedForm.schema, 'Initial version', userId);

    return savedForm;
  }

  /**
   * Update an existing form definition
   */
  async update(id: string, updateDto: UpdateTicketFormDto, userId?: string) {
    const formDefinition = await this.findOne(id);

    // If schema is being updated, validate it
    if (updateDto.schema) {
      this.validateFormSchema(updateDto.schema);
    }

    // If setting as default, unset other defaults
    if (updateDto.isDefault && !formDefinition.isDefault) {
      await this.unsetAllDefaults();
    }

    // Check if schema changed
    const schemaChanged = updateDto.schema && JSON.stringify(updateDto.schema) !== JSON.stringify(formDefinition.schema);

    // Update form definition
    Object.assign(formDefinition, updateDto);

    // If schema changed, increment version and create new version record
    if (schemaChanged) {
      formDefinition.version += 1;
      formDefinition.schema.version = formDefinition.version;

      await this.createVersion(
        formDefinition.id,
        formDefinition.schema,
        updateDto.changeLog || 'Schema updated',
        userId,
      );
    }

    return await this.formDefinitionRepository.save(formDefinition);
  }

  /**
   * Delete a form definition
   */
  async remove(id: string) {
    const formDefinition = await this.findOne(id);

    // Prevent deleting the default form if it's the only active form
    if (formDefinition.isDefault) {
      const activeFormsCount = await this.formDefinitionRepository.count({
        where: { isActive: true },
      });

      if (activeFormsCount === 1) {
        throw new BadRequestException('Cannot delete the only active default form');
      }
    }

    await this.formDefinitionRepository.remove(formDefinition);

    return { success: true, message: 'Form definition deleted successfully' };
  }

  /**
   * Set a form as default
   */
  async setAsDefault(id: string) {
    const formDefinition = await this.findOne(id);

    if (formDefinition.isDefault) {
      return { success: true, message: 'Form is already set as default' };
    }

    // Unset all other defaults
    await this.unsetAllDefaults();

    // Set this form as default
    formDefinition.isDefault = true;
    await this.formDefinitionRepository.save(formDefinition);

    return { success: true, message: 'Form set as default successfully' };
  }

  /**
   * Toggle form active status
   */
  async toggleActive(id: string, isActive: boolean) {
    const formDefinition = await this.findOne(id);

    // Prevent deactivating the default form if it's the only active form
    if (!isActive && formDefinition.isDefault) {
      const activeFormsCount = await this.formDefinitionRepository.count({
        where: { isActive: true },
      });

      if (activeFormsCount === 1) {
        throw new BadRequestException('Cannot deactivate the only active default form');
      }
    }

    formDefinition.isActive = isActive;
    return await this.formDefinitionRepository.save(formDefinition);
  }

  /**
   * Get version history for a form definition
   */
  async getVersions(formDefinitionId: string, query: GetFormVersionsDto) {
    const { page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const [versions, total] = await this.formVersionRepository.findAndCount({
      where: { formDefinitionId },
      relations: ['creator'],
      order: { version: 'DESC' },
      skip,
      take: limit,
    });

    return {
      versions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get a specific version
   */
  async getVersion(formDefinitionId: string, version: number) {
    const formVersion = await this.formVersionRepository.findOne({
      where: { formDefinitionId, version },
      relations: ['creator'],
    });

    if (!formVersion) {
      throw new NotFoundException(`Version ${version} not found for form ${formDefinitionId}`);
    }

    return formVersion;
  }

  /**
   * Revert form to a previous version
   */
  async revertToVersion(formDefinitionId: string, targetVersion: number, changeLog?: string, userId?: string) {
    const formDefinition = await this.findOne(formDefinitionId);
    const previousVersion = await this.getVersion(formDefinitionId, targetVersion);

    // Update form with previous version's schema
    formDefinition.schema = previousVersion.schema;
    formDefinition.version += 1;
    formDefinition.schema.version = formDefinition.version;

    await this.formDefinitionRepository.save(formDefinition);

    // Create new version record
    await this.createVersion(
      formDefinitionId,
      formDefinition.schema,
      changeLog || `Reverted to version ${targetVersion}`,
      userId,
    );

    return formDefinition;
  }

  /**
   * Create a new version record
   */
  private async createVersion(formDefinitionId: string, schema: any, changeLog: string, userId?: string) {
    // Get current version number
    const maxVersion = await this.formVersionRepository
      .createQueryBuilder('version')
      .where('version.formDefinitionId = :formDefinitionId', { formDefinitionId })
      .select('MAX(version.version)', 'max')
      .getRawOne();

    const versionNumber = (maxVersion?.max || 0) + 1;

    const version = this.formVersionRepository.create({
      formDefinitionId,
      version: versionNumber,
      schema,
      changeLog,
      createdBy: userId,
    });

    await this.formVersionRepository.save(version);
  }

  /**
   * Unset all default forms
   */
  private async unsetAllDefaults() {
    await this.formDefinitionRepository
      .createQueryBuilder()
      .update(FormDefinition)
      .set({ isDefault: false })
      .where('isDefault = :isDefault', { isDefault: true })
      .execute();
  }

  /**
   * Validate form schema structure
   */
  private validateFormSchema(schema: any) {
    if (!schema) {
      throw new BadRequestException('Form schema is required');
    }

    if (!schema.formId) {
      throw new BadRequestException('Form schema must have a formId');
    }

    if (!schema.formName) {
      throw new BadRequestException('Form schema must have a formName');
    }

    if (!schema.version || schema.version < 1) {
      throw new BadRequestException('Form schema version must be a positive number');
    }

    if (!Array.isArray(schema.fields) || schema.fields.length === 0) {
      throw new BadRequestException('Form schema must have at least one field');
    }

    // Validate field uniqueness and required properties
    const fieldIds = new Set();
    const fieldNames = new Set();

    schema.fields.forEach((field: any, index: number) => {
      if (!field.id) {
        throw new BadRequestException(`Field at index ${index}: id is required`);
      }

      if (fieldIds.has(field.id)) {
        throw new BadRequestException(`Duplicate field id: ${field.id}`);
      }
      fieldIds.add(field.id);

      if (!field.name) {
        throw new BadRequestException(`Field at index ${index}: name is required`);
      }

      if (fieldNames.has(field.name)) {
        throw new BadRequestException(`Duplicate field name: ${field.name}`);
      }
      fieldNames.add(field.name);

      if (!field.label) {
        throw new BadRequestException(`Field ${field.name}: label is required`);
      }

      if (!field.type) {
        throw new BadRequestException(`Field ${field.name}: type is required`);
      }

      if (field.required === undefined || field.required === null) {
        throw new BadRequestException(`Field ${field.name}: required flag must be specified`);
      }

      if (!field.metadata || typeof field.metadata.order !== 'number') {
        throw new BadRequestException(`Field ${field.name}: metadata with order is required`);
      }

      // Validate select/multiselect/radio fields have options or dataSource
      if (['select', 'multiselect', 'radio'].includes(field.type)) {
        if (!field.options && !field.dataSource) {
          throw new BadRequestException(
            `Field ${field.name}: ${field.type} field must have options or dataSource`,
          );
        }
      }
    });
  }
}

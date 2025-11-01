import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormSubmission } from '../entities/form-submission.entity';
import { FormDefinition } from '../entities/form-definition.entity';

export interface CreateFormSubmissionDto {
  formId: string;
  submittedData: any;
  sourceModule: string;
  sourceRecordId?: string;
  submittedBy?: string;
  submitterIp?: string;
  submitterUserAgent?: string;
}

export interface UpdateFormSubmissionDto {
  status?: 'pending' | 'processed' | 'failed' | 'archived';
  processedAt?: Date;
  processedBy?: string;
  processingNotes?: string;
}

export interface FormSubmissionFilters {
  formId?: string;
  sourceModule?: string;
  sourceRecordId?: string;
  status?: string;
  submittedBy?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

@Injectable()
export class FormSubmissionService {
  constructor(
    @InjectRepository(FormSubmission)
    private readonly submissionRepository: Repository<FormSubmission>,
    @InjectRepository(FormDefinition)
    private readonly formDefinitionRepository: Repository<FormDefinition>,
  ) {}

  /**
   * Create a new form submission
   */
  async create(createDto: CreateFormSubmissionDto): Promise<FormSubmission> {
    // Verify form exists
    const form = await this.formDefinitionRepository.findOne({
      where: { id: createDto.formId },
    });

    if (!form) {
      throw new NotFoundException(`Form with ID ${createDto.formId} not found`);
    }

    // Create submission
    const submission = this.submissionRepository.create({
      formId: createDto.formId,
      submittedData: createDto.submittedData,
      sourceModule: createDto.sourceModule,
      sourceRecordId: createDto.sourceRecordId,
      submittedBy: createDto.submittedBy,
      submitterIp: createDto.submitterIp,
      submitterUserAgent: createDto.submitterUserAgent,
      status: 'pending',
      submittedAt: new Date(),
    });

    return await this.submissionRepository.save(submission);
  }

  /**
   * Find all submissions with filters and pagination
   */
  async findAll(filters: FormSubmissionFilters) {
    const {
      formId,
      sourceModule,
      sourceRecordId,
      status,
      submittedBy,
      startDate,
      endDate,
      page = 1,
      limit = 20,
    } = filters;

    const skip = (page - 1) * limit;

    const queryBuilder = this.submissionRepository
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.form', 'form')
      .leftJoinAndSelect('submission.submitter', 'user');

    // Apply filters
    if (formId) {
      queryBuilder.andWhere('submission.formId = :formId', { formId });
    }

    if (sourceModule) {
      queryBuilder.andWhere('submission.sourceModule = :sourceModule', {
        sourceModule,
      });
    }

    if (sourceRecordId) {
      queryBuilder.andWhere('submission.sourceRecordId = :sourceRecordId', {
        sourceRecordId,
      });
    }

    if (status) {
      queryBuilder.andWhere('submission.status = :status', { status });
    }

    if (submittedBy) {
      queryBuilder.andWhere('submission.submittedBy = :submittedBy', {
        submittedBy,
      });
    }

    if (startDate) {
      queryBuilder.andWhere('submission.submittedAt >= :startDate', {
        startDate,
      });
    }

    if (endDate) {
      queryBuilder.andWhere('submission.submittedAt <= :endDate', { endDate });
    }

    const [items, total] = await queryBuilder
      .orderBy('submission.submittedAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Find a single submission by ID
   */
  async findOne(id: string): Promise<FormSubmission> {
    const submission = await this.submissionRepository.findOne({
      where: { id },
      relations: ['form', 'submitter', 'processor'],
    });

    if (!submission) {
      throw new NotFoundException(`Submission with ID ${id} not found`);
    }

    return submission;
  }

  /**
   * Update a submission
   */
  async update(
    id: string,
    updateDto: UpdateFormSubmissionDto,
  ): Promise<FormSubmission> {
    const submission = await this.findOne(id);

    Object.assign(submission, updateDto);

    return await this.submissionRepository.save(submission);
  }

  /**
   * Mark submission as processed
   */
  async markAsProcessed(
    id: string,
    processedBy: string,
    processingNotes?: string,
  ): Promise<FormSubmission> {
    return await this.update(id, {
      status: 'processed',
      processedAt: new Date(),
      processedBy,
      processingNotes,
    });
  }

  /**
   * Mark submission as failed
   */
  async markAsFailed(
    id: string,
    processingNotes: string,
  ): Promise<FormSubmission> {
    return await this.update(id, {
      status: 'failed',
      processedAt: new Date(),
      processingNotes,
    });
  }

  /**
   * Archive a submission
   */
  async archive(id: string): Promise<FormSubmission> {
    return await this.update(id, {
      status: 'archived',
    });
  }

  /**
   * Delete a submission
   */
  async delete(id: string): Promise<void> {
    const submission = await this.findOne(id);
    await this.submissionRepository.remove(submission);
  }

  /**
   * Get submissions for a specific form
   */
  async getFormSubmissions(
    formId: string,
    page = 1,
    limit = 20,
  ): Promise<any> {
    return await this.findAll({ formId, page, limit });
  }

  /**
   * Get submissions for a specific source record
   */
  async getSourceRecordSubmissions(
    sourceModule: string,
    sourceRecordId: string,
  ): Promise<FormSubmission[]> {
    return await this.submissionRepository.find({
      where: { sourceModule, sourceRecordId },
      relations: ['form'],
      order: { submittedAt: 'DESC' },
    });
  }

  /**
   * Get submission statistics
   */
  async getStats(formId?: string) {
    const queryBuilder = this.submissionRepository.createQueryBuilder(
      'submission',
    );

    if (formId) {
      queryBuilder.where('submission.formId = :formId', { formId });
    }

    const [total, pending, processed, failed, archived] = await Promise.all([
      queryBuilder.getCount(),
      queryBuilder
        .clone()
        .andWhere('submission.status = :status', { status: 'pending' })
        .getCount(),
      queryBuilder
        .clone()
        .andWhere('submission.status = :status', { status: 'processed' })
        .getCount(),
      queryBuilder
        .clone()
        .andWhere('submission.status = :status', { status: 'failed' })
        .getCount(),
      queryBuilder
        .clone()
        .andWhere('submission.status = :status', { status: 'archived' })
        .getCount(),
    ]);

    return {
      total,
      pending,
      processed,
      failed,
      archived,
    };
  }
}

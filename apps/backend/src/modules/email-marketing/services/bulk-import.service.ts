import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ImportJob, ImportJobStatus, ImportOptions, ValidationSummary } from '../entities/import-job.entity';
import { ImportResult, ImportResultStatus } from '../entities/import-result.entity';
import { FileProcessingService, CsvParseResult } from './file-processing.service';
import { FileUploadService, UploadResult } from './file-upload.service';
import { BulkOperationsComplianceService, BulkImportComplianceOptions } from './bulk-operations-compliance.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

export interface CreateImportJobDto {
  file: any; // Uploaded file
  options: ImportOptions & { gdprCompliance?: BulkImportComplianceOptions };
  userId?: string;
}

export interface ImportJobSummary {
  id: string;
  fileName: string;
  status: ImportJobStatus;
  totalRecords: number;
  processedRecords: number;
  validRecords: number;
  invalidRecords: number;
  riskyRecords: number;
  duplicateRecords: number;
  progressPercentage: number;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface ImportJobDetails extends ImportJobSummary {
  options: ImportOptions;
  columnMapping: Record<string, string>;
  validationSummary?: ValidationSummary;
  filePath: string;
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  existingSubscriberId?: string;
  duplicateType: 'exact' | 'email_only' | 'none';
}

@Injectable()
export class BulkImportService {
  private readonly logger = new Logger(BulkImportService.name);

  constructor(
    @InjectRepository(ImportJob)
    private readonly importJobRepository: Repository<ImportJob>,
    @InjectRepository(ImportResult)
    private readonly importResultRepository: Repository<ImportResult>,
    private readonly fileProcessingService: FileProcessingService,
    private readonly fileUploadService: FileUploadService,
    private readonly complianceService: BulkOperationsComplianceService,
    @InjectQueue('import') private readonly importQueue: Queue
  ) {}

  /**
   * Create a new import job from uploaded file
   */
  async createImportJob(createDto: CreateImportJobDto): Promise<ImportJobDetails> {
    this.logger.log(`Creating import job for file: ${createDto.file.originalname}`);

    try {
      // Step 1: Upload and validate file
      const uploadResult = await this.fileUploadService.uploadFile(createDto.file, {
        generateJobId: true,
        customPath: 'imports'
      });

      // Step 2: Parse CSV to get structure
      const parseResult = await this.fileProcessingService.parseCsvFile(uploadResult.filePath);
      
      if (parseResult.errors.length > 0) {
        this.logger.warn(`CSV parsing warnings for ${uploadResult.jobId}:`, parseResult.errors);
      }

      // Step 3: Validate column mapping
      const isValidMapping = await this.fileProcessingService.validateColumnMapping(createDto.options.columnMapping);
      if (!isValidMapping) {
        throw new BadRequestException('Invalid column mapping provided');
      }

      // Step 4: Create import job entity
      const importJob = this.importJobRepository.create({
        fileName: uploadResult.fileName,
        originalFileName: uploadResult.originalFileName,
        filePath: uploadResult.filePath,
        status: ImportJobStatus.PENDING,
        totalRecords: parseResult.totalRows,
        options: createDto.options,
        columnMapping: createDto.options.columnMapping,
        userId: createDto.userId,
        progressPercentage: 0
      });

      const savedJob = await this.importJobRepository.save(importJob);

      // Step 5: Validate GDPR compliance if required
      if (createDto.options.gdprCompliance) {
        const complianceValidation = await this.complianceService.validateBulkImportCompliance(
          parseResult.data,
          createDto.options.gdprCompliance
        );

        if (!complianceValidation.isCompliant) {
          savedJob.status = ImportJobStatus.FAILED;
          savedJob.error = `GDPR compliance validation failed: ${complianceValidation.issues.join(', ')}`;
          await this.importJobRepository.save(savedJob);
          
          throw new BadRequestException(`Import failed GDPR compliance validation: ${complianceValidation.issues.join(', ')}`);
        }

        this.logger.log(`GDPR compliance validation passed for job ${savedJob.id}`);
      }

      // Step 5: Queue the job for processing
      await this.importQueue.add('process-import', {
        jobId: savedJob.id,
        filePath: uploadResult.filePath,
        options: createDto.options
      }, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000
        }
      });

      this.logger.log(`Import job created successfully: ${savedJob.id}`);

      return this.mapToJobDetails(savedJob);

    } catch (error) {
      this.logger.error(`Failed to create import job: ${error.message}`, error);
      throw error;
    }
  }

  /**
   * Get import job by ID
   */
  async getImportJob(jobId: string): Promise<ImportJobDetails> {
    const job = await this.importJobRepository.findOne({ where: { id: jobId } });
    
    if (!job) {
      throw new NotFoundException(`Import job ${jobId} not found`);
    }

    return this.mapToJobDetails(job);
  }

  /**
   * Get import job summary (lighter version)
   */
  async getImportJobSummary(jobId: string): Promise<ImportJobSummary> {
    const job = await this.importJobRepository.findOne({ where: { id: jobId } });
    
    if (!job) {
      throw new NotFoundException(`Import job ${jobId} not found`);
    }

    return this.mapToJobSummary(job);
  }

  /**
   * List import jobs with pagination and filtering
   */
  async listImportJobs(options: {
    userId?: string;
    status?: ImportJobStatus;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    jobs: ImportJobSummary[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { userId, status, page = 1, limit = 20 } = options;
    
    const queryBuilder = this.importJobRepository.createQueryBuilder('job');
    
    if (userId) {
      queryBuilder.andWhere('job.userId = :userId', { userId });
    }
    
    if (status) {
      queryBuilder.andWhere('job.status = :status', { status });
    }

    queryBuilder
      .orderBy('job.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [jobs, total] = await queryBuilder.getManyAndCount();

    return {
      jobs: jobs.map(job => this.mapToJobSummary(job)),
      total,
      page,
      limit
    };
  }

  /**
   * Update import job status and progress
   */
  async updateJobProgress(
    jobId: string, 
    updates: {
      status?: ImportJobStatus;
      processedRecords?: number;
      validRecords?: number;
      invalidRecords?: number;
      riskyRecords?: number;
      duplicateRecords?: number;
      progressPercentage?: number;
      error?: string;
      validationSummary?: ValidationSummary;
    }
  ): Promise<void> {
    const updateData: any = { ...updates };
    
    if (updates.status === ImportJobStatus.COMPLETED || updates.status === ImportJobStatus.FAILED) {
      updateData.completedAt = new Date();
    }

    await this.importJobRepository.update(jobId, updateData);
    
    this.logger.log(`Updated job ${jobId} progress: ${updates.progressPercentage || 0}%`);
  }

  /**
   * Cancel import job
   */
  async cancelImportJob(jobId: string): Promise<void> {
    const job = await this.importJobRepository.findOne({ where: { id: jobId } });
    
    if (!job) {
      throw new NotFoundException(`Import job ${jobId} not found`);
    }

    if (job.status === ImportJobStatus.COMPLETED || job.status === ImportJobStatus.FAILED) {
      throw new BadRequestException(`Cannot cancel job in ${job.status} status`);
    }

    // Remove from queue if still pending
    if (job.status === ImportJobStatus.PENDING) {
      // Note: Queue job removal would be implemented here
      // await this.importQueue.removeJobs(jobId);
    }

    await this.importJobRepository.update(jobId, {
      status: ImportJobStatus.FAILED,
      error: 'Job cancelled by user',
      completedAt: new Date()
    });

    // Clean up uploaded file
    await this.fileProcessingService.cleanupTempFiles(jobId);

    this.logger.log(`Import job ${jobId} cancelled`);
  }

  /**
   * Get import results for a job with pagination
   */
  async getImportResults(
    jobId: string,
    options: {
      status?: ImportResultStatus;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<{
    results: ImportResult[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { status, page = 1, limit = 100 } = options;
    
    const queryBuilder = this.importResultRepository.createQueryBuilder('result')
      .where('result.importJobId = :jobId', { jobId });
    
    if (status) {
      queryBuilder.andWhere('result.status = :status', { status });
    }

    queryBuilder
      .orderBy('result.rowNumber', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    const [results, total] = await queryBuilder.getManyAndCount();

    return {
      results,
      total,
      page,
      limit
    };
  }

  /**
   * Check for duplicate subscribers
   */
  async checkDuplicates(
    emails: string[],
    duplicateHandling: 'skip' | 'update' | 'replace'
  ): Promise<Map<string, DuplicateCheckResult>> {
    const results = new Map<string, DuplicateCheckResult>();

    // This would integrate with SubscriberService to check existing subscribers
    // For now, we'll implement a basic check
    
    for (const email of emails) {
      // TODO: Implement actual duplicate checking with SubscriberService
      results.set(email, {
        isDuplicate: false,
        duplicateType: 'none'
      });
    }

    return results;
  }

  /**
   * Validate CSV structure and suggest column mappings
   */
  async validateCsvStructure(filePath: string): Promise<{
    isValid: boolean;
    headers: string[];
    sampleData: any[];
    suggestions: any[];
    errors: string[];
  }> {
    try {
      const parseResult = await this.fileProcessingService.parseCsvFile(filePath);
      const columnDetection = await this.fileProcessingService.detectColumns(parseResult.data);

      return {
        isValid: parseResult.errors.length === 0,
        headers: parseResult.headers,
        sampleData: parseResult.data.slice(0, 5), // First 5 rows as sample
        suggestions: columnDetection.suggestions,
        errors: parseResult.errors.map(e => e.message)
      };
    } catch (error) {
      this.logger.error(`CSV structure validation failed: ${error.message}`);
      return {
        isValid: false,
        headers: [],
        sampleData: [],
        suggestions: [],
        errors: [error.message]
      };
    }
  }

  /**
   * Get import statistics for dashboard
   */
  async getImportStatistics(userId?: string): Promise<{
    totalJobs: number;
    completedJobs: number;
    failedJobs: number;
    totalRecordsProcessed: number;
    totalValidRecords: number;
    averageSuccessRate: number;
  }> {
    const queryBuilder = this.importJobRepository.createQueryBuilder('job');
    
    if (userId) {
      queryBuilder.where('job.userId = :userId', { userId });
    }

    const jobs = await queryBuilder.getMany();

    const totalJobs = jobs.length;
    const completedJobs = jobs.filter(j => j.status === ImportJobStatus.COMPLETED).length;
    const failedJobs = jobs.filter(j => j.status === ImportJobStatus.FAILED).length;
    const totalRecordsProcessed = jobs.reduce((sum, j) => sum + j.processedRecords, 0);
    const totalValidRecords = jobs.reduce((sum, j) => sum + j.validRecords, 0);
    const averageSuccessRate = totalRecordsProcessed > 0 ? (totalValidRecords / totalRecordsProcessed) * 100 : 0;

    return {
      totalJobs,
      completedJobs,
      failedJobs,
      totalRecordsProcessed,
      totalValidRecords,
      averageSuccessRate
    };
  }

  /**
   * Clean up old import jobs and files
   */
  async cleanupOldJobs(olderThanDays: number = 30): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    const oldJobs = await this.importJobRepository.find({
      where: {
        createdAt: { $lt: cutoffDate } as any
      }
    });

    let cleanedCount = 0;

    for (const job of oldJobs) {
      try {
        // Clean up files
        await this.fileProcessingService.cleanupTempFiles(job.id);
        
        // Delete job and related results (cascade delete should handle results)
        await this.importJobRepository.remove(job);
        
        cleanedCount++;
      } catch (error) {
        this.logger.warn(`Failed to cleanup job ${job.id}: ${error.message}`);
      }
    }

    this.logger.log(`Cleaned up ${cleanedCount} old import jobs`);
    return cleanedCount;
  }

  /**
   * Map ImportJob entity to JobDetails DTO
   */
  private mapToJobDetails(job: ImportJob): ImportJobDetails {
    return {
      id: job.id,
      fileName: job.fileName,
      status: job.status,
      totalRecords: job.totalRecords,
      processedRecords: job.processedRecords,
      validRecords: job.validRecords,
      invalidRecords: job.invalidRecords,
      riskyRecords: job.riskyRecords,
      duplicateRecords: job.duplicateRecords,
      progressPercentage: job.progressPercentage,
      createdAt: job.createdAt,
      completedAt: job.completedAt,
      error: job.error,
      options: job.options,
      columnMapping: job.columnMapping,
      validationSummary: job.validationSummary,
      filePath: job.filePath
    };
  }

  /**
   * Map ImportJob entity to JobSummary DTO
   */
  private mapToJobSummary(job: ImportJob): ImportJobSummary {
    return {
      id: job.id,
      fileName: job.fileName,
      status: job.status,
      totalRecords: job.totalRecords,
      processedRecords: job.processedRecords,
      validRecords: job.validRecords,
      invalidRecords: job.invalidRecords,
      riskyRecords: job.riskyRecords,
      duplicateRecords: job.duplicateRecords,
      progressPercentage: job.progressPercentage,
      createdAt: job.createdAt,
      completedAt: job.completedAt,
      error: job.error
    };
  }

  /**
   * Process import with GDPR compliance
   */
  async processImportWithGdprCompliance(
    jobId: string,
    subscriberData: any[],
    complianceOptions: BulkImportComplianceOptions
  ): Promise<void> {
    try {
      this.logger.log(`Processing import with GDPR compliance for job ${jobId}`);

      // Process with compliance service
      const complianceReport = await this.complianceService.processBulkImportWithCompliance(
        subscriberData,
        complianceOptions,
        jobId
      );

      // Update job with compliance results
      await this.updateJobProgress(jobId, {
        status: complianceReport.compliantRecords > 0 ? ImportJobStatus.COMPLETED : ImportJobStatus.FAILED,
        processedRecords: complianceReport.totalRecords,
        validRecords: complianceReport.compliantRecords,
        invalidRecords: complianceReport.nonCompliantRecords,
        progressPercentage: 100,
        error: complianceReport.issues.length > 0 ? complianceReport.issues.join('; ') : undefined,
        validationSummary: {
          gdprCompliant: complianceReport.compliantRecords,
          gdprNonCompliant: complianceReport.nonCompliantRecords,
          consentTracked: complianceReport.consentTracked,
          gdprRegionAffected: complianceReport.gdprRegionAffected
        } as any
      });

      this.logger.log(`GDPR compliant import completed for job ${jobId}: ${complianceReport.compliantRecords}/${complianceReport.totalRecords} processed`);

    } catch (error) {
      this.logger.error(`GDPR compliant import failed for job ${jobId}:`, error);
      
      await this.updateJobProgress(jobId, {
        status: ImportJobStatus.FAILED,
        error: `GDPR compliance processing failed: ${error.message}`,
        progressPercentage: 100
      });

      throw error;
    }
  }
}
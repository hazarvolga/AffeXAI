import { Repository, SelectQueryBuilder } from 'typeorm';
import { ExportJob, ExportJobStatus } from '../entities/export-job.entity';
import { Subscriber } from '../entities/subscriber.entity';
import { Group } from '../entities/group.entity';
import { Segment } from '../entities/segment.entity';
import { ExportFilters, ExportOptions } from '../entities/export-job.entity';
import { BulkOperationsComplianceService, BulkExportComplianceOptions } from './bulk-operations-compliance.service';
import { Queue } from 'bullmq';
export interface ExportJobData {
    jobId: string;
    filters: ExportFilters;
    options: ExportOptions;
}
export declare class BulkExportService {
    private readonly exportJobRepository;
    private readonly subscriberRepository;
    private readonly groupRepository;
    private readonly segmentRepository;
    private readonly complianceService;
    private readonly exportQueue;
    private readonly logger;
    private readonly exportDir;
    constructor(exportJobRepository: Repository<ExportJob>, subscriberRepository: Repository<Subscriber>, groupRepository: Repository<Group>, segmentRepository: Repository<Segment>, complianceService: BulkOperationsComplianceService, exportQueue: Queue);
    private ensureExportDirectory;
    /**
     * Create a new export job
     */
    createExportJob(filters: ExportFilters, options: ExportOptions, userId?: string): Promise<ExportJob>;
    /**
     * Get export job status
     */
    getExportStatus(jobId: string): Promise<ExportJob>;
    /**
     * Build subscriber query with filters
     */
    buildSubscriberQuery(filters: ExportFilters): Promise<SelectQueryBuilder<Subscriber>>;
    /**
     * Format subscriber data for export
     */
    formatSubscriberData(subscribers: Subscriber[], options: ExportOptions): Promise<any[]>;
    /**
     * Generate CSV file
     */
    generateCsvFile(data: any[], filePath: string): Promise<void>;
    /**
     * Generate Excel file
     */
    generateExcelFile(data: any[], filePath: string): Promise<void>;
    /**
     * Update export job progress
     */
    updateExportProgress(jobId: string, processedRecords: number, totalRecords: number, status?: ExportJobStatus): Promise<void>;
    /**
     * Mark export job as failed
     */
    markExportAsFailed(jobId: string, error: string): Promise<void>;
    /**
     * Get file size and update job
     */
    updateFileSize(jobId: string, filePath: string): Promise<void>;
    /**
     * Validate export request
     */
    private validateExportRequest;
    /**
     * Get available export fields
     */
    getAvailableFields(): string[];
    /**
     * Clean up expired export files
     */
    cleanupExpiredExports(): Promise<void>;
    /**
     * List export jobs with pagination and filtering
     */
    listExportJobs(options?: {
        userId?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        jobs: ExportJob[];
        total: number;
        page: number;
        limit: number;
    }>;
    /**
     * Create export job with GDPR compliance
     */
    createExportJobWithGdprCompliance(filters: ExportFilters, options: ExportOptions & {
        gdprCompliance?: BulkExportComplianceOptions;
    }, userId?: string): Promise<ExportJob>;
    /**
     * Process export with GDPR compliance
     */
    processExportWithGdprCompliance(jobId: string, complianceOptions: BulkExportComplianceOptions): Promise<void>;
    /**
     * Cancel export job
     */
    cancelExportJob(jobId: string): Promise<void>;
    /**
     * Clean up old export jobs and files
     */
    cleanupOldJobs(olderThanDays?: number): Promise<number>;
}
//# sourceMappingURL=bulk-export.service.d.ts.map
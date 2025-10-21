import { BaseEntity } from '../../../database/entities/base.entity';
import { SubscriberStatus } from '@affexai/shared-types';
export declare enum ExportJobStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    COMPLETED = "completed",
    FAILED = "failed"
}
export interface ExportFilters {
    status?: SubscriberStatus[];
    groupIds?: string[];
    segmentIds?: string[];
    dateRange?: {
        start?: Date;
        end?: Date;
    };
    validationStatus?: string[];
}
export interface ExportOptions {
    fields: string[];
    format: 'csv' | 'xlsx';
    includeMetadata: boolean;
    batchSize: number;
}
export declare class ExportJob extends BaseEntity {
    fileName: string;
    filePath: string;
    status: ExportJobStatus;
    totalRecords: number;
    processedRecords: number;
    filters: ExportFilters;
    options: ExportOptions;
    error: string;
    completedAt: Date;
    expiresAt: Date;
    userId: string;
    progressPercentage: number;
    fileSizeBytes: number;
}
//# sourceMappingURL=export-job.entity.d.ts.map
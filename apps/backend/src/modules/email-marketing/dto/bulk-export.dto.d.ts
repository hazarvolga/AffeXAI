import { SubscriberStatus } from '@affexai/shared-types';
export declare class DateRangeDto {
    start?: string;
    end?: string;
}
export declare class CreateExportJobDto {
    status?: SubscriberStatus[];
    groupIds?: string[];
    segmentIds?: string[];
    dateRange?: DateRangeDto;
    validationStatus?: string[];
    fields: string[];
    format: 'csv' | 'xlsx';
    includeMetadata?: boolean;
    batchSize?: number;
}
export declare class ExportJobResponseDto {
    id: string;
    fileName: string;
    status: string;
    totalRecords: number;
    processedRecords: number;
    progressPercentage: number;
    fileSizeBytes: number | null;
    filters: any;
    options: any;
    error: string | null;
    completedAt: Date | null;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ExportJobListDto {
    page?: number;
    limit?: number;
    status?: string;
    userId?: string;
}
export declare class AvailableFieldsResponseDto {
    fields: string[];
    descriptions: Record<string, string>;
}
export declare class ExportStatsDto {
    totalSubscribers: number;
    estimatedFileSizeBytes: number;
    estimatedProcessingTimeSeconds: number;
}
export declare class ExportJobSummaryDto {
    id: string;
    fileName: string;
    status: string;
    totalRecords: number;
    processedRecords: number;
    progressPercentage: number;
    createdAt: Date;
    completedAt?: Date;
    error?: string;
}
export declare class ExportJobDetailsDto extends ExportJobSummaryDto {
    filters: any;
    options: any;
    filePath: string;
    userId?: string;
}
export declare class ExportJobQueryDto {
    status?: SubscriberStatus[];
    userId?: string;
    startDate?: string;
    endDate?: string;
    dateRange?: DateRangeDto;
}
export declare class ExportStatisticsDto {
    totalSubscribers: number;
    totalExports: number;
    activeExports: number;
    completedExports: number;
    failedExports: number;
    totalRecordsExported: number;
    estimatedFileSizeBytes: number;
    estimatedProcessingTimeSeconds: number;
}
export declare class ExportResultListDto {
    results: any[];
    total: number;
    page: number;
    limit: number;
}
//# sourceMappingURL=bulk-export.dto.d.ts.map
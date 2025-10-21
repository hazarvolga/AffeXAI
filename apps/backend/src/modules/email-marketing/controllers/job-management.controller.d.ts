import { User } from '../../users/entities/user.entity';
import { BulkImportService } from '../services/bulk-import.service';
import { BulkExportService } from '../services/bulk-export.service';
import { ExportCleanupService } from '../services/export-cleanup.service';
import { JobStatisticsDto, JobListResponseDto, JobCleanupResponseDto } from '../dto/job-management.dto';
export declare class JobManagementController {
    private readonly bulkImportService;
    private readonly bulkExportService;
    private readonly exportCleanupService;
    private readonly logger;
    constructor(bulkImportService: BulkImportService, bulkExportService: BulkExportService, exportCleanupService: ExportCleanupService);
    listAllJobs(type?: 'import' | 'export', status?: string, page?: number, limit?: number, user?: User): Promise<JobListResponseDto>;
    cancelJob(jobId: string): Promise<{
        success: boolean;
        message: string;
        jobType: string;
    }>;
    cleanupOldJobs(olderThanDays?: number): Promise<JobCleanupResponseDto>;
    getJobStatistics(userId?: string, user?: User): Promise<JobStatisticsDto>;
    getJobDetails(jobId: string): Promise<any>;
}
//# sourceMappingURL=job-management.controller.d.ts.map
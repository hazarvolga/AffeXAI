import type { Response } from 'express';
import { BulkExportService } from '../services/bulk-export.service';
import { CreateExportJobDto, ExportJobListDto, ExportJobSummaryDto, ExportJobDetailsDto, ExportStatisticsDto } from '../dto/bulk-export.dto';
export declare class BulkExportController {
    private readonly bulkExportService;
    private readonly logger;
    constructor(bulkExportService: BulkExportService);
    createExportJob(createExportDto: CreateExportJobDto): Promise<ExportJobSummaryDto>;
    getExportStatus(jobId: string): Promise<ExportJobSummaryDto>;
    listExportJobs(query: ExportJobListDto): Promise<{
        jobs: ExportJobSummaryDto[];
        total: number;
        page: number;
        limit: number;
    }>;
    downloadExportFile(jobId: string, res: Response): Promise<void>;
    getExportResults(jobId: string, query: ExportJobListDto): Promise<{
        results: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    getExportDetails(jobId: string): Promise<ExportJobDetailsDto>;
    deleteExportJob(jobId: string): Promise<void>;
    previewExport(createExportDto: CreateExportJobDto): Promise<ExportStatisticsDto>;
    uploadExportFile(file: Express.Multer.File): Promise<ExportJobSummaryDto>;
    /**
     * Map export job entity to summary DTO
     */
    private mapToSummaryDto;
    /**
     * Map export job entity to details DTO
     */
    private mapToDetailsDto;
}
//# sourceMappingURL=bulk-export.controller.d.ts.map
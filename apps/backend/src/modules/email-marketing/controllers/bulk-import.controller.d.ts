import { BulkImportService } from '../services/bulk-import.service';
import { ImportJobSummaryDto, ImportJobDetailsDto, ImportJobListDto, ImportResultListDto, CsvValidationDto, ImportStatisticsDto, ImportJobQueryDto, ImportResultQueryDto } from '../dto/bulk-import.dto';
export declare class BulkImportController {
    private readonly bulkImportService;
    private readonly logger;
    constructor(bulkImportService: BulkImportService);
    uploadAndCreateImportJob(file: any, body: any): Promise<ImportJobDetailsDto>;
    getImportJobStatus(jobId: string): Promise<ImportJobSummaryDto>;
    getImportResults(jobId: string, query: ImportResultQueryDto): Promise<ImportResultListDto>;
    getImportJobDetails(jobId: string): Promise<ImportJobDetailsDto>;
    validateCsvStructure(file: any): Promise<CsvValidationDto>;
    listImportJobs(query: ImportJobQueryDto): Promise<ImportJobListDto>;
    cancelImportJob(jobId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getImportStatistics(userId?: string): Promise<ImportStatisticsDto>;
}
//# sourceMappingURL=bulk-import.controller.d.ts.map
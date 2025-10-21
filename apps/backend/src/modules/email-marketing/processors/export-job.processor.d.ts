import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { BulkExportService, ExportJobData } from '../services/bulk-export.service';
import { Repository } from 'typeorm';
import { Subscriber } from '../entities/subscriber.entity';
export declare class ExportJobProcessor extends WorkerHost {
    private readonly bulkExportService;
    private readonly subscriberRepository;
    private readonly logger;
    constructor(bulkExportService: BulkExportService, subscriberRepository: Repository<Subscriber>);
    process(job: Job<ExportJobData>): Promise<void>;
    /**
     * Handle empty export results
     */
    private handleEmptyExport;
    /**
     * Generate export file based on format
     */
    private generateExportFile;
    /**
     * Handle job completion
     */
    onCompleted(job: Job<ExportJobData>): void;
    /**
     * Handle job failure
     */
    onFailed(job: Job<ExportJobData>, error: Error): void;
    /**
     * Handle job progress updates
     */
    onProgress(job: Job<ExportJobData>, progress: number): void;
    /**
     * Handle job stalling
     */
    onStalled(job: Job<ExportJobData>): void;
}
//# sourceMappingURL=export-job.processor.d.ts.map
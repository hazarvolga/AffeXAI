import { Queue } from 'bullmq';
export interface BatchProcessingOptions {
    batchSize: number;
    concurrency: number;
    delayBetweenBatches: number;
    retryAttempts: number;
    retryDelay: number;
}
export interface BatchJob<T> {
    id: string;
    data: T;
    priority?: number;
}
export declare class BatchProcessingService {
    private readonly importQueue;
    private readonly validationQueue;
    private readonly logger;
    constructor(importQueue: Queue, validationQueue: Queue);
    /**
     * Process items in batches with configurable options
     */
    processBatches<T>(items: T[], processor: (batch: T[], batchIndex: number) => Promise<void>, options?: Partial<BatchProcessingOptions>): Promise<void>;
    /**
     * Queue import job for processing
     */
    queueImportJob(jobData: {
        jobId: string;
        filePath: string;
        options: any;
    }, priority?: number): Promise<void>;
    /**
     * Queue validation job for processing
     */
    queueValidationJob(jobData: {
        jobId: string;
        resultIds: string[];
        options: any;
    }, priority?: number): Promise<void>;
    /**
     * Get queue statistics
     */
    getQueueStats(): Promise<{
        import: {
            waiting: number;
            active: number;
            completed: number;
            failed: number;
        };
        validation: {
            waiting: number;
            active: number;
            completed: number;
            failed: number;
        };
    }>;
    /**
     * Pause all queues
     */
    pauseQueues(): Promise<void>;
    /**
     * Resume all queues
     */
    resumeQueues(): Promise<void>;
    /**
     * Clean up completed and failed jobs
     */
    cleanupQueues(olderThanHours?: number): Promise<{
        importCleaned: number;
        validationCleaned: number;
    }>;
    /**
     * Cancel all jobs for a specific import
     */
    cancelImportJobs(jobId: string): Promise<void>;
    /**
     * Process batches with controlled concurrency
     */
    private processBatchesWithConcurrency;
    /**
     * Get statistics for a specific queue
     */
    private getQueueStatistics;
    /**
     * Clean up old jobs from a queue
     */
    private cleanupQueue;
}
//# sourceMappingURL=batch-processing.service.d.ts.map
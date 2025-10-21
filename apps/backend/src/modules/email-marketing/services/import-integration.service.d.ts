import { Repository } from 'typeorm';
import { SubscriberService } from '../subscriber.service';
import { GroupService } from '../group.service';
import { SegmentService } from '../segment.service';
import { AdvancedEmailValidationService } from './advanced-email-validation.service';
import { ImportResult } from '../entities/import-result.entity';
import { Subscriber } from '../entities/subscriber.entity';
export interface ImportIntegrationOptions {
    groupIds?: string[];
    segmentIds?: string[];
    duplicateHandling: 'skip' | 'update' | 'replace';
    validationThreshold: number;
    columnMapping: Record<string, string>;
}
export interface SubscriberImportResult {
    success: boolean;
    subscriberId?: string;
    action: 'created' | 'updated' | 'skipped' | 'failed';
    error?: string;
}
export interface BatchImportSummary {
    totalProcessed: number;
    created: number;
    updated: number;
    skipped: number;
    failed: number;
    errors: string[];
}
export declare class ImportIntegrationService {
    private readonly importResultRepository;
    private readonly subscriberRepository;
    private readonly subscriberService;
    private readonly groupService;
    private readonly segmentService;
    private readonly advancedEmailValidationService;
    private readonly logger;
    constructor(importResultRepository: Repository<ImportResult>, subscriberRepository: Repository<Subscriber>, subscriberService: SubscriberService, groupService: GroupService, segmentService: SegmentService, advancedEmailValidationService: AdvancedEmailValidationService);
    /**
     * Process validated import results and create/update subscribers
     */
    processImportResults(jobId: string, options: ImportIntegrationOptions): Promise<BatchImportSummary>;
    /**
     * Process a batch of import results
     */
    private processBatch;
    /**
     * Process a single subscriber from import result
     */
    private processSubscriber;
    /**
     * Handle existing subscriber based on duplicate handling strategy
     */
    private handleExistingSubscriber;
    /**
     * Update existing subscriber
     */
    private updateExistingSubscriber;
    /**
     * Create new subscriber
     */
    private createNewSubscriber;
    /**
     * Map CSV data to subscriber fields based on column mapping
     */
    private mapDataToSubscriber;
    /**
     * Determine subscriber status based on import result
     */
    private determineSubscriberStatus;
    /**
     * Get mailer check result from import validation
     */
    private getMailerCheckResult;
    /**
     * Validate groups and segments exist
     */
    validateGroupsAndSegments(groupIds?: string[], segmentIds?: string[]): Promise<{
        validGroups: string[];
        validSegments: string[];
        errors: string[];
    }>;
    /**
     * Get import integration statistics
     */
    getIntegrationStatistics(jobId: string): Promise<{
        totalResults: number;
        processedResults: number;
        createdSubscribers: number;
        updatedSubscribers: number;
        skippedResults: number;
        failedResults: number;
    }>;
}
//# sourceMappingURL=import-integration.service.d.ts.map
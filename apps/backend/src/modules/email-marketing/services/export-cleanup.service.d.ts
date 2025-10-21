import { BulkExportService } from './bulk-export.service';
export declare class ExportCleanupService {
    private readonly bulkExportService;
    private readonly logger;
    constructor(bulkExportService: BulkExportService);
    /**
     * Clean up expired export files daily at 2 AM
     */
    handleExpiredExportsCleanup(): Promise<void>;
    /**
     * Manual cleanup trigger (can be called via API or admin interface)
     */
    triggerManualCleanup(): Promise<{
        message: string;
        success: boolean;
    }>;
}
//# sourceMappingURL=export-cleanup.service.d.ts.map
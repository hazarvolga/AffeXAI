import { ExportJob } from '@/lib/api/bulkExportService';
interface UseExportProgressOptions {
    jobId: string | null;
    userId: string;
    enabled?: boolean;
    onComplete?: (job: ExportJob) => void;
    onError?: (error: string) => void;
    pollInterval?: number;
}
interface UseExportProgressReturn {
    job: ExportJob | null;
    isLoading: boolean;
    error: string | null;
    isPolling: boolean;
    refetch: () => Promise<void>;
    errorState: any;
    retryProgress: () => Promise<any>;
    clearError: () => void;
    canRetry: boolean;
}
export declare function useExportProgress({ jobId, userId, enabled, onComplete, onError, pollInterval }: UseExportProgressOptions): UseExportProgressReturn;
export {};
//# sourceMappingURL=useExportProgress.d.ts.map
import { ImportJob } from '@/lib/api/bulkImportService';
interface UseImportProgressOptions {
    jobId: string | null;
    userId: string;
    enabled?: boolean;
    interval?: number;
    onComplete?: (job: ImportJob) => void;
    onError?: (error: string) => void;
}
export declare function useImportProgress({ jobId, userId, enabled, interval, onComplete, onError }: UseImportProgressOptions): {
    job: any;
    isLoading: boolean;
    error: string | null;
    isPolling: boolean;
    startPolling: () => void;
    stopPolling: () => void;
    refetch: () => Promise<void>;
    errorState: import("./useBulkOperationErrors").ErrorState;
    retryProgress: () => Promise<any>;
    clearError: () => void;
    canRetry: boolean;
};
export {};
//# sourceMappingURL=useImportProgress.d.ts.map
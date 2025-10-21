import { ImportJob } from '@affexai/shared-types';
interface ImportProgressTrackerProps {
    jobId: string;
    onComplete?: (job: ImportJob) => void;
    onError?: (error: string) => void;
    autoRefresh?: boolean;
    refreshInterval?: number;
}
export declare function ImportProgressTracker({ jobId, onComplete, onError, autoRefresh, refreshInterval }: ImportProgressTrackerProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=import-progress-tracker.d.ts.map
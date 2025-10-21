import { ExportJob } from '@affexai/shared-types';
interface ExportProgressTrackerProps {
    job: ExportJob;
    onComplete?: (job: ExportJob) => void;
    onCancel?: () => void;
    onNewExport?: () => void;
}
export declare function ExportProgressTracker({ job, onComplete, onCancel, onNewExport }: ExportProgressTrackerProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=export-progress-tracker.d.ts.map
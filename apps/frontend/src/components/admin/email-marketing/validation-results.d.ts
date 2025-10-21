import { ImportJob } from '@affexai/shared-types';
interface ValidationResultsProps {
    job: ImportJob;
    onRetry?: () => void;
    onDownloadReport?: () => void;
}
export declare function ValidationResults({ job, onRetry, onDownloadReport }: ValidationResultsProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=validation-results.d.ts.map
import { ExportJob } from '@affexai/shared-types';
interface ExportConfigurationProps {
    onComplete?: (job: ExportJob) => void;
    onCancel?: () => void;
}
export declare function ExportConfiguration({ onComplete, onCancel }: ExportConfigurationProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=export-configuration.d.ts.map
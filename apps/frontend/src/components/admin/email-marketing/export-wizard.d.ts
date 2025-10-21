import type { ExportJob } from '@affexai/shared-types';
interface ExportWizardProps {
    onComplete?: (job: ExportJob) => void;
    onCancel?: () => void;
}
export declare function ExportWizard({ onComplete, onCancel }: ExportWizardProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=export-wizard.d.ts.map
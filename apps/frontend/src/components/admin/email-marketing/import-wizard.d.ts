import { ImportResult as ImportResultType } from '@affexai/shared-types';
interface ImportWizardProps {
    onComplete: (result: ImportResultType) => void;
    onCancel: () => void;
}
export declare function ImportWizard({ onComplete, onCancel }: ImportWizardProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=import-wizard.d.ts.map
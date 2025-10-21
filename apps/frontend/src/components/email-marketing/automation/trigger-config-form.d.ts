/**
 * Trigger Configuration Form
 * Form for configuring automation triggers
 */
import { TriggerType, type TriggerConfig } from '@/types/automation';
interface TriggerConfigFormProps {
    initialData?: {
        triggerType: TriggerType;
        config: TriggerConfig;
        segmentId?: string;
    };
    onUpdate?: (data: any) => void;
    onSubmit?: (data: {
        triggerType: TriggerType;
        config: TriggerConfig;
        segmentId?: string;
    }) => void;
    onCancel?: () => void;
}
export declare function TriggerConfigForm({ initialData, onUpdate, onSubmit, onCancel, }: TriggerConfigFormProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=trigger-config-form.d.ts.map
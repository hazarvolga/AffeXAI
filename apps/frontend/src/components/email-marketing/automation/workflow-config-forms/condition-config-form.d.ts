export type ConditionConfigData = {
    field?: string;
    operator?: string;
    value?: string;
    condition?: string;
    configured: boolean;
};
interface ConditionConfigFormProps {
    data: ConditionConfigData;
    onUpdate: (data: ConditionConfigData) => void;
    className?: string;
}
export declare function ConditionConfigForm({ data, onUpdate, className, }: ConditionConfigFormProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=condition-config-form.d.ts.map
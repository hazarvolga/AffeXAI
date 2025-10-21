export type DelayConfigData = {
    duration?: number;
    unit?: 'minutes' | 'hours' | 'days';
    configured: boolean;
};
interface DelayConfigFormProps {
    data: DelayConfigData;
    onUpdate: (data: DelayConfigData) => void;
    className?: string;
}
export declare function DelayConfigForm({ data, onUpdate, className, }: DelayConfigFormProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=delay-config-form.d.ts.map
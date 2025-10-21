export type SendEmailConfigData = {
    templateId?: string;
    subject?: string;
    fromName?: string;
    fromEmail?: string;
    configured: boolean;
};
interface SendEmailConfigFormProps {
    data: SendEmailConfigData;
    onUpdate: (data: SendEmailConfigData) => void;
    className?: string;
}
export declare function SendEmailConfigForm({ data, onUpdate, className, }: SendEmailConfigFormProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=send-email-config-form.d.ts.map
import * as React from "react";
export interface PasswordResetEmailProps {
    resetUrl: string;
    userEmail?: string;
    userName?: string;
    locale?: 'tr' | 'en';
}
export declare const PasswordResetEmailWithDesign: ({ resetUrl, userEmail, userName, locale, }: PasswordResetEmailProps) => Promise<React.JSX.Element>;
export default PasswordResetEmailWithDesign;
//# sourceMappingURL=password-reset-with-design.d.ts.map
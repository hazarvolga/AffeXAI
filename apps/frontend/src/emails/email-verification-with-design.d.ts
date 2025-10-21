import * as React from "react";
export interface EmailVerificationProps {
    verificationUrl: string;
    userEmail: string;
    userName?: string;
    verificationCode?: string;
    locale?: 'tr' | 'en';
}
export declare const EmailVerificationWithDesign: ({ verificationUrl, userEmail, userName, verificationCode, locale, }: EmailVerificationProps) => Promise<React.JSX.Element>;
export default EmailVerificationWithDesign;
//# sourceMappingURL=email-verification-with-design.d.ts.map
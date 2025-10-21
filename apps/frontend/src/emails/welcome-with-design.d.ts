import * as React from "react";
export interface WelcomeEmailProps {
    userName: string;
    userEmail: string;
    dashboardUrl?: string;
    unsubscribeToken?: string;
    locale?: 'tr' | 'en';
}
export declare const WelcomeEmailWithDesign: ({ userName, userEmail, dashboardUrl, unsubscribeToken, locale, }: WelcomeEmailProps) => Promise<React.JSX.Element>;
export default WelcomeEmailWithDesign;
//# sourceMappingURL=welcome-with-design.d.ts.map
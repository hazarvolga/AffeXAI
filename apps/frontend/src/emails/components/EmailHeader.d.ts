import * as React from "react";
interface EmailHeaderProps {
    companyName: string;
    logoUrl: string;
    baseUrl: string;
    showTagline?: boolean;
    tagline?: string;
    locale?: 'tr' | 'en';
}
export declare const EmailHeader: ({ companyName, logoUrl, baseUrl, showTagline, tagline, locale, }: EmailHeaderProps) => React.JSX.Element;
export {};
//# sourceMappingURL=EmailHeader.d.ts.map
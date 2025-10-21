import * as React from "react";
interface EmailFooterProps {
    companyName: string;
    contactInfo: {
        address: string;
        phone: string;
        email: string;
    };
    socialMediaLinks: {
        [key: string]: string;
    };
    showUnsubscribeLink?: boolean;
    unsubscribeToken?: string;
    baseUrl: string;
    locale?: 'tr' | 'en';
}
export declare const EmailFooter: ({ companyName, contactInfo, socialMediaLinks, showUnsubscribeLink, unsubscribeToken, baseUrl, locale, }: EmailFooterProps) => React.JSX.Element;
export {};
//# sourceMappingURL=EmailFooter.d.ts.map
import * as React from "react";
interface AccountSummaryEmailProps {
    userName?: string;
    month?: string;
    newTickets?: number;
    resolvedTickets?: number;
    newCertificates?: number;
    ctaLink?: string;
    siteSettings?: {
        companyName: string;
        logoUrl: string;
        contact: {
            address: string;
            phone: string;
            email: string;
        };
        socialMedia: {
            [key: string]: string;
        };
    };
}
export declare const AccountSummaryEmail: ({ userName, month, newTickets, resolvedTickets, newCertificates, ctaLink, siteSettings, }: AccountSummaryEmailProps) => React.JSX.Element;
export default AccountSummaryEmail;
//# sourceMappingURL=account-summary.d.ts.map
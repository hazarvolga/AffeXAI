import * as React from "react";
interface SubscriptionRenewalEmailProps {
    userName?: string;
    subscriptionName?: string;
    renewalDate?: string;
    renewalPrice?: string;
    manageLink?: string;
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
export declare const SubscriptionRenewalEmail: ({ userName, subscriptionName, renewalDate, renewalPrice, manageLink, siteSettings, }: SubscriptionRenewalEmailProps) => React.JSX.Element;
export default SubscriptionRenewalEmail;
//# sourceMappingURL=subscription-renewal.d.ts.map
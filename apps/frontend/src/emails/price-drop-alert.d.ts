import * as React from "react";
interface PriceDropAlertEmailProps {
    userName?: string;
    productName?: string;
    productImageUrl?: string;
    oldPrice?: string;
    newPrice?: string;
    productLink?: string;
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
export declare const PriceDropAlertEmail: ({ userName, productName, productImageUrl, oldPrice, newPrice, productLink, siteSettings, }: PriceDropAlertEmailProps) => React.JSX.Element;
export default PriceDropAlertEmail;
//# sourceMappingURL=price-drop-alert.d.ts.map
import * as React from "react";
interface BackInStockEmailProps {
    userName?: string;
    productName?: string;
    productImageUrl?: string;
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
export declare const BackInStockEmail: ({ userName, productName, productImageUrl, productLink, siteSettings, }: BackInStockEmailProps) => React.JSX.Element;
export default BackInStockEmail;
//# sourceMappingURL=back-in-stock.d.ts.map
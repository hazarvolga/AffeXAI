import * as React from "react";
interface AbandonedCartEmailProps {
    userName?: string;
    cartItems?: {
        name: string;
        imageUrl: string;
        price: string;
    }[];
    checkoutLink?: string;
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
export declare const AbandonedCartEmail: ({ userName, cartItems, checkoutLink, siteSettings, }: AbandonedCartEmailProps) => React.JSX.Element;
export default AbandonedCartEmail;
//# sourceMappingURL=abandoned-cart.d.ts.map
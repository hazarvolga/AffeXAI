import * as React from "react";
interface ProductLaunchEmailProps {
    productName?: string;
    productDescription?: string;
    productImageUrl?: string;
    ctaLink?: string;
    features?: {
        icon: string;
        title: string;
        description: string;
    }[];
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
export declare const ProductLaunchEmail: ({ productName, productDescription, productImageUrl, ctaLink, features, siteSettings, }: ProductLaunchEmailProps) => React.JSX.Element;
export default ProductLaunchEmail;
//# sourceMappingURL=product-launch.d.ts.map
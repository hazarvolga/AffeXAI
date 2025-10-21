interface FlashSaleEmailProps {
    userName?: string;
    saleTitle?: string;
    saleDescription?: string;
    discountPercentage?: number;
    countdown?: string;
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
export declare const FlashSaleEmail: ({ userName, saleTitle, saleDescription, discountPercentage, countdown, ctaLink, siteSettings, }: FlashSaleEmailProps) => JSX.Element;
export default FlashSaleEmail;
//# sourceMappingURL=flash-sale.d.ts.map
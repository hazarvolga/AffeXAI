interface ShippingUpdatesEmailProps {
    userName?: string;
    orderId?: string;
    trackingNumber?: string;
    trackingLink?: string;
    estimatedDeliveryDate?: string;
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
export declare const ShippingUpdatesEmail: ({ userName, orderId, trackingNumber, trackingLink, estimatedDeliveryDate, siteSettings, }: ShippingUpdatesEmailProps) => JSX.Element;
export default ShippingUpdatesEmail;
//# sourceMappingURL=shipping-updates.d.ts.map
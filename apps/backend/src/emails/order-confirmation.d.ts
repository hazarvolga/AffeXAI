interface OrderConfirmationEmailProps {
    userName?: string;
    orderId?: string;
    orderDate?: string;
    totalPrice?: string;
    shippingAddress?: {
        street: string;
        city: string;
        zipCode: string;
    };
    items?: {
        name: string;
        quantity: number;
        price: string;
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
export declare const OrderConfirmationEmail: ({ userName, orderId, orderDate, totalPrice, shippingAddress, items, siteSettings, }: OrderConfirmationEmailProps) => JSX.Element;
export default OrderConfirmationEmail;
//# sourceMappingURL=order-confirmation.d.ts.map
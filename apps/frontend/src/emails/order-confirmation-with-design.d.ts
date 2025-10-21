import * as React from "react";
export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
}
export interface OrderConfirmationEmailProps {
    orderId: string;
    orderDate: Date | string;
    customerName: string;
    customerEmail: string;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    shippingAddress: {
        street: string;
        city: string;
        state?: string;
        zipCode: string;
        country: string;
    };
    estimatedDelivery?: string;
    trackingUrl?: string;
    locale?: 'tr' | 'en';
}
export declare const OrderConfirmationWithDesign: ({ orderId, orderDate, customerName, customerEmail, items, subtotal, tax, shipping, total, shippingAddress, estimatedDelivery, trackingUrl, locale, }: OrderConfirmationEmailProps) => Promise<React.JSX.Element>;
export default OrderConfirmationWithDesign;
//# sourceMappingURL=order-confirmation-with-design.d.ts.map
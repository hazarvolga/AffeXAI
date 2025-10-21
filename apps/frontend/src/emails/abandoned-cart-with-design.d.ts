import * as React from "react";
export interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
    description?: string;
}
export interface AbandonedCartEmailProps {
    customerName: string;
    customerEmail: string;
    cartItems: CartItem[];
    cartTotal: number;
    cartUrl: string;
    discountCode?: string;
    discountAmount?: number;
    unsubscribeToken?: string;
    locale?: 'tr' | 'en';
}
export declare const AbandonedCartWithDesign: ({ customerName, customerEmail, cartItems, cartTotal, cartUrl, discountCode, discountAmount, unsubscribeToken, locale, }: AbandonedCartEmailProps) => Promise<React.JSX.Element>;
export default AbandonedCartWithDesign;
//# sourceMappingURL=abandoned-cart-with-design.d.ts.map
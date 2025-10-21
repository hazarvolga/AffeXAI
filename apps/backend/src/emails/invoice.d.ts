interface InvoiceEmailProps {
    userName?: string;
    invoiceId?: string;
    invoiceDate?: string;
    paymentMethod?: string;
    totalAmount?: string;
    items?: {
        description: string;
        amount: string;
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
export declare const InvoiceEmail: ({ userName, invoiceId, invoiceDate, paymentMethod, totalAmount, items, siteSettings, }: InvoiceEmailProps) => JSX.Element;
export default InvoiceEmail;
//# sourceMappingURL=invoice.d.ts.map
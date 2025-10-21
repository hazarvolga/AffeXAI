interface EmailFooterProps {
    companyName: string;
    contactInfo: {
        address: string;
        phone: string;
        email: string;
    };
    socialMediaLinks: {
        [key: string]: string;
    };
    showUnsubscribeLink?: boolean;
    baseUrl: string;
    locale?: 'tr' | 'en';
}
export declare const EmailFooter: ({ companyName, contactInfo, socialMediaLinks, showUnsubscribeLink, baseUrl, locale, }: EmailFooterProps) => JSX.Element;
export {};
//# sourceMappingURL=EmailFooter.d.ts.map
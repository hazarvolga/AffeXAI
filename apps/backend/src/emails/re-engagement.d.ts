interface ReEngagementEmailProps {
    userName?: string;
    loginLink?: string;
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
export declare const ReEngagementEmail: ({ userName, loginLink, siteSettings, }: ReEngagementEmailProps) => JSX.Element;
export default ReEngagementEmail;
//# sourceMappingURL=re-engagement.d.ts.map
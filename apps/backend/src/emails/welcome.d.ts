interface WelcomeEmailProps {
    userName?: string;
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
export declare const WelcomeEmail: ({ userName, siteSettings, }: WelcomeEmailProps) => JSX.Element;
export default WelcomeEmail;
//# sourceMappingURL=welcome.d.ts.map
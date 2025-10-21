interface EmailVerificationEmailProps {
    userName?: string;
    verificationLink?: string;
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
export declare const EmailVerificationEmail: ({ userName, verificationLink, siteSettings, }: EmailVerificationEmailProps) => JSX.Element;
export default EmailVerificationEmail;
//# sourceMappingURL=email-verification.d.ts.map
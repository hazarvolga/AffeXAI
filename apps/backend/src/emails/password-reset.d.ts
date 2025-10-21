interface PasswordResetEmailProps {
    userName?: string;
    resetLink?: string;
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
export declare const PasswordResetEmail: ({ userName, resetLink, siteSettings, }: PasswordResetEmailProps) => JSX.Element;
export default PasswordResetEmail;
//# sourceMappingURL=password-reset.d.ts.map
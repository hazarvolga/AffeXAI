interface SecurityAlertEmailProps {
    userName?: string;
    alertDetails?: {
        time: string;
        ipAddress: string;
        location: string;
    };
    passwordResetLink?: string;
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
export declare const SecurityAlertEmail: ({ userName, alertDetails, passwordResetLink, siteSettings, }: SecurityAlertEmailProps) => JSX.Element;
export default SecurityAlertEmail;
//# sourceMappingURL=security-alert.d.ts.map
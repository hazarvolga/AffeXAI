import * as React from "react";
interface ThankYouEmailProps {
    userName?: string;
    thankYouFor?: string;
    message?: string;
    ctaText?: string;
    ctaLink?: string;
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
export declare const ThankYouEmail: ({ userName, thankYouFor, message, ctaText, ctaLink, siteSettings, }: ThankYouEmailProps) => React.JSX.Element;
export default ThankYouEmail;
//# sourceMappingURL=thank-you.d.ts.map
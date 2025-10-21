import * as React from "react";
interface GoodbyeEmailProps {
    userName?: string;
    feedbackLink?: string;
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
export declare const GoodbyeEmail: ({ userName, feedbackLink, siteSettings, }: GoodbyeEmailProps) => React.JSX.Element;
export default GoodbyeEmail;
//# sourceMappingURL=goodbye.d.ts.map
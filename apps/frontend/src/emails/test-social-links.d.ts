import * as React from "react";
interface TestSocialLinksEmailProps {
    userName?: string;
    siteSettings?: {
        companyName: string;
        socialMedia: {
            [key: string]: string;
        };
        contact: {
            address: string;
            phone: string;
            email: string;
        };
    };
}
export declare const TestSocialLinksEmail: ({ userName, siteSettings, }: TestSocialLinksEmailProps) => React.JSX.Element;
export default TestSocialLinksEmail;
//# sourceMappingURL=test-social-links.d.ts.map
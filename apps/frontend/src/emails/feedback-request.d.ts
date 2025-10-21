import * as React from "react";
interface FeedbackRequestEmailProps {
    userName?: string;
    productName?: string;
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
export declare const FeedbackRequestEmail: ({ userName, productName, feedbackLink, siteSettings, }: FeedbackRequestEmailProps) => React.JSX.Element;
export default FeedbackRequestEmail;
//# sourceMappingURL=feedback-request.d.ts.map
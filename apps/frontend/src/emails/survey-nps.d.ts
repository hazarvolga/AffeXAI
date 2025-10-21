import * as React from "react";
interface NpsSurveyEmailProps {
    userName?: string;
    surveyLink?: string;
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
export declare const NpsSurveyEmail: ({ userName, surveyLink, siteSettings, }: NpsSurveyEmailProps) => React.JSX.Element;
export default NpsSurveyEmail;
//# sourceMappingURL=survey-nps.d.ts.map
import * as React from "react";
interface OnboardingSeriesEmailProps {
    userName?: string;
    stepNumber?: number;
    totalSteps?: number;
    tipTitle?: string;
    tipDescription?: string;
    tipImageUrl?: string;
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
export declare const OnboardingSeriesEmail: ({ userName, stepNumber, totalSteps, tipTitle, tipDescription, tipImageUrl, ctaLink, siteSettings, }: OnboardingSeriesEmailProps) => React.JSX.Element;
export default OnboardingSeriesEmail;
//# sourceMappingURL=onboarding-series.d.ts.map
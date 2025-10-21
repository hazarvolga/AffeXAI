import * as React from "react";
interface MonthlyNewsletterProps {
    headline?: string;
    mainStory?: {
        title: string;
        excerpt: string;
        imageUrl: string;
        ctaText: string;
        ctaLink: string;
    };
    secondaryStories?: {
        title: string;
        excerpt: string;
        ctaText: string;
        ctaLink: string;
    }[];
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
export declare const MonthlyNewsletterEmail: ({ headline, mainStory, secondaryStories, siteSettings, }: MonthlyNewsletterProps) => React.JSX.Element;
export default MonthlyNewsletterEmail;
//# sourceMappingURL=monthly-newsletter.d.ts.map
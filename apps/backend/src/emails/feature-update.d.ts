interface FeatureUpdateEmailProps {
    userName?: string;
    featureName?: string;
    featureDescription?: string;
    featureImageUrl?: string;
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
export declare const FeatureUpdateEmail: ({ userName, featureName, featureDescription, featureImageUrl, ctaLink, siteSettings, }: FeatureUpdateEmailProps) => JSX.Element;
export default FeatureUpdateEmail;
//# sourceMappingURL=feature-update.d.ts.map
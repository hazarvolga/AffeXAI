interface SeasonalCampaignEmailProps {
    userName?: string;
    campaignTitle?: string;
    campaignDescription?: string;
    campaignImageUrl?: string;
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
export declare const SeasonalCampaignEmail: ({ userName, campaignTitle, campaignDescription, campaignImageUrl, ctaLink, siteSettings, }: SeasonalCampaignEmailProps) => JSX.Element;
export default SeasonalCampaignEmail;
//# sourceMappingURL=seasonal-campaign.d.ts.map
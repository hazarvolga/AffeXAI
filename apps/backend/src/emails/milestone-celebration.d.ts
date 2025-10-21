interface MilestoneCelebrationEmailProps {
    userName?: string;
    milestone?: string;
    milestoneDescription?: string;
    rewardText?: string;
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
export declare const MilestoneCelebrationEmail: ({ userName, milestone, milestoneDescription, rewardText, ctaLink, siteSettings, }: MilestoneCelebrationEmailProps) => JSX.Element;
export default MilestoneCelebrationEmail;
//# sourceMappingURL=milestone-celebration.d.ts.map
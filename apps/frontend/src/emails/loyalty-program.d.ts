import * as React from "react";
interface LoyaltyProgramEmailProps {
    userName?: string;
    points?: number;
    level?: string;
    rewardsLink?: string;
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
export declare const LoyaltyProgramEmail: ({ userName, points, level, rewardsLink, siteSettings, }: LoyaltyProgramEmailProps) => React.JSX.Element;
export default LoyaltyProgramEmail;
//# sourceMappingURL=loyalty-program.d.ts.map
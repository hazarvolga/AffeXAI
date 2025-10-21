import * as React from "react";
import type { EmailDesignSystem } from "@/lib/email-design-tokens";
export interface EmailTemplateWithDesignProps {
    preview: string;
    children: React.ReactNode;
    companyName: string;
    logoUrl: string;
    contactInfo: {
        address: string;
        phone: string;
        email: string;
    };
    socialMediaLinks?: {
        [key: string]: string;
    };
    showUnsubscribeLink?: boolean;
    unsubscribeToken?: string;
    showTagline?: boolean;
    tagline?: string;
    locale?: 'tr' | 'en';
    designSystem: EmailDesignSystem;
    theme?: 'light' | 'dark';
}
export declare const EmailTemplateWithDesign: ({ preview, children, companyName, logoUrl, contactInfo, socialMediaLinks, showUnsubscribeLink, unsubscribeToken, showTagline, tagline, locale, designSystem, theme, }: EmailTemplateWithDesignProps) => React.JSX.Element;
/**
 * Utility components for common email patterns
 */
export declare const EmailButton: ({ href, children, variant, designSystem, }: {
    href: string;
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    designSystem: EmailDesignSystem;
}) => React.JSX.Element;
export declare const EmailAlert: ({ children, variant, designSystem, }: {
    children: React.ReactNode;
    variant?: "success" | "warning" | "error" | "info";
    designSystem: EmailDesignSystem;
}) => React.JSX.Element;
export declare const EmailCard: ({ children, designSystem, }: {
    children: React.ReactNode;
    designSystem: EmailDesignSystem;
}) => React.JSX.Element;
//# sourceMappingURL=EmailTemplateWithDesignSystem.d.ts.map
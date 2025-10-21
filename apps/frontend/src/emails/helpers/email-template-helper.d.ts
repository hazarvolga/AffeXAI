/**
 * Email Template Helper
 * Provides utilities for creating standardized email templates with design system integration
 */
import type { EmailDesignSystem } from '@/lib/email-design-tokens';
export interface EmailTemplateConfig {
    preview: string;
    subject: string;
    theme?: 'light' | 'dark';
    context?: 'public' | 'admin' | 'portal';
    showUnsubscribeLink?: boolean;
    unsubscribeToken?: string;
    showTagline?: boolean;
    locale?: 'tr' | 'en';
}
/**
 * Get complete email template data including site settings and design system
 */
export declare function getEmailTemplateData(config: EmailTemplateConfig): Promise<{
    companyName: any;
    logoUrl: any;
    contactInfo: {
        address: any;
        phone: any;
        email: any;
    };
    socialMediaLinks: Record<string, string>;
    tagline: any;
    preview: string;
    showUnsubscribeLink: boolean;
    unsubscribeToken: string | undefined;
    showTagline: boolean;
    locale: "tr" | "en";
    designSystem: any;
    theme: "dark" | "light";
}>;
/**
 * Generate inline styles for email content based on design system
 */
export declare function getEmailStyles(designSystem: EmailDesignSystem): {
    h1: {
        color: any;
        fontSize: any;
        fontWeight: any;
        lineHeight: any;
        marginTop: number;
        marginBottom: any;
    };
    h2: {
        color: any;
        fontSize: any;
        fontWeight: any;
        lineHeight: any;
        marginTop: any;
        marginBottom: any;
    };
    h3: {
        color: any;
        fontSize: any;
        fontWeight: any;
        lineHeight: any;
        marginTop: any;
        marginBottom: any;
    };
    h4: {
        color: any;
        fontSize: any;
        fontWeight: any;
        lineHeight: any;
        marginTop: any;
        marginBottom: any;
    };
    p: {
        color: any;
        fontSize: any;
        fontWeight: any;
        lineHeight: any;
        marginTop: number;
        marginBottom: any;
    };
    small: {
        color: any;
        fontSize: any;
        fontWeight: any;
        lineHeight: any;
    };
    strong: {
        fontWeight: any;
    };
    link: {
        color: any;
        textDecoration: string;
    };
    button: {
        primary: {
            backgroundColor: any;
            color: any;
            padding: string;
            borderRadius: any;
            textDecoration: string;
            display: string;
            fontSize: any;
            fontWeight: any;
        };
        secondary: {
            backgroundColor: any;
            color: any;
            padding: string;
            borderRadius: any;
            textDecoration: string;
            display: string;
            fontSize: any;
            fontWeight: any;
        };
        outline: {
            backgroundColor: string;
            color: any;
            border: string;
            padding: string;
            borderRadius: any;
            textDecoration: string;
            display: string;
            fontSize: any;
            fontWeight: any;
        };
    };
    container: {
        maxWidth: string;
        margin: string;
        padding: any;
    };
    card: {
        backgroundColor: any;
        border: string;
        borderRadius: any;
        padding: any;
        marginBottom: any;
    };
    alert: {
        success: {
            backgroundColor: any;
            color: any;
            padding: any;
            borderRadius: any;
            marginBottom: any;
        };
        warning: {
            backgroundColor: any;
            color: any;
            padding: any;
            borderRadius: any;
            marginBottom: any;
        };
        error: {
            backgroundColor: any;
            color: any;
            padding: any;
            borderRadius: any;
            marginBottom: any;
        };
        info: {
            backgroundColor: any;
            color: any;
            padding: any;
            borderRadius: any;
            marginBottom: any;
        };
    };
    table: {
        width: string;
        borderCollapse: "collapse";
        marginBottom: any;
    };
    th: {
        backgroundColor: any;
        color: any;
        padding: any;
        borderBottom: string;
        textAlign: "left";
        fontSize: any;
        fontWeight: any;
    };
    td: {
        padding: any;
        borderBottom: string;
        fontSize: any;
        color: any;
    };
    ul: {
        marginTop: number;
        marginBottom: any;
        paddingLeft: any;
        color: any;
    };
    ol: {
        marginTop: number;
        marginBottom: any;
        paddingLeft: any;
        color: any;
    };
    li: {
        marginBottom: any;
        fontSize: any;
        lineHeight: any;
    };
    hr: {
        border: string;
        borderTop: string;
        marginTop: any;
        marginBottom: any;
    };
    code: {
        backgroundColor: any;
        color: any;
        padding: string;
        borderRadius: any;
        fontFamily: any;
        fontSize: any;
    };
    pre: {
        backgroundColor: any;
        color: any;
        padding: any;
        borderRadius: any;
        overflow: string;
        fontFamily: any;
        fontSize: any;
        lineHeight: any;
    };
    textCenter: {
        textAlign: "center";
    };
    textLeft: {
        textAlign: "left";
    };
    textRight: {
        textAlign: "right";
    };
    textMuted: {
        color: any;
    };
    textPrimary: {
        color: any;
    };
    textSuccess: {
        color: any;
    };
    textWarning: {
        color: any;
    };
    textError: {
        color: any;
    };
    textInfo: {
        color: any;
    };
    mt: {
        xs: {
            marginTop: any;
        };
        sm: {
            marginTop: any;
        };
        md: {
            marginTop: any;
        };
        lg: {
            marginTop: any;
        };
        xl: {
            marginTop: any;
        };
    };
    mb: {
        xs: {
            marginBottom: any;
        };
        sm: {
            marginBottom: any;
        };
        md: {
            marginBottom: any;
        };
        lg: {
            marginBottom: any;
        };
        xl: {
            marginBottom: any;
        };
    };
    pt: {
        xs: {
            paddingTop: any;
        };
        sm: {
            paddingTop: any;
        };
        md: {
            paddingTop: any;
        };
        lg: {
            paddingTop: any;
        };
        xl: {
            paddingTop: any;
        };
    };
    pb: {
        xs: {
            paddingBottom: any;
        };
        sm: {
            paddingBottom: any;
        };
        md: {
            paddingBottom: any;
        };
        lg: {
            paddingBottom: any;
        };
        xl: {
            paddingBottom: any;
        };
    };
};
/**
 * Format currency for emails
 */
export declare function formatCurrency(amount: number, locale?: 'tr' | 'en'): string;
/**
 * Format date for emails
 */
export declare function formatDate(date: Date | string, locale?: 'tr' | 'en'): string;
/**
 * Format time for emails
 */
export declare function formatTime(date: Date | string, locale?: 'tr' | 'en'): string;
/**
 * Generate greeting based on time of day
 */
export declare function getGreeting(locale?: 'tr' | 'en'): string;
//# sourceMappingURL=email-template-helper.d.ts.map
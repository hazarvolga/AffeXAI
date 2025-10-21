/**
 * Email Design Tokens Service
 * Provides dynamic design token integration for email templates
 * Syncs with the main Design System for consistent branding
 */
import type { DesignTokens } from '@/types/design-tokens';
/**
 * Email-safe color conversion utilities
 */
export declare function hslToHex(hsl: string): string;
/**
 * Fetch design tokens from API or database
 * Falls back to production defaults if API is unavailable
 */
export declare function fetchDesignTokens(context?: 'public' | 'admin' | 'portal', mode?: 'light' | 'dark'): Promise<DesignTokens>;
/**
 * Email-specific color palette interface
 */
export interface EmailColorPalette {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    success: string;
    successForeground: string;
    warning: string;
    warningForeground: string;
    error: string;
    errorForeground: string;
    info: string;
    infoForeground: string;
    border: string;
    input: string;
    ring: string;
    cardBackground: string;
    cardForeground: string;
}
/**
 * Convert design tokens to email-safe hex colors
 */
export declare function getEmailColorPalette(context?: 'public' | 'admin' | 'portal', mode?: 'light' | 'dark'): Promise<EmailColorPalette>;
/**
 * Typography tokens for emails
 */
export interface EmailTypography {
    fontFamily: string;
    fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
    };
    fontWeight: {
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
    };
    lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
    };
}
/**
 * Get typography settings for emails
 */
export declare function getEmailTypography(): Promise<EmailTypography>;
/**
 * Spacing tokens for emails
 */
export interface EmailSpacing {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
}
/**
 * Get spacing values for emails
 */
export declare function getEmailSpacing(): Promise<EmailSpacing>;
/**
 * Border radius tokens for emails
 */
export interface EmailRadius {
    none: string;
    sm: string;
    default: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
}
/**
 * Get border radius values for emails
 */
export declare function getEmailRadius(): Promise<EmailRadius>;
/**
 * Complete email design system
 */
export interface EmailDesignSystem {
    colors: EmailColorPalette;
    typography: EmailTypography;
    spacing: EmailSpacing;
    radius: EmailRadius;
}
/**
 * Get complete design system for emails
 * This is the main function to use in email templates
 */
export declare function getEmailDesignSystem(context?: 'public' | 'admin' | 'portal', mode?: 'light' | 'dark'): Promise<EmailDesignSystem>;
/**
 * Generate email-safe CSS from design tokens
 */
export declare function generateEmailStyles(design: EmailDesignSystem): string;
//# sourceMappingURL=email-design-tokens.d.ts.map
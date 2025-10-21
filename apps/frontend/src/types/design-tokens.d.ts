/**
 * W3C Design Tokens Community Group Specification Implementation
 * @see https://www.w3.org/community/design-tokens/
 * @see https://tr.designtokens.org/format/
 */
/**
 * Base token type according to W3C DTCG specification
 */
export type TokenType = 'color' | 'dimension' | 'fontFamily' | 'fontWeight' | 'duration' | 'cubicBezier' | 'number' | 'strokeStyle' | 'border' | 'transition' | 'shadow' | 'gradient' | 'typography';
/**
 * Color token value (supports hex, rgb, hsl)
 */
export interface ColorToken {
    $type: 'color';
    $value: string;
    $description?: string;
}
/**
 * Dimension token (size, spacing, etc.)
 */
export interface DimensionToken {
    $type: 'dimension';
    $value: string;
    $description?: string;
}
/**
 * Font family token
 */
export interface FontFamilyToken {
    $type: 'fontFamily';
    $value: string | string[];
    $description?: string;
}
/**
 * Font weight token
 */
export interface FontWeightToken {
    $type: 'fontWeight';
    $value: number | string;
    $description?: string;
}
/**
 * Duration token (for animations)
 */
export interface DurationToken {
    $type: 'duration';
    $value: string;
    $description?: string;
}
/**
 * Cubic bezier token (easing functions)
 */
export interface CubicBezierToken {
    $type: 'cubicBezier';
    $value: [number, number, number, number];
    $description?: string;
}
/**
 * Number token (opacity, scale, etc.)
 */
export interface NumberToken {
    $type: 'number';
    $value: number;
    $description?: string;
}
/**
 * Typography composite token
 */
export interface TypographyToken {
    $type: 'typography';
    $value: {
        fontFamily: string;
        fontSize: string;
        fontWeight: number | string;
        lineHeight: string;
        letterSpacing?: string;
    };
    $description?: string;
}
/**
 * Shadow token
 */
export interface ShadowToken {
    $type: 'shadow';
    $value: {
        color: string;
        offsetX: string;
        offsetY: string;
        blur: string;
        spread?: string;
    } | Array<{
        color: string;
        offsetX: string;
        offsetY: string;
        blur: string;
        spread?: string;
    }>;
    $description?: string;
}
/**
 * Border token
 */
export interface BorderToken {
    $type: 'border';
    $value: {
        color: string;
        width: string;
        style: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
    };
    $description?: string;
}
/**
 * Transition token
 */
export interface TransitionToken {
    $type: 'transition';
    $value: {
        duration: string;
        delay?: string;
        timingFunction: string | [number, number, number, number];
    };
    $description?: string;
}
/**
 * Token alias (references another token)
 * Format: {tokenPath} where tokenPath is dot-separated
 * Example: "{color.primary}" or "{spacing.base}"
 */
export type TokenAlias = string;
export declare function isTokenAlias(value: unknown): value is TokenAlias;
export declare function resolveTokenPath(alias: TokenAlias): string;
/**
 * Token with metadata
 */
export interface DesignToken {
    $type: TokenType;
    $value: any;
    $description?: string;
    $extensions?: Record<string, any>;
}
/**
 * Token group (can contain nested groups and tokens)
 */
export interface TokenGroup {
    $description?: string;
    [key: string]: DesignToken | TokenGroup | string | undefined;
}
/**
 * Root token collection (W3C format)
 */
export interface DesignTokens {
    [groupName: string]: TokenGroup | DesignToken;
}
/**
 * Theme mode
 */
export type ThemeMode = 'light' | 'dark';
/**
 * Theme context (which area of the app)
 */
export type ThemeContext = 'public' | 'admin' | 'portal';
/**
 * Theme configuration
 */
export interface ThemeConfig {
    id: string;
    name: string;
    context: ThemeContext;
    mode: ThemeMode;
    tokens: DesignTokens;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Database model for design tokens
 */
export interface DesignTokenModel {
    id: string;
    path: string;
    type: TokenType;
    value: any;
    description?: string;
    context: ThemeContext;
    mode: ThemeMode;
    isAlias: boolean;
    aliasTo?: string;
    extensions?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Extract token value type based on token type
 */
export type TokenValue<T extends TokenType> = T extends 'color' ? string : T extends 'dimension' ? string : T extends 'fontFamily' ? string | string[] : T extends 'fontWeight' ? number | string : T extends 'duration' ? string : T extends 'cubicBezier' ? [number, number, number, number] : T extends 'number' ? number : T extends 'typography' ? TypographyToken['$value'] : T extends 'shadow' ? ShadowToken['$value'] : T extends 'border' ? BorderToken['$value'] : T extends 'transition' ? TransitionToken['$value'] : any;
/**
 * Token resolver options
 */
export interface ResolverOptions {
    tokens: DesignTokens;
    context?: ThemeContext;
    mode?: ThemeMode;
}
/**
 * Resolved token (with all aliases resolved)
 */
export interface ResolvedToken<T extends TokenType = TokenType> {
    type: T;
    value: TokenValue<T>;
    path: string;
    description?: string;
}
/**
 * Semantic color roles
 */
export type ColorRole = 'primary' | 'secondary' | 'accent' | 'background' | 'foreground' | 'muted' | 'border' | 'input' | 'ring' | 'success' | 'warning' | 'error' | 'info';
/**
 * Semantic spacing scale
 */
export type SpacingScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
/**
 * Semantic font size scale
 */
export type FontSizeScale = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
/**
 * Component-specific token paths
 */
export interface ComponentTokenPaths {
    button: {
        background: string;
        foreground: string;
        border: string;
        hover: {
            background: string;
            foreground: string;
        };
    };
    card: {
        background: string;
        foreground: string;
        border: string;
        shadow: string;
    };
    input: {
        background: string;
        foreground: string;
        border: string;
        placeholder: string;
        ring: string;
    };
}
/**
 * Token export format
 */
export interface TokenExportFormat {
    version: '1.0.0';
    format: 'w3c-design-tokens';
    tokens: DesignTokens;
    metadata: {
        name: string;
        description?: string;
        author?: string;
        exportedAt: string;
    };
}
/**
 * CSS variables export options
 */
export interface CSSExportOptions {
    prefix?: string;
    theme?: ThemeContext;
    mode?: ThemeMode;
    selector?: string;
}
/**
 * SCSS export options
 */
export interface SCSSExportOptions {
    prefix?: string;
    theme?: ThemeContext;
    mode?: ThemeMode;
    useVariables?: boolean;
}
//# sourceMappingURL=design-tokens.d.ts.map
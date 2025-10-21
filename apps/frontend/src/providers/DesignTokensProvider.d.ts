/**
 * Design Tokens Theme Provider
 * Centralized theme management with React Context
 * SSR-safe with hydration mismatch prevention
 */
import React from 'react';
import type { DesignTokens, ThemeContext as ThemeContextType, ThemeMode } from '@/types/design-tokens';
interface ThemeContextValue {
    context: ThemeContextType;
    mode: ThemeMode;
    tokens: DesignTokens;
    setContext: (context: ThemeContextType) => void;
    setMode: (mode: ThemeMode) => void;
    toggleMode: () => void;
    updateTokens: (tokens: DesignTokens) => void;
    resetTokens: () => void;
    injectCSS: () => void;
    getCSSVariables: () => string;
}
interface ThemeProviderProps {
    children: React.ReactNode;
    defaultContext?: ThemeContextType;
    defaultMode?: ThemeMode;
}
declare const ThemeContext: React.Context<ThemeContextValue | undefined>;
export declare function useDesignTokens(): ThemeContextValue;
export declare function DesignTokensProvider({ children, defaultContext, defaultMode, }: ThemeProviderProps): React.JSX.Element;
export { ThemeContext };
export type { ThemeContextValue, ThemeProviderProps };
//# sourceMappingURL=DesignTokensProvider.d.ts.map
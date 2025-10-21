"use strict";
/**
 * Design Tokens Theme Provider
 * Centralized theme management with React Context
 * SSR-safe with hydration mismatch prevention
 */
'use client';
/**
 * Design Tokens Theme Provider
 * Centralized theme management with React Context
 * SSR-safe with hydration mismatch prevention
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeContext = void 0;
exports.useDesignTokens = useDesignTokens;
exports.DesignTokensProvider = DesignTokensProvider;
const react_1 = __importStar(require("react"));
const resolver_1 = require("@/lib/design-tokens/resolver");
const production_tokens_1 = require("@/lib/design-tokens/production-tokens");
// ============================================================================
// CONTEXT
// ============================================================================
const ThemeContext = (0, react_1.createContext)(undefined);
exports.ThemeContext = ThemeContext;
function useDesignTokens() {
    const context = (0, react_1.useContext)(ThemeContext);
    if (!context) {
        throw new Error('useDesignTokens must be used within DesignTokensProvider');
    }
    return context;
}
// ============================================================================
// STORAGE UTILITIES (SSR-SAFE)
// ============================================================================
const STORAGE_KEYS = {
    CONTEXT: 'theme-context',
    MODE: 'theme-mode',
    CUSTOM_TOKENS: 'custom-tokens',
};
function getStoredValue(key, fallback) {
    if (typeof window === 'undefined')
        return fallback;
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    }
    catch {
        return fallback;
    }
}
function setStoredValue(key, value) {
    if (typeof window === 'undefined')
        return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
        console.error('Failed to store value:', error);
    }
}
// ============================================================================
// TOKEN UTILITIES
// ============================================================================
function getDefaultTokens(context, mode) {
    if (context === 'admin') {
        return mode === 'dark' ? production_tokens_1.adminDarkTokensProduction : production_tokens_1.adminLightTokensProduction;
    }
    else if (context === 'portal') {
        return mode === 'dark' ? production_tokens_1.portalDarkTokensProduction : production_tokens_1.portalLightTokensProduction;
    }
    else {
        return mode === 'dark' ? production_tokens_1.publicDarkTokensProduction : production_tokens_1.publicLightTokensProduction;
    }
}
function mergeCustomTokens(defaults, custom) {
    const merged = JSON.parse(JSON.stringify(defaults)); // Deep clone
    // Deep merge custom tokens
    function deepMerge(target, source) {
        for (const key in source) {
            if (source[key] !== undefined && source[key] !== null) {
                if (typeof source[key] === 'object' && !source[key].$value && !Array.isArray(source[key])) {
                    // If nested object (not a token), merge recursively
                    target[key] = target[key] || {};
                    deepMerge(target[key], source[key]);
                }
                else {
                    // If token with $value or primitive, replace
                    target[key] = source[key];
                }
            }
        }
    }
    deepMerge(merged, custom);
    return merged;
}
// ============================================================================
// CSS INJECTION
// ============================================================================
function injectCSSVariables(tokens, context, mode) {
    if (typeof window === 'undefined')
        return;
    try {
        console.log('💉 injectCSSVariables called:', { context, mode });
        const resolved = (0, resolver_1.resolveAllTokens)(tokens);
        console.log('📋 Resolved tokens:', resolved);
        // Higher specificity than globals.css: repeat selector to increase specificity
        // .dark .theme-admin.theme-admin (0-3-0) > .dark .theme-admin (0-2-0)
        const baseSelector = `.theme-${context}`;
        const selector = mode === 'dark'
            ? `.dark ${baseSelector}${baseSelector}` // Extra specificity for dark mode
            : `${baseSelector}${baseSelector}`; // Extra specificity for light mode
        const css = (0, resolver_1.exportToCSS)(resolved, { selector });
        console.log('📝 Generated CSS selector:', selector);
        console.log('📝 Generated CSS (first 500 chars):', css.substring(0, 500));
        // Remove existing style element
        const existingStyle = document.getElementById(`theme-${context}-${mode}`);
        if (existingStyle) {
            console.log('🗑️ Removing existing style tag');
            existingStyle.remove();
        }
        // Create new style element
        const style = document.createElement('style');
        style.id = `theme-${context}-${mode}`;
        style.textContent = css;
        // Append to end of head to ensure it loads after globals.css
        document.head.appendChild(style);
        console.log(`✅ Injected ${context} (${mode}) theme CSS variables - Style tag ID: theme-${context}-${mode}`);
    }
    catch (error) {
        console.error('Failed to inject CSS variables:', error);
    }
}
// ============================================================================
// PROVIDER COMPONENT (SSR-SAFE)
// ============================================================================
function DesignTokensProvider({ children, defaultContext = 'public', defaultMode = 'light', }) {
    // State - Initialize with defaults to prevent hydration mismatch
    const [context, setContextState] = (0, react_1.useState)(defaultContext);
    const [mode, setModeState] = (0, react_1.useState)(defaultMode);
    const [customTokens, setCustomTokens] = (0, react_1.useState)({});
    const [isHydrated, setIsHydrated] = (0, react_1.useState)(false);
    // Load from localStorage AFTER client-side hydration
    (0, react_1.useEffect)(() => {
        const storedContext = getStoredValue(STORAGE_KEYS.CONTEXT, defaultContext);
        const storedMode = getStoredValue(STORAGE_KEYS.MODE, defaultMode);
        const storedCustomTokens = getStoredValue(STORAGE_KEYS.CUSTOM_TOKENS, {});
        console.log('💾 Loaded from localStorage:', { storedContext, storedMode, storedCustomTokens });
        setContextState(storedContext);
        setModeState(storedMode);
        setCustomTokens(storedCustomTokens);
        setIsHydrated(true);
    }, []); // Run once on mount
    // Computed tokens
    const defaultThemeTokens = getDefaultTokens(context, mode);
    const tokens = mergeCustomTokens(defaultThemeTokens, customTokens);
    console.log('🔧 Computed tokens:', {
        context,
        mode,
        hasCustomTokens: Object.keys(customTokens).length > 0,
        customTokensKeys: Object.keys(customTokens)
    });
    // Context setter
    const setContext = (0, react_1.useCallback)((newContext) => {
        setContextState(newContext);
        setStoredValue(STORAGE_KEYS.CONTEXT, newContext);
    }, []);
    // Mode setter
    const setMode = (0, react_1.useCallback)((newMode) => {
        setModeState(newMode);
        setStoredValue(STORAGE_KEYS.MODE, newMode);
    }, []);
    // Mode toggler
    const toggleMode = (0, react_1.useCallback)(() => {
        setMode(mode === 'light' ? 'dark' : 'light');
    }, [mode, setMode]);
    // Update tokens
    const updateTokens = (0, react_1.useCallback)((newTokens) => {
        console.log('🔄 updateTokens called with:', newTokens);
        setCustomTokens(newTokens);
        setStoredValue(STORAGE_KEYS.CUSTOM_TOKENS, newTokens);
    }, []);
    // Reset to defaults
    const resetTokens = (0, react_1.useCallback)(() => {
        console.log('🔄 resetTokens called - clearing customTokens');
        setCustomTokens({});
        setStoredValue(STORAGE_KEYS.CUSTOM_TOKENS, {});
    }, []);
    // Inject CSS
    const injectCSS = (0, react_1.useCallback)(() => {
        injectCSSVariables(tokens, context, mode);
    }, [tokens, context, mode]);
    // Get CSS as string
    const getCSSVariables = (0, react_1.useCallback)(() => {
        const resolved = (0, resolver_1.resolveAllTokens)(tokens);
        return (0, resolver_1.exportToCSS)(resolved, { selector: `.theme-${context}` });
    }, [tokens, context]);
    // Update dark mode class
    (0, react_1.useEffect)(() => {
        if (typeof document !== 'undefined') {
            if (mode === 'dark') {
                document.documentElement.classList.add('dark');
            }
            else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [mode]);
    // Auto-inject CSS when tokens change (ONLY AFTER HYDRATION)
    (0, react_1.useEffect)(() => {
        if (isHydrated && typeof window !== 'undefined') {
            console.log('🎨 Auto-injecting CSS:', { context, mode, isHydrated });
            console.log('📦 Tokens to inject:', tokens);
            injectCSSVariables(tokens, context, mode);
        }
    }, [tokens, context, mode, isHydrated]);
    // Context value
    const value = {
        context,
        mode,
        tokens,
        setContext,
        setMode,
        toggleMode,
        updateTokens,
        resetTokens,
        injectCSS,
        getCSSVariables,
    };
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
//# sourceMappingURL=DesignTokensProvider.js.map
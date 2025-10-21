"use strict";
/**
 * TokenPicker Component
 *
 * Visual token selection UI for CMS blocks
 * Allows users to select design tokens or enter custom values
 */
'use client';
/**
 * TokenPicker Component
 *
 * Visual token selection UI for CMS blocks
 * Allows users to select design tokens or enter custom values
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
exports.TokenPicker = TokenPicker;
exports.CompactTokenPicker = CompactTokenPicker;
const react_1 = __importStar(require("react"));
const DesignTokensProvider_1 = require("@/providers/DesignTokensProvider");
const cms_template_1 = require("@/types/cms-template");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const radio_group_1 = require("@/components/ui/radio-group");
const tabs_1 = require("@/components/ui/tabs");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
/**
 * Extract tokens by category from design tokens object
 */
function extractTokensByCategory(tokens, category, prefix = '') {
    const results = [];
    for (const [key, value] of Object.entries(tokens)) {
        const currentPath = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === 'object') {
            // Check if this is a token with $type
            if ('$type' in value && value.$type === category) {
                results.push({
                    path: currentPath,
                    label: formatTokenLabel(currentPath),
                    value: '$value' in value ? value.$value : value,
                    category: value.$type,
                    description: '$description' in value ? value.$description : undefined,
                });
            }
            else if ('$type' in value && category === 'color' && currentPath.startsWith('color.')) {
                // Special handling for color tokens
                results.push({
                    path: currentPath,
                    label: formatTokenLabel(currentPath),
                    value: '$value' in value ? value.$value : value,
                    category: 'color',
                    description: '$description' in value ? value.$description : undefined,
                });
            }
            else if (currentPath === category || currentPath.startsWith(`${category}.`)) {
                // Category-based grouping (e.g., spacing.*, color.*)
                if ('$value' in value) {
                    results.push({
                        path: currentPath,
                        label: formatTokenLabel(currentPath),
                        value: value.$value,
                        category: category,
                        description: '$description' in value ? value.$description : undefined,
                    });
                }
                else {
                    // Recursively search nested objects
                    results.push(...extractTokensByCategory(value, category, currentPath));
                }
            }
        }
    }
    return results;
}
/**
 * Format token path into readable label
 */
function formatTokenLabel(path) {
    const parts = path.split('.');
    const lastPart = parts[parts.length - 1];
    // Convert kebab-case or camelCase to Title Case
    return lastPart
        .replace(/([A-Z])/g, ' $1')
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
/**
 * Color Token Preview Component
 */
function ColorTokenPreview({ value }) {
    // HSL format: "222 47% 11%"
    const hslColor = value.includes(' ') ? `hsl(${value})` : value;
    return (<div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded border border-border shadow-sm" style={{ backgroundColor: hslColor }} title={value}/>
      <span className="text-xs text-muted-foreground font-mono">{value}</span>
    </div>);
}
/**
 * Spacing Token Preview Component
 */
function SpacingTokenPreview({ value }) {
    const numericValue = parseInt(value);
    const width = Math.min(numericValue, 200); // Cap at 200px for display
    return (<div className="flex items-center gap-2">
      <div className="relative h-6 bg-muted rounded">
        <div className="h-full bg-primary rounded" style={{ width: `${width}px` }}/>
      </div>
      <span className="text-xs text-muted-foreground font-mono">{value}</span>
    </div>);
}
/**
 * Typography Token Preview Component
 */
function TypographyTokenPreview({ value }) {
    if (typeof value === 'object') {
        return (<div className="text-xs text-muted-foreground space-y-1">
        {value.fontSize && <div>Size: {value.fontSize}</div>}
        {value.lineHeight && <div>Line Height: {value.lineHeight}</div>}
        {value.fontWeight && <div>Weight: {value.fontWeight}</div>}
      </div>);
    }
    return <span className="text-xs text-muted-foreground font-mono">{String(value)}</span>;
}
/**
 * Token Preview Component - Renders appropriate preview based on category
 */
function TokenPreview({ category, value }) {
    if (!value)
        return null;
    switch (category) {
        case 'color':
            return <ColorTokenPreview value={value}/>;
        case 'spacing':
        case 'dimension':
            return <SpacingTokenPreview value={value}/>;
        case 'typography':
            return <TypographyTokenPreview value={value}/>;
        default:
            return <span className="text-xs text-muted-foreground font-mono">{String(value)}</span>;
    }
}
/**
 * Get category icon
 */
function getCategoryIcon(category) {
    switch (category) {
        case 'color':
            return <lucide_react_1.Palette className="h-4 w-4"/>;
        case 'spacing':
        case 'dimension':
            return <lucide_react_1.Ruler className="h-4 w-4"/>;
        case 'typography':
        case 'fontFamily':
        case 'fontWeight':
            return <lucide_react_1.Type className="h-4 w-4"/>;
        default:
            return <lucide_react_1.Sparkles className="h-4 w-4"/>;
    }
}
/**
 * Main TokenPicker Component
 */
function TokenPicker({ category, value, onChange, allowCustom = true, placeholder, label, description, disabled = false, }) {
    const { tokens, context, mode } = (0, DesignTokensProvider_1.useDesignTokens)();
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [activeTab, setActiveTab] = (0, react_1.useState)((0, cms_template_1.isTokenAlias)(value) ? 'tokens' : 'custom');
    // Extract available tokens for this category
    const availableTokens = (0, react_1.useMemo)(() => {
        return extractTokensByCategory(tokens, category);
    }, [tokens, category]);
    // Filter tokens based on search query
    const filteredTokens = (0, react_1.useMemo)(() => {
        if (!searchQuery)
            return availableTokens;
        const query = searchQuery.toLowerCase();
        return availableTokens.filter(token => token.label.toLowerCase().includes(query) ||
            token.path.toLowerCase().includes(query));
    }, [availableTokens, searchQuery]);
    // Get current token path if value is a token alias
    const currentTokenPath = (0, cms_template_1.isTokenAlias)(value) ? (0, cms_template_1.extractTokenPath)(value) : '';
    // Handle token selection
    const handleTokenSelect = (tokenPath) => {
        onChange((0, cms_template_1.createTokenAlias)(tokenPath));
    };
    // Handle custom value input
    const handleCustomValueChange = (customValue) => {
        onChange(customValue);
    };
    // Switch to tokens tab when selecting a token
    const handleTokenClick = (tokenPath) => {
        setActiveTab('tokens');
        handleTokenSelect(tokenPath);
    };
    return (<div className="space-y-3">
      {/* Label */}
      {label && (<div className="flex items-center justify-between">
          <label_1.Label className="flex items-center gap-2">
            {getCategoryIcon(category)}
            {label}
          </label_1.Label>
          <badge_1.Badge variant="outline" className="text-xs">
            {context} · {mode}
          </badge_1.Badge>
        </div>)}

      {/* Description */}
      {description && (<p className="text-xs text-muted-foreground">{description}</p>)}

      {/* Tabs: Tokens vs Custom */}
      <tabs_1.Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
        <tabs_1.TabsList className="grid w-full grid-cols-2">
          <tabs_1.TabsTrigger value="tokens" disabled={disabled}>
            Design Tokens ({availableTokens.length})
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="custom" disabled={disabled || !allowCustom}>
            Custom Value
          </tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        {/* Tokens Tab */}
        <tabs_1.TabsContent value="tokens" className="space-y-3">
          {/* Search */}
          <div className="relative">
            <lucide_react_1.Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
            <input_1.Input placeholder="Search tokens..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-8" disabled={disabled}/>
          </div>

          {/* Token List */}
          <div className="max-h-64 overflow-y-auto rounded-md border">
            {filteredTokens.length === 0 ? (<div className="p-8 text-center text-sm text-muted-foreground">
                No tokens found for "{searchQuery}"
              </div>) : (<radio_group_1.RadioGroup value={currentTokenPath} onValueChange={handleTokenSelect} disabled={disabled}>
                {filteredTokens.map((token) => (<div key={token.path} className="flex items-start gap-3 border-b p-3 last:border-b-0 hover:bg-muted/50 cursor-pointer" onClick={() => handleTokenClick(token.path)}>
                    <radio_group_1.RadioGroupItem value={token.path} id={`token-${token.path}`} className="mt-1"/>
                    <div className="flex-1 space-y-1">
                      <label_1.Label htmlFor={`token-${token.path}`} className="font-medium cursor-pointer">
                        {token.label}
                      </label_1.Label>
                      <div className="text-xs text-muted-foreground font-mono">
                        {`{${token.path}}`}
                      </div>
                      {token.description && (<p className="text-xs text-muted-foreground">{token.description}</p>)}
                      <TokenPreview category={category} value={token.value}/>
                    </div>
                  </div>))}
              </radio_group_1.RadioGroup>)}
          </div>
        </tabs_1.TabsContent>

        {/* Custom Value Tab */}
        <tabs_1.TabsContent value="custom" className="space-y-3">
          {allowCustom ? (<>
              <input_1.Input type={category === 'color' ? 'text' : 'text'} value={(0, cms_template_1.isTokenAlias)(value) ? '' : value} onChange={(e) => handleCustomValueChange(e.target.value)} placeholder={placeholder || `Enter custom ${category} value`} disabled={disabled}/>
              {category === 'color' && !(0, cms_template_1.isTokenAlias)(value) && value && (<div className="p-3 rounded-md border">
                  <ColorTokenPreview value={value}/>
                </div>)}
              <p className="text-xs text-muted-foreground">
                💡 Tip: Use design tokens for automatic theme support
              </p>
            </>) : (<div className="p-8 text-center text-sm text-muted-foreground">
              Custom values are not allowed for this property.
              Please select a design token.
            </div>)}
        </tabs_1.TabsContent>
      </tabs_1.Tabs>

      {/* Current Value Display */}
      {value && (<div className="rounded-md bg-muted p-3 text-xs">
          <div className="font-medium mb-1">Current Value:</div>
          <div className="font-mono text-muted-foreground">
            {(0, cms_template_1.isTokenAlias)(value) ? (<span className="text-primary">{value}</span>) : (<span>{value}</span>)}
          </div>
        </div>)}
    </div>);
}
/**
 * Compact TokenPicker for inline use
 */
function CompactTokenPicker({ category, value, onChange, allowCustom = true, }) {
    const { tokens } = (0, DesignTokensProvider_1.useDesignTokens)();
    const availableTokens = (0, react_1.useMemo)(() => {
        return extractTokensByCategory(tokens, category);
    }, [tokens, category]);
    const currentTokenPath = (0, cms_template_1.isTokenAlias)(value) ? (0, cms_template_1.extractTokenPath)(value) : '';
    const isToken = (0, cms_template_1.isTokenAlias)(value);
    return (<div className="flex gap-2">
      <select value={isToken ? currentTokenPath : '__custom__'} onChange={(e) => {
            if (e.target.value === '__custom__') {
                onChange('');
            }
            else {
                onChange((0, cms_template_1.createTokenAlias)(e.target.value));
            }
        }} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
        {allowCustom && <option value="__custom__">Custom Value</option>}
        {availableTokens.map((token) => (<option key={token.path} value={token.path}>
            {token.label} ({token.path})
          </option>))}
      </select>

      {(!isToken || allowCustom) && (<input_1.Input type="text" value={isToken ? '' : value} onChange={(e) => onChange(e.target.value)} placeholder={`Custom ${category}`} className="w-32" disabled={isToken}/>)}
    </div>);
}
//# sourceMappingURL=token-picker.js.map
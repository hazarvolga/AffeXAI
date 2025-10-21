"use strict";
/**
 * TemplateCard Component
 *
 * Displays template preview with color scheme and metadata
 * Shows design token color scheme visually
 */
'use client';
/**
 * TemplateCard Component
 *
 * Displays template preview with color scheme and metadata
 * Shows design token color scheme visually
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateCard = TemplateCard;
exports.CompactTemplateCard = CompactTemplateCard;
const react_1 = __importDefault(require("react"));
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const DesignTokensProvider_1 = require("@/providers/DesignTokensProvider");
const token_resolver_1 = require("@/lib/cms/token-resolver");
const lucide_react_1 = require("lucide-react");
/**
 * Color Scheme Preview Component
 * Shows the template's color palette with resolved token values
 */
function ColorSchemePreview({ template }) {
    const { tokens } = (0, DesignTokensProvider_1.useDesignTokens)();
    // Resolve color scheme tokens to actual values
    const resolvedColors = (0, token_resolver_1.resolveColorScheme)(template.designSystem.colorScheme, tokens);
    const colorKeys = [
        'primary',
        'accent',
        'background',
        'foreground',
    ];
    return (<div className="flex gap-1">
      {colorKeys.map((key) => {
            const color = resolvedColors[key];
            if (!color)
                return null;
            // Convert HSL format to CSS
            const cssColor = color.includes(' ') ? `hsl(${color})` : color;
            return (<div key={key} className="h-6 w-6 rounded-full border border-border shadow-sm" style={{ backgroundColor: cssColor }} title={`${key}: ${color}`}/>);
        })}
    </div>);
}
/**
 * Template Category Badge
 */
function CategoryBadge({ category }) {
    const variants = {
        landing: { variant: 'default', label: 'Landing' },
        content: { variant: 'secondary', label: 'Content' },
        ecommerce: { variant: 'default', label: 'E-Commerce' },
        dashboard: { variant: 'secondary', label: 'Dashboard' },
        authentication: { variant: 'outline', label: 'Auth' },
        error: { variant: 'outline', label: 'Error' },
        portfolio: { variant: 'secondary', label: 'Portfolio' },
        custom: { variant: 'outline', label: 'Custom' },
    };
    const config = variants[category] || variants.custom;
    return (<badge_1.Badge variant={config.variant}>
      {config.label}
    </badge_1.Badge>);
}
/**
 * Main TemplateCard Component
 */
function TemplateCard({ template, onPreview, onApply, onSelect, selected = false, }) {
    return (<card_1.Card className={`group hover:shadow-lg transition-shadow cursor-pointer ${selected ? 'ring-2 ring-primary' : ''}`} onClick={() => onSelect?.(template)}>
      {/* Preview Image */}
      <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
        {template.preview?.thumbnail ? (<img src={template.preview.thumbnail} alt={template.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"/>) : (<div className="flex items-center justify-center h-full text-muted-foreground">
            <lucide_react_1.Eye className="h-12 w-12"/>
          </div>)}

        {/* Featured Badge */}
        {template.isFeatured && (<badge_1.Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">
            <lucide_react_1.Star className="h-3 w-3 mr-1"/>
            Featured
          </badge_1.Badge>)}

        {/* Block Count */}
        <badge_1.Badge className="absolute top-2 left-2 bg-black/50 text-white">
          {template.blocks.length} blocks
        </badge_1.Badge>
      </div>

      {/* Content */}
      <card_1.CardHeader>
        <div className="flex items-start justify-between gap-2">
          <card_1.CardTitle className="text-lg">{template.name}</card_1.CardTitle>
          <CategoryBadge category={template.category}/>
        </div>
        <card_1.CardDescription className="line-clamp-2">
          {template.description}
        </card_1.CardDescription>
      </card_1.CardHeader>

      <card_1.CardContent className="space-y-3">
        {/* Color Scheme */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground font-medium">Color Scheme</div>
          <ColorSchemePreview template={template}/>
        </div>

        {/* Supported Contexts */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground font-medium">Contexts</div>
          <div className="flex gap-1">
            {template.designSystem.supportedContexts.map((context) => (<badge_1.Badge key={context} variant="outline" className="text-xs">
                {context}
              </badge_1.Badge>))}
          </div>
        </div>

        {/* Usage Stats */}
        {template.usageCount > 0 && (<div className="flex items-center gap-1 text-xs text-muted-foreground">
            <lucide_react_1.Users className="h-3 w-3"/>
            <span>{template.usageCount} uses</span>
          </div>)}

        {/* Tags */}
        {template.metadata?.tags && template.metadata.tags.length > 0 && (<div className="flex flex-wrap gap-1">
            {template.metadata.tags.slice(0, 3).map((tag) => (<badge_1.Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </badge_1.Badge>))}
            {template.metadata.tags.length > 3 && (<badge_1.Badge variant="secondary" className="text-xs">
                +{template.metadata.tags.length - 3}
              </badge_1.Badge>)}
          </div>)}
      </card_1.CardContent>

      {/* Actions */}
      <card_1.CardFooter className="flex gap-2">
        <button_1.Button variant="outline" size="sm" className="flex-1" onClick={(e) => {
            e.stopPropagation();
            onPreview?.(template);
        }}>
          <lucide_react_1.Eye className="h-4 w-4 mr-2"/>
          Preview
        </button_1.Button>
        <button_1.Button size="sm" className="flex-1" onClick={(e) => {
            e.stopPropagation();
            onApply?.(template);
        }}>
          <lucide_react_1.Download className="h-4 w-4 mr-2"/>
          Apply
        </button_1.Button>
      </card_1.CardFooter>
    </card_1.Card>);
}
/**
 * Compact Template Card for sidebar
 */
function CompactTemplateCard({ template, onSelect, selected = false, }) {
    return (<div className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${selected ? 'ring-2 ring-primary' : ''}`} onClick={() => onSelect?.(template)}>
      <div className="flex gap-3">
        {/* Thumbnail */}
        <div className="w-16 h-16 rounded bg-muted flex-shrink-0 overflow-hidden">
          {template.preview?.thumbnail ? (<img src={template.preview.thumbnail} alt={template.name} className="object-cover w-full h-full"/>) : (<div className="flex items-center justify-center h-full">
              <lucide_react_1.Eye className="h-6 w-6 text-muted-foreground"/>
            </div>)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{template.name}</div>
          <div className="text-xs text-muted-foreground truncate">
            {template.blocks.length} blocks
          </div>
          <ColorSchemePreview template={template}/>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=template-card.js.map
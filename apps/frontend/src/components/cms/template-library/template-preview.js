"use strict";
/**
 * TemplatePreview Component
 *
 * Live preview of templates with resolved design tokens
 * Shows responsive views and token usage analytics
 */
'use client';
/**
 * TemplatePreview Component
 *
 * Live preview of templates with resolved design tokens
 * Shows responsive views and token usage analytics
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
exports.TemplatePreview = TemplatePreview;
exports.TemplatePreviewModal = TemplatePreviewModal;
const react_1 = __importStar(require("react"));
const DesignTokensProvider_1 = require("@/providers/DesignTokensProvider");
const token_resolver_1 = require("@/lib/cms/token-resolver");
const token_validator_1 = require("@/lib/cms/token-validator");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const card_1 = require("@/components/ui/card");
const tabs_1 = require("@/components/ui/tabs");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const viewportSizes = {
    desktop: { width: '100%', label: 'Desktop', icon: <lucide_react_1.Monitor className="h-4 w-4"/> },
    tablet: { width: '768px', label: 'Tablet', icon: <lucide_react_1.Tablet className="h-4 w-4"/> },
    mobile: { width: '375px', label: 'Mobile', icon: <lucide_react_1.Smartphone className="h-4 w-4"/> },
};
/**
 * Token Usage Stats Component
 */
function TokenUsageStats({ template }) {
    const usageReport = (0, token_validator_1.getTokenUsageReport)(template);
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="text-lg flex items-center gap-2">
          <lucide_react_1.Code className="h-5 w-5"/>
          Token Usage
        </card_1.CardTitle>
        <card_1.CardDescription>
          {usageReport.totalReferences} token references across {usageReport.uniqueTokens.length}{' '}
          unique tokens
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        {/* Token categories */}
        <div className="space-y-2">
          <div className="text-sm font-medium">By Category:</div>
          {Object.entries(usageReport.tokensByCategory).map(([category, tokens]) => (<div key={category} className="flex items-center justify-between">
              <badge_1.Badge variant="outline">{category}</badge_1.Badge>
              <span className="text-sm text-muted-foreground">{tokens.length} tokens</span>
            </div>))}
        </div>

        {/* Block usage */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Blocks Using Tokens:</div>
          <div className="space-y-1">
            {usageReport.blocksUsingTokens.map((block) => (<div key={block.blockId} className="text-xs text-muted-foreground">
                <span className="font-mono">{block.blockType}</span>: {block.tokenCount} tokens
              </div>))}
          </div>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
/**
 * Template Validation Display
 */
function TemplateValidation({ template }) {
    const { tokens } = (0, DesignTokensProvider_1.useDesignTokens)();
    const validation = (0, token_validator_1.validateTemplateTokens)(template, tokens);
    if (validation.isValid && validation.warnings.length === 0) {
        return (<alert_1.Alert>
        <lucide_react_1.CheckCircle className="h-4 w-4 text-green-600"/>
        <alert_1.AlertTitle>Valid Template</alert_1.AlertTitle>
        <alert_1.AlertDescription>
          All design tokens are correctly configured and available in the current theme.
        </alert_1.AlertDescription>
      </alert_1.Alert>);
    }
    return (<div className="space-y-3">
      {/* Errors */}
      {validation.errors.length > 0 && (<alert_1.Alert variant="destructive">
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertTitle>Validation Errors ({validation.errors.length})</alert_1.AlertTitle>
          <alert_1.AlertDescription>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {validation.errors.slice(0, 3).map((error, index) => (<li key={index} className="text-sm">
                  {error.message}
                </li>))}
              {validation.errors.length > 3 && (<li className="text-sm">...and {validation.errors.length - 3} more</li>)}
            </ul>
          </alert_1.AlertDescription>
        </alert_1.Alert>)}

      {/* Warnings */}
      {validation.warnings.length > 0 && (<alert_1.Alert>
          <lucide_react_1.Info className="h-4 w-4"/>
          <alert_1.AlertTitle>Warnings ({validation.warnings.length})</alert_1.AlertTitle>
          <alert_1.AlertDescription>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {validation.warnings.slice(0, 3).map((warning, index) => (<li key={index} className="text-sm">
                  {warning.message}
                </li>))}
              {validation.warnings.length > 3 && (<li className="text-sm">...and {validation.warnings.length - 3} more</li>)}
            </ul>
          </alert_1.AlertDescription>
        </alert_1.Alert>)}
    </div>);
}
/**
 * Color Scheme Display
 */
function ColorSchemeDisplay({ template }) {
    const { tokens } = (0, DesignTokensProvider_1.useDesignTokens)();
    const { resolveColorScheme } = require('@/lib/cms/token-resolver');
    const resolvedColors = resolveColorScheme(template.designSystem.colorScheme, tokens);
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="text-lg flex items-center gap-2">
          <lucide_react_1.Palette className="h-5 w-5"/>
          Color Scheme
        </card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(resolvedColors).map(([key, value]) => {
            if (!value)
                return null;
            const cssColor = value.includes(' ') ? `hsl(${value})` : value;
            return (<div key={key} className="space-y-2">
                <div className="text-sm font-medium capitalize">{key}</div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded border border-border shadow-sm" style={{ backgroundColor: cssColor }}/>
                  <div className="text-xs text-muted-foreground font-mono">{value}</div>
                </div>
              </div>);
        })}
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
/**
 * Main TemplatePreview Component
 */
function TemplatePreview({ template, onApply, onClose }) {
    const [viewport, setViewport] = (0, react_1.useState)('desktop');
    const [activeTab, setActiveTab] = (0, react_1.useState)('preview');
    const { tokens } = (0, DesignTokensProvider_1.useDesignTokens)();
    // Resolve all blocks with current tokens
    const resolvedBlocks = (0, token_resolver_1.resolveBlocks)(template.blocks, tokens);
    return (<div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between bg-background">
        <div>
          <h2 className="text-xl font-bold">{template.name}</h2>
          <p className="text-sm text-muted-foreground">{template.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button_1.Button onClick={() => onApply?.(template)}>
            <lucide_react_1.Download className="h-4 w-4 mr-2"/>
            Apply Template
          </button_1.Button>
          {onClose && (<button_1.Button variant="ghost" size="icon" onClick={onClose}>
              <lucide_react_1.X className="h-4 w-4"/>
            </button_1.Button>)}
        </div>
      </div>

      {/* Tabs */}
      <tabs_1.Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)} className="flex-1 flex flex-col">
        <tabs_1.TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <tabs_1.TabsTrigger value="preview" className="rounded-none">
            Preview
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="info" className="rounded-none">
            Template Info
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="tokens" className="rounded-none">
            Design Tokens
          </tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        {/* Preview Tab */}
        <tabs_1.TabsContent value="preview" className="flex-1 p-4 space-y-4">
          {/* Viewport Toggle */}
          <div className="flex items-center gap-2">
            {Object.keys(viewportSizes).map((size) => (<button_1.Button key={size} variant={viewport === size ? 'default' : 'outline'} size="sm" onClick={() => setViewport(size)}>
                {viewportSizes[size].icon}
                <span className="ml-2">{viewportSizes[size].label}</span>
              </button_1.Button>))}
          </div>

          {/* Preview Frame */}
          <div className="border rounded-lg overflow-hidden bg-muted/30">
            <div className="mx-auto transition-all" style={{ width: viewportSizes[viewport].width }}>
              <div className="bg-background min-h-[600px] p-8">
                {/* Render resolved blocks */}
                <div className="space-y-4">
                  {resolvedBlocks.map((block, index) => (<div key={block.id || index} className="border rounded-lg p-6 bg-card">
                      <div className="text-sm font-medium text-muted-foreground mb-2">
                        {block.type}
                      </div>
                      <div className="text-xs font-mono text-muted-foreground">
                        {JSON.stringify(block.properties, null, 2).slice(0, 200)}...
                      </div>
                    </div>))}
                </div>
              </div>
            </div>
          </div>
        </tabs_1.TabsContent>

        {/* Template Info Tab */}
        <tabs_1.TabsContent value="info" className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Metadata */}
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="text-lg">Template Details</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Category</div>
                  <badge_1.Badge>{template.category}</badge_1.Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Blocks</div>
                  <div className="font-medium">{template.blocks.length}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Usage Count</div>
                  <div className="font-medium">{template.usageCount}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Version</div>
                  <div className="font-medium">v{template.version}</div>
                </div>
              </card_1.CardContent>
            </card_1.Card>

            {/* Contexts */}
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="text-lg">Supported Contexts</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="flex flex-wrap gap-2">
                  {template.designSystem.supportedContexts.map((context) => (<badge_1.Badge key={context} variant="secondary">
                      {context}
                    </badge_1.Badge>))}
                </div>
                {template.designSystem.preferredMode && (<div className="mt-3">
                    <div className="text-sm text-muted-foreground">Preferred Mode</div>
                    <badge_1.Badge variant="outline">{template.designSystem.preferredMode}</badge_1.Badge>
                  </div>)}
              </card_1.CardContent>
            </card_1.Card>

            {/* Color Scheme */}
            <ColorSchemeDisplay template={template}/>

            {/* Validation */}
            <div>
              <TemplateValidation template={template}/>
            </div>
          </div>
        </tabs_1.TabsContent>

        {/* Tokens Tab */}
        <tabs_1.TabsContent value="tokens" className="flex-1 p-4 overflow-y-auto">
          <TokenUsageStats template={template}/>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>
    </div>);
}
/**
 * Full-screen Template Preview Modal
 */
function TemplatePreviewModal({ template, open, onOpenChange, onApply, }) {
    if (!template || !open)
        return null;
    return (<div className="fixed inset-0 z-50 bg-background">
      <TemplatePreview template={template} onApply={onApply} onClose={() => onOpenChange(false)}/>
    </div>);
}
//# sourceMappingURL=template-preview.js.map
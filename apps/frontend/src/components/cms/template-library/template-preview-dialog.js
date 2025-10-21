"use strict";
'use client';
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
exports.TemplatePreviewDialog = TemplatePreviewDialog;
const react_1 = __importStar(require("react"));
const dialog_1 = require("@/components/ui/dialog");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const scroll_area_1 = require("@/components/ui/scroll-area");
const lucide_react_1 = require("lucide-react");
/**
 * Template Preview Dialog
 *
 * Displays a comprehensive preview of a page template with:
 * - Responsive viewport preview
 * - Block structure view
 * - Design tokens view
 * - Template metadata
 */
function TemplatePreviewDialog({ template, open, onOpenChange, onApply, }) {
    const [viewport, setViewport] = (0, react_1.useState)('desktop');
    const [activeTab, setActiveTab] = (0, react_1.useState)('preview');
    if (!template) {
        return null;
    }
    const viewportDimensions = {
        desktop: { width: '100%', height: '600px' },
        tablet: { width: '768px', height: '600px' },
        mobile: { width: '375px', height: '600px' },
    };
    const renderBlockPreview = () => {
        return (<div className="space-y-4">
        {template.blocks.map((block, index) => (<div key={block.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <badge_1.Badge variant="outline" className="font-mono text-xs">
                  {index + 1}
                </badge_1.Badge>
                <span className="font-medium">{block.type}</span>
                <badge_1.Badge variant="secondary" className="text-xs">
                  {block.id}
                </badge_1.Badge>
              </div>
            </div>

            {/* Block Configuration Preview */}
            {block.config && Object.keys(block.config).length > 0 && (<div className="mt-3 space-y-2">
                <div className="text-xs text-muted-foreground font-medium">
                  Configuration:
                </div>
                <div className="bg-muted/50 rounded p-2 space-y-1">
                  {Object.entries(block.config).map(([key, value]) => (<div key={key} className="flex items-start gap-2 text-xs font-mono">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="text-foreground">
                        {typeof value === 'object'
                            ? JSON.stringify(value)
                            : String(value)}
                      </span>
                    </div>))}
                </div>
              </div>)}
          </div>))}
      </div>);
    };
    const renderDesignTokens = () => {
        const { tokens } = template.designSystem;
        return (<div className="space-y-6">
        {/* Colors */}
        {tokens.colors && (<div className="space-y-3">
            <div className="flex items-center gap-2">
              <lucide_react_1.Palette className="h-4 w-4 text-primary"/>
              <h4 className="font-medium">Colors</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(tokens.colors).map(([key, value]) => (<div key={key} className="border rounded-lg p-3 space-y-2 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{key}</span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground break-all">
                    {String(value)}
                  </div>
                </div>))}
            </div>
          </div>)}

        {/* Spacing */}
        {tokens.spacing && (<div className="space-y-3">
            <div className="flex items-center gap-2">
              <lucide_react_1.Layers className="h-4 w-4 text-primary"/>
              <h4 className="font-medium">Spacing</h4>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(tokens.spacing).map(([key, value]) => (<div key={key} className="border rounded p-2 text-center hover:bg-muted/50 transition-colors">
                  <div className="text-xs font-medium">{key}</div>
                  <div className="text-xs font-mono text-muted-foreground mt-1">
                    {String(value)}
                  </div>
                </div>))}
            </div>
          </div>)}

        {/* Typography */}
        {tokens.typography && (<div className="space-y-3">
            <div className="flex items-center gap-2">
              <lucide_react_1.Code className="h-4 w-4 text-primary"/>
              <h4 className="font-medium">Typography</h4>
            </div>
            <div className="space-y-2">
              {Object.entries(tokens.typography).map(([key, value]) => (<div key={key} className="border rounded p-2 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{key}</span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {String(value)}
                    </span>
                  </div>
                </div>))}
            </div>
          </div>)}
      </div>);
    };
    const renderVisualPreview = () => {
        const { width, height } = viewportDimensions[viewport];
        return (<div className="space-y-4">
        {/* Viewport Controls */}
        <div className="flex items-center justify-center gap-2 border-b pb-4">
          <button_1.Button variant={viewport === 'desktop' ? 'default' : 'outline'} size="sm" onClick={() => setViewport('desktop')}>
            <lucide_react_1.Monitor className="h-4 w-4 mr-2"/>
            Desktop
          </button_1.Button>
          <button_1.Button variant={viewport === 'tablet' ? 'default' : 'outline'} size="sm" onClick={() => setViewport('tablet')}>
            <lucide_react_1.Tablet className="h-4 w-4 mr-2"/>
            Tablet
          </button_1.Button>
          <button_1.Button variant={viewport === 'mobile' ? 'default' : 'outline'} size="sm" onClick={() => setViewport('mobile')}>
            <lucide_react_1.Smartphone className="h-4 w-4 mr-2"/>
            Mobile
          </button_1.Button>
        </div>

        {/* Preview Frame */}
        <div className="flex justify-center">
          <div className="border rounded-lg bg-background overflow-hidden transition-all duration-300" style={{ width, maxWidth: '100%' }}>
            <div className="bg-muted border-b px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"/>
                <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                <div className="w-3 h-3 rounded-full bg-green-500"/>
              </div>
              <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
                {template.name}
              </div>
            </div>

            <scroll_area_1.ScrollArea style={{ height }}>
              <div className="p-6 space-y-6">
                {template.blocks.map((block) => (<div key={block.id} className="border-2 border-dashed border-muted rounded-lg p-6 bg-muted/20">
                    <div className="flex items-center gap-2 mb-3">
                      <badge_1.Badge variant="outline">{block.type}</badge_1.Badge>
                      <span className="text-sm text-muted-foreground">
                        {block.id}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {block.type === 'hero' && '🎯 Hero Section'}
                      {block.type === 'text' && '📝 Text Content'}
                      {block.type === 'grid' && '📊 Grid Layout'}
                      {block.type === 'cta' && '🎬 Call to Action'}
                      {block.type === 'image' && '🖼️ Image Block'}
                      {block.type === 'form' && '📋 Form'}
                    </div>
                  </div>))}
              </div>
            </scroll_area_1.ScrollArea>
          </div>
        </div>
      </div>);
    };
    return (<dialog_1.Dialog open={open} onOpenChange={onOpenChange}>
      <dialog_1.DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle className="flex items-center gap-3">
            <lucide_react_1.Eye className="h-5 w-5"/>
            {template.name}
          </dialog_1.DialogTitle>
          <dialog_1.DialogDescription className="flex items-center gap-2 flex-wrap">
            <span>{template.description}</span>
            <badge_1.Badge variant="outline">{template.category}</badge_1.Badge>
            <badge_1.Badge variant="secondary">{template.blocks.length} blocks</badge_1.Badge>
          </dialog_1.DialogDescription>
        </dialog_1.DialogHeader>

        <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <tabs_1.TabsList className="grid w-full grid-cols-3">
            <tabs_1.TabsTrigger value="preview">
              <lucide_react_1.Eye className="h-4 w-4 mr-2"/>
              Visual Preview
            </tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="blocks">
              <lucide_react_1.Layers className="h-4 w-4 mr-2"/>
              Blocks ({template.blocks.length})
            </tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="tokens">
              <lucide_react_1.Palette className="h-4 w-4 mr-2"/>
              Design Tokens
            </tabs_1.TabsTrigger>
          </tabs_1.TabsList>

          <tabs_1.TabsContent value="preview" className="flex-1 mt-4">
            <scroll_area_1.ScrollArea className="h-full">
              {renderVisualPreview()}
            </scroll_area_1.ScrollArea>
          </tabs_1.TabsContent>

          <tabs_1.TabsContent value="blocks" className="flex-1 mt-4">
            <scroll_area_1.ScrollArea className="h-full">
              {renderBlockPreview()}
            </scroll_area_1.ScrollArea>
          </tabs_1.TabsContent>

          <tabs_1.TabsContent value="tokens" className="flex-1 mt-4">
            <scroll_area_1.ScrollArea className="h-full">
              {renderDesignTokens()}
            </scroll_area_1.ScrollArea>
          </tabs_1.TabsContent>
        </tabs_1.Tabs>

        <dialog_1.DialogFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Contexts:</span>
            {template.designSystem.supportedContexts.map((ctx) => (<badge_1.Badge key={ctx} variant="outline" className="text-xs">
                {ctx}
              </badge_1.Badge>))}
          </div>

          <div className="flex gap-2">
            <button_1.Button variant="outline" onClick={() => onOpenChange(false)}>
              <lucide_react_1.X className="h-4 w-4 mr-2"/>
              Kapat
            </button_1.Button>
            <button_1.Button onClick={() => {
            onApply?.(template);
            onOpenChange(false);
        }}>
              <lucide_react_1.Download className="h-4 w-4 mr-2"/>
              Şablonu Kullan
            </button_1.Button>
          </div>
        </dialog_1.DialogFooter>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
//# sourceMappingURL=template-preview-dialog.js.map
"use strict";
/**
 * TemplateLibrary Component
 *
 * Browse, filter, and apply page templates
 * Includes context filtering and search functionality
 */
'use client';
/**
 * TemplateLibrary Component
 *
 * Browse, filter, and apply page templates
 * Includes context filtering and search functionality
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
exports.TemplateLibrary = TemplateLibrary;
exports.TemplateLibraryModal = TemplateLibraryModal;
const react_1 = __importStar(require("react"));
const template_card_1 = require("./template-card");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const select_1 = require("@/components/ui/select");
const DesignTokensProvider_1 = require("@/providers/DesignTokensProvider");
const token_validator_1 = require("@/lib/cms/token-validator");
const lucide_react_1 = require("lucide-react");
/**
 * Category filter chips
 */
const categoryOptions = [
    { value: 'landing', label: 'Landing Pages' },
    { value: 'content', label: 'Content Pages' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'authentication', label: 'Authentication' },
    { value: 'error', label: 'Error Pages' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'custom', label: 'Custom' },
];
/**
 * Sort options
 */
const sortOptions = [
    { value: 'popular', label: 'Most Popular', icon: <lucide_react_1.TrendingUp className="h-4 w-4"/> },
    { value: 'recent', label: 'Recently Added', icon: <lucide_react_1.Clock className="h-4 w-4"/> },
    { value: 'name', label: 'Name', icon: <lucide_react_1.SortAsc className="h-4 w-4"/> },
];
function TemplateLibrary({ templates, onApplyTemplate, onPreviewTemplate, filterByContext = true, }) {
    const { context: currentContext, tokens } = (0, DesignTokensProvider_1.useDesignTokens)();
    // Filters state
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [selectedCategories, setSelectedCategories] = (0, react_1.useState)([]);
    const [selectedContext, setSelectedContext] = (0, react_1.useState)(filterByContext ? currentContext : 'all');
    const [sortBy, setSortBy] = (0, react_1.useState)('popular');
    const [showFeaturedOnly, setShowFeaturedOnly] = (0, react_1.useState)(false);
    // Filter and sort templates
    const filteredTemplates = (0, react_1.useMemo)(() => {
        let result = templates;
        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter((template) => template.name.toLowerCase().includes(query) ||
                template.description.toLowerCase().includes(query) ||
                template.metadata?.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
                template.metadata?.keywords?.some((keyword) => keyword.toLowerCase().includes(query)));
        }
        // Filter by category
        if (selectedCategories.length > 0) {
            result = result.filter((template) => selectedCategories.includes(template.category));
        }
        // Filter by context compatibility
        if (selectedContext !== 'all') {
            result = result.filter((template) => template.designSystem.supportedContexts.includes(selectedContext));
        }
        // Filter by featured
        if (showFeaturedOnly) {
            result = result.filter((template) => template.isFeatured);
        }
        // Sort
        switch (sortBy) {
            case 'popular':
                result = [...result].sort((a, b) => b.usageCount - a.usageCount);
                break;
            case 'recent':
                result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'name':
                result = [...result].sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        return result;
    }, [templates, searchQuery, selectedCategories, selectedContext, sortBy, showFeaturedOnly]);
    // Validate template compatibility with current context
    const getTemplateCompatibility = (template) => {
        if (selectedContext === 'all')
            return { isCompatible: true, warnings: [] };
        const validation = (0, token_validator_1.validateTemplateContext)(template, selectedContext, 'light', // Default to light mode for validation
        tokens);
        return {
            isCompatible: validation.isValid,
            warnings: validation.warnings,
        };
    };
    // Toggle category filter
    const toggleCategory = (category) => {
        setSelectedCategories((prev) => prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]);
    };
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Template Library</h2>
          <p className="text-muted-foreground">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Search and Sort */}
        <div className="flex gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <lucide_react_1.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <input_1.Input placeholder="Search templates..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9"/>
          </div>

          {/* Sort */}
          <select_1.Select value={sortBy} onValueChange={(v) => setSortBy(v)}>
            <select_1.SelectTrigger className="w-[180px]">
              <select_1.SelectValue />
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              {sortOptions.map((option) => (<select_1.SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    {option.icon}
                    {option.label}
                  </div>
                </select_1.SelectItem>))}
            </select_1.SelectContent>
          </select_1.Select>

          {/* Featured Toggle */}
          <button_1.Button variant={showFeaturedOnly ? 'default' : 'outline'} onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}>
            <lucide_react_1.Star className={`h-4 w-4 mr-2 ${showFeaturedOnly ? 'fill-current' : ''}`}/>
            Featured
          </button_1.Button>
        </div>

        {/* Context Filter */}
        {filterByContext && (<div className="flex items-center gap-2">
            <lucide_react_1.Filter className="h-4 w-4 text-muted-foreground"/>
            <span className="text-sm text-muted-foreground">Context:</span>
            <div className="flex gap-2">
              {['all', 'public', 'admin', 'portal'].map((ctx) => (<button_1.Button key={ctx} variant={selectedContext === ctx ? 'default' : 'outline'} size="sm" onClick={() => setSelectedContext(ctx)}>
                  {ctx === 'all' ? 'All' : ctx.charAt(0).toUpperCase() + ctx.slice(1)}
                </button_1.Button>))}
            </div>
          </div>)}

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((option) => (<badge_1.Badge key={option.value} variant={selectedCategories.includes(option.value) ? 'default' : 'outline'} className="cursor-pointer hover:bg-primary/90" onClick={() => toggleCategory(option.value)}>
              {option.label}
            </badge_1.Badge>))}
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (<div className="text-center py-16">
          <lucide_react_1.Search className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
          <h3 className="text-lg font-medium mb-2">No templates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search query
          </p>
        </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
                const compatibility = getTemplateCompatibility(template);
                return (<div key={template.id} className="relative">
                <template_card_1.TemplateCard template={template} onApply={onApplyTemplate} onPreview={onPreviewTemplate}/>

                {/* Compatibility Warning */}
                {!compatibility.isCompatible && selectedContext !== 'all' && (<badge_1.Badge variant="destructive" className="absolute top-2 left-2 z-10">
                    Incompatible with {selectedContext}
                  </badge_1.Badge>)}
              </div>);
            })}
        </div>)}
    </div>);
}
/**
 * Template Library Dialog/Modal Version
 */
function TemplateLibraryModal({ templates, open, onOpenChange, onApplyTemplate, }) {
    const handleApply = (template) => {
        onApplyTemplate?.(template);
        onOpenChange(false);
    };
    return (<div className={`fixed inset-0 z-50 ${open ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)}/>
      <div className="fixed inset-4 bg-background rounded-lg shadow-lg overflow-hidden">
        <div className="h-full overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Choose a Template</h2>
            <button_1.Button variant="ghost" onClick={() => onOpenChange(false)}>
              ✕
            </button_1.Button>
          </div>
          <TemplateLibrary templates={templates} onApplyTemplate={handleApply} filterByContext={true}/>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=template-library.js.map
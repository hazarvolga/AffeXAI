"use strict";
/**
 * TemplatePartsLibrary Component
 *
 * Browse and manage reusable template parts (header, footer, sidebar, etc.)
 */
'use client';
/**
 * TemplatePartsLibrary Component
 *
 * Browse and manage reusable template parts (header, footer, sidebar, etc.)
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
exports.TemplatePartsLibrary = TemplatePartsLibrary;
exports.CompactPartsLibrary = CompactPartsLibrary;
const react_1 = __importStar(require("react"));
const template_parts_1 = require("@/lib/cms/template-parts");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
/**
 * Part type icons
 */
const partTypeIcons = {
    header: <lucide_react_1.PanelTop className="h-4 w-4"/>,
    footer: <lucide_react_1.PanelBottom className="h-4 w-4"/>,
    sidebar: <lucide_react_1.SidebarIcon className="h-4 w-4"/>,
    section: <lucide_react_1.LayoutGrid className="h-4 w-4"/>,
    custom: <lucide_react_1.Layout className="h-4 w-4"/>,
};
/**
 * Part type labels
 */
const partTypeLabels = {
    header: 'Headers',
    footer: 'Footers',
    sidebar: 'Sidebars',
    section: 'Sections',
    custom: 'Custom',
};
/**
 * PartCard Component
 */
function PartCard({ part, onSelect, onApply, onPreview, selected = false, }) {
    const stats = (0, template_parts_1.getPartStatistics)(part);
    return (<card_1.Card className={`group hover:shadow-lg transition-shadow cursor-pointer ${selected ? 'ring-2 ring-primary' : ''}`} onClick={() => onSelect?.(part)}>
      {/* Preview */}
      <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
        {part.preview?.thumbnail ? (<img src={part.preview.thumbnail} alt={part.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"/>) : (<div className="flex items-center justify-center h-full text-muted-foreground">
            {partTypeIcons[part.type]}
          </div>)}

        {/* Block count badge */}
        <badge_1.Badge className="absolute top-2 left-2 bg-black/50 text-white">
          {stats.blockCount} block{stats.blockCount !== 1 ? 's' : ''}
        </badge_1.Badge>
      </div>

      {/* Content */}
      <card_1.CardHeader>
        <div className="flex items-start justify-between gap-2">
          <card_1.CardTitle className="text-base">{part.name}</card_1.CardTitle>
          <div className="flex items-center gap-1">
            {partTypeIcons[part.type]}
          </div>
        </div>
        <card_1.CardDescription className="text-xs line-clamp-2">
          {part.description}
        </card_1.CardDescription>
      </card_1.CardHeader>

      <card_1.CardContent className="space-y-3">
        {/* Statistics */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {stats.tokenReferences > 0 && (<div className="flex items-center gap-1">
              <span className="font-mono">{stats.tokenReferences}</span>
              <span>tokens</span>
            </div>)}
          {part.usageCount > 0 && (<div className="flex items-center gap-1">
              <lucide_react_1.TrendingUp className="h-3 w-3"/>
              <span>{part.usageCount} uses</span>
            </div>)}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button_1.Button variant="outline" size="sm" className="flex-1" onClick={(e) => {
            e.stopPropagation();
            onPreview?.(part);
        }}>
            <lucide_react_1.Eye className="h-3 w-3 mr-1"/>
            Preview
          </button_1.Button>
          <button_1.Button size="sm" className="flex-1" onClick={(e) => {
            e.stopPropagation();
            onApply?.(part);
        }}>
            <lucide_react_1.Download className="h-3 w-3 mr-1"/>
            Apply
          </button_1.Button>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
/**
 * Main TemplatePartsLibrary Component
 */
function TemplatePartsLibrary({ parts, onSelectPart, onApplyPart, onPreviewPart, }) {
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [selectedType, setSelectedType] = (0, react_1.useState)('all');
    const [sortBy, setSortBy] = (0, react_1.useState)('popular');
    // Filter and sort parts
    const filteredParts = (0, react_1.useMemo)(() => {
        let result = parts;
        // Search filter
        if (searchQuery) {
            result = (0, template_parts_1.searchParts)(result, searchQuery);
        }
        // Type filter
        if (selectedType !== 'all') {
            result = (0, template_parts_1.filterPartsByType)(result, selectedType);
        }
        // Sort
        if (sortBy === 'popular') {
            result = (0, template_parts_1.sortPartsByPopularity)(result);
        }
        else {
            result = (0, template_parts_1.sortPartsByDate)(result, 'desc');
        }
        return result;
    }, [parts, searchQuery, selectedType, sortBy]);
    // Count parts by type
    const partCounts = (0, react_1.useMemo)(() => {
        const counts = {
            header: 0,
            footer: 0,
            sidebar: 0,
            section: 0,
            custom: 0,
        };
        parts.forEach((part) => {
            counts[part.type]++;
        });
        return counts;
    }, [parts]);
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Template Parts</h2>
          <p className="text-muted-foreground">
            Reusable sections for your templates
          </p>
        </div>
        <button_1.Button>
          <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
          Create Part
        </button_1.Button>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Search and Sort */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <lucide_react_1.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <input_1.Input placeholder="Search parts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9"/>
          </div>

          <button_1.Button variant={sortBy === 'popular' ? 'default' : 'outline'} onClick={() => setSortBy('popular')}>
            <lucide_react_1.TrendingUp className="h-4 w-4 mr-2"/>
            Popular
          </button_1.Button>

          <button_1.Button variant={sortBy === 'recent' ? 'default' : 'outline'} onClick={() => setSortBy('recent')}>
            <lucide_react_1.Clock className="h-4 w-4 mr-2"/>
            Recent
          </button_1.Button>
        </div>

        {/* Type Tabs */}
        <tabs_1.Tabs value={selectedType} onValueChange={(v) => setSelectedType(v)}>
          <tabs_1.TabsList>
            <tabs_1.TabsTrigger value="all">
              All ({parts.length})
            </tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="header">
              <lucide_react_1.PanelTop className="h-4 w-4 mr-2"/>
              Headers ({partCounts.header})
            </tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="footer">
              <lucide_react_1.PanelBottom className="h-4 w-4 mr-2"/>
              Footers ({partCounts.footer})
            </tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="sidebar">
              <lucide_react_1.SidebarIcon className="h-4 w-4 mr-2"/>
              Sidebars ({partCounts.sidebar})
            </tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="section">
              <lucide_react_1.LayoutGrid className="h-4 w-4 mr-2"/>
              Sections ({partCounts.section})
            </tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="custom">
              <lucide_react_1.Layout className="h-4 w-4 mr-2"/>
              Custom ({partCounts.custom})
            </tabs_1.TabsTrigger>
          </tabs_1.TabsList>
        </tabs_1.Tabs>
      </div>

      {/* Parts Grid */}
      {filteredParts.length === 0 ? (<div className="text-center py-16">
          <lucide_react_1.Search className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
          <h3 className="text-lg font-medium mb-2">No parts found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part) => (<PartCard key={part.id} part={part} onSelect={onSelectPart} onApply={onApplyPart} onPreview={onPreviewPart}/>))}
        </div>)}
    </div>);
}
/**
 * Compact Parts Sidebar
 */
function CompactPartsLibrary({ parts, onSelectPart, type, }) {
    const filteredParts = type ? (0, template_parts_1.filterPartsByType)(parts, type) : parts;
    const sortedParts = (0, template_parts_1.sortPartsByPopularity)(filteredParts);
    return (<div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">
          {type ? partTypeLabels[type] : 'All Parts'}
        </h3>
        <badge_1.Badge variant="secondary">{sortedParts.length}</badge_1.Badge>
      </div>

      <div className="space-y-2">
        {sortedParts.slice(0, 10).map((part) => {
            const stats = (0, template_parts_1.getPartStatistics)(part);
            return (<div key={part.id} className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => onSelectPart?.(part)}>
              <div className="flex gap-3">
                {/* Icon */}
                <div className="w-10 h-10 rounded bg-muted flex-shrink-0 flex items-center justify-center">
                  {partTypeIcons[part.type]}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{part.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {stats.blockCount} block{stats.blockCount !== 1 ? 's' : ''}
                    {stats.tokenReferences > 0 && ` · ${stats.tokenReferences} tokens`}
                  </div>
                </div>
              </div>
            </div>);
        })}
      </div>
    </div>);
}
//# sourceMappingURL=template-parts-library.js.map
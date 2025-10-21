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
exports.ComponentLibrary = void 0;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const scroll_area_1 = require("@/components/ui/scroll-area");
const lucide_react_1 = require("lucide-react");
const navigation_blocks_1 = require("@/components/cms/blocks/navigation-blocks");
const hero_blocks_1 = require("@/components/cms/blocks/hero-blocks");
const content_blocks_1 = require("@/components/cms/blocks/content-blocks");
const footer_blocks_1 = require("@/components/cms/blocks/footer-blocks");
const element_blocks_1 = require("@/components/cms/blocks/element-blocks");
const content_variants_blocks_1 = require("@/components/cms/blocks/content-variants-blocks");
const special_blocks_1 = require("@/components/cms/blocks/special-blocks");
const ecommerce_blocks_1 = require("@/components/cms/blocks/ecommerce-blocks");
const gallery_blocks_1 = require("@/components/cms/blocks/gallery-blocks");
const blog_rss_blocks_1 = require("@/components/cms/blocks/blog-rss-blocks");
const social_sharing_blocks_1 = require("@/components/cms/blocks/social-sharing-blocks");
const ComponentLibrary = ({ onComponentSelect, onBlockSelect, displayMode = 'all' // Default to showing all content
 }) => {
    const [expandedCategories, setExpandedCategories] = (0, react_1.useState)({
        'navigation': false,
        'hero': false,
        'content-sections': false,
        'footer': false,
        'elements': false,
        'content-variants': false,
        'special': false,
        'ecommerce': false,
        'gallery': false,
        'blog-rss': false,
        'social-sharing': false,
        'layout': false,
        'content': false,
        'media': false,
    });
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };
    // Flatten all blocks and components for search
    const allItems = (0, react_1.useMemo)(() => {
        const items = [];
        // Add blocks
        [...navigation_blocks_1.navigationBlocks, ...hero_blocks_1.heroBlocks, ...content_blocks_1.contentBlocks, ...footer_blocks_1.footerBlocks, ...element_blocks_1.elementBlocks,
            ...content_variants_blocks_1.contentVariantBlocks, ...special_blocks_1.specialBlocks, ...ecommerce_blocks_1.ecommerceBlocks, ...gallery_blocks_1.galleryBlocks,
            ...blog_rss_blocks_1.blogRssBlocks, ...social_sharing_blocks_1.socialSharingBlocks].forEach(block => {
            items.push({
                id: block.id,
                name: block.name,
                description: block.description,
                category: block.category,
                type: 'block',
                data: block
            });
        });
        // Add components only if displayMode is not 'blocks'
        if (displayMode !== 'blocks') {
            const componentCategories = [
                {
                    id: 'layout',
                    name: 'Page Layout Components',
                    description: 'Structure and organize your page content',
                    type: 'basic',
                    icon: <lucide_react_1.Grid3X3 className="h-4 w-4"/>,
                    components: [
                        {
                            id: 'container',
                            type: 'container',
                            name: 'Container',
                            description: 'Group components together with layout options',
                            icon: 'C',
                        },
                        {
                            id: 'grid',
                            type: 'grid',
                            name: 'Grid',
                            description: 'Responsive grid layout for organizing content',
                            icon: 'G',
                        },
                        {
                            id: 'card',
                            type: 'card',
                            name: 'Card',
                            description: 'Content card with consistent styling',
                            icon: 'C',
                        },
                    ]
                },
                {
                    id: 'content',
                    name: 'Content Components',
                    description: 'Text and interactive elements',
                    type: 'basic',
                    icon: <lucide_react_1.Type className="h-4 w-4"/>,
                    components: [
                        {
                            id: 'text',
                            type: 'text',
                            name: 'Text',
                            description: 'Add headings, paragraphs, or other text content',
                            icon: 'T',
                        },
                        {
                            id: 'button',
                            type: 'button',
                            name: 'Button',
                            description: 'Add a button for actions or navigation',
                            icon: 'B',
                        },
                    ]
                },
                {
                    id: 'media',
                    name: 'Media Components',
                    description: 'Images and multimedia elements',
                    type: 'basic',
                    icon: <lucide_react_1.Image className="h-4 w-4"/>,
                    components: [
                        {
                            id: 'image',
                            type: 'image',
                            name: 'Image',
                            description: 'Add an image with optional caption',
                            icon: 'I',
                        },
                    ]
                }
            ];
            componentCategories.forEach(category => {
                if (category.components) {
                    category.components.forEach(component => {
                        items.push({
                            id: component.id,
                            name: component.name,
                            description: component.description,
                            category: category.name,
                            type: 'component',
                            data: component
                        });
                    });
                }
            });
        }
        return items;
    }, [displayMode]);
    // Filter items based on search query
    const filteredItems = (0, react_1.useMemo)(() => {
        if (!searchQuery.trim())
            return null;
        const query = searchQuery.toLowerCase();
        return allItems.filter(item => item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query));
    }, [allItems, searchQuery]);
    const categories = [
        {
            id: 'navigation',
            name: 'Navigation Blocks',
            description: 'Pre-built navigation components',
            type: 'block',
            icon: <lucide_react_1.Layers className="h-4 w-4"/>,
            blocks: navigation_blocks_1.navigationBlocks,
        },
        {
            id: 'hero',
            name: 'Hero Blocks',
            description: 'Eye-catching hero sections',
            type: 'block',
            icon: <lucide_react_1.Square className="h-4 w-4"/>,
            blocks: hero_blocks_1.heroBlocks,
        },
        {
            id: 'content-sections',
            name: 'Content Blocks',
            description: 'Various content section layouts',
            type: 'block',
            icon: <lucide_react_1.Type className="h-4 w-4"/>,
            blocks: content_blocks_1.contentBlocks,
        },
        {
            id: 'footer',
            name: 'Footer Blocks',
            description: 'Pre-built footer components',
            type: 'block',
            icon: <lucide_react_1.Square className="h-4 w-4"/>,
            blocks: footer_blocks_1.footerBlocks,
        },
        {
            id: 'elements',
            name: 'Element Blocks',
            description: 'Individual UI elements',
            type: 'block',
            icon: <lucide_react_1.Circle className="h-4 w-4"/>,
            blocks: element_blocks_1.elementBlocks,
        },
        {
            id: 'content-variants',
            name: 'Content Variant Blocks',
            description: 'Different content presentation styles',
            type: 'block',
            icon: <lucide_react_1.Type className="h-4 w-4"/>,
            blocks: content_variants_blocks_1.contentVariantBlocks,
        },
        {
            id: 'special',
            name: 'Special Blocks',
            description: 'Interactive and specialized components',
            type: 'block',
            icon: <lucide_react_1.Circle className="h-4 w-4"/>,
            blocks: special_blocks_1.specialBlocks,
        },
        {
            id: 'ecommerce',
            name: 'E-commerce Blocks',
            description: 'Product and shopping components',
            type: 'block',
            icon: <lucide_react_1.ShoppingCart className="h-4 w-4"/>,
            blocks: ecommerce_blocks_1.ecommerceBlocks,
        },
        {
            id: 'gallery',
            name: 'Gallery Blocks',
            description: 'Image and media展示 components',
            type: 'block',
            icon: <lucide_react_1.Image className="h-4 w-4"/>,
            blocks: gallery_blocks_1.galleryBlocks,
        },
        {
            id: 'blog-rss',
            name: 'Blog & RSS Blocks',
            description: 'Content and news展示 components',
            type: 'block',
            icon: <lucide_react_1.Rss className="h-4 w-4"/>,
            blocks: blog_rss_blocks_1.blogRssBlocks,
        },
        {
            id: 'social-sharing',
            name: 'Social Sharing Blocks',
            description: 'Social media integration components',
            type: 'block',
            icon: <lucide_react_1.Share2 className="h-4 w-4"/>,
            blocks: social_sharing_blocks_1.socialSharingBlocks,
        }
    ];
    const componentCategories = [
        {
            id: 'layout',
            name: 'Page Layout Components',
            description: 'Structure and organize your page content',
            type: 'basic',
            icon: <lucide_react_1.Grid3X3 className="h-4 w-4"/>,
            components: [
                {
                    id: 'container',
                    type: 'container',
                    name: 'Container',
                    description: 'Group components together with layout options',
                    icon: 'C',
                },
                {
                    id: 'grid',
                    type: 'grid',
                    name: 'Grid',
                    description: 'Responsive grid layout for organizing content',
                    icon: 'G',
                },
                {
                    id: 'card',
                    type: 'card',
                    name: 'Card',
                    description: 'Content card with consistent styling',
                    icon: 'C',
                },
            ]
        },
        {
            id: 'content',
            name: 'Content Components',
            description: 'Text and interactive elements',
            type: 'basic',
            icon: <lucide_react_1.Type className="h-4 w-4"/>,
            components: [
                {
                    id: 'text',
                    type: 'text',
                    name: 'Text',
                    description: 'Add headings, paragraphs, or other text content',
                    icon: 'T',
                },
                {
                    id: 'button',
                    type: 'button',
                    name: 'Button',
                    description: 'Add a button for actions or navigation',
                    icon: 'B',
                },
            ]
        },
        {
            id: 'media',
            name: 'Media Components',
            description: 'Images and multimedia elements',
            type: 'basic',
            icon: <lucide_react_1.Image className="h-4 w-4"/>,
            components: [
                {
                    id: 'image',
                    type: 'image',
                    name: 'Image',
                    description: 'Add an image with optional caption',
                    icon: 'I',
                },
            ]
        }
    ];
    // Filter categories based on display mode
    const filteredCategories = (0, react_1.useMemo)(() => {
        if (displayMode === 'components') {
            return []; // No block categories in components mode
        }
        else if (displayMode === 'blocks') {
            return categories; // Only block categories in blocks mode
        }
        else {
            return [...componentCategories, ...categories]; // All categories in all mode
        }
    }, [displayMode]);
    return (<card_1.Card className="h-full flex flex-col">
      <card_1.CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <card_1.CardTitle>Component Library</card_1.CardTitle>
          <div className="relative w-48">
            <lucide_react_1.Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
            <input_1.Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-8"/>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Add components and blocks to your page
        </p>
      </card_1.CardHeader>
      <card_1.CardContent className="flex-1 overflow-hidden p-0">
        <scroll_area_1.ScrollArea className="h-full px-4 pb-4">
          {filteredItems && filteredItems.length > 0 ? (
        // Show search results
        <div className="space-y-2">
              <h3 className="text-sm font-medium">Search Results</h3>
              {filteredItems.map((item) => (<button_1.Button key={`${item.type}-${item.id}`} variant="outline" className="w-full justify-start h-auto py-3 px-4 hover:bg-accent transition-colors" onClick={() => {
                    if (item.type === 'block' && onBlockSelect) {
                        onBlockSelect(item.data);
                    }
                    else if (item.type === 'component' && displayMode !== 'blocks') {
                        onComponentSelect(item.data.type);
                    }
                }}>
                  <div className="text-left">
                    <div className="font-medium">{item.name}</div>
                    {/* Hidden search result description - can be restored later if needed */}
                    <div className="text-xs text-muted-foreground hidden">{item.description}</div>
                    {/* Hidden category info - can be restored later if needed */}
                    <div className="text-xs text-muted-foreground mt-1 hidden">Category: {item.category}</div>
                  </div>

                </button_1.Button>))}
            </div>) : filteredItems && filteredItems.length === 0 ? (
        // No search results
        <div className="text-center py-8 text-muted-foreground">
              <lucide_react_1.Search className="mx-auto h-8 w-8"/>
              <p className="mt-2">No components or blocks found</p>
              {/* Hidden help text - can be restored later if needed */}
              <p className="text-xs mt-1 hidden">Try adjusting your search query</p>
            </div>) : (
        // Show categories
        <div className="space-y-4">
              {filteredCategories.map((category) => (<div key={category.id} className="space-y-2">
                  <button_1.Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent" onClick={() => toggleCategory(category.id)}>
                    <div className="flex items-center gap-2 p-2">
                      {category.icon}
                      <div className="text-left">
                        <div className="font-medium">{category.name}</div>
                        {/* Hidden category description - can be restored later if needed */}
                        <div className="text-xs text-muted-foreground hidden">{category.description}</div>
                      </div>

                    </div>
                    {expandedCategories[category.id] ? (<lucide_react_1.ChevronDown className="h-4 w-4 mr-2"/>) : (<lucide_react_1.ChevronRight className="h-4 w-4 mr-2"/>)}
                  </button_1.Button>
                  
                  {expandedCategories[category.id] && (<div className="ml-6 space-y-2">
                      {category.blocks?.map((block) => (<button_1.Button key={block.id} variant="outline" className="w-full justify-start h-auto py-3 px-4 hover:bg-accent transition-colors" onClick={() => onBlockSelect && onBlockSelect(block)}>
                          <div className="text-left">
                            <div className="font-medium">{block.name}</div>
                            {/* Hidden block description - can be restored later if needed */}
                            <div className="text-xs text-muted-foreground hidden">{block.description}</div>
                          </div>

                        </button_1.Button>))}
                      {category.components?.map((component) => (<button_1.Button key={component.id} variant="outline" className="w-full justify-start h-auto py-3 px-4 hover:bg-accent transition-colors" onClick={() => onComponentSelect(component.type)}>
                          <div className="text-left">
                            <div className="font-medium">{component.name}</div>
                            {/* Hidden description - can be restored later if needed */}
                            <div className="text-xs text-muted-foreground hidden">{component.description}</div>
                          </div>

                        </button_1.Button>))}
                    </div>)}
                </div>))}
            </div>)}
        </scroll_area_1.ScrollArea>
      </card_1.CardContent>
    </card_1.Card>);
};
exports.ComponentLibrary = ComponentLibrary;
exports.default = exports.ComponentLibrary;
//# sourceMappingURL=component-library.js.map
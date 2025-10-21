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
exports.EditorCanvas = void 0;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const editor_context_1 = require("./editor-context");
const preview_context_1 = require("@/components/cms/preview-context");
// Import all prebuild components
const navigation_blocks_1 = require("@/components/cms/blocks/navigation-blocks");
const hero_blocks_1 = require("@/components/cms/blocks/hero-blocks");
const content_blocks_1 = require("@/components/cms/blocks/content-blocks");
const content_variants_blocks_1 = require("@/components/cms/blocks/content-variants-blocks");
const element_blocks_1 = require("@/components/cms/blocks/element-blocks");
const gallery_blocks_1 = require("@/components/cms/blocks/gallery-blocks");
const footer_blocks_1 = require("@/components/cms/blocks/footer-blocks");
const ecommerce_blocks_1 = require("@/components/cms/blocks/ecommerce-blocks");
const blog_rss_blocks_1 = require("@/components/cms/blocks/blog-rss-blocks");
const social_sharing_blocks_1 = require("@/components/cms/blocks/social-sharing-blocks");
const special_blocks_1 = require("@/components/cms/blocks/special-blocks");
const testimonials_blocks_1 = require("@/components/cms/blocks/testimonials-blocks");
const features_blocks_1 = require("@/components/cms/blocks/features-blocks");
const stats_blocks_1 = require("@/components/cms/blocks/stats-blocks");
const pricing_blocks_1 = require("@/components/cms/blocks/pricing-blocks");
const rating_blocks_1 = require("@/components/cms/blocks/rating-blocks");
const progress_blocks_1 = require("@/components/cms/blocks/progress-blocks");
// Component Registry - Maps component types to their React components
const componentRegistry = {};
// Build registry from all block arrays
const allBlockArrays = [
    navigation_blocks_1.navigationBlocks,
    hero_blocks_1.heroBlocks,
    content_blocks_1.contentBlocks,
    content_variants_blocks_1.contentVariantBlocks,
    element_blocks_1.elementBlocks,
    gallery_blocks_1.galleryBlocks,
    footer_blocks_1.footerBlocks,
    ecommerce_blocks_1.ecommerceBlocks,
    blog_rss_blocks_1.blogRssBlocks,
    social_sharing_blocks_1.socialSharingBlocks,
    special_blocks_1.specialBlocks,
    testimonials_blocks_1.testimonialsBlocks,
    features_blocks_1.featuresBlocks,
    stats_blocks_1.statsBlocks,
    pricing_blocks_1.pricingBlocks,
    rating_blocks_1.ratingBlocks,
    progress_blocks_1.progressBlocks,
];
allBlockArrays.forEach((blockArray) => {
    blockArray.forEach((block) => {
        componentRegistry[block.id] = block.component;
    });
});
const EditorCanvas = ({ components, onComponentUpdate, onComponentDelete, onComponentSelect, selectedComponentId, onMoveUp, onMoveDown, onReorderComponents, isPreviewMode = false, isFullWidth = false, // NEW: Default to boxed layout
 }) => {
    const [dragOverId, setDragOverId] = (0, react_1.useState)(null);
    const [copiedComponent, setCopiedComponent] = (0, react_1.useState)(null);
    const [isDraggingPrebuild, setIsDraggingPrebuild] = (0, react_1.useState)(false);
    // Sort components by orderIndex for consistent rendering order
    const sortedComponents = [...components].sort((a, b) => {
        const orderA = a.orderIndex ?? 0;
        const orderB = b.orderIndex ?? 0;
        return orderA - orderB;
    });
    // Copy component to clipboard
    const handleCopyComponent = (0, react_1.useCallback)((component) => {
        if (component.locked)
            return; // Can't copy locked components
        setCopiedComponent(component);
    }, []);
    // Paste component from clipboard
    const handlePasteComponent = (0, react_1.useCallback)(() => {
        if (copiedComponent) {
            const newComponent = {
                ...copiedComponent,
                id: `comp-${Date.now()}`, // Generate new ID
            };
            // Add to components (this would be handled by parent in a real implementation)
            // For now, we'll just log it
            console.log('Pasting component:', newComponent);
        }
    }, [copiedComponent]);
    const renderComponent = (component) => {
        const isSelected = selectedComponentId === component.id;
        const isDragOver = dragOverId === component.id;
        const isLocked = component.locked;
        const componentIndex = sortedComponents.findIndex(c => c.id === component.id);
        const isFirst = componentIndex === 0;
        const isLast = componentIndex === sortedComponents.length - 1;
        const baseClasses = `
      relative ${!isPreviewMode ? 'border-2 border-dashed border-transparent' : ''} rounded
      ${!isPreviewMode && isSelected ? 'border-primary ring-2 ring-primary/20' : ''}
      ${!isPreviewMode && isDragOver ? 'border-primary bg-primary/5' : ''}
      ${isLocked ? 'opacity-75' : ''}
      transition-all duration-200
    `;
        const handleClick = (e) => {
            e.stopPropagation();
            // Can't select in preview mode or locked components
            if (isPreviewMode || isLocked)
                return;
            onComponentSelect(component.id, component.type);
        };
        const handleDelete = (e) => {
            e.stopPropagation();
            onComponentDelete(component.id);
        };
        const handleCopy = (e) => {
            e.stopPropagation();
            handleCopyComponent(component);
        };
        const handleMoveUp = (e) => {
            e.stopPropagation();
            onMoveUp && onMoveUp(component.id);
        };
        const handleMoveDown = (e) => {
            e.stopPropagation();
            onMoveDown && onMoveDown(component.id);
        };
        const componentWithHandlers = {
            ...component.props,
            id: component.id,
            key: component.id,
            className: `${component.props.className || ''} ${baseClasses}`,
            onClick: handleClick,
        };
        // Render action buttons
        const renderActionButtons = () => {
            // Hide buttons in preview mode
            if (isPreviewMode || isLocked || !isSelected)
                return null;
            return (<div className="absolute -top-2 -right-2 flex space-x-1 bg-background p-1 rounded shadow-md z-10">
          {onMoveUp && !isFirst && (<button_1.Button variant="secondary" size="sm" onClick={handleMoveUp} className="h-6 px-2 text-xs">
              ↑
            </button_1.Button>)}
          {onMoveDown && !isLast && (<button_1.Button variant="secondary" size="sm" onClick={handleMoveDown} className="h-6 px-2 text-xs">
              ↓
            </button_1.Button>)}
          <button_1.Button variant="secondary" size="sm" onClick={handleCopy} className="h-6 px-2 text-xs">
            Copy
          </button_1.Button>
          <button_1.Button variant="destructive" size="sm" onClick={handleDelete} className="h-6 px-2 text-xs">
            Delete
          </button_1.Button>
        </div>);
        };
        // All components are now prebuild blocks from the registry
        const ComponentToRender = componentRegistry[component.type];
        if (ComponentToRender) {
            return (<div key={component.id} className={baseClasses} onClick={handleClick}>
          <ComponentToRender {...component.props} props={component.props}/>
          {renderActionButtons()}
          {isLocked && (<div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-full p-1">
              <lucide_react_1.Lock className="h-3 w-3"/>
            </div>)}
        </div>);
        }
        // Unknown component type
        return (<div key={component.id} className="p-4 text-center text-muted-foreground border border-dashed rounded bg-red-50">
        <p className="text-sm text-red-600 font-medium">Unknown component type: {component.type}</p>
        <p className="text-xs text-red-500 mt-1">This component is not registered in the component registry</p>
      </div>);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        // Check if dragging a prebuild component
        const types = e.dataTransfer.types;
        if (types.includes('application/json')) {
            setIsDraggingPrebuild(true);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setDragOverId(null);
        setIsDraggingPrebuild(false);
        // Try to get prebuild component data first
        try {
            const jsonData = e.dataTransfer.getData('application/json');
            if (jsonData) {
                const data = JSON.parse(jsonData);
                if (data.type === 'prebuild-component') {
                    // Handle prebuild component drop
                    const event = new CustomEvent('addPrebuildComponentAtPosition', {
                        detail: {
                            componentId: data.componentId,
                            defaultProps: data.defaultProps,
                            parentId: null,
                            index: components.length,
                        },
                    });
                    window.dispatchEvent(event);
                    return;
                }
            }
        }
        catch (err) {
            console.error('Failed to parse drop data:', err);
        }
        // Fallback to existing component reordering
        if (onReorderComponents) {
            const componentId = e.dataTransfer.getData('componentId');
            if (componentId) {
                // Drop at root level (parentId = null, append to end)
                onReorderComponents(componentId, null, components.length);
            }
        }
    };
    // Calculate depth for a component in the tree
    const getComponentDepth = (componentId, currentDepth = 0) => {
        for (const comp of components) {
            if (comp.id === componentId) {
                if (!comp.parentId)
                    return 0;
                return getComponentDepth(comp.parentId, currentDepth + 1);
            }
        }
        return currentDepth;
    };
    return (<preview_context_1.PreviewProvider initialMode={isPreviewMode ? "preview" : "edit"}>
      <editor_context_1.EditorProvider onComponentUpdate={onComponentUpdate}>
        <card_1.Card className="h-full flex flex-col">
          <card_1.CardContent className={`flex-1 p-4 overflow-auto h-full transition-colors ${isDraggingPrebuild ? 'bg-primary/5 border-2 border-dashed border-primary' : ''}`} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={() => {
            setDragOverId(null);
            setIsDraggingPrebuild(false);
        }}>
            {sortedComponents.length === 0 ? (<div className="flex items-center justify-center h-full border-2 border-dashed border-muted-foreground/30 rounded-lg">
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">No blocks yet</p>
                  <p className="text-sm text-muted-foreground/70">Drag and drop blocks from the Blocks panel to start building</p>
                </div>
              </div>) : (
        // Container wrapper - Full Width vs Boxed
        <div className={isFullWidth ? 'w-full' : 'container mx-auto max-w-screen-xl px-4'}>
                <div className="space-y-4">
                  {sortedComponents.map((component) => renderComponent(component))}
                </div>
              </div>)}
          </card_1.CardContent>
        </card_1.Card>
      </editor_context_1.EditorProvider>
    </preview_context_1.PreviewProvider>);
};
exports.EditorCanvas = EditorCanvas;
exports.default = exports.EditorCanvas;
//# sourceMappingURL=editor-canvas.js.map
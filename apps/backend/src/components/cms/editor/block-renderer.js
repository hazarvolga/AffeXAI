"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockRenderer = void 0;
const react_1 = __importDefault(require("react"));
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
const testimonials_blocks_1 = require("@/components/cms/blocks/testimonials-blocks");
const features_blocks_1 = require("@/components/cms/blocks/features-blocks");
const stats_blocks_1 = require("@/components/cms/blocks/stats-blocks");
const pricing_blocks_1 = require("@/components/cms/blocks/pricing-blocks");
const rating_blocks_1 = require("@/components/cms/blocks/rating-blocks");
const progress_blocks_1 = require("@/components/cms/blocks/progress-blocks");
const components_registry_1 = require("@/lib/cms/components-registry");
const editor_context_1 = require("./editor-context"); // Import EditorProvider
const BlockRenderer = ({ blockId, props }) => {
    // Normalize legacy IDs
    const normalizedBlockId = (0, components_registry_1.normalizeComponentId)(blockId);
    // Create a map of all blocks by their ID
    const allBlocks = [
        ...navigation_blocks_1.navigationBlocks,
        ...hero_blocks_1.heroBlocks,
        ...content_blocks_1.contentBlocks,
        ...footer_blocks_1.footerBlocks,
        ...element_blocks_1.elementBlocks,
        ...content_variants_blocks_1.contentVariantBlocks,
        ...special_blocks_1.specialBlocks,
        ...ecommerce_blocks_1.ecommerceBlocks,
        ...gallery_blocks_1.galleryBlocks,
        ...blog_rss_blocks_1.blogRssBlocks,
        ...social_sharing_blocks_1.socialSharingBlocks,
        ...testimonials_blocks_1.testimonialsBlocks,
        ...features_blocks_1.featuresBlocks,
        ...stats_blocks_1.statsBlocks,
        ...pricing_blocks_1.pricingBlocks,
        ...rating_blocks_1.ratingBlocks,
        ...progress_blocks_1.progressBlocks,
    ];
    const blockMap = allBlocks.reduce((acc, block) => {
        acc[block.id] = block;
        return acc;
    }, {});
    const block = blockMap[normalizedBlockId];
    if (!block) {
        return (<div className="p-4 text-center text-red-500 border-2 border-red-300 border-dashed rounded bg-red-50">
        <p className="font-semibold">Unknown component type: {blockId}</p>
        {blockId !== normalizedBlockId && (<p className="text-sm mt-1">Normalized to: {normalizedBlockId}</p>)}
        <p className="text-xs mt-2 text-muted-foreground">
          This component is not registered in the component registry
        </p>
      </div>);
    }
    // Render the actual block component with props
    const BlockComponent = block.component;
    // Wrap the block component with EditorProvider
    return (<editor_context_1.EditorProvider onComponentUpdate={() => { }}>
      <BlockComponent props={props}/>
    </editor_context_1.EditorProvider>);
};
exports.BlockRenderer = BlockRenderer;
exports.default = exports.BlockRenderer;
//# sourceMappingURL=block-renderer.js.map
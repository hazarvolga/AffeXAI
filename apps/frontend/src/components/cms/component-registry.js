"use strict";
// Component Registry
// Centralized configuration for all CMS components and blocks
Object.defineProperty(exports, "__esModule", { value: true });
exports.allBlockConfigs = exports.themeConfig = exports.motionPresets = exports.blockRegistry = exports.componentRegistry = void 0;
const text_component_1 = require("./text-component");
const button_component_1 = require("./button-component");
const image_component_1 = require("./image-component");
const container_component_1 = require("./container-component");
const card_component_1 = require("./card-component");
const grid_component_1 = require("./grid-component");
// Import all block components
const navigation_blocks_1 = require("./blocks/navigation-blocks");
const hero_blocks_1 = require("./blocks/hero-blocks");
const content_blocks_1 = require("./blocks/content-blocks");
const footer_blocks_1 = require("./blocks/footer-blocks");
const element_blocks_1 = require("./blocks/element-blocks");
const content_variants_blocks_1 = require("./blocks/content-variants-blocks");
const special_blocks_1 = require("./blocks/special-blocks");
const ecommerce_blocks_1 = require("./blocks/ecommerce-blocks");
const gallery_blocks_1 = require("./blocks/gallery-blocks");
const blog_rss_blocks_1 = require("./blocks/blog-rss-blocks");
const social_sharing_blocks_1 = require("./blocks/social-sharing-blocks");
// Basic component registry
exports.componentRegistry = {
    text: text_component_1.TextComponent,
    button: button_component_1.ButtonComponent,
    image: image_component_1.ImageComponent,
    container: container_component_1.ContainerComponent,
    card: card_component_1.CardComponent,
    grid: grid_component_1.GridComponent,
};
// Block registry
exports.blockRegistry = {
    ...navigation_blocks_1.navigationBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block.component }), {}),
    ...hero_blocks_1.heroBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block.component }), {}),
    ...content_blocks_1.contentBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block.component }), {}),
    ...footer_blocks_1.footerBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block.component }), {}),
    ...element_blocks_1.elementBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block.component }), {}),
    ...content_variants_blocks_1.contentVariantBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block.component }), {}),
    ...special_blocks_1.specialBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block.component }), {}),
    ...ecommerce_blocks_1.ecommerceBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block.component }), {}),
    ...gallery_blocks_1.galleryBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block.component }), {}),
    ...blog_rss_blocks_1.blogRssBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block.component }), {}),
    ...social_sharing_blocks_1.socialSharingBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block.component }), {}),
};
// Motion presets for animations
exports.motionPresets = {
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 }
    },
    slideInLeft: {
        initial: { x: -50, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.3 }
    },
    slideInRight: {
        initial: { x: 50, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.3 }
    },
    slideInUp: {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.3 }
    },
    slideInDown: {
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.3 }
    },
    scaleIn: {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.3 }
    },
    bounce: {
        initial: { y: 0 },
        animate: { y: [-10, 0, -5, 0] },
        transition: { duration: 0.5 }
    }
};
// Theme configuration
exports.themeConfig = {
    colors: {
        primary: 'bg-blue-500',
        secondary: 'bg-gray-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
        background: 'bg-white',
        foreground: 'text-gray-900',
        muted: 'text-gray-500',
    },
    spacing: {
        xs: 'p-1',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
        '2xl': 'p-10',
    },
    borderRadius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
    },
    shadows: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
        '2xl': 'shadow-2xl',
    }
};
// Export all block configs for easy access
exports.allBlockConfigs = {
    ...navigation_blocks_1.navigationBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block }), {}),
    ...hero_blocks_1.heroBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block }), {}),
    ...content_blocks_1.contentBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block }), {}),
    ...footer_blocks_1.footerBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block }), {}),
    ...element_blocks_1.elementBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block }), {}),
    ...content_variants_blocks_1.contentVariantBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block }), {}),
    ...special_blocks_1.specialBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block }), {}),
    ...ecommerce_blocks_1.ecommerceBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block }), {}),
    ...gallery_blocks_1.galleryBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block }), {}),
    ...blog_rss_blocks_1.blogRssBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block }), {}),
    ...social_sharing_blocks_1.socialSharingBlocks.reduce((acc, block) => ({ ...acc, [block.id]: block }), {}),
};
exports.default = {
    componentRegistry: exports.componentRegistry,
    blockRegistry: exports.blockRegistry,
    motionPresets: exports.motionPresets,
    themeConfig: exports.themeConfig,
    allBlockConfigs: exports.allBlockConfigs
};
//# sourceMappingURL=component-registry.js.map
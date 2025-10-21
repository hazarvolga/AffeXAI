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
exports.PageBuilderRendererSSR = exports.PageBuilderRenderer = void 0;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
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
// Create a registry of all components
const componentRegistry = {
    text: text_component_1.TextComponent,
    button: button_component_1.ButtonComponent,
    image: image_component_1.ImageComponent,
    container: container_component_1.ContainerComponent,
    card: card_component_1.CardComponent,
    grid: grid_component_1.GridComponent,
};
// Create a registry of all block components
const blockRegistry = {
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
const motionPresets = {
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
const PageBuilderRenderer = ({ components = [], layoutOptions = {}, className = '', pageTitle = '' }) => {
    const { showHeader = true, showFooter = true, fullWidth = false, backgroundColor = 'bg-background', showTitle = true } = layoutOptions;
    // Render a single component
    const renderComponent = (component) => {
        if (!component)
            return null;
        const { id, type, props = {}, children = [] } = component;
        // Handle block components
        if (type === 'block' && props.blockId) {
            const BlockComponent = blockRegistry[props.blockId];
            if (!BlockComponent) {
                // SSR-friendly fallback
                if (typeof window === 'undefined') {
                    return <div key={id} data-block-id={props.blockId}>Block component placeholder</div>;
                }
                return (<div key={id} className="p-4 text-center text-muted-foreground border border-dashed rounded">
            Block component not found: {props.blockId}
          </div>);
            }
            // Apply motion presets if available and we're on the client
            const motionPreset = props.motionPreset && typeof window !== 'undefined'
                ? motionPresets[props.motionPreset]
                : undefined;
            // Apply Tailwind transition classes if provided
            const transitionClasses = props.transitionClasses || '';
            // Handle container structure
            const containerType = props.containerType || 'default';
            const containerClasses = getContainerClasses(containerType, props.containerWidth);
            if (motionPreset) {
                return (<framer_motion_1.motion.div key={id} {...motionPreset} className={`${transitionClasses} ${containerClasses}`}>
            <BlockComponent {...props}/>
          </framer_motion_1.motion.div>);
            }
            return (<div key={id} className={`${transitionClasses} ${containerClasses}`}>
          <BlockComponent {...props}/>
        </div>);
        }
        // Handle basic components
        const Component = componentRegistry[type];
        if (!Component) {
            // SSR-friendly fallback
            if (typeof window === 'undefined') {
                return <div key={id} data-component-type={type}>Component placeholder</div>;
            }
            return (<div key={id} className="p-4 text-center text-muted-foreground border border-dashed rounded">
          Unknown component type: {type}
        </div>);
        }
        // Render children recursively for container components
        const childComponents = children?.map(renderComponent) || [];
        // Apply motion presets if available and we're on the client
        const motionPreset = props.motionPreset && typeof window !== 'undefined'
            ? motionPresets[props.motionPreset]
            : undefined;
        // Apply Tailwind transition classes if provided
        const transitionClasses = props.transitionClasses || '';
        // Handle container structure for basic components
        const containerType = props.containerType || 'default';
        const containerClasses = getContainerClasses(containerType, props.containerWidth);
        if (motionPreset) {
            return (<framer_motion_1.motion.div key={id} {...motionPreset} className={`${transitionClasses} ${containerClasses}`}>
          <Component {...props}>
            {childComponents}
          </Component>
        </framer_motion_1.motion.div>);
        }
        return (<div key={id} className={`${transitionClasses} ${containerClasses}`}>
        <Component {...props}>
          {childComponents}
        </Component>
      </div>);
    };
    // Helper function to get container classes based on type and width
    const getContainerClasses = (containerType, containerWidth) => {
        switch (containerType) {
            case 'full':
                return 'w-full';
            case 'constrained':
                return 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
            case 'narrow':
                return 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8';
            default:
                // Use custom width if provided, otherwise default to constrained
                return containerWidth ? containerWidth : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
        }
    };
    // Render all components
    const renderedComponents = (0, react_1.useMemo)(() => {
        return components.map(renderComponent);
    }, [components]);
    // Determine container classes based on layout options
    const containerClasses = [
        backgroundColor,
        fullWidth ? 'w-full' : 'cms-container-responsive',
        className
    ].filter(Boolean).join(' ');
    return (<div className={containerClasses}>
      {showTitle && pageTitle && (<div className="cms-responsive-padding">
          <h1 className="text-4xl font-bold mb-4 cms-animate-fade-in">{pageTitle}</h1>
        </div>)}
      
      {showHeader && (<header className="cms-responsive-padding border-b cms-animate-slide-up">
          <nav className="flex justify-between items-center">
            <div className="text-xl font-bold">Logo</div>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:underline cms-transition">Home</a></li>
              <li><a href="#" className="hover:underline cms-transition">About</a></li>
              <li><a href="#" className="hover:underline cms-transition">Services</a></li>
              <li><a href="#" className="hover:underline cms-transition">Contact</a></li>
            </ul>
          </nav>
        </header>)}
      
      <main className={showHeader || showFooter ? 'cms-responsive-padding' : ''}>
        {renderedComponents}
      </main>
      
      {showFooter && (<footer className="cms-responsive-padding border-t mt-8 cms-animate-slide-up">
          <div className="text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </footer>)}
    </div>);
};
exports.PageBuilderRenderer = PageBuilderRenderer;
// Server-side compatible version
const PageBuilderRendererSSR = ({ components = [], layoutOptions = {}, className = '', pageTitle = '' }) => {
    const { showHeader = true, showFooter = true, fullWidth = false, backgroundColor = 'bg-background', showTitle = true } = layoutOptions;
    // SSR-friendly component rendering
    const renderComponentSSR = (component) => {
        if (!component)
            return null;
        const { id, type, props = {}, children = [] } = component;
        // Handle block components
        if (type === 'block' && props.blockId) {
            return <div key={id} data-block-id={props.blockId}>Block component placeholder</div>;
        }
        // Handle basic components
        return <div key={id} data-component-type={type}>Component placeholder</div>;
    };
    // Render all components for SSR
    const renderedComponents = components.map(renderComponentSSR);
    // Determine container classes based on layout options
    const containerClasses = [
        backgroundColor,
        fullWidth ? 'w-full' : 'cms-container-responsive',
        className
    ].filter(Boolean).join(' ');
    return (<div className={containerClasses}>
      {showTitle && pageTitle && (<div className="cms-responsive-padding">
          <h1 className="text-4xl font-bold mb-4">{pageTitle}</h1>
        </div>)}
      
      {showHeader && (<header className="cms-responsive-padding border-b">
          <nav className="flex justify-between items-center">
            <div className="text-xl font-bold">Logo</div>
            <ul className="flex space-x-6">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </header>)}
      
      <main className={showHeader || showFooter ? 'cms-responsive-padding' : ''}>
        {renderedComponents}
      </main>
      
      {showFooter && (<footer className="cms-responsive-padding border-t mt-8">
          <div className="text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </footer>)}
    </div>);
};
exports.PageBuilderRendererSSR = PageBuilderRendererSSR;
exports.default = exports.PageBuilderRenderer;
//# sourceMappingURL=page-builder-renderer.js.map
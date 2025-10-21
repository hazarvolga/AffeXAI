"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateRenderer = TemplateRenderer;
exports.BlockRenderer = BlockRenderer;
const react_1 = __importDefault(require("react"));
const trackable_block_1 = require("./trackable-block");
/**
 * TemplateRenderer - Renders a complete page template with all blocks
 *
 * Features:
 * - Renders all blocks in sequence
 * - Optional analytics tracking per block
 * - Design token resolution
 * - Responsive layout with template constraints
 *
 * Usage:
 * ```tsx
 * <TemplateRenderer
 *   template={pageTemplate}
 *   pageId="home-page"
 *   enableTracking={true}
 * />
 * ```
 */
function TemplateRenderer({ template, pageId, enableTracking = true, className = '' }) {
    const { blocks, layoutOptions, designSystem } = template;
    // Apply layout styles
    const containerStyle = {
        maxWidth: layoutOptions?.maxWidth || '1280px',
        margin: '0 auto',
        padding: layoutOptions?.containerPadding || '0 1rem',
        gap: layoutOptions?.sectionGap || '6rem'
    };
    return (<div className={`template-renderer ${className}`} style={containerStyle} data-template-id={template.id} data-template-category={template.category} data-design-system={designSystem?.preferredMode || 'light'}>
      {blocks.map((block) => {
            const BlockComponent = getBlockComponent(block.type);
            if (!BlockComponent) {
                console.warn(`Block type "${block.type}" not found`);
                return null;
            }
            // Wrap with tracking if enabled
            if (enableTracking) {
                return (<trackable_block_1.TrackableBlock key={block.id} block={block} pageId={pageId} className="block-wrapper">
              <BlockComponent {...block.properties} blockId={block.id}/>
            </trackable_block_1.TrackableBlock>);
            }
            // Render without tracking
            return (<div key={block.id} className="block-wrapper" data-block-id={block.id}>
            <BlockComponent {...block.properties} blockId={block.id}/>
          </div>);
        })}
    </div>);
}
function BlockRenderer({ block, pageId, enableTracking = true }) {
    const BlockComponent = getBlockComponent(block.type);
    if (!BlockComponent) {
        return (<div className="p-4 border-2 border-dashed border-red-300 bg-red-50 rounded">
        <p className="text-red-600">Block type "{block.type}" not found</p>
        <pre className="text-xs mt-2">{JSON.stringify(block, null, 2)}</pre>
      </div>);
    }
    if (enableTracking) {
        return (<trackable_block_1.TrackableBlock block={block} pageId={pageId}>
        <BlockComponent {...block.properties} blockId={block.id}/>
      </trackable_block_1.TrackableBlock>);
    }
    return <BlockComponent {...block.properties} blockId={block.id}/>;
}
/**
 * getBlockComponent - Returns the React component for a given block type
 *
 * This maps block types to their corresponding React components.
 * Add new block types here as they are created.
 */
function getBlockComponent(blockType) {
    const blockComponents = {
        // Hero blocks
        hero: HeroBlock,
        // Feature blocks
        features: FeaturesBlock,
        // Stats blocks
        stats: StatsBlock,
        // Social proof blocks
        testimonials: TestimonialsBlock,
        // Pricing blocks
        pricing: PricingBlock,
        // FAQ blocks
        faq: FAQBlock,
        // Content blocks
        content: ContentBlock,
        // Footer blocks
        footer: FooterBlock,
        // Navigation blocks
        navigation: NavigationBlock,
        // E-commerce blocks
        'e-commerce': ECommerceBlock,
        ecommerce: ECommerceBlock,
        // Gallery blocks
        gallery: GalleryBlock,
        // Rating blocks
        rating: RatingBlock,
        // Add more block types as needed
    };
    return blockComponents[blockType] || null;
}
// Placeholder components (will be replaced with actual implementations)
// These demonstrate the structure expected for block components
function HeroBlock(props) {
    return (<section className="hero-block py-20" style={{
            backgroundColor: props.backgroundColor,
            padding: props.padding
        }}>
      <div className="container mx-auto">
        <h1 style={{ color: props.titleColor }}>{props.title}</h1>
        <p style={{ color: props.subtitleColor }}>{props.subtitle}</p>
        {props.primaryCta && (<button data-cta="true" data-cta-type="primary">
            {props.primaryCta.text}
          </button>)}
        {props.secondaryCta && (<button data-cta="true" data-cta-type="secondary">
            {props.secondaryCta.text}
          </button>)}
      </div>
    </section>);
}
function FeaturesBlock(props) {
    return (<section className="features-block py-16" style={{ backgroundColor: props.backgroundColor }}>
      <div className="container mx-auto">
        <h2 style={{ color: props.titleColor }}>{props.title}</h2>
        <p style={{ color: props.subtitleColor }}>{props.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {props.features?.map((feature, index) => (<div key={index} className="feature-card p-6" style={{ backgroundColor: props.cardBackground }}>
              <h3 style={{ color: props.titleColor }}>{feature.title}</h3>
              <p style={{ color: props.descriptionColor }}>{feature.description}</p>
            </div>))}
        </div>
      </div>
    </section>);
}
function StatsBlock(props) {
    return (<section className="stats-block py-12" style={{ backgroundColor: props.backgroundColor }}>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {props.stats?.map((stat, index) => (<div key={index} className="stat-item text-center">
            <div className="text-4xl font-bold" style={{ color: props.valueColor }}>{stat.value}</div>
            <div className="text-sm mt-2" style={{ color: props.labelColor }}>{stat.label}</div>
          </div>))}
      </div>
    </section>);
}
function TestimonialsBlock(props) {
    return (<section className="testimonials-block py-16" style={{ backgroundColor: props.backgroundColor }}>
      <div className="container mx-auto">
        <h2 className="text-center mb-12" style={{ color: props.titleColor }}>{props.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {props.testimonials?.map((testimonial, index) => (<div key={index} className="testimonial-card p-6" style={{ backgroundColor: props.cardBackground }}>
              <p style={{ color: props.quoteColor }}>"{testimonial.quote}"</p>
              <div className="mt-4">
                <p className="font-bold" style={{ color: props.authorColor }}>{testimonial.author}</p>
                <p className="text-sm" style={{ color: props.authorColor }}>{testimonial.role}</p>
              </div>
            </div>))}
        </div>
      </div>
    </section>);
}
function PricingBlock(props) {
    return (<section className="pricing-block py-16" style={{ backgroundColor: props.backgroundColor }}>
      <div className="container mx-auto">
        <h2 className="text-center mb-12" style={{ color: props.titleColor }}>{props.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {props.plans?.map((plan, index) => (<div key={index} className="pricing-card p-8" style={{
                backgroundColor: plan.highlighted ? props.highlightedCardBackground : props.cardBackground
            }}>
              <h3 style={{ color: props.titleColor }}>{plan.name}</h3>
              <p style={{ color: props.featureColor }}>{plan.description}</p>
              {plan.price?.custom ? (<p className="text-2xl mt-4" style={{ color: props.priceColor }}>Custom</p>) : (<p className="text-4xl mt-4" style={{ color: props.priceColor }}>
                  {plan.currency}{plan.price?.monthly}
                </p>)}
              <button className="mt-6" data-cta="true">
                {plan.cta?.text}
              </button>
            </div>))}
        </div>
      </div>
    </section>);
}
function FAQBlock(props) {
    return (<section className="faq-block py-16" style={{ backgroundColor: props.backgroundColor }}>
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-center mb-12" style={{ color: props.titleColor }}>{props.title}</h2>
        <div className="space-y-4">
          {props.questions?.map((item, index) => (<div key={index} className="faq-item p-4" style={{ backgroundColor: props.itemBackground }}>
              <h3 style={{ color: props.questionColor }}>{item.question}</h3>
              <p className="mt-2" style={{ color: props.answerColor }}>{item.answer}</p>
            </div>))}
        </div>
      </div>
    </section>);
}
function ContentBlock(props) {
    return (<section className="content-block py-16 text-center" style={{ backgroundColor: props.backgroundColor }}>
      <div className="container mx-auto">
        <h2 style={{ color: props.titleColor }}>{props.title}</h2>
        <p className="mt-4" style={{ color: props.descriptionColor }}>{props.description}</p>
        <div className="mt-8 space-x-4">
          {props.primaryCta && (<button data-cta="true" data-cta-type="primary">
              {props.primaryCta.text}
            </button>)}
          {props.secondaryCta && (<button data-cta="true" data-cta-type="secondary">
              {props.secondaryCta.text}
            </button>)}
        </div>
      </div>
    </section>);
}
function FooterBlock(props) {
    return (<footer className="footer-block py-12" style={{ backgroundColor: props.backgroundColor }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {props.columns?.map((column, index) => (<div key={index}>
              <h3 className="font-bold mb-4" style={{ color: props.textColor }}>{column.title}</h3>
              <ul className="space-y-2">
                {column.links?.map((link, linkIndex) => (<li key={linkIndex}>
                    <a href={link.url} style={{ color: props.linkColor }}>
                      {link.text}
                    </a>
                  </li>))}
              </ul>
            </div>))}
        </div>
        <div className="mt-8 pt-8 border-t text-center" style={{ color: props.textColor }}>
          {props.copyright}
        </div>
      </div>
    </footer>);
}
function NavigationBlock(props) {
    return <div>Navigation Block (placeholder)</div>;
}
function ECommerceBlock(props) {
    return <div>E-Commerce Block (placeholder)</div>;
}
function GalleryBlock(props) {
    return <div>Gallery Block (placeholder)</div>;
}
function RatingBlock(props) {
    return <div>Rating Block (placeholder)</div>;
}
//# sourceMappingURL=template-renderer.js.map
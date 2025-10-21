"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentVariantBlocks = exports.ContentMiniBoxCta = exports.ContentImageStacked = exports.ContentCtaBox = exports.ContentTripleGrid = exports.ContentDoubleImageText = exports.ContentImageSideBySide = exports.ContentBoxedBlock = exports.ContentSimpleBlock = void 0;
const react_1 = __importDefault(require("react"));
const container_component_1 = require("@/components/cms/container-component");
const text_component_1 = require("@/components/cms/text-component");
const button_component_1 = require("@/components/cms/button-component");
const grid_component_1 = require("@/components/cms/grid-component");
const card_component_1 = require("@/components/cms/card-component");
const image_component_1 = require("@/components/cms/image-component");
// Content Block 1: Simple Content Block
const ContentSimpleBlock = ({ props }) => {
    const title = props?.title || "Important Information";
    const content = props?.content || "This is a standard content block with a title and paragraph. It's perfect for displaying clean information without additional styling.";
    return (<container_component_1.ContainerComponent id="content-simple-container" padding="md" background="none">
      <text_component_1.TextComponent id="content-simple-title" content={title} variant="heading2" className="mb-4"/>
      <text_component_1.TextComponent id="content-simple-text" content={content} variant="body" className="text-muted-foreground"/>
    </container_component_1.ContainerComponent>);
};
exports.ContentSimpleBlock = ContentSimpleBlock;
// Content Block 2: Boxed Content Block
const ContentBoxedBlock = ({ props }) => {
    const title = props?.title || "Featured Content";
    const content = props?.content || "This boxed content block adds a bordered or shaded background to emphasize important information.";
    const buttonText = props?.buttonText || "Learn More";
    return (<container_component_1.ContainerComponent id="content-boxed-container" padding="none" background="none">
      <card_component_1.CardComponent id="content-boxed-card" padding="lg" rounded="lg" shadow="md">
        <text_component_1.TextComponent id="content-boxed-title" content={title} variant="heading3" className="mb-3"/>
        <text_component_1.TextComponent id="content-boxed-text" content={content} variant="body" className="mb-4 text-muted-foreground"/>
        <button_component_1.ButtonComponent id="content-boxed-btn" text={buttonText} variant="outline" size="sm"/>
      </card_component_1.CardComponent>
    </container_component_1.ContainerComponent>);
};
exports.ContentBoxedBlock = ContentBoxedBlock;
// Content Block 3: Image + Content Side-by-Side
const ContentImageSideBySide = ({ props }) => {
    const title = props?.title || "Product Explanation";
    const content = props?.content || "This layout is perfect for product explanations or team introductions where you want to show a visual alongside descriptive text.";
    const buttonText = props?.buttonText || "View Details";
    const imageUrl = props?.imageUrl || "/placeholder-image.jpg";
    return (<container_component_1.ContainerComponent id="content-image-side-container" padding="md" background="muted" className="py-12">
      <grid_component_1.GridComponent id="content-image-side-grid" columns={2} gap="xl" className="items-center">
        <div>
          <image_component_1.ImageComponent id="content-image-side-image" src={imageUrl} alt="Product" className="rounded-lg shadow-lg w-full h-auto"/>
        </div>
        <div>
          <text_component_1.TextComponent id="content-image-side-title" content={title} variant="heading2" className="mb-4"/>
          <text_component_1.TextComponent id="content-image-side-text" content={content} variant="body" className="mb-6 text-muted-foreground"/>
          <button_component_1.ButtonComponent id="content-image-side-btn" text={buttonText} variant="default"/>
        </div>
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.ContentImageSideBySide = ContentImageSideBySide;
// Content Block 4: Double Image and Text Block
const ContentDoubleImageText = ({ props }) => {
    const title = props?.title || "Feature Comparison";
    const items = props?.items || [
        {
            id: '1',
            title: "Feature One",
            content: "Detailed explanation of the first feature and its benefits.",
            imageUrl: "/placeholder-image.jpg"
        },
        {
            id: '2',
            title: "Feature Two",
            content: "Detailed explanation of the second feature and its benefits.",
            imageUrl: "/placeholder-image.jpg"
        }
    ];
    return (<container_component_1.ContainerComponent id="content-double-container" padding="md" background="none" className="py-12">
      <text_component_1.TextComponent id="content-double-title" content={title} variant="heading2" className="text-center mb-12"/>
      <grid_component_1.GridComponent id="content-double-grid" columns={2} gap="xl">
        {items.map((item, index) => (<card_component_1.CardComponent id={`content-double-card-${index + 1}`} key={item.id || index} padding="lg" rounded="lg" shadow="md">
            <image_component_1.ImageComponent id={`content-double-image-${index + 1}`} src={item.imageUrl} alt={item.title} className="rounded-md mb-4"/>
            <text_component_1.TextComponent id={`content-double-card-${index + 1}-title`} content={item.title} variant="heading3" className="mb-2"/>
            <text_component_1.TextComponent id={`content-double-card-${index + 1}-text`} content={item.content} variant="body" className="mb-4 text-muted-foreground"/>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.ContentDoubleImageText = ContentDoubleImageText;
// Content Block 5: Triple Content Grid
const ContentTripleGrid = ({ props }) => {
    const title = props?.title || "Key Benefits";
    const items = props?.items || [
        {
            id: '1',
            title: "Benefit One",
            content: "Description of the first key benefit that provides value to users.",
            buttonText: "Learn More"
        },
        {
            id: '2',
            title: "Benefit Two",
            content: "Description of the second key benefit that provides value to users.",
            buttonText: "Learn More"
        },
        {
            id: '3',
            title: "Benefit Three",
            content: "Description of the third key benefit that provides value to users.",
            buttonText: "Learn More"
        }
    ];
    return (<container_component_1.ContainerComponent id="content-triple-container" padding="xl" background="muted" className="py-16">
      <text_component_1.TextComponent id="content-triple-title" content={title} variant="heading2" className="text-center mb-12"/>
      <grid_component_1.GridComponent id="content-triple-grid" columns={3} gap="xl">
        {items.map((item, index) => (<card_component_1.CardComponent id={`content-triple-card-${index + 1}`} key={item.id || index} padding="lg" rounded="lg" shadow="md" className="text-center">
            <text_component_1.TextComponent id={`content-triple-card-${index + 1}-title`} content={item.title} variant="heading3" className="mb-3"/>
            <text_component_1.TextComponent id={`content-triple-card-${index + 1}-text`} content={item.content} variant="body" className="mb-4 text-muted-foreground"/>
            <button_component_1.ButtonComponent id={`content-triple-card-${index + 1}-btn`} text={item.buttonText} variant="outline" size="sm"/>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.ContentTripleGrid = ContentTripleGrid;
// Content Block 6: CTA Content Box
const ContentCtaBox = ({ props }) => {
    const title = props?.title || "Ready to Get Started?";
    const content = props?.content || "Join thousands of satisfied customers today and experience the difference.";
    const buttonText = props?.buttonText || "Sign Up Free";
    return (<container_component_1.ContainerComponent id="content-cta-container" padding="none" background="none">
      <card_component_1.CardComponent id="content-cta-card" padding="xl" rounded="lg" shadow="md" background="primary" className="text-center text-white">
        <text_component_1.TextComponent id="content-cta-title" content={title} variant="heading2" className="mb-4"/>
        <text_component_1.TextComponent id="content-cta-text" content={content} variant="body" className="mb-8 max-w-2xl mx-auto text-white/80"/>
        <button_component_1.ButtonComponent id="content-cta-btn" text={buttonText} variant="default" size="lg" className="bg-white text-primary hover:bg-white/90"/>
      </card_component_1.CardComponent>
    </container_component_1.ContainerComponent>);
};
exports.ContentCtaBox = ContentCtaBox;
// Content Block 7: Image + Simple Content (Stacked)
const ContentImageStacked = ({ props }) => {
    const title = props?.title || "Visual Storytelling";
    const content = props?.content || "This visual-first layout places the image above the supporting text, making it perfect for storytelling or showcasing products where the visual is the primary focus.";
    const imageUrl = props?.imageUrl || "/placeholder-image.jpg";
    return (<container_component_1.ContainerComponent id="content-stacked-container" padding="md" background="none" className="py-12">
      <text_component_1.TextComponent id="content-stacked-title" content={title} variant="heading2" className="text-center mb-8"/>
      <image_component_1.ImageComponent id="content-stacked-image" src={imageUrl} alt="Story" className="rounded-lg shadow-lg mx-auto mb-8"/>
      <text_component_1.TextComponent id="content-stacked-text" content={content} variant="body" className="text-center max-w-3xl mx-auto text-muted-foreground"/>
    </container_component_1.ContainerComponent>);
};
exports.ContentImageStacked = ContentImageStacked;
// Content Block 8: Mini Box CTA
const ContentMiniBoxCta = ({ props }) => {
    const title = props?.title || "Special Offer";
    const content = props?.content || "Limited time discount for new customers!";
    const buttonText = props?.buttonText || "Claim Offer";
    return (<container_component_1.ContainerComponent id="content-mini-container" padding="md" background="none" className="text-center">
      <card_component_1.CardComponent id="content-mini-card" padding="lg" rounded="lg" shadow="md" className="inline-block">
        <text_component_1.TextComponent id="content-mini-title" content={title} variant="heading3" className="mb-2"/>
        <text_component_1.TextComponent id="content-mini-text" content={content} variant="body" className="mb-4 text-muted-foreground"/>
        <button_component_1.ButtonComponent id="content-mini-btn" text={buttonText} variant="default" size="sm"/>
      </card_component_1.CardComponent>
    </container_component_1.ContainerComponent>);
};
exports.ContentMiniBoxCta = ContentMiniBoxCta;
// Export all content variant blocks
exports.contentVariantBlocks = [
    {
        id: 'content-simple-block',
        name: 'Simple Content Block',
        description: 'Standard title and paragraph; for clean information display.',
        category: 'Content',
        component: exports.ContentSimpleBlock,
    },
    {
        id: 'content-boxed-block',
        name: 'Boxed Content Block',
        description: 'Adds a bordered or shaded background to emphasize content.',
        category: 'Content',
        component: exports.ContentBoxedBlock,
    },
    {
        id: 'content-image-side-by-side',
        name: 'Image + Content Side-by-Side',
        description: 'For product explanations or team introductions.',
        category: 'Content',
        component: exports.ContentImageSideBySide,
    },
    {
        id: 'content-double-image-text',
        name: 'Double Image and Text Block',
        description: 'Dual layout showing comparisons or feature pairs.',
        category: 'Content',
        component: exports.ContentDoubleImageText,
    },
    {
        id: 'content-triple-grid',
        name: 'Triple Content Grid',
        description: 'Three equal boxes; great for highlighting multiple features.',
        category: 'Content',
        component: exports.ContentTripleGrid,
    },
    {
        id: 'content-cta-box',
        name: 'CTA Content Box',
        description: 'Content area with bold CTA; designed for conversions.',
        category: 'Content',
        component: exports.ContentCtaBox,
    },
    {
        id: 'content-image-stacked',
        name: 'Image + Simple Content (Stacked)',
        description: 'Visual-first layout with supporting text below.',
        category: 'Content',
        component: exports.ContentImageStacked,
    },
    {
        id: 'content-mini-box-cta',
        name: 'Mini Box CTA',
        description: 'Compact, reusable CTA for embedding between other sections.',
        category: 'Content',
        component: exports.ContentMiniBoxCta,
    },
];
//# sourceMappingURL=content-variants-blocks.js.map
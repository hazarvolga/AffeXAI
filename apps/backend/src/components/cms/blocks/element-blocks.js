"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementBlocks = exports.ElementTableList = exports.ElementButtonGroup = exports.ElementMediaImage = exports.ElementQuoteBlock = exports.ElementTitleButton = exports.ElementTitleSubtitle = exports.ElementDivider = exports.ElementSpacer = void 0;
const react_1 = __importDefault(require("react"));
const container_component_1 = require("@/components/cms/container-component");
const text_component_1 = require("@/components/cms/text-component");
const button_component_1 = require("@/components/cms/button-component");
const grid_component_1 = require("@/components/cms/grid-component");
const card_component_1 = require("@/components/cms/card-component");
const image_component_1 = require("@/components/cms/image-component");
// Element Block 1: Spacer Element
const ElementSpacer = ({ props }) => {
    const height = props?.height || "py-12";
    return (<container_component_1.ContainerComponent id="element-spacer-container" padding="none" background="none" className={height}>
      <div></div>
    </container_component_1.ContainerComponent>);
};
exports.ElementSpacer = ElementSpacer;
// Element Block 2: Divider Element
const ElementDivider = ({ props }) => {
    return (<container_component_1.ContainerComponent id="element-divider-container" padding="md" background="none">
      <hr className="border-t border-border"/>
    </container_component_1.ContainerComponent>);
};
exports.ElementDivider = ElementDivider;
// Element Block 3: Title with Subtitle
const ElementTitleSubtitle = ({ props }) => {
    const title = props?.title || "Section Title";
    const titleVariant = props?.titleVariant || "heading2";
    const titleAlign = props?.titleAlign || "center";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const subtitle = props?.subtitle || "Brief supporting description for this section";
    const subtitleVariant = props?.subtitleVariant || "body";
    const subtitleAlign = props?.subtitleAlign || "center";
    const subtitleColor = props?.subtitleColor || "muted";
    const subtitleWeight = props?.subtitleWeight || "normal";
    return (<container_component_1.ContainerComponent id="element-title-subtitle-container" padding="md" background="none" className="text-center">
      <text_component_1.TextComponent id="element-title-subtitle-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-2"/>
      <text_component_1.TextComponent id="element-title-subtitle-subtitle" content={subtitle} variant={subtitleVariant} align={subtitleAlign} color={subtitleColor} weight={subtitleWeight} className="text-muted-foreground max-w-2xl mx-auto"/>
    </container_component_1.ContainerComponent>);
};
exports.ElementTitleSubtitle = ElementTitleSubtitle;
// Element Block 4: Title with Button
const ElementTitleButton = ({ props }) => {
    const title = props?.title || "Featured Section";
    const buttonText = props?.buttonText || "Learn More";
    return (<container_component_1.ContainerComponent id="element-title-button-container" padding="md" background="none" className="flex flex-col md:flex-row justify-between items-center">
      <text_component_1.TextComponent id="element-title-button-title" content={title} variant="heading2" className="mb-4 md:mb-0"/>
      <button_component_1.ButtonComponent id="element-title-button-btn" text={buttonText} variant="default"/>
    </container_component_1.ContainerComponent>);
};
exports.ElementTitleButton = ElementTitleButton;
// Element Block 5: Quote Block
const ElementQuoteBlock = ({ props }) => {
    const quote = props?.quote || "“The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.”";
    const author = props?.author || "— Steve Jobs";
    return (<container_component_1.ContainerComponent id="element-quote-container" padding="xl" background="muted" className="text-center py-12">
      <text_component_1.TextComponent id="element-quote-text" content={quote} variant="heading2" className="italic mb-4"/>
      <text_component_1.TextComponent id="element-quote-author" content={author} variant="body" className="font-medium"/>
    </container_component_1.ContainerComponent>);
};
exports.ElementQuoteBlock = ElementQuoteBlock;
// Element Block 6: Media Element (Image)
const ElementMediaImage = ({ props }) => {
    const imageUrl = props?.imageUrl || "/placeholder-image.jpg";
    const caption = props?.caption || "Image caption or description";
    return (<container_component_1.ContainerComponent id="element-media-container" padding="md" background="none" className="text-center">
      <image_component_1.ImageComponent id="element-media-image" src={imageUrl} alt="Featured Media" className="rounded-lg shadow-lg mx-auto"/>
      <text_component_1.TextComponent id="element-media-caption" content={caption} variant="body" className="text-muted-foreground mt-4"/>
    </container_component_1.ContainerComponent>);
};
exports.ElementMediaImage = ElementMediaImage;
// Element Block 7: Button Group (1–3 Buttons)
const ElementButtonGroup = ({ props }) => {
    const buttons = props?.buttons || [
        {
            id: '1',
            text: "Primary Action",
            variant: "default"
        },
        {
            id: '2',
            text: "Secondary",
            variant: "outline"
        },
        {
            id: '3',
            text: "Learn More",
            variant: "ghost"
        }
    ];
    return (<container_component_1.ContainerComponent id="element-button-group-container" padding="md" background="none" className="text-center">
      <grid_component_1.GridComponent id="element-button-group-grid" columns={buttons.length} gap="md" className="justify-center space-x-4">
        {buttons.map((button, index) => (<button_component_1.ButtonComponent id={`element-button-${index + 1}`} key={button.id || index} text={button.text} variant={button.variant}/>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.ElementButtonGroup = ElementButtonGroup;
// Element Block 8: Table / Link List Element
const ElementTableList = ({ props }) => {
    const title = props?.title || "Resource Links";
    const links = props?.links || [
        {
            id: '1',
            text: "Documentation",
            url: "#"
        },
        {
            id: '2',
            text: "API Reference",
            url: "#"
        },
        {
            id: '3',
            text: "Tutorials",
            url: "#"
        },
        {
            id: '4',
            text: "Community Forum",
            url: "#"
        }
    ];
    return (<container_component_1.ContainerComponent id="element-table-container" padding="md" background="none">
      <card_component_1.CardComponent id="element-table-card" padding="lg" rounded="lg" shadow="md">
        <text_component_1.TextComponent id="element-table-title" content={title} variant="heading3" className="mb-4"/>
        <ul className="space-y-2">
          {links.map((link, index) => (<li key={link.id || index}>
              <a href={link.url} className="text-primary hover:underline">{link.text}</a>
            </li>))}
        </ul>
      </card_component_1.CardComponent>
    </container_component_1.ContainerComponent>);
};
exports.ElementTableList = ElementTableList;
// Export all element blocks
exports.elementBlocks = [
    {
        id: 'element-spacer',
        name: 'Spacer Element',
        description: 'Adds vertical or horizontal spacing; supports layout breathing room.',
        category: 'Element',
        component: exports.ElementSpacer,
    },
    {
        id: 'element-divider',
        name: 'Divider Element',
        description: 'Horizontal rule or line separator; used to divide logical content blocks.',
        category: 'Element',
        component: exports.ElementDivider,
    },
    {
        id: 'element-title-subtitle',
        name: 'Title with Subtitle',
        description: 'Section heading with an optional supporting line; introduces sections clearly.',
        category: 'Element',
        component: exports.ElementTitleSubtitle,
    },
    {
        id: 'element-title-button',
        name: 'Title with Button',
        description: 'A compact header followed by an action; good for mini callouts or feature intros.',
        category: 'Element',
        component: exports.ElementTitleButton,
    },
    {
        id: 'element-quote-block',
        name: 'Quote Block',
        description: 'Large typography for testimonials or quotes; helps create emphasis.',
        category: 'Element',
        component: exports.ElementQuoteBlock,
    },
    {
        id: 'element-media-image',
        name: 'Media Element (Image)',
        description: 'Displays media inline with adjustable ratio and alignment.',
        category: 'Element',
        component: exports.ElementMediaImage,
    },
    {
        id: 'element-button-group',
        name: 'Button Group (1–3 Buttons)',
        description: 'Single or multiple CTA buttons with layout variations (stacked or inline).',
        category: 'Element',
        component: exports.ElementButtonGroup,
    },
    {
        id: 'element-table-list',
        name: 'Table / Link List Element',
        description: 'For structured information or resource lists.',
        category: 'Element',
        component: exports.ElementTableList,
    },
];
//# sourceMappingURL=element-blocks.js.map
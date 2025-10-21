"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentBlocks = exports.ContentAsymmetricAccent = exports.ContentSmallLargeColumn = exports.ContentLargeSmallColumn = exports.ContentThreeColumnGrid = exports.ContentTwoColumn = exports.ContentSingleFullwidth = void 0;
const react_1 = __importDefault(require("react"));
const container_component_1 = require("@/components/cms/container-component");
const text_component_1 = require("@/components/cms/text-component");
const button_component_1 = require("@/components/cms/button-component");
const grid_component_1 = require("@/components/cms/grid-component");
const card_component_1 = require("@/components/cms/card-component");
const image_component_1 = require("@/components/cms/image-component");
// Content Block 1: Single Fullwidth Section
const ContentSingleFullwidth = () => {
    return (<container_component_1.ContainerComponent id="content-fullwidth-container" padding="xl" background="none" className="py-16">
      <text_component_1.TextComponent id="content-fullwidth-title" content="Important Announcement" variant="heading2" className="text-center mb-6"/>
      <text_component_1.TextComponent id="content-fullwidth-text" content="This is a focused message to communicate important information to your visitors." variant="body" className="text-center max-w-3xl mx-auto text-muted-foreground"/>
    </container_component_1.ContainerComponent>);
};
exports.ContentSingleFullwidth = ContentSingleFullwidth;
// Content Block 2: Two-Column Section
const ContentTwoColumn = () => {
    return (<container_component_1.ContainerComponent id="content-two-col-container" padding="xl" background="muted" className="py-16">
      <grid_component_1.GridComponent id="content-two-col-grid" columns={2} gap="xl" className="items-center">
        <div>
          <text_component_1.TextComponent id="content-two-col-title" content="Our Services" variant="heading2" className="mb-6"/>
          <text_component_1.TextComponent id="content-two-col-text" content="We provide comprehensive solutions tailored to your business needs. Our expert team delivers results that exceed expectations." variant="body" className="mb-6 text-muted-foreground"/>
          <button_component_1.ButtonComponent id="content-two-col-btn" text="Learn More" variant="default"/>
        </div>
        <div className="flex justify-center">
          <image_component_1.ImageComponent id="content-two-col-image" src="/placeholder-image.jpg" alt="Services" className="rounded-lg shadow-lg"/>
        </div>
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.ContentTwoColumn = ContentTwoColumn;
// Content Block 3: Three-Column Grid Section
const ContentThreeColumnGrid = ({ props }) => {
    // Use props or fallback to default values
    const title = props?.title || "Our Features";
    const items = props?.items || [
        {
            title: "Feature One",
            content: "Description of the first amazing feature that provides great value.",
            ctaText: "Learn More",
        },
        {
            title: "Feature Two",
            content: "Description of the second amazing feature that provides great value.",
            ctaText: "Learn More",
        },
        {
            title: "Feature Three",
            content: "Description of the third amazing feature that provides great value.",
            ctaText: "Learn More",
        },
    ];
    return (<container_component_1.ContainerComponent id="content-three-col-container" padding="xl" background="none" className="py-16">
      <text_component_1.TextComponent id="content-three-col-title" content={title} variant="heading2" className="text-center mb-12"/>
      <grid_component_1.GridComponent id="content-three-col-grid" columns={3} gap="xl">
        {items.map((item, index) => (<card_component_1.CardComponent id={`content-three-col-card-${index + 1}`} key={index} padding="lg" rounded="lg" shadow="md" className="text-center">
            <text_component_1.TextComponent id={`content-three-col-card-${index + 1}-title`} content={item.title} variant="heading3" className="mb-3"/>
            <text_component_1.TextComponent id={`content-three-col-card-${index + 1}-text`} content={item.content} variant="body" className="mb-4 text-muted-foreground"/>
            <button_component_1.ButtonComponent id={`content-three-col-card-${index + 1}-btn`} text={item.ctaText} variant="outline" size="sm"/>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.ContentThreeColumnGrid = ContentThreeColumnGrid;
// Content Block 4: Large + Small Column Section
const ContentLargeSmallColumn = () => {
    return (<container_component_1.ContainerComponent id="content-large-small-container" padding="xl" background="muted" className="py-16">
      <grid_component_1.GridComponent id="content-large-small-grid" columns={2} gap="xl">
        <div className="col-span-1 md:col-span-1">
          <image_component_1.ImageComponent id="content-large-small-image" src="/placeholder-image.jpg" alt="Story" className="rounded-lg shadow-lg w-full h-auto"/>
        </div>
        <div className="col-span-1 md:col-span-1">
          <text_component_1.TextComponent id="content-large-small-title" content="Our Story" variant="heading2" className="mb-6"/>
          <text_component_1.TextComponent id="content-large-small-text" content="Founded in 2010, our company has been dedicated to providing exceptional services to clients around the world. We believe in innovation, quality, and customer satisfaction." variant="body" className="mb-6 text-muted-foreground"/>
          <button_component_1.ButtonComponent id="content-large-small-btn" text="Read More" variant="default"/>
        </div>
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.ContentLargeSmallColumn = ContentLargeSmallColumn;
// Content Block 5: Small + Large Column Section
const ContentSmallLargeColumn = () => {
    return (<container_component_1.ContainerComponent id="content-small-large-container" padding="xl" background="none" className="py-16">
      <grid_component_1.GridComponent id="content-small-large-grid" columns={2} gap="xl">
        <div className="col-span-1 md:col-span-1">
          <text_component_1.TextComponent id="content-small-large-title" content="Case Study" variant="heading2" className="mb-6"/>
          <text_component_1.TextComponent id="content-small-large-text" content="See how our solution helped Company XYZ increase their productivity by 200% in just three months." variant="body" className="mb-6 text-muted-foreground"/>
          <button_component_1.ButtonComponent id="content-small-large-btn" text="View Case Study" variant="default"/>
        </div>
        <div className="col-span-1 md:col-span-1">
          <image_component_1.ImageComponent id="content-small-large-image" src="/placeholder-image.jpg" alt="Case Study" className="rounded-lg shadow-lg w-full h-auto"/>
        </div>
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.ContentSmallLargeColumn = ContentSmallLargeColumn;
// Content Block 6: Asymmetric Section with Background Accent
const ContentAsymmetricAccent = ({ props }) => {
    // Use props or fallback to default values
    const containerPadding = props?.containerPadding || "xl";
    const containerBackground = props?.containerBackground || "none";
    const items = props?.items || [
        {
            title: "Innovation",
            titleVariant: "heading3",
            titleAlign: "left",
            titleColor: "primary",
            titleWeight: "bold",
            content: "We constantly push boundaries to deliver cutting-edge solutions.",
            contentVariant: "body",
            contentAlign: "left",
            contentColor: "muted",
            contentWeight: "normal",
            hasBackground: true,
        },
        {
            title: "Quality",
            titleVariant: "heading3",
            titleAlign: "left",
            titleColor: "primary",
            titleWeight: "bold",
            content: "Every project is executed with the highest standards.",
            contentVariant: "body",
            contentAlign: "left",
            contentColor: "muted",
            contentWeight: "normal",
            hasBackground: false,
        },
        {
            title: "Support",
            titleVariant: "heading3",
            titleAlign: "left",
            titleColor: "primary",
            titleWeight: "bold",
            content: "Our team is always ready to assist you.",
            contentVariant: "body",
            contentAlign: "left",
            contentColor: "muted",
            contentWeight: "normal",
            hasBackground: false,
        },
        {
            title: "Results",
            titleVariant: "heading3",
            titleAlign: "left",
            titleColor: "primary",
            titleWeight: "bold",
            content: "We focus on delivering measurable outcomes for your business.",
            contentVariant: "body",
            contentAlign: "left",
            contentColor: "muted",
            contentWeight: "normal",
            hasBackground: true,
        },
    ];
    return (<container_component_1.ContainerComponent id="content-asymmetric-container" padding={containerPadding} background={containerBackground} className="py-16">
      <grid_component_1.GridComponent id="content-asymmetric-grid" columns={3} gap="xl">
        {items.map((item, index) => (<card_component_1.CardComponent id={`content-asymmetric-card-${index}`} key={index} padding="lg" rounded="lg" shadow="md" background={item.hasBackground ? "muted" : "none"} className={item.hasBackground ? "col-span-2" : ""}>
            <text_component_1.TextComponent id={`content-asymmetric-card-${index}-title`} content={item.title} variant={item.titleVariant} align={item.titleAlign} color={item.titleColor} weight={item.titleWeight} className="mb-3"/>
            <text_component_1.TextComponent id={`content-asymmetric-card-${index}-text`} content={item.content} variant={item.contentVariant} align={item.contentAlign} color={item.contentColor} weight={item.contentWeight} className="mb-4 text-muted-foreground"/>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.ContentAsymmetricAccent = ContentAsymmetricAccent;
// Export all content blocks
exports.contentBlocks = [
    {
        id: 'content-single-fullwidth',
        name: 'Single Fullwidth Section',
        description: 'A basic content section that spans full width; used for focused messaging or announcements.',
        category: 'Content',
        component: exports.ContentSingleFullwidth,
    },
    {
        id: 'content-two-column',
        name: 'Two-Column Section',
        description: 'Text and image or text pair layout; versatile for service or about sections.',
        category: 'Content',
        component: exports.ContentTwoColumn,
    },
    {
        id: 'content-three-column-grid',
        name: 'Three-Column Grid Section',
        description: 'Balanced grid for features or highlights; ensures consistent alignment and symmetry.',
        category: 'Content',
        component: exports.ContentThreeColumnGrid,
    },
    {
        id: 'content-large-small-column',
        name: 'Large + Small Column Section',
        description: 'Emphasizes one side (e.g., large image with small text); ideal for storytelling.',
        category: 'Content',
        component: exports.ContentLargeSmallColumn,
    },
    {
        id: 'content-small-large-column',
        name: 'Small + Large Column Section',
        description: 'Focuses on content first, with supporting visual; good for case studies or details.',
        category: 'Content',
        component: exports.ContentSmallLargeColumn,
    },
    {
        id: 'content-asymmetric-accent',
        name: 'Asymmetric Section with Background Accent',
        description: 'Adds visual rhythm through uneven grid and colored backgrounds; good for modern marketing sites.',
        category: 'Content',
        component: exports.ContentAsymmetricAccent,
    },
];
//# sourceMappingURL=content-blocks.js.map
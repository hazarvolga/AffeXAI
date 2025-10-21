"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroBlocks = exports.HeroCarouselSlides = exports.HeroFullscreenStickyCta = exports.HeroVideoBackground = exports.HeroGradientFloatingCta = exports.HeroSplitImageRight = exports.HeroCenteredBgImage = void 0;
const react_1 = __importDefault(require("react"));
const container_component_1 = require("@/components/cms/container-component");
const text_component_1 = require("@/components/cms/text-component");
const button_component_1 = require("@/components/cms/button-component");
const grid_component_1 = require("@/components/cms/grid-component");
const card_component_1 = require("@/components/cms/card-component");
const image_component_1 = require("@/components/cms/image-component");
// Hero Block 1: Centered Hero with Background Image
const HeroCenteredBgImage = ({ props }) => {
    const title = props?.title || "Welcome to Our Platform";
    const titleVariant = props?.titleVariant || "heading1";
    const titleAlign = props?.titleAlign || "center";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const subtitle = props?.subtitle || "Discover amazing features and services that will transform your experience.";
    const subtitleVariant = props?.subtitleVariant || "body";
    const subtitleAlign = props?.subtitleAlign || "center";
    const subtitleColor = props?.subtitleColor || "secondary";
    const subtitleWeight = props?.subtitleWeight || "normal";
    const primaryButtonText = props?.primaryButtonText || "Get Started";
    const primaryButtonUrl = props?.primaryButtonUrl || "#";
    const primaryButtonTarget = props?.primaryButtonTarget || "_self";
    const secondaryButtonText = props?.secondaryButtonText || "Learn More";
    const secondaryButtonUrl = props?.secondaryButtonUrl || "#";
    const secondaryButtonTarget = props?.secondaryButtonTarget || "_self";
    return (<container_component_1.ContainerComponent id="hero-centered-container" padding="xl" background="muted" className="text-center py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg">
      <text_component_1.TextComponent id="hero-centered-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-6"/>
      <text_component_1.TextComponent id="hero-centered-subtitle" content={subtitle} variant={subtitleVariant} align={subtitleAlign} color={subtitleColor} weight={subtitleWeight} className="mb-8 max-w-2xl mx-auto text-primary-foreground/80"/>
      <grid_component_1.GridComponent id="hero-centered-btn-grid" columns={2} gap="md" className="justify-center space-x-4">
        <button_component_1.ButtonComponent id="hero-get-started-btn" text={primaryButtonText} href={primaryButtonUrl} target={primaryButtonTarget} variant="default" size="lg"/>
        <button_component_1.ButtonComponent id="hero-learn-more-btn" text={secondaryButtonText} href={secondaryButtonUrl} target={secondaryButtonTarget} variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"/>
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.HeroCenteredBgImage = HeroCenteredBgImage;
// Hero Block 2: Split Hero with Image on Right
const HeroSplitImageRight = ({ props }) => {
    const title = props?.title || "Transform Your Business";
    const titleVariant = props?.titleVariant || "heading1";
    const titleAlign = props?.titleAlign || "left";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const subtitle = props?.subtitle || "Our innovative solutions help you achieve more with less effort.";
    const subtitleVariant = props?.subtitleVariant || "body";
    const subtitleAlign = props?.subtitleAlign || "left";
    const subtitleColor = props?.subtitleColor || "secondary";
    const subtitleWeight = props?.subtitleWeight || "normal";
    const buttonText = props?.buttonText || "Start Free Trial";
    const buttonUrl = props?.buttonUrl || "#";
    const buttonTarget = props?.buttonTarget || "_self";
    const imageUrl = props?.imageUrl || "/placeholder-image.jpg";
    return (<container_component_1.ContainerComponent id="hero-split-container" padding="xl" background="none" className="py-20">
      <grid_component_1.GridComponent id="hero-split-grid" columns={2} gap="xl" className="items-center">
        <div>
          <text_component_1.TextComponent id="hero-split-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-6"/>
          <text_component_1.TextComponent id="hero-split-subtitle" content={subtitle} variant={subtitleVariant} align={subtitleAlign} color={subtitleColor} weight={subtitleWeight} className="mb-8 text-muted-foreground"/>
          <button_component_1.ButtonComponent id="hero-split-cta-btn" text={buttonText} href={buttonUrl} target={buttonTarget} variant="default" size="lg"/>
        </div>
        <div className="flex justify-center">
          <card_component_1.CardComponent id="hero-split-card" padding="lg" rounded="lg" shadow="md">
            <image_component_1.ImageComponent id="hero-split-image" src={imageUrl} alt="Hero Image" className="rounded-md"/>
          </card_component_1.CardComponent>
        </div>
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.HeroSplitImageRight = HeroSplitImageRight;
// Hero Block 3: Gradient Hero with Floating CTA
const HeroGradientFloatingCta = ({ props }) => {
    const title = props?.title || "Innovation Meets Excellence";
    const titleVariant = props?.titleVariant || "heading1";
    const titleAlign = props?.titleAlign || "center";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const subtitle = props?.subtitle || "Join thousands of satisfied customers who have transformed their workflow.";
    const subtitleVariant = props?.subtitleVariant || "body";
    const subtitleAlign = props?.subtitleAlign || "center";
    const subtitleColor = props?.subtitleColor || "secondary";
    const subtitleWeight = props?.subtitleWeight || "normal";
    const buttonText = props?.buttonText || "Get Started";
    const buttonUrl = props?.buttonUrl || "#";
    const buttonTarget = props?.buttonTarget || "_self";
    return (<container_component_1.ContainerComponent id="hero-gradient-container" padding="xl" background="none" className="py-32 rounded-lg bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-10 right-10">
        <button_component_1.ButtonComponent id="hero-gradient-floating-btn" text={buttonText} href={buttonUrl} target={buttonTarget} variant="default" size="lg" className="bg-background text-foreground hover:bg-background/90 shadow-lg"/>
      </div>
      <text_component_1.TextComponent id="hero-gradient-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-6 max-w-2xl"/>
      <text_component_1.TextComponent id="hero-gradient-subtitle" content={subtitle} variant={subtitleVariant} align={subtitleAlign} color={subtitleColor} weight={subtitleWeight} className="mb-10 max-w-2xl text-primary-foreground/80"/>
    </container_component_1.ContainerComponent>);
};
exports.HeroGradientFloatingCta = HeroGradientFloatingCta;
// Hero Block 4: Video Hero Background
const HeroVideoBackground = ({ props }) => {
    const title = props?.title || "Experience the Future";
    const titleVariant = props?.titleVariant || "heading1";
    const titleAlign = props?.titleAlign || "center";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const subtitle = props?.subtitle || "Immersive experiences that captivate and engage your audience.";
    const subtitleVariant = props?.subtitleVariant || "body";
    const subtitleAlign = props?.subtitleAlign || "center";
    const subtitleColor = props?.subtitleColor || "secondary";
    const subtitleWeight = props?.subtitleWeight || "normal";
    const buttonText = props?.buttonText || "Watch Demo";
    const buttonUrl = props?.buttonUrl || "#";
    const buttonTarget = props?.buttonTarget || "_self";
    return (<container_component_1.ContainerComponent id="hero-video-container" padding="xl" background="none" className="py-40 rounded-lg relative overflow-hidden text-primary-foreground text-center">
      {/* Video background would go here in a real implementation */}
      <div className="absolute inset-0 bg-background/50"></div>
      <div className="relative z-10">
        <text_component_1.TextComponent id="hero-video-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-6"/>
        <text_component_1.TextComponent id="hero-video-subtitle" content={subtitle} variant={subtitleVariant} align={subtitleAlign} color={subtitleColor} weight={subtitleWeight} className="mb-10 max-w-2xl mx-auto text-primary-foreground/80"/>
        <button_component_1.ButtonComponent id="hero-video-cta-btn" text={buttonText} href={buttonUrl} target={buttonTarget} variant="default" size="lg" className="bg-background text-foreground hover:bg-background/90"/>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.HeroVideoBackground = HeroVideoBackground;
// Hero Block 5: Fullscreen Hero with Sticky CTA
const HeroFullscreenStickyCta = ({ props }) => {
    const title = props?.title || "Make Your Mark";
    const titleVariant = props?.titleVariant || "heading1";
    const titleAlign = props?.titleAlign || "center";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const subtitle = props?.subtitle || "The ultimate platform for creators and innovators.";
    const subtitleVariant = props?.subtitleVariant || "body";
    const subtitleAlign = props?.subtitleAlign || "center";
    const subtitleColor = props?.subtitleColor || "secondary";
    const subtitleWeight = props?.subtitleWeight || "normal";
    const buttonText = props?.buttonText || "Get Started Now";
    const buttonUrl = props?.buttonUrl || "#";
    const buttonTarget = props?.buttonTarget || "_self";
    return (<container_component_1.ContainerComponent id="hero-fullscreen-container" padding="none" background="none" className="h-screen flex flex-col justify-center items-center text-center relative">
      <text_component_1.TextComponent id="hero-fullscreen-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-6"/>
      <text_component_1.TextComponent id="hero-fullscreen-subtitle" content={subtitle} variant={subtitleVariant} align={subtitleAlign} color={subtitleColor} weight={subtitleWeight} className="mb-10 max-w-2xl mx-auto text-muted-foreground"/>
      <div className="fixed bottom-8">
        <button_component_1.ButtonComponent id="hero-fullscreen-cta-btn" text={buttonText} href={buttonUrl} target={buttonTarget} variant="default" size="lg"/>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.HeroFullscreenStickyCta = HeroFullscreenStickyCta;
// Hero Block 6: Carousel Hero with Multiple Slides
const HeroCarouselSlides = ({ props }) => {
    const title = props?.title || "Featured Solutions";
    const titleVariant = props?.titleVariant || "heading2";
    const titleAlign = props?.titleAlign || "center";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const subtitle = props?.subtitle || "Discover our most popular offerings";
    const subtitleVariant = props?.subtitleVariant || "body";
    const subtitleAlign = props?.subtitleAlign || "center";
    const subtitleColor = props?.subtitleColor || "secondary";
    const subtitleWeight = props?.subtitleWeight || "normal";
    const items = props?.items || [
        {
            id: '1',
            slideTitle: "Solution One",
            slideDescription: "Brief description of this amazing solution.",
            buttonText: "Learn More",
            buttonUrl: "#",
        },
        {
            id: '2',
            slideTitle: "Solution Two",
            slideDescription: "Another great solution for your business needs.",
            buttonText: "Learn More",
            buttonUrl: "#",
        },
        {
            id: '3',
            slideTitle: "Solution Three",
            slideDescription: "Our most popular solution with advanced features.",
            buttonText: "Learn More",
            buttonUrl: "#",
        }
    ];
    return (<container_component_1.ContainerComponent id="hero-carousel-container" padding="xl" background="muted" className="py-20 rounded-lg">
      <grid_component_1.GridComponent id="hero-carousel-grid" columns={1} gap="md">
        <text_component_1.TextComponent id="hero-carousel-title" content={title} variant="heading2" className="text-center mb-4"/>
        <text_component_1.TextComponent id="hero-carousel-subtitle" content={subtitle} variant="body" className="text-center mb-8 text-muted-foreground"/>
        {/* In a real implementation, this would be a carousel component */}
        {items.map((item, index) => (<card_component_1.CardComponent id={`hero-carousel-card-${index + 1}`} key={item.id || index} padding="lg" rounded="lg" shadow="md" className="text-center">
            <text_component_1.TextComponent id={`hero-carousel-slide-title-${index + 1}`} content={item.slideTitle} variant="heading3" className="mb-3"/>
            <text_component_1.TextComponent id={`hero-carousel-slide-desc-${index + 1}`} content={item.slideDescription} variant="body" className="mb-4 text-muted-foreground"/>
            <button_component_1.ButtonComponent id={`hero-carousel-slide-btn-${index + 1}`} text={item.buttonText} href={item.buttonUrl || "#"} target={item.buttonTarget || "_self"} variant="outline" size="sm"/>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.HeroCarouselSlides = HeroCarouselSlides;
// Export all hero blocks
exports.heroBlocks = [
    {
        id: 'hero-centered-bg-image',
        name: 'Centered Hero with Background Image',
        description: 'A minimal hero with centered content and full-width background image; great for clean, modern landing pages.',
        category: 'Hero',
        component: exports.HeroCenteredBgImage,
    },
    {
        id: 'hero-split-image-right',
        name: 'Split Hero with Image on Right',
        description: 'Text content on the left and product image on the right; suitable for product showcases or SaaS intros.',
        category: 'Hero',
        component: exports.HeroSplitImageRight,
    },
    {
        id: 'hero-gradient-floating-cta',
        name: 'Gradient Hero with Floating CTA',
        description: 'Gradient background and a floating button element; excellent for app downloads or signups.',
        category: 'Hero',
        component: exports.HeroGradientFloatingCta,
    },
    {
        id: 'hero-video-background',
        name: 'Video Hero Background',
        description: 'Looped video background with overlay text and CTA; ideal for storytelling and brand identity.',
        category: 'Hero',
        component: exports.HeroVideoBackground,
    },
    {
        id: 'hero-fullscreen-sticky-cta',
        name: 'Fullscreen Hero with Sticky CTA',
        description: 'Takes the entire viewport with fixed CTA; optimized for conversions on sales or promotion pages.',
        category: 'Hero',
        component: exports.HeroFullscreenStickyCta,
    },
    {
        id: 'hero-carousel-slides',
        name: 'Carousel Hero with Multiple Slides',
        description: 'Rotating hero slides for multi-feature product promotion or event highlights.',
        category: 'Hero',
        component: exports.HeroCarouselSlides,
    },
];
//# sourceMappingURL=hero-blocks.js.map
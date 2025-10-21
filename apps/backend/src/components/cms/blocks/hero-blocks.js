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
    const subtitle = props?.subtitle || "Discover amazing features and services that will transform your experience.";
    const primaryButtonText = props?.primaryButtonText || "Get Started";
    const secondaryButtonText = props?.secondaryButtonText || "Learn More";
    return (<container_component_1.ContainerComponent id="hero-centered-container" padding="xl" background="muted" className="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
      <text_component_1.TextComponent id="hero-centered-title" content={title} variant="heading1" className="mb-6"/>
      <text_component_1.TextComponent id="hero-centered-subtitle" content={subtitle} variant="body" className="mb-8 max-w-2xl mx-auto text-white/80"/>
      <grid_component_1.GridComponent id="hero-centered-btn-grid" columns={2} gap="md" className="justify-center space-x-4">
        <button_component_1.ButtonComponent id="hero-get-started-btn" text={primaryButtonText} variant="default" size="lg"/>
        <button_component_1.ButtonComponent id="hero-learn-more-btn" text={secondaryButtonText} variant="outline" size="lg" className="border-white text-white hover:bg-white/10"/>
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.HeroCenteredBgImage = HeroCenteredBgImage;
// Hero Block 2: Split Hero with Image on Right
const HeroSplitImageRight = ({ props }) => {
    const title = props?.title || "Transform Your Business";
    const subtitle = props?.subtitle || "Our innovative solutions help you achieve more with less effort.";
    const buttonText = props?.buttonText || "Start Free Trial";
    const imageUrl = props?.imageUrl || "/placeholder-image.jpg";
    return (<container_component_1.ContainerComponent id="hero-split-container" padding="xl" background="none" className="py-20">
      <grid_component_1.GridComponent id="hero-split-grid" columns={2} gap="xl" className="items-center">
        <div>
          <text_component_1.TextComponent id="hero-split-title" content={title} variant="heading1" className="mb-6"/>
          <text_component_1.TextComponent id="hero-split-subtitle" content={subtitle} variant="body" className="mb-8 text-muted-foreground"/>
          <button_component_1.ButtonComponent id="hero-split-cta-btn" text={buttonText} variant="default" size="lg"/>
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
    const subtitle = props?.subtitle || "Join thousands of satisfied customers who have transformed their workflow.";
    const buttonText = props?.buttonText || "Get Started";
    return (<container_component_1.ContainerComponent id="hero-gradient-container" padding="xl" background="none" className="py-32 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white relative overflow-hidden">
      <div className="absolute top-10 right-10">
        <button_component_1.ButtonComponent id="hero-gradient-floating-btn" text={buttonText} variant="default" size="lg" className="bg-white text-indigo-600 hover:bg-white/90 shadow-lg"/>
      </div>
      <text_component_1.TextComponent id="hero-gradient-title" content={title} variant="heading1" className="mb-6 max-w-2xl"/>
      <text_component_1.TextComponent id="hero-gradient-subtitle" content={subtitle} variant="body" className="mb-10 max-w-2xl text-white/80"/>
    </container_component_1.ContainerComponent>);
};
exports.HeroGradientFloatingCta = HeroGradientFloatingCta;
// Hero Block 4: Video Hero Background
const HeroVideoBackground = ({ props }) => {
    const title = props?.title || "Experience the Future";
    const subtitle = props?.subtitle || "Immersive experiences that captivate and engage your audience.";
    const buttonText = props?.buttonText || "Watch Demo";
    return (<container_component_1.ContainerComponent id="hero-video-container" padding="xl" background="none" className="py-40 rounded-lg relative overflow-hidden text-white text-center">
      {/* Video background would go here in a real implementation */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10">
        <text_component_1.TextComponent id="hero-video-title" content={title} variant="heading1" className="mb-6"/>
        <text_component_1.TextComponent id="hero-video-subtitle" content={subtitle} variant="body" className="mb-10 max-w-2xl mx-auto text-white/80"/>
        <button_component_1.ButtonComponent id="hero-video-cta-btn" text={buttonText} variant="default" size="lg" className="bg-white text-black hover:bg-white/90"/>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.HeroVideoBackground = HeroVideoBackground;
// Hero Block 5: Fullscreen Hero with Sticky CTA
const HeroFullscreenStickyCta = ({ props }) => {
    const title = props?.title || "Make Your Mark";
    const subtitle = props?.subtitle || "The ultimate platform for creators and innovators.";
    const buttonText = props?.buttonText || "Get Started Now";
    return (<container_component_1.ContainerComponent id="hero-fullscreen-container" padding="none" background="none" className="h-screen flex flex-col justify-center items-center text-center relative">
      <text_component_1.TextComponent id="hero-fullscreen-title" content={title} variant="heading1" className="mb-6"/>
      <text_component_1.TextComponent id="hero-fullscreen-subtitle" content={subtitle} variant="body" className="mb-10 max-w-2xl mx-auto text-muted-foreground"/>
      <div className="fixed bottom-8">
        <button_component_1.ButtonComponent id="hero-fullscreen-cta-btn" text={buttonText} variant="default" size="lg"/>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.HeroFullscreenStickyCta = HeroFullscreenStickyCta;
// Hero Block 6: Carousel Hero with Multiple Slides
const HeroCarouselSlides = ({ props }) => {
    const title = props?.title || "Featured Solutions";
    const subtitle = props?.subtitle || "Discover our most popular offerings";
    const items = props?.items || [
        {
            id: '1',
            slideTitle: "Solution One",
            slideDescription: "Brief description of this amazing solution.",
            buttonText: "Learn More"
        },
        {
            id: '2',
            slideTitle: "Solution Two",
            slideDescription: "Another great solution for your business needs.",
            buttonText: "Learn More"
        },
        {
            id: '3',
            slideTitle: "Solution Three",
            slideDescription: "Our most popular solution with advanced features.",
            buttonText: "Learn More"
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
            <button_component_1.ButtonComponent id={`hero-carousel-slide-btn-${index + 1}`} text={item.buttonText} variant="outline" size="sm"/>
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
'use client';

import React from 'react';
import { ContainerComponent } from '@/components/cms/container-component';
import { TextComponent } from '@/components/cms/text-component';
import { ButtonComponent } from '@/components/cms/button-component';
import { GridComponent } from '@/components/cms/grid-component';
import { CardComponent } from '@/components/cms/card-component';
import { ImageComponent } from '@/components/cms/image-component';

// Hero Block 1: Centered Hero with Background Image
export const HeroCenteredBgImage: React.FC<any> = (props) => {
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

  // Background media support
  const backgroundMediaType = props?.backgroundMediaType || "image";
  const backgroundMediaUrl = props?.backgroundMediaUrl || "";

  // Determine background style based on media type
  const getBackgroundStyle = () => {
    if (backgroundMediaType === "image" && backgroundMediaUrl) {
      return {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundMediaUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }
    return {};
  };

  return (
    <ContainerComponent
      id="hero-centered-container"
      padding="xl"
      background="muted"
      className="text-center py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg relative overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Video background */}
      {backgroundMediaType === "video" && backgroundMediaUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundMediaUrl} type="video/mp4" />
        </video>
      )}

      {/* YouTube background */}
      {backgroundMediaType === "youtube" && backgroundMediaUrl && (
        <iframe
          src={`${backgroundMediaUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1`}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          allow="autoplay; encrypted-media"
          style={{ border: 0, transform: 'scale(1.5)' }}
        />
      )}

      {/* Content overlay */}
      <div className="relative z-10">
        <TextComponent
          id="hero-centered-title"
          content={title}
          variant={titleVariant}
          align={titleAlign}
          color={titleColor}
          weight={titleWeight}
          className="mb-6"
        />
        <TextComponent
          id="hero-centered-subtitle"
          content={subtitle}
          variant={subtitleVariant}
          align={subtitleAlign}
          color={subtitleColor}
          weight={subtitleWeight}
          className="mb-8 max-w-2xl mx-auto text-primary-foreground/80"
        />
        <GridComponent
          id="hero-centered-btn-grid"
          columns={2}
          gap="md"
          className="justify-center space-x-4"
        >
          <ButtonComponent id="hero-get-started-btn" text={primaryButtonText} href={primaryButtonUrl} target={primaryButtonTarget} variant="default" size="lg" />
          <ButtonComponent id="hero-learn-more-btn" text={secondaryButtonText} href={secondaryButtonUrl} target={secondaryButtonTarget} variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" />
        </GridComponent>
      </div>
    </ContainerComponent>
  );
};

// Hero Block 2: Split Hero with Image on Right
export const HeroSplitImageRight: React.FC<any> = (props) => {
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

  // Media support
  const imageMediaType = props?.imageMediaType || "image";
  const imageMediaUrl = props?.imageMediaUrl || "/placeholder-image.jpg";

  return (
    <ContainerComponent
      id="hero-split-container"
      padding="xl"
      background="none"
      className="py-20"
    >
      <GridComponent
        id="hero-split-grid"
        columns={2}
        gap="xl"
        className="items-center"
      >
        <div>
          <TextComponent
            id="hero-split-title"
            content={title}
            variant={titleVariant}
            align={titleAlign}
            color={titleColor}
            weight={titleWeight}
            className="mb-6"
          />
          <TextComponent
            id="hero-split-subtitle"
            content={subtitle}
            variant={subtitleVariant}
            align={subtitleAlign}
            color={subtitleColor}
            weight={subtitleWeight}
            className="mb-8 text-muted-foreground"
          />
          <ButtonComponent id="hero-split-cta-btn" text={buttonText} href={buttonUrl} target={buttonTarget} variant="default" size="lg" />
        </div>
        <div className="flex justify-center">
          <CardComponent
            id="hero-split-card"
            padding="lg"
            rounded="lg"
            shadow="md"
          >
            {/* Image */}
            {imageMediaType === "image" && imageMediaUrl && (
              <ImageComponent
                id="hero-split-image"
                src={imageMediaUrl}
                alt="Hero Image"
                className="rounded-md"
              />
            )}

            {/* Video */}
            {imageMediaType === "video" && imageMediaUrl && (
              <video
                controls
                className="w-full rounded-md"
              >
                <source src={imageMediaUrl} type="video/mp4" />
              </video>
            )}
          </CardComponent>
        </div>
      </GridComponent>
    </ContainerComponent>
  );
};

// Hero Block 3: Gradient Hero with Floating CTA
export const HeroGradientFloatingCta: React.FC<any> = (props) => {
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

  // Background media support
  const backgroundMediaType = props?.backgroundMediaType || "image";
  const backgroundMediaUrl = props?.backgroundMediaUrl || "";

  const getBackgroundStyle = () => {
    if (backgroundMediaType === "image" && backgroundMediaUrl) {
      return {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundMediaUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }
    return {};
  };

  return (
    <ContainerComponent
      id="hero-gradient-container"
      padding="xl"
      background="none"
      className="py-32 rounded-lg bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground relative overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Video background */}
      {backgroundMediaType === "video" && backgroundMediaUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundMediaUrl} type="video/mp4" />
        </video>
      )}

      {/* YouTube background */}
      {backgroundMediaType === "youtube" && backgroundMediaUrl && (
        <iframe
          src={`${backgroundMediaUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1`}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          allow="autoplay; encrypted-media"
          style={{ border: 0, transform: 'scale(1.5)' }}
        />
      )}

      <div className="relative z-10">
        <div className="absolute top-10 right-10">
          <ButtonComponent
            id="hero-gradient-floating-btn"
            text={buttonText}
            href={buttonUrl}
            target={buttonTarget}
            variant="default"
            size="lg"
            className="bg-background text-foreground hover:bg-background/90 shadow-lg"
          />
        </div>
        <TextComponent
          id="hero-gradient-title"
          content={title}
          variant={titleVariant}
          align={titleAlign}
          color={titleColor}
          weight={titleWeight}
          className="mb-6 max-w-2xl"
        />
        <TextComponent
          id="hero-gradient-subtitle"
          content={subtitle}
          variant={subtitleVariant}
          align={subtitleAlign}
          color={subtitleColor}
          weight={subtitleWeight}
          className="mb-10 max-w-2xl text-primary-foreground/80"
        />
      </div>
    </ContainerComponent>
  );
};

// Hero Block 4: Video Hero Background
export const HeroVideoBackground: React.FC<any> = (props) => {
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

  // Background media support (defaults to video for this component)
  const backgroundMediaType = props?.backgroundMediaType || "video";
  const backgroundMediaUrl = props?.backgroundMediaUrl || "";

  const getBackgroundStyle = () => {
    if (backgroundMediaType === "image" && backgroundMediaUrl) {
      return {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundMediaUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }
    return {};
  };

  return (
    <ContainerComponent
      id="hero-video-container"
      padding="xl"
      background="none"
      className="py-40 rounded-lg relative overflow-hidden text-primary-foreground text-center"
      style={getBackgroundStyle()}
    >
      {/* Video background */}
      {backgroundMediaType === "video" && backgroundMediaUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundMediaUrl} type="video/mp4" />
        </video>
      )}

      {/* YouTube background */}
      {backgroundMediaType === "youtube" && backgroundMediaUrl && (
        <iframe
          src={`${backgroundMediaUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1`}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          allow="autoplay; encrypted-media"
          style={{ border: 0, transform: 'scale(1.5)' }}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/50 z-[1]"></div>

      <div className="relative z-10">
        <TextComponent
          id="hero-video-title"
          content={title}
          variant={titleVariant}
          align={titleAlign}
          color={titleColor}
          weight={titleWeight}
          className="mb-6"
        />
        <TextComponent
          id="hero-video-subtitle"
          content={subtitle}
          variant={subtitleVariant}
          align={subtitleAlign}
          color={subtitleColor}
          weight={subtitleWeight}
          className="mb-10 max-w-2xl mx-auto text-primary-foreground/80"
        />
        <ButtonComponent
          id="hero-video-cta-btn"
          text={buttonText}
          href={buttonUrl}
          target={buttonTarget}
          variant="default"
          size="lg"
          className="bg-background text-foreground hover:bg-background/90"
        />
      </div>
    </ContainerComponent>
  );
};

// Hero Block 5: Fullscreen Hero with Sticky CTA
export const HeroFullscreenStickyCta: React.FC<any> = (props) => {
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

  // Background media support
  const backgroundMediaType = props?.backgroundMediaType || "image";
  const backgroundMediaUrl = props?.backgroundMediaUrl || "";

  const getBackgroundStyle = () => {
    if (backgroundMediaType === "image" && backgroundMediaUrl) {
      return {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundMediaUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }
    return {};
  };

  return (
    <ContainerComponent
      id="hero-fullscreen-container"
      padding="none"
      background="none"
      className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Video background */}
      {backgroundMediaType === "video" && backgroundMediaUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundMediaUrl} type="video/mp4" />
        </video>
      )}

      {/* YouTube background */}
      {backgroundMediaType === "youtube" && backgroundMediaUrl && (
        <iframe
          src={`${backgroundMediaUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1`}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          allow="autoplay; encrypted-media"
          style={{ border: 0, transform: 'scale(1.5)' }}
        />
      )}

      <div className="relative z-10">
        <TextComponent
          id="hero-fullscreen-title"
          content={title}
          variant={titleVariant}
          align={titleAlign}
          color={titleColor}
          weight={titleWeight}
          className="mb-6"
        />
        <TextComponent
          id="hero-fullscreen-subtitle"
          content={subtitle}
          variant={subtitleVariant}
          align={subtitleAlign}
          color={subtitleColor}
          weight={subtitleWeight}
          className="mb-10 max-w-2xl mx-auto text-muted-foreground"
        />
      </div>
      <div className="fixed bottom-8 z-20">
        <ButtonComponent
          id="hero-fullscreen-cta-btn"
          text={buttonText}
          href={buttonUrl}
          target={buttonTarget}
          variant="default"
          size="lg"
        />
      </div>
    </ContainerComponent>
  );
};

// Hero Block 6: Carousel Hero with Multiple Slides
export const HeroCarouselSlides: React.FC<any> = (props) => {
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

  // Background media support
  const backgroundMediaType = props?.backgroundMediaType || "none";
  const backgroundMediaUrl = props?.backgroundMediaUrl || "";

  const items = props?.items || [
    {
      id: '1',
      slideTitle: "Solution One",
      slideDescription: "Brief description of this amazing solution.",
      buttonText: "Learn More",
      buttonUrl: "#",
      mediaType: "image",
      mediaUrl: ""
    },
    {
      id: '2',
      slideTitle: "Solution Two",
      slideDescription: "Another great solution for your business needs.",
      buttonText: "Learn More",
      buttonUrl: "#",
      mediaType: "image",
      mediaUrl: ""
    },
    {
      id: '3',
      slideTitle: "Solution Three",
      slideDescription: "Our most popular solution with advanced features.",
      buttonText: "Learn More",
      buttonUrl: "#",
      mediaType: "image",
      mediaUrl: ""
    }
  ];

  const getBackgroundStyle = () => {
    if (backgroundMediaType === "image" && backgroundMediaUrl) {
      return {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${backgroundMediaUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }
    return {};
  };

  return (
    <ContainerComponent
      id="hero-carousel-container"
      padding="xl"
      background="muted"
      className="py-20 rounded-lg relative overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Video background */}
      {backgroundMediaType === "video" && backgroundMediaUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundMediaUrl} type="video/mp4" />
        </video>
      )}

      {/* YouTube background */}
      {backgroundMediaType === "youtube" && backgroundMediaUrl && (
        <iframe
          src={`${backgroundMediaUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1`}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          allow="autoplay; encrypted-media"
          style={{ border: 0, transform: 'scale(1.5)' }}
        />
      )}

      <GridComponent
        id="hero-carousel-grid"
        columns={1}
        gap="md"
        className="relative z-10"
      >
        <TextComponent
          id="hero-carousel-title"
          content={title}
          variant="heading2"
          className="text-center mb-4"
        />
        <TextComponent
          id="hero-carousel-subtitle"
          content={subtitle}
          variant="body"
          className="text-center mb-8 text-muted-foreground"
        />
        {/* Carousel slides with media support */}
        {items.map((item: any, index: number) => (
          <CardComponent
            id={`hero-carousel-card-${index + 1}`}
            key={item.id || index}
            padding="lg"
            rounded="lg"
            shadow="md"
            className="text-center"
          >
            {/* Slide media */}
            {item.mediaType === "image" && item.mediaUrl && (
              <ImageComponent
                id={`hero-carousel-slide-image-${index + 1}`}
                src={item.mediaUrl}
                alt={item.slideTitle || "Slide image"}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            {item.mediaType === "video" && item.mediaUrl && (
              <video
                controls
                className="w-full h-64 object-cover rounded-md mb-4"
              >
                <source src={item.mediaUrl} type="video/mp4" />
              </video>
            )}
            {item.mediaType === "youtube" && item.mediaUrl && (
              <div className="relative w-full h-64 mb-4">
                <iframe
                  src={`${item.mediaUrl}?controls=1`}
                  className="w-full h-full rounded-md"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 0 }}
                />
              </div>
            )}

            <TextComponent
              id={`hero-carousel-slide-title-${index + 1}`}
              content={item.slideTitle}
              variant="heading3"
              className="mb-3"
            />
            <TextComponent
              id={`hero-carousel-slide-desc-${index + 1}`}
              content={item.slideDescription}
              variant="body"
              className="mb-4 text-muted-foreground"
            />
            <ButtonComponent
              id={`hero-carousel-slide-btn-${index + 1}`}
              text={item.buttonText}
              href={item.buttonUrl || "#"}
              target={item.buttonTarget || "_self"}
              variant="outline"
              size="sm"
            />
          </CardComponent>
        ))}
      </GridComponent>
    </ContainerComponent>
  );
};

// Export all hero blocks
export const heroBlocks = [
  {
    id: 'hero-centered-bg-image',
    name: 'Centered Hero with Background Image',
    description: 'A minimal hero with centered content and full-width background image; great for clean, modern landing pages.',
    category: 'Hero',
    component: HeroCenteredBgImage,
  },
  {
    id: 'hero-split-image-right',
    name: 'Split Hero with Image on Right',
    description: 'Text content on the left and product image on the right; suitable for product showcases or SaaS intros.',
    category: 'Hero',
    component: HeroSplitImageRight,
  },
  {
    id: 'hero-gradient-floating-cta',
    name: 'Gradient Hero with Floating CTA',
    description: 'Gradient background and a floating button element; excellent for app downloads or signups.',
    category: 'Hero',
    component: HeroGradientFloatingCta,
  },
  {
    id: 'hero-video-background',
    name: 'Video Hero Background',
    description: 'Looped video background with overlay text and CTA; ideal for storytelling and brand identity.',
    category: 'Hero',
    component: HeroVideoBackground,
  },
  {
    id: 'hero-fullscreen-sticky-cta',
    name: 'Fullscreen Hero with Sticky CTA',
    description: 'Takes the entire viewport with fixed CTA; optimized for conversions on sales or promotion pages.',
    category: 'Hero',
    component: HeroFullscreenStickyCta,
  },
  {
    id: 'hero-carousel-slides',
    name: 'Carousel Hero with Multiple Slides',
    description: 'Rotating hero slides for multi-feature product promotion or event highlights.',
    category: 'Hero',
    component: HeroCarouselSlides,
  },
];
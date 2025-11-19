import { TextComponent } from './text-component';
import { ButtonComponent } from './button-component';
import { ImageComponent } from './image-component';
import { ContainerComponent } from './container-component';
import { CardComponent } from './card-component';
import { GridComponent } from './grid-component';

// Import migration blocks
import {
  CMSHeroCarousel,
  CMSCertificateVerification,
  CMSSolutionsCarousel,
  CMSProductsCarousel,
  CMSParallaxSpacer,
  CMSNewsletterSection,
  CMSWhyAluplan,
  CMSWorkflowSection,
  HeroWithImageAndTextOverlay,
  HeroWithBackgroundImage,
  ContentSectionWithTitle,
  ContentWithCallToAction,
  ContentWithImageTwoColumn,
  NewsletterSignupForm,
} from './blocks/migration-blocks';
import { TimelineCarousel } from '@/components/timeline-carousel';

// Import special blocks
import {
  SpecialFeatureTrio,
  SpecialFeatureCardSingle,
  SpecialGridContainer,
  SpecialProductGrid,
  SpecialResourceTabs,
  SpecialAccordionFaq
} from './blocks/special-blocks';

// Import new template design blocks (Sprint 1)
import { HeroSolutions } from './blocks/hero-solutions';
import { HeroCorporate } from './blocks/hero-corporate';
import { HeroCaseStudy } from './blocks/hero-case-study';
import { TimelineHorizontal } from './blocks/timeline-horizontal';
import { TimelineVertical } from './blocks/timeline-vertical';
import { TestimonialCarousel } from './blocks/testimonial-carousel';
import { CarouselGallery } from './blocks/carousel-gallery';
import { ClientLogoGrid } from './blocks/client-logo-grid';
import { FeatureTabs } from './blocks/feature-tabs';
import { CategoryTabs } from './blocks/category-tabs';

// Block registry pattern - maps component types to their implementations
export const blockRegistry = {
  text: TextComponent,
  button: ButtonComponent,
  image: ImageComponent,
  container: ContainerComponent,
  card: CardComponent,
  grid: GridComponent,
  // Migration blocks
  'cms-hero-carousel': CMSHeroCarousel,
  'cms-certificate-verification': CMSCertificateVerification,
  'cms-solutions-carousel': CMSSolutionsCarousel,
  'cms-products-carousel': CMSProductsCarousel,
  'cms-parallax-spacer': CMSParallaxSpacer,
  'cms-newsletter-section': CMSNewsletterSection,
  'cms-why-aluplan': CMSWhyAluplan,
  'cms-workflow-section': CMSWorkflowSection,
  'hero-with-image-and-text-overlay': HeroWithImageAndTextOverlay,
  'hero-with-background-image': HeroWithBackgroundImage,
  'content-section-with-title': ContentSectionWithTitle,
  'content-with-call-to-action': ContentWithCallToAction,
  'content-with-image-two-column': ContentWithImageTwoColumn,
  'newsletter-signup-form': NewsletterSignupForm,
  'cms-timeline-carousel': TimelineCarousel,
  // Special blocks
  'special-feature-trio': SpecialFeatureTrio,
  'special-feature-card-single': SpecialFeatureCardSingle,
  'special-grid-container': SpecialGridContainer,
  'special-product-grid': SpecialProductGrid,
  'special-resource-tabs': SpecialResourceTabs,
  'faq-section-with-accordion': SpecialAccordionFaq,
  'special-accordion-faq': SpecialAccordionFaq,
  // New template design blocks (Sprint 1)
  'hero-solutions': HeroSolutions,
  'hero-corporate': HeroCorporate,
  'hero-case-study': HeroCaseStudy,
  'timeline-horizontal': TimelineHorizontal,
  'timeline-vertical': TimelineVertical,
  'testimonial-carousel': TestimonialCarousel,
  'carousel-gallery': CarouselGallery,
  'client-logo-grid': ClientLogoGrid,
  'feature-tabs': FeatureTabs,
  'category-tabs': CategoryTabs,
} as const;

export type BlockType = keyof typeof blockRegistry;
export type BlockComponent = typeof blockRegistry[BlockType];

// Type guard to check if a type is a valid block type
export function isBlockType(type: string): type is BlockType {
  return type in blockRegistry;
}

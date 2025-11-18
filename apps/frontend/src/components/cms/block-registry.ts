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

// Import special blocks
import {
  SpecialFeatureTrio,
  SpecialFeatureCardSingle,
  SpecialGridContainer,
  SpecialProductGrid,
  SpecialResourceTabs
} from './blocks/special-blocks';

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
  // Special blocks
  'special-feature-trio': SpecialFeatureTrio,
  'special-feature-card-single': SpecialFeatureCardSingle,
  'special-grid-container': SpecialGridContainer,
  'special-product-grid': SpecialProductGrid,
  'special-resource-tabs': SpecialResourceTabs,
} as const;

export type BlockType = keyof typeof blockRegistry;
export type BlockComponent = typeof blockRegistry[BlockType];

// Type guard to check if a type is a valid block type
export function isBlockType(type: string): type is BlockType {
  return type in blockRegistry;
}

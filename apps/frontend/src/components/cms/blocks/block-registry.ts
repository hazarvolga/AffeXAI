// Auto-generated block registry
// Maps blockId (kebab-case) to React components

import * as HeroBlocks from './hero-blocks';
import * as ContentBlocks from './content-blocks';
import * as FeaturesBlocks from './features-blocks';
import * as TestimonialsBlocks from './testimonials-blocks';
import * as GalleryBlocks from './gallery-blocks';
import * as PricingBlocks from './pricing-blocks';
import * as StatsBlocks from './stats-blocks';
import * as FooterBlocks from './footer-blocks';
import * as NavigationBlocks from './navigation-blocks';
import * as ElementBlocks from './element-blocks';
import * as SocialSharingBlocks from './social-sharing-blocks';
import * as BlogRssBlocks from './blog-rss-blocks';
import * as EcommerceBlocks from './ecommerce-blocks';
import * as ProgressBlocks from './progress-blocks';
import * as RatingBlocks from './rating-blocks';
import * as SpecialBlocks from './special-blocks';
import * as ContentVariantBlocks from './content-variants-blocks';
import * as MigrationBlocks from './migration-blocks';

// Helper function to convert PascalCase to kebab-case
const toKebabCase = (str: string) =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// Create registry mapping kebab-case IDs to components
export const blockRegistry: Record<string, React.ComponentType<any>> = {};

// Register all hero blocks
Object.entries(HeroBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'heroBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all content blocks
Object.entries(ContentBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'contentBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all features blocks
Object.entries(FeaturesBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'featuresBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all testimonials blocks
Object.entries(TestimonialsBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'testimonialsBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all gallery blocks
Object.entries(GalleryBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'galleryBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all pricing blocks
Object.entries(PricingBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'pricingBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all stats blocks
Object.entries(StatsBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'statsBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all footer blocks
Object.entries(FooterBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'footerBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all navigation blocks
Object.entries(NavigationBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'navigationBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all element blocks
Object.entries(ElementBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'elementBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all social sharing blocks
Object.entries(SocialSharingBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'socialSharingBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all blog/rss blocks
Object.entries(BlogRssBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'blogRssBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all ecommerce blocks
Object.entries(EcommerceBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'ecommerceBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all progress blocks
Object.entries(ProgressBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'progressBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all rating blocks
Object.entries(RatingBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'ratingBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all special blocks
Object.entries(SpecialBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'specialBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all content variant blocks
Object.entries(ContentVariantBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'contentVariantBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Register all migration blocks
Object.entries(MigrationBlocks).forEach(([name, component]) => {
  if (typeof component === 'function' && name !== 'migrationBlocks') {
    blockRegistry[toKebabCase(name)] = component;
  }
});

// Debug: Log all registered blocks (can be removed in production)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Block Registry - Total blocks registered:', Object.keys(blockRegistry).length);
  console.log('Block Registry - Available blocks:', Object.keys(blockRegistry).sort());
}

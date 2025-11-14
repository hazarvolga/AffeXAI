/**
 * Design Token Reference Configuration
 * Used to specify that a property can reference design tokens
 */
export interface TokenReferenceConfig {
  /**
   * Token category to filter available tokens
   */
  category: 'color' | 'spacing' | 'typography' | 'shadow' | 'border' | 'dimension' | 'fontFamily' | 'fontWeight';

  /**
   * Suggested token path (used as hint in UI)
   * Example: "color.primary", "spacing.lg"
   */
  suggestedPath?: string;

  /**
   * Allow custom values in addition to token references
   * If false, only token references are allowed
   */
  allowCustom?: boolean;

  /**
   * Help text shown in token picker
   */
  description?: string;
}

// Block property configurations
export interface BlockPropertySchema {
  [key: string]: {
    type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'list' | 'textarea' | 'token';
    label: string;
    options?: string[]; // For select type
    defaultValue?: any;

    /**
     * NEW: Token reference configuration
     * When specified, the property can reference design tokens
     * Works with 'color', 'text', 'number' types
     */
    tokenReference?: TokenReferenceConfig;

    // For list type
    itemSchema?: {
      [subKey: string]: {
        type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'textarea' | 'list' | 'token';
        label: string;
        options?: string[];
        defaultValue?: any;
        tokenReference?: TokenReferenceConfig;
        // For nested list type
        itemSchema?: {
          [subKey: string]: {
            type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'textarea' | 'list' | 'token';
            label: string;
            options?: string[];
            defaultValue?: any;
            tokenReference?: TokenReferenceConfig;
            // For deeply nested list type
            itemSchema?: {
              [subKey: string]: {
                type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'textarea' | 'token';
                label: string;
                options?: string[];
                defaultValue?: any;
                tokenReference?: TokenReferenceConfig;
              };
            };
          };
        };
      };
    };
  };
}

// Common logo properties for navigation blocks
const logoProperties = {
  logoMediaId: { type: 'text' as const, label: 'Logo Media ID', defaultValue: null },
  logoType: { 
    type: 'select' as const, 
    label: 'Logo Type', 
    options: ['text', 'image'],
    defaultValue: 'text' 
  },
  logoText: { type: 'text' as const, label: 'Logo Text', defaultValue: 'Company' },
  logoUrl: { type: 'image' as const, label: 'Logo Image URL', defaultValue: '' },
  logoAlt: { type: 'text' as const, label: 'Logo Alt Text', defaultValue: 'Company Logo' },
  logoWidth: { type: 'number' as const, label: 'Logo Width (px)', defaultValue: 120 },
  logoHeight: { type: 'number' as const, label: 'Logo Height (px)', defaultValue: 40 },
};

// Helper function to create button properties with a prefix
const createButtonProperties = (prefix: string = '') => {
  const p = prefix ? `${prefix}B` : 'b'; // primaryButtonUrl vs buttonUrl
  const label = prefix ? `${prefix} Button` : 'Button';
  
  return {
    [`${prefix ? prefix.toLowerCase() : ''}ButtonText`]: { 
      type: 'text' as const, 
      label: `${label} Text`, 
      defaultValue: 'Click Here' 
    },
    [`${prefix ? prefix.toLowerCase() : ''}ButtonUrl`]: { 
      type: 'text' as const, 
      label: `${label} URL`, 
      defaultValue: '#' 
    },
    [`${prefix ? prefix.toLowerCase() : ''}ButtonTarget`]: { 
      type: 'select' as const, 
      label: `${label} Target`, 
      options: ['_self', '_blank'],
      defaultValue: '_self' 
    },
  };
};

// Helper function to create text style properties (typography)
const createTextStyleProperties = (
  prefix: string,
  defaultVariant: 'heading1' | 'heading2' | 'heading3' | 'body' | 'caption' = 'body',
  defaultAlign: 'left' | 'center' | 'right' | 'justify' = 'left',
  defaultColor: 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error' = 'primary',
  defaultWeight: 'normal' | 'medium' | 'semibold' | 'bold' = 'normal'
) => {
  const label = prefix.charAt(0).toUpperCase() + prefix.slice(1);
  
  return {
    [`${prefix}Variant`]: { 
      type: 'select' as const,
      label: `${label} Size`, 
      options: ['heading1', 'heading2', 'heading3', 'body', 'caption'], 
      defaultValue: defaultVariant 
    },
    [`${prefix}Align`]: { 
      type: 'select' as const,
      label: `${label} Alignment`, 
      options: ['left', 'center', 'right', 'justify'], 
      defaultValue: defaultAlign 
    },
    [`${prefix}Color`]: { 
      type: 'select' as const,
      label: `${label} Color`, 
      options: ['primary', 'secondary', 'muted', 'success', 'warning', 'error'], 
      defaultValue: defaultColor 
    },
    [`${prefix}Weight`]: { 
      type: 'select' as const,
      label: `${label} Weight`, 
      options: ['normal', 'medium', 'semibold', 'bold'], 
      defaultValue: defaultWeight 
    },
  };
};

/**
 * NEW: Helper function to create color property with design token support
 * @param label - Property label
 * @param defaultValue - Default color value or token reference
 * @param allowCustom - Allow custom hex values in addition to tokens
 */
const createColorProperty = (
  label: string,
  defaultValue: string = '{color.background}',
  allowCustom: boolean = true
) => ({
  type: 'color' as const,
  label,
  defaultValue,
  tokenReference: {
    category: 'color' as const,
    suggestedPath: 'color.background',
    allowCustom,
    description: 'Select a color from design tokens or enter a custom value',
  },
});

/**
 * NEW: Helper function to create spacing property with design token support
 * @param label - Property label
 * @param defaultValue - Default spacing value or token reference
 * @param allowCustom - Allow custom values in addition to tokens
 */
const createSpacingProperty = (
  label: string,
  defaultValue: string = '{spacing.md}',
  allowCustom: boolean = true
) => ({
  type: 'text' as const,
  label,
  defaultValue,
  tokenReference: {
    category: 'spacing' as const,
    suggestedPath: 'spacing.md',
    allowCustom,
    description: 'Select spacing from design tokens or enter a custom value (e.g., 16px, 1rem)',
  },
});

/**
 * NEW: Helper function to create typography property with design token support
 * @param label - Property label
 * @param defaultValue - Default typography token reference
 */
const createTypographyProperty = (
  label: string,
  defaultValue: string = '{typography.body}'
) => ({
  type: 'token' as const,
  label,
  defaultValue,
  tokenReference: {
    category: 'typography' as const,
    suggestedPath: 'typography.body',
    allowCustom: false,
    description: 'Select a typography style from design tokens',
  },
});

/**
 * NEW: Common token-aware style properties for blocks
 */
const createTokenAwareStyleProperties = () => ({
  backgroundColor: createColorProperty('Background Color', '{color.background}'),
  textColor: createColorProperty('Text Color', '{color.foreground}'),
  padding: createSpacingProperty('Padding', '{spacing.md}'),
  margin: createSpacingProperty('Margin', '{spacing.sm}'),
});

// Navigation Blocks Config
export const navigationBlocksConfig: Record<string, BlockPropertySchema> = {
  'nav-minimal-logo-left': {
    ...logoProperties,
    navItems: {
      type: 'list',
      label: 'Navigation Items',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Home' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: '#ffffff' },
    showBorder: { type: 'boolean', label: 'Show Border', defaultValue: true },
  },
  'nav-centered-logo': {
    ...logoProperties,
    leftNavItems: {
      type: 'list',
      label: 'Left Navigation Items',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Home' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
    rightNavItems: {
      type: 'list',
      label: 'Right Navigation Items',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Contact' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: '#ffffff' },
    showBorder: { type: 'boolean', label: 'Show Border', defaultValue: true },
  },
  'nav-logo-cta': {
    ...logoProperties,
    navItems: {
      type: 'list',
      label: 'Navigation Items',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Home' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
    ctaButtonText: { type: 'text', label: 'CTA Button Text', defaultValue: 'Sign Up' },
    ctaButtonUrl: { type: 'text', label: 'CTA Button URL', defaultValue: '#' },
    ctaButtonTarget: { type: 'select', label: 'CTA Button Target', options: ['_self', '_blank'], defaultValue: '_self' },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: '#ffffff' },
  },
  'nav-social-links': {
    ...logoProperties,
    navItems: {
      type: 'list',
      label: 'Navigation Items',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Home' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
    socialLinks: {
      type: 'list',
      label: 'Social Links',
      itemSchema: {
        text: { type: 'text', label: 'Icon Text', defaultValue: 'f' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: '#ffffff' },
    showSocialIcons: { type: 'boolean', label: 'Show Social Icons', defaultValue: true },
  },
  'nav-sticky-transparent': {
    ...logoProperties,
    navItems: {
      type: 'list',
      label: 'Navigation Items',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Home' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
    transparentBackground: { type: 'boolean', label: 'Transparent Background', defaultValue: true },
  },
  'nav-split': {
    ...logoProperties,
    leftNavItems: {
      type: 'list',
      label: 'Left Navigation Items',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Products' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
    rightNavItems: {
      type: 'list',
      label: 'Right Navigation Items',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Contact' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: '#ffffff' },
    showBorder: { type: 'boolean', label: 'Show Border', defaultValue: true },
  },
};

// Hero Blocks Config
export const heroBlocksConfig: Record<string, BlockPropertySchema> = {
  'hero-centered-bg-image': {
    title: { type: 'text', label: 'Title', defaultValue: 'Welcome to Our Platform' },
    ...createTextStyleProperties('title', 'heading1', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Discover amazing features and services that will transform your experience.' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    ...createButtonProperties('primary'),
    ...createButtonProperties('secondary'),
    backgroundMediaId: { type: 'text', label: 'Background Media ID', defaultValue: null },
    backgroundImage: { type: 'image', label: 'Background Image URL', defaultValue: '' },
  },
  'hero-split-image-right': {
    title: { type: 'text', label: 'Title', defaultValue: 'Transform Your Business' },
    ...createTextStyleProperties('title', 'heading1', 'left', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Our innovative solutions help you achieve more with less effort.' },
    ...createTextStyleProperties('subtitle', 'body', 'left', 'secondary', 'normal'),
    ...createButtonProperties(),
    imageMediaId: { type: 'text', label: 'Image Media ID', defaultValue: null },
    imageUrl: { type: 'image', label: 'Image URL', defaultValue: '' },
  },
  'hero-gradient-floating-cta': {
    title: { type: 'text', label: 'Title', defaultValue: 'Innovation Meets Excellence' },
    ...createTextStyleProperties('title', 'heading1', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Join thousands of satisfied customers who have transformed their workflow.' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    ...createButtonProperties(),
    backgroundMediaId: { type: 'text', label: 'Background Media ID', defaultValue: null },
    backgroundImage: { type: 'image', label: 'Background Image', defaultValue: '' },
    backgroundPosition: { type: 'select', label: 'Background Position', options: ['center', 'top', 'bottom', 'left', 'right'], defaultValue: 'center' },
    backgroundSize: { type: 'select', label: 'Background Size', options: ['cover', 'contain', 'auto'], defaultValue: 'cover' },
  },
  'hero-video-background': {
    title: { type: 'text', label: 'Title', defaultValue: 'Experience the Future' },
    ...createTextStyleProperties('title', 'heading1', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Immersive experiences that captivate and engage your audience.' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    ...createButtonProperties(),
    backgroundMediaId: { type: 'text', label: 'Background Media ID', defaultValue: null },
    backgroundImage: { type: 'image', label: 'Background Image', defaultValue: '' },
    backgroundVideoUrl: { type: 'text', label: 'Background Video URL (optional)', defaultValue: '' },
    backgroundPosition: { type: 'select', label: 'Background Position', options: ['center', 'top', 'bottom', 'left', 'right'], defaultValue: 'center' },
    backgroundSize: { type: 'select', label: 'Background Size', options: ['cover', 'contain', 'auto'], defaultValue: 'cover' },
  },
  'hero-fullscreen-sticky-cta': {
    title: { type: 'text', label: 'Title', defaultValue: 'Make Your Mark' },
    ...createTextStyleProperties('title', 'heading1', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'The ultimate platform for creators and innovators.' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    ...createButtonProperties(),
    backgroundMediaId: { type: 'text', label: 'Background Media ID', defaultValue: null },
    backgroundImage: { type: 'image', label: 'Background Image', defaultValue: '' },
    backgroundPosition: { type: 'select', label: 'Background Position', options: ['center', 'top', 'bottom', 'left', 'right'], defaultValue: 'center' },
    backgroundSize: { type: 'select', label: 'Background Size', options: ['cover', 'contain', 'auto'], defaultValue: 'cover' },
  },
  'hero-carousel-slides': {
    title: { type: 'text', label: 'Title', defaultValue: 'Featured Solutions' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Discover our most popular offerings' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    backgroundMediaId: { type: 'text', label: 'Background Media ID', defaultValue: null },
    backgroundImage: { type: 'image', label: 'Background Image', defaultValue: '' },
    backgroundPosition: { type: 'select', label: 'Background Position', options: ['center', 'top', 'bottom', 'left', 'right'], defaultValue: 'center' },
    backgroundSize: { type: 'select', label: 'Background Size', options: ['cover', 'contain', 'auto'], defaultValue: 'cover' },
    items: {
      type: 'list',
      label: 'Carousel Items',
      itemSchema: {
        mediaId: { type: 'text', label: 'Slide Media ID', defaultValue: null },
        slideImage: { type: 'image', label: 'Slide Image', defaultValue: '/placeholder-image.jpg' },
        slideTitle: { type: 'text', label: 'Slide Title', defaultValue: 'Solution One' },
        slideDescription: { type: 'textarea', label: 'Slide Description', defaultValue: 'Brief description of this amazing solution.' },
        buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Learn More' },
        buttonUrl: { type: 'text', label: 'Button URL', defaultValue: '#' },
        buttonTarget: { type: 'select', label: 'Button Target', options: ['_self', '_blank'], defaultValue: '_self' },
      },
    },
  },
};

// Content Blocks Config
export const contentBlocksConfig: Record<string, BlockPropertySchema> = {
  'content-simple-block': {
    title: { type: 'text', label: 'Title', defaultValue: 'Important Information' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    content: { type: 'textarea', label: 'Content', defaultValue: 'This is a standard content block with a title and paragraph. It\'s perfect for displaying clean information without additional styling.' },
    ...createTextStyleProperties('content', 'body', 'left', 'secondary', 'normal'),
  },
  'content-boxed-block': {
    title: { type: 'text', label: 'Title', defaultValue: 'Featured Content' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    content: { type: 'textarea', label: 'Content', defaultValue: 'This boxed content block adds a bordered or shaded background to emphasize important information.' },
    ...createTextStyleProperties('content', 'body', 'left', 'secondary', 'normal'),
    ...createButtonProperties(),
  },
  'content-image-side-by-side': {
    title: { type: 'text', label: 'Title', defaultValue: 'Product Explanation' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    content: { type: 'textarea', label: 'Content', defaultValue: 'This layout is perfect for product explanations or team introductions where you want to show a visual alongside descriptive text.' },
    ...createTextStyleProperties('content', 'body', 'left', 'secondary', 'normal'),
    ...createButtonProperties(),
    imageMediaId: { type: 'text', label: 'Image Media ID', defaultValue: null },
    imageUrl: { type: 'image', label: 'Image URL', defaultValue: '' },
  },
  'content-double-image-text': {
    title: { type: 'text', label: 'Title', defaultValue: 'Feature Comparison' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'Feature Items',
      itemSchema: {
        mediaId: { type: 'text', label: 'Media ID', defaultValue: null },
        imageUrl: { type: 'image', label: 'Image URL', defaultValue: '/placeholder-image.jpg' },
        title: { type: 'text', label: 'Feature Title', defaultValue: 'Feature One' },
        content: { type: 'textarea', label: 'Feature Description', defaultValue: 'Detailed explanation of the first feature and its benefits.' },
      },
    },
  },
  'content-triple-grid': {
    title: { type: 'text', label: 'Title', defaultValue: 'Key Benefits' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'Benefit Items',
      itemSchema: {
        title: { type: 'text', label: 'Benefit Title', defaultValue: 'Benefit One' },
        content: { type: 'textarea', label: 'Benefit Description', defaultValue: 'Description of the first key benefit that provides value to users.' },
        buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Learn More' },
        buttonUrl: { type: 'text', label: 'Button URL', defaultValue: '#' },
        buttonTarget: { type: 'select', label: 'Button Target', options: ['_self', '_blank'], defaultValue: '_self' },
      },
    },
  },
  'content-cta-box': {
    title: { type: 'text', label: 'Title', defaultValue: 'Ready to Get Started?' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    content: { type: 'textarea', label: 'Content', defaultValue: 'Join thousands of satisfied customers today and experience the difference.' },
    ...createTextStyleProperties('content', 'body', 'center', 'secondary', 'normal'),
    ...createButtonProperties(),
  },
  'content-image-stacked': {
    title: { type: 'text', label: 'Title', defaultValue: 'Visual Storytelling' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    content: { type: 'textarea', label: 'Content', defaultValue: 'This visual-first layout places the image above the supporting text, making it perfect for storytelling or showcasing products where the visual is the primary focus.' },
    ...createTextStyleProperties('content', 'body', 'center', 'secondary', 'normal'),
    imageMediaId: { type: 'text', label: 'Image Media ID', defaultValue: null },
    imageUrl: { type: 'image', label: 'Image URL', defaultValue: '' },
  },
  'content-mini-box-cta': {
    title: { type: 'text', label: 'Title', defaultValue: 'Special Offer' },
    ...createTextStyleProperties('title', 'heading3', 'center', 'primary', 'bold'),
    content: { type: 'textarea', label: 'Content', defaultValue: 'Limited time discount for new customers!' },
    ...createTextStyleProperties('content', 'body', 'center', 'secondary', 'normal'),
    ...createButtonProperties(),
  },
  'content-single-fullwidth': {
    title: { type: 'text', label: 'Title', defaultValue: 'Important Announcement' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    content: { type: 'textarea', label: 'Content', defaultValue: 'This is a focused message to communicate important information to your visitors.' },
    ...createTextStyleProperties('content', 'body', 'center', 'secondary', 'normal'),
  },
  'content-two-column': {
    title: { type: 'text', label: 'Title', defaultValue: 'Our Services' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    content: { type: 'textarea', label: 'Content', defaultValue: 'We provide comprehensive solutions tailored to your business needs. Our expert team delivers results that exceed expectations.' },
    ...createTextStyleProperties('content', 'body', 'left', 'secondary', 'normal'),
    ctaText: { type: 'text', label: 'CTA Button Text', defaultValue: 'Learn More' },
    imageMediaId: { type: 'text', label: 'Image Media ID', defaultValue: null },
    image: { type: 'image', label: 'Image URL', defaultValue: '' },
  },
  'content-three-column-grid': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Our Features' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'Feature Items',
      itemSchema: {
        title: { type: 'text', label: 'Feature Title', defaultValue: 'Feature Name' },
        content: { type: 'textarea', label: 'Feature Description', defaultValue: 'Description of this feature.' },
        ctaText: { type: 'text', label: 'CTA Text', defaultValue: 'Learn More' },
      },
    },
  },
  'content-asymmetric-accent': {
    containerPadding: { type: 'select', label: 'Container Padding', options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'], defaultValue: 'xl' },
    containerBackground: { type: 'select', label: 'Container Background', options: ['none', 'muted', 'primary', 'secondary'], defaultValue: 'none' },
    items: {
      type: 'list',
      label: 'Content Cards',
      itemSchema: {
        title: { type: 'text', label: 'Card Title', defaultValue: 'Card Title' },
        ...createTextStyleProperties('title', 'heading3', 'left', 'primary', 'bold'),
        content: { type: 'textarea', label: 'Card Content', defaultValue: 'Card description text.' },
        ...createTextStyleProperties('content', 'body', 'left', 'muted', 'normal'),
        hasBackground: { type: 'boolean', label: 'Has Background', defaultValue: false },
      },
    },
  },
  'content-large-small-column': {
    title: { type: 'text', label: 'Title', defaultValue: 'Our Mission' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    content: { type: 'textarea', label: 'Content', defaultValue: 'We are committed to delivering excellence in everything we do.' },
    ...createTextStyleProperties('content', 'body', 'left', 'secondary', 'normal'),
    imageMediaId: { type: 'text', label: 'Image Media ID', defaultValue: null },
    image: { type: 'image', label: 'Image URL', defaultValue: '/placeholder-image.jpg' },
    buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Learn More' },
    buttonLink: { type: 'text', label: 'Button URL', defaultValue: '#' },
    buttonVariant: { type: 'select', label: 'Button Variant', options: ['default', 'outline', 'secondary', 'ghost'], defaultValue: 'default' },
    buttonTarget: { type: 'select', label: 'Button Target', options: ['_self', '_blank'], defaultValue: '_self' },
  },
  'content-small-large-column': {
    title: { type: 'text', label: 'Title', defaultValue: 'Case Study' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    content: { type: 'textarea', label: 'Content', defaultValue: 'See how our solution helped Company XYZ increase their productivity by 200% in just three months.' },
    ...createTextStyleProperties('content', 'body', 'left', 'muted', 'normal'),
    imageMediaId: { type: 'text', label: 'Image Media ID', defaultValue: null },
    image: { type: 'image', label: 'Image URL', defaultValue: '/placeholder-image.jpg' },
    buttonText: { type: 'text', label: 'Button Text', defaultValue: 'View Case Study' },
    buttonLink: { type: 'text', label: 'Button URL', defaultValue: '#' },
    buttonVariant: { type: 'select', label: 'Button Variant', options: ['default', 'outline', 'secondary', 'ghost'], defaultValue: 'default' },
    buttonTarget: { type: 'select', label: 'Button Target', options: ['_self', '_blank'], defaultValue: '_self' },
  },
};

// Element Blocks Config
export const elementBlocksConfig: Record<string, BlockPropertySchema> = {
  'element-spacer': {
    height: { type: 'select', label: 'Height', options: ['py-2', 'py-4', 'py-6', 'py-8', 'py-12', 'py-16', 'py-20'], defaultValue: 'py-12' },
  },
  'element-divider': {
    showBorder: { type: 'boolean', label: 'Show Border', defaultValue: true },
  },
  'element-title-subtitle': {
    title: { type: 'text', label: 'Title', defaultValue: 'Section Title' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Brief supporting description for this section' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'muted', 'normal'),
  },
  'element-title-button': {
    title: { type: 'text', label: 'Title', defaultValue: 'Featured Section' },
    ...createButtonProperties(),
  },
  'element-quote-block': {
    quote: { type: 'textarea', label: 'Quote', defaultValue: '“The only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle.”' },
    author: { type: 'text', label: 'Author', defaultValue: '— Steve Jobs' },
  },
  'element-media-image': {
    imageMediaId: { type: 'text', label: 'Image Media ID', defaultValue: null },
    imageUrl: { type: 'image', label: 'Image URL', defaultValue: '' },
    caption: { type: 'text', label: 'Caption', defaultValue: 'Image caption or description' },
  },
  'element-button-group': {
    buttons: {
      type: 'list',
      label: 'Buttons',
      itemSchema: {
        text: { type: 'text', label: 'Button Text', defaultValue: 'Action' },
        variant: { type: 'select', label: 'Variant', options: ['default', 'outline', 'ghost', 'link'], defaultValue: 'default' },
      },
    },
  },
  'element-table-list': {
    title: { type: 'text', label: 'Title', defaultValue: 'Resource Links' },
    ...createTextStyleProperties('title', 'heading3', 'left', 'primary', 'bold'),
    links: {
      type: 'list',
      label: 'Links',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Documentation' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
  },
};

// Special Blocks Config
export const specialBlocksConfig: Record<string, BlockPropertySchema> = {
  'special-accordion-faq': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Frequently Asked Questions' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'FAQ Items',
      itemSchema: {
        question: { type: 'text', label: 'Question', defaultValue: 'Your question here' },
        answer: { type: 'textarea', label: 'Answer', defaultValue: 'Your answer here' },
      },
    },
  },
  'special-feature-trio': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Why Choose Us' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'Feature Items',
      itemSchema: {
        icon: { type: 'text', label: 'Icon (emoji or text)', defaultValue: '⚡' },
        title: { type: 'text', label: 'Feature Title', defaultValue: 'Feature Name' },
        content: { type: 'textarea', label: 'Feature Description', defaultValue: 'Description of this feature.' },
      },
    },
  },
  'special-countdown-timer': {
    title: { type: 'text', label: 'Title', defaultValue: 'Limited Time Offer' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Special discount ends in:' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'muted', 'normal'),
    targetDate: { type: 'text', label: 'Target Date (YYYY-MM-DD HH:mm)', defaultValue: '2024-12-31 23:59' },
    buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Claim Discount' },
    buttonVariant: { type: 'select', label: 'Button Variant', options: ['default', 'outline', 'secondary', 'ghost'], defaultValue: 'default' },
  },
  'special-survey-quiz': {
    title: { type: 'text', label: 'Survey Title', defaultValue: 'Customer Feedback Survey' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    questions: {
      type: 'list',
      label: 'Questions',
      itemSchema: {
        text: { type: 'text', label: 'Question Text', defaultValue: 'How satisfied are you with our service?' },
        options: {
          type: 'list',
          label: 'Answer Options',
          itemSchema: {
            text: { type: 'text', label: 'Option Text', defaultValue: 'Very Satisfied' },
          },
        },
      },
    },
    submitButtonText: { type: 'text', label: 'Submit Button Text', defaultValue: 'Submit Feedback' },
  },
  'special-digital-signature': {
    title: { type: 'text', label: 'Title', defaultValue: 'Document Approval' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    description: { type: 'text', label: 'Description', defaultValue: 'Please sign below to approve this document' },
    ...createTextStyleProperties('description', 'body', 'center', 'muted', 'normal'),
    signButtonText: { type: 'text', label: 'Sign Button Text', defaultValue: 'Sign Document' },
    clearButtonText: { type: 'text', label: 'Clear Button Text', defaultValue: 'Clear' },
  },
  'special-event-highlight': {
    date: { type: 'text', label: 'Event Date', defaultValue: 'October 15, 2023' },
    ...createTextStyleProperties('date', 'body', 'left', 'primary', 'medium'),
    title: { type: 'text', label: 'Event Title', defaultValue: 'Annual Conference 2023' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    description: { type: 'textarea', label: 'Event Description', defaultValue: 'Join us for our annual conference featuring industry experts, networking opportunities, and hands-on workshops.' },
    ...createTextStyleProperties('description', 'body', 'left', 'muted', 'normal'),
    time: { type: 'text', label: 'Event Time', defaultValue: '⏰ 9:00 AM - 5:00 PM' },
    location: { type: 'text', label: 'Event Location', defaultValue: '📍 Convention Center, Downtown' },
    buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Register Now' },
    buttonVariant: { type: 'select', label: 'Button Variant', options: ['default', 'outline', 'secondary', 'ghost'], defaultValue: 'default' },
    imageMediaId: { type: 'text', label: 'Event Image Media ID', defaultValue: null },
    imageUrl: { type: 'image', label: 'Event Image URL', defaultValue: '/placeholder-image.jpg' },
  },
  'special-code-snippet': {
    title: { type: 'text', label: 'Title', defaultValue: 'Code Example' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    description: { type: 'text', label: 'Description', defaultValue: 'Here\'s how to implement our API in your project' },
    ...createTextStyleProperties('description', 'body', 'center', 'muted', 'normal'),
    filename: { type: 'text', label: 'Filename', defaultValue: 'example.js' },
    code: { type: 'textarea', label: 'Code Content', defaultValue: '// Your code here\nconst example = "Hello World";\nconsole.log(example);' },
    language: { type: 'text', label: 'Programming Language', defaultValue: 'javascript' },
    copyButtonText: { type: 'text', label: 'Copy Button Text', defaultValue: 'Copy to Clipboard' },
  },
};

// E-commerce Blocks Config
export const ecommerceBlocksConfig: Record<string, BlockPropertySchema> = {
  'ecommerce-two-product-grid': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Featured Products' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'Products',
      itemSchema: {
        mediaId: { type: 'text', label: 'Product Media ID', defaultValue: null },
        image: { type: 'image', label: 'Product Image URL', defaultValue: '/placeholder-product.jpg' },
        title: { type: 'text', label: 'Product Title', defaultValue: 'Product Name' },
        description: { type: 'textarea', label: 'Product Description', defaultValue: 'Product description.' },
        price: { type: 'text', label: 'Price', defaultValue: '$99.99' },
        ctaText: { type: 'text', label: 'CTA Text', defaultValue: 'Add to Cart' },
      },
    },
  },
  'ecommerce-three-product-grid': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Featured Products' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'Products',
      itemSchema: {
        mediaId: { type: 'text', label: 'Product Media ID', defaultValue: null },
        image: { type: 'image', label: 'Product Image URL', defaultValue: '/placeholder-product.jpg' },
        title: { type: 'text', label: 'Product Title', defaultValue: 'Product Name' },
        description: { type: 'textarea', label: 'Product Description', defaultValue: 'Product description.' },
        price: { type: 'text', label: 'Price', defaultValue: '$99.99' },
        ctaText: { type: 'text', label: 'CTA Text', defaultValue: 'Add to Cart' },
      },
    },
  },
  'ecommerce-single-product': {
    category: { type: 'text', label: 'Category', defaultValue: 'Electronics' },
    ...createTextStyleProperties('category', 'body', 'left', 'muted', 'normal'),
    title: { type: 'text', label: 'Product Title', defaultValue: 'Premium Wireless Headphones' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    description: { type: 'textarea', label: 'Product Description', defaultValue: 'Experience superior sound quality with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding.' },
    ...createTextStyleProperties('description', 'body', 'left', 'secondary', 'normal'),
    price: { type: 'text', label: 'Price', defaultValue: '$199.99' },
    ...createTextStyleProperties('price', 'heading3', 'left', 'primary', 'bold'),
    imageMediaId: { type: 'text', label: 'Product Image Media ID', defaultValue: null },
    imageUrl: { type: 'image', label: 'Product Image URL', defaultValue: '/placeholder-image.jpg' },
    features: {
      type: 'list',
      label: 'Product Features',
      itemSchema: {
        text: { type: 'text', label: 'Feature', defaultValue: '✓ Feature description' },
      },
    },
    addToCartText: { type: 'text', label: 'Add to Cart Button Text', defaultValue: 'Add to Cart' },
    buyNowText: { type: 'text', label: 'Buy Now Button Text', defaultValue: 'Buy Now' },
    buttonVariant: { type: 'select', label: 'Button Variant', options: ['default', 'outline', 'secondary', 'ghost'], defaultValue: 'default' },
  },
  'ecommerce-aligned-product': {
    title: { type: 'text', label: 'Product Title', defaultValue: 'Smart Watch Pro' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    description: { type: 'textarea', label: 'Product Description', defaultValue: 'Advanced fitness tracking with heart rate monitoring and GPS.' },
    ...createTextStyleProperties('description', 'body', 'left', 'secondary', 'normal'),
    price: { type: 'text', label: 'Price', defaultValue: '$299.99' },
    ...createTextStyleProperties('price', 'heading3', 'left', 'primary', 'bold'),
    features: {
      type: 'list',
      label: 'Product Features',
      itemSchema: {
        text: { type: 'text', label: 'Feature', defaultValue: '✓ Heart rate monitoring' },
      },
    },
    imageMediaId: { type: 'text', label: 'Product Image Media ID', defaultValue: null },
    imageUrl: { type: 'image', label: 'Product Image URL', defaultValue: '/placeholder-image.jpg' },
    shopNowText: { type: 'text', label: 'Shop Now Button Text', defaultValue: 'Shop Now' },
    buttonVariant: { type: 'select', label: 'Button Variant', options: ['default', 'outline', 'secondary', 'ghost'], defaultValue: 'default' },
  },
  'ecommerce-discount-banner': {
    badge: { type: 'text', label: 'Badge Text', defaultValue: 'SALE' },
    ...createTextStyleProperties('badge', 'body', 'center', 'destructive', 'bold'),
    title: { type: 'text', label: 'Banner Title', defaultValue: 'Summer Sale - Up to 50% Off' },
    ...createTextStyleProperties('title', 'heading1', 'center', 'primary', 'bold'),
    description: { type: 'text', label: 'Description', defaultValue: 'Limited time offer on selected items. Don\'t miss out!' },
    ...createTextStyleProperties('description', 'body', 'center', 'secondary', 'normal'),
    buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Shop Now' },
    buttonVariant: { type: 'select', label: 'Button Variant', options: ['default', 'outline', 'secondary', 'ghost'], defaultValue: 'default' },
    buttonSize: { type: 'select', label: 'Button Size', options: ['sm', 'default', 'lg'], defaultValue: 'lg' },
  },
  'ecommerce-horizontal-discount': {
    badge: { type: 'text', label: 'Badge Text', defaultValue: 'EXCLUSIVE DEAL' },
    ...createTextStyleProperties('badge', 'body', 'left', 'background', 'bold'),
    title: { type: 'text', label: 'Title', defaultValue: 'Flash Sale' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    description: { type: 'text', label: 'Description', defaultValue: '24 hours only - Save big on our bestsellers' },
    ...createTextStyleProperties('description', 'body', 'left', 'secondary', 'normal'),
    discount: { type: 'text', label: 'Discount Text', defaultValue: '50% OFF' },
    ...createTextStyleProperties('discount', 'heading1', 'center', 'primary', 'bold'),
    buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Shop the Sale' },
    buttonVariant: { type: 'select', label: 'Button Variant', options: ['default', 'outline', 'secondary', 'ghost'], defaultValue: 'default' },
  },
};

// Gallery Blocks Config
export const galleryBlocksConfig: Record<string, BlockPropertySchema> = {
  'gallery-three-image-grid': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Featured Highlights' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'Gallery Items',
      itemSchema: {
        mediaId: { type: 'text', label: 'Media ID', defaultValue: null },
        image: { type: 'image', label: 'Image URL', defaultValue: '/placeholder-image.jpg' },
        title: { type: 'text', label: 'Title', defaultValue: 'Image Title' },
        caption: { type: 'text', label: 'Caption (optional)', defaultValue: '' },
      },
    },
  },
  'gallery-four-image-mosaic': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Our Portfolio' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'Gallery Items',
      itemSchema: {
        mediaId: { type: 'text', label: 'Media ID', defaultValue: null },
        image: { type: 'image', label: 'Image URL', defaultValue: '/placeholder-image.jpg' },
        title: { type: 'text', label: 'Title', defaultValue: 'Project Name' },
        description: { type: 'textarea', label: 'Description', defaultValue: 'Project description.' },
      },
    },
  },
  'gallery-single-image': {
    title: { type: 'text', label: 'Title', defaultValue: 'Featured Project' },
    ...createTextStyleProperties('title', 'heading3', 'left', 'primary', 'bold'),
    caption: { type: 'textarea', label: 'Caption', defaultValue: 'Brief description of this featured project or image.' },
    ...createTextStyleProperties('caption', 'body', 'left', 'muted', 'normal'),
    imageMediaId: { type: 'text', label: 'Image Media ID', defaultValue: null },
    imageUrl: { type: 'image', label: 'Image URL', defaultValue: '/placeholder-image.jpg' },
  },
  'gallery-two-image-split': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Our Work' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'Gallery Items',
      itemSchema: {
        mediaId: { type: 'text', label: 'Image Media ID', defaultValue: null },
        imageUrl: { type: 'image', label: 'Image URL', defaultValue: '/placeholder-image.jpg' },
        title: { type: 'text', label: 'Title', defaultValue: 'Project Alpha' },
        caption: { type: 'text', label: 'Caption', defaultValue: 'Web design and development for a tech startup.' },
      },
    },
  },
  'gallery-five-image-showcase': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Recent Work' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'Gallery Images (5)',
      itemSchema: {
        mediaId: { type: 'text', label: 'Image Media ID', defaultValue: null },
        imageUrl: { type: 'image', label: 'Image URL', defaultValue: '/placeholder-image.jpg' },
        alt: { type: 'text', label: 'Alt Text', defaultValue: 'Work image' },
      },
    },
  },
  'gallery-carousel': {
    title: { type: 'text', label: 'Gallery Title', defaultValue: 'Image Gallery' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'Carousel Images',
      itemSchema: {
        mediaId: { type: 'text', label: 'Image Media ID', defaultValue: null },
        imageUrl: { type: 'image', label: 'Image URL', defaultValue: '/placeholder-image.jpg' },
        alt: { type: 'text', label: 'Alt Text', defaultValue: 'Gallery Image' },
        caption: { type: 'text', label: 'Caption', defaultValue: 'Image description' },
      },
    },
  },
};

// Footer Blocks Config
export const footerBlocksConfig: Record<string, BlockPropertySchema> = {
  'footer-basic': {
    companyName: { type: 'text', label: 'Company Name', defaultValue: 'Company Name' },
    ...createTextStyleProperties('companyName', 'heading3', 'left', 'primary', 'bold'),
    companyDescription: { type: 'textarea', label: 'Company Description', defaultValue: 'Building amazing products for amazing people.' },
    ...createTextStyleProperties('companyDescription', 'body', 'left', 'secondary', 'normal'),
    links: {
      type: 'list',
      label: 'Link Sections',
      itemSchema: {
        title: { type: 'text', label: 'Section Title', defaultValue: 'Links' },
        items: {
          type: 'list',
          label: 'Links',
          itemSchema: {
            text: { type: 'text', label: 'Link Text', defaultValue: 'Home' },
            url: { type: 'text', label: 'Link URL', defaultValue: '#' },
          },
        },
      },
    },
    contactInfo: {
      type: 'list',
      label: 'Contact Information',
      itemSchema: {
        title: { type: 'text', label: 'Section Title', defaultValue: 'Contact' },
        email: { type: 'text', label: 'Email', defaultValue: 'info@company.com' },
        phone: { type: 'text', label: 'Phone', defaultValue: '+1 (555) 123-4567' },
      },
    },
    copyrightText: { type: 'text', label: 'Copyright Text', defaultValue: '© 2023 Company Name. All rights reserved.' },
  },
  'footer-multi-column': {
    companyName: { type: 'text', label: 'Company Name', defaultValue: 'Company Name' },
    ...createTextStyleProperties('companyName', 'heading3', 'left', 'primary', 'bold'),
    companyDescription: { type: 'textarea', label: 'Company Description', defaultValue: 'Creating innovative solutions for modern businesses.' },
    ...createTextStyleProperties('companyDescription', 'body', 'left', 'secondary', 'normal'),
    socialLinks: {
      type: 'list',
      label: 'Social Links',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'FB' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
    columns: {
      type: 'list',
      label: 'Columns',
      itemSchema: {
        title: { type: 'text', label: 'Column Title', defaultValue: 'Products' },
        items: {
          type: 'list',
          label: 'Column Items',
          itemSchema: {
            text: { type: 'text', label: 'Item Text', defaultValue: 'Features' },
            url: { type: 'text', label: 'Item URL', defaultValue: '#' },
          },
        },
      },
    },
    copyrightText: { type: 'text', label: 'Copyright Text', defaultValue: '© 2023 Company Name. All rights reserved.' },
    legalLinks: {
      type: 'list',
      label: 'Legal Links',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Privacy Policy' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
  },
  'footer-newsletter-signup': {
    newsletterTitle: { type: 'text', label: 'Newsletter Title', defaultValue: 'Subscribe to our newsletter' },
    ...createTextStyleProperties('newsletterTitle', 'heading3', 'left', 'primary', 'bold'),
    newsletterDescription: { type: 'text', label: 'Newsletter Description', defaultValue: 'Stay updated with our latest news and offers.' },
    ...createTextStyleProperties('newsletterDescription', 'body', 'left', 'secondary', 'normal'),
    copyrightText: { type: 'text', label: 'Copyright Text', defaultValue: '© 2023 Company Name. All rights reserved.' },
    legalLinks: {
      type: 'list',
      label: 'Legal Links',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Privacy' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
    socialLinks: {
      type: 'list',
      label: 'Social Links',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'f' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
  },
  'footer-social-heavy': {
    companyName: { type: 'text', label: 'Company Name', defaultValue: 'Company Name' },
    ...createTextStyleProperties('companyName', 'heading3', 'left', 'primary', 'bold'),
    companyDescription: { type: 'textarea', label: 'Company Description', defaultValue: 'Connect with us on social media for updates and community.' },
    ...createTextStyleProperties('companyDescription', 'body', 'left', 'secondary', 'normal'),
    socialTitle: { type: 'text', label: 'Social Title', defaultValue: 'Follow Us' },
    ...createTextStyleProperties('socialTitle', 'heading3', 'left', 'primary', 'bold'),
    socialPlatforms: {
      type: 'list',
      label: 'Social Platforms',
      itemSchema: {
        text: { type: 'text', label: 'Platform Name', defaultValue: 'Facebook' },
        url: { type: 'text', label: 'Platform URL', defaultValue: '#' },
      },
    },
    copyrightText: { type: 'text', label: 'Copyright Text', defaultValue: '© 2023 Company Name. All rights reserved.' },
    legalLinks: {
      type: 'list',
      label: 'Legal Links',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Privacy' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
  },
  'footer-compact-centered': {
    companyName: { type: 'text', label: 'Company Name', defaultValue: 'Company Name' },
    ...createTextStyleProperties('companyName', 'heading3', 'center', 'primary', 'bold'),
    links: {
      type: 'list',
      label: 'Links',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Home' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
    copyrightText: { type: 'text', label: 'Copyright Text', defaultValue: '© 2023 Company Name. All rights reserved.' },
  },
  'footer-extended-cta': {
    ctaTitle: { type: 'text', label: 'CTA Title', defaultValue: 'Ready to get started?' },
    ...createTextStyleProperties('ctaTitle', 'heading2', 'center', 'primary', 'bold'),
    ctaDescription: { type: 'textarea', label: 'CTA Description', defaultValue: 'Join thousands of satisfied customers today.' },
    ...createTextStyleProperties('ctaDescription', 'body', 'center', 'secondary', 'normal'),
    ctaButtonText: { type: 'text', label: 'CTA Button Text', defaultValue: 'Start Free Trial' },
    ctaButtonUrl: { type: 'text', label: 'CTA Button URL', defaultValue: '#' },
    ctaButtonTarget: { type: 'select', label: 'CTA Button Target', options: ['_self', '_blank'], defaultValue: '_self' },
    companyName: { type: 'text', label: 'Company Name', defaultValue: 'Company Name' },
    ...createTextStyleProperties('companyName', 'heading3', 'left', 'primary', 'bold'),
    companyDescription: { type: 'textarea', label: 'Company Description', defaultValue: 'Creating innovative solutions for modern businesses.' },
    ...createTextStyleProperties('companyDescription', 'body', 'left', 'secondary', 'normal'),
    columns: {
      type: 'list',
      label: 'Columns',
      itemSchema: {
        title: { type: 'text', label: 'Column Title', defaultValue: 'Products' },
        items: {
          type: 'list',
          label: 'Column Items',
          itemSchema: {
            text: { type: 'text', label: 'Item Text', defaultValue: 'Features' },
            url: { type: 'text', label: 'Item URL', defaultValue: '#' },
          },
        },
      },
    },
    copyrightText: { type: 'text', label: 'Copyright Text', defaultValue: '© 2023 Company Name. All rights reserved.' },
    legalLinks: {
      type: 'list',
      label: 'Legal Links',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Privacy Policy' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
    socialLinks: {
      type: 'list',
      label: 'Social Links',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'f' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
  },
};

// Blog/RSS Blocks Config
export const blogRssBlocksConfig: Record<string, BlockPropertySchema> = {
  'blog-extended-feature': {
    category: { type: 'text', label: 'Category', defaultValue: 'Technology' },
    date: { type: 'text', label: 'Date', defaultValue: 'October 5, 2023' },
    title: { type: 'text', label: 'Title', defaultValue: 'The Future of Web Development: Trends to Watch in 2023' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    excerpt: { type: 'textarea', label: 'Excerpt', defaultValue: 'Explore the latest trends shaping the web development landscape, from AI-powered tools to progressive web apps and beyond.' },
    ...createTextStyleProperties('excerpt', 'body', 'left', 'secondary', 'normal'),
    authorName: { type: 'text', label: 'Author Name', defaultValue: 'John Doe' },
    authorInitials: { type: 'text', label: 'Author Initials', defaultValue: 'JD' },
    imageMediaId: { type: 'text', label: 'Featured Image Media ID', defaultValue: null },
    imageUrl: { type: 'image', label: 'Featured Image URL', defaultValue: '' },
  },
  'blog-basic-list': {
    title: { type: 'text', label: 'Title', defaultValue: 'Latest Articles' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    posts: {
      type: 'list',
      label: 'Posts',
      itemSchema: {
        mediaId: { type: 'text', label: 'Post Media ID', defaultValue: null },
        imageUrl: { type: 'image', label: 'Post Image URL', defaultValue: '/placeholder-blog.jpg' },
        title: { type: 'text', label: 'Post Title', defaultValue: 'Blog Post Title 1' },
        excerpt: { type: 'textarea', label: 'Post Excerpt', defaultValue: 'Brief excerpt of the blog post content to entice readers to click through...' },
        date: { type: 'text', label: 'Post Date', defaultValue: 'October 5, 2023' },
      },
    },
  },
  'blog-double-post-highlight': {
    title: { type: 'text', label: 'Title', defaultValue: 'Featured Stories' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    posts: {
      type: 'list',
      label: 'Posts',
      itemSchema: {
        mediaId: { type: 'text', label: 'Post Media ID', defaultValue: null },
        imageUrl: { type: 'image', label: 'Post Image URL', defaultValue: '/placeholder-blog.jpg' },
        title: { type: 'text', label: 'Post Title', defaultValue: 'Innovative Design Techniques' },
        excerpt: { type: 'textarea', label: 'Post Excerpt', defaultValue: 'Discover cutting-edge design techniques that are revolutionizing the industry.' },
        buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Read More' },
        buttonUrl: { type: 'text', label: 'Button URL', defaultValue: '#' },
        buttonTarget: { type: 'select', label: 'Button Target', options: ['_self', '_blank'], defaultValue: '_self' },
      },
    },
  },
  'blog-mini-highlight': {
    title: { type: 'text', label: 'Title', defaultValue: 'Latest from the Blog' },
    ...createTextStyleProperties('title', 'heading3', 'left', 'primary', 'bold'),
    posts: {
      type: 'list',
      label: 'Posts',
      itemSchema: {
        title: { type: 'text', label: 'Post Title', defaultValue: 'Quick Insight #1' },
        date: { type: 'text', label: 'Post Date', defaultValue: 'Oct 5' },
      },
    },
    ...createButtonProperties(),
  },
  'blog-author-bio-left': {
    authorName: { type: 'text', label: 'Author Name', defaultValue: 'Jane Doe' },
    ...createTextStyleProperties('authorName', 'heading3', 'left', 'primary', 'bold'),
    authorTitle: { type: 'text', label: 'Author Title', defaultValue: 'Senior Content Writer' },
    ...createTextStyleProperties('authorTitle', 'body', 'left', 'secondary', 'normal'),
    authorBio: { type: 'textarea', label: 'Author Bio', defaultValue: 'Jane is a seasoned content creator with over 10 years of experience in digital marketing and brand storytelling. She specializes in creating engaging content that drives results.' },
    ...createTextStyleProperties('authorBio', 'body', 'left', 'secondary', 'normal'),
    authorInitials: { type: 'text', label: 'Author Initials', defaultValue: 'JD' },
    socialLinks: {
      type: 'list',
      label: 'Social Links',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Twitter' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
  },
  'blog-author-bio-centered': {
    authorName: { type: 'text', label: 'Author Name', defaultValue: 'Jane Doe' },
    ...createTextStyleProperties('authorName', 'heading3', 'center', 'primary', 'bold'),
    authorTitle: { type: 'text', label: 'Author Title', defaultValue: 'Senior Content Writer' },
    ...createTextStyleProperties('authorTitle', 'body', 'center', 'secondary', 'normal'),
    authorBio: { type: 'textarea', label: 'Author Bio', defaultValue: 'Jane is a seasoned content creator with over 10 years of experience in digital marketing and brand storytelling. She specializes in creating engaging content that drives results.' },
    ...createTextStyleProperties('authorBio', 'body', 'center', 'secondary', 'normal'),
    authorInitials: { type: 'text', label: 'Author Initials', defaultValue: 'JD' },
    socialLinks: {
      type: 'list',
      label: 'Social Links',
      itemSchema: {
        text: { type: 'text', label: 'Link Text', defaultValue: 'Twitter' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
  },
  'blog-rss-featured-article': {
    source: { type: 'text', label: 'Source', defaultValue: 'RSS FEED' },
    date: { type: 'text', label: 'Date', defaultValue: 'October 5, 2023' },
    title: { type: 'text', label: 'Title', defaultValue: 'Industry Insights: The Rise of AI in Content Creation' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    excerpt: { type: 'textarea', label: 'Excerpt', defaultValue: 'Exploring how artificial intelligence is transforming the landscape of content creation and what it means for creators and businesses.' },
    ...createTextStyleProperties('excerpt', 'body', 'left', 'secondary', 'normal'),
    author: { type: 'text', label: 'Author', defaultValue: 'By Industry Watch Team' },
    ...createButtonProperties(),
  },
  'blog-rss-list': {
    source: { type: 'text', label: 'Source', defaultValue: 'RSS FEED' },
    title: { type: 'text', label: 'Title', defaultValue: 'Latest Industry News' },
    ...createTextStyleProperties('title', 'heading3', 'left', 'primary', 'bold'),
    ...createButtonProperties(),
    items: {
      type: 'list',
      label: 'Items',
      itemSchema: {
        headline: { type: 'text', label: 'Headline', defaultValue: 'Industry News Headline 1: Brief summary of the news item' },
        source: { type: 'text', label: 'Source', defaultValue: 'Industry Source' },
        time: { type: 'text', label: 'Time', defaultValue: '2 hours ago' },
      },
    },
  },
};

// Social Sharing Blocks Config
export const socialSharingBlocksConfig: Record<string, BlockPropertySchema> = {
  'social-links-row': {
    socialLinks: {
      type: 'list',
      label: 'Social Links',
      itemSchema: {
        text: { type: 'text', label: 'Icon Text', defaultValue: 'f' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
  },
  'social-share-buttons': {
    title: { type: 'text', label: 'Title', defaultValue: 'Share this page:' },
    ...createTextStyleProperties('title', 'body', 'left', 'primary', 'normal'),
    shareButtons: {
      type: 'list',
      label: 'Share Buttons',
      itemSchema: {
        text: { type: 'text', label: 'Button Text', defaultValue: 'Facebook' },
        url: { type: 'text', label: 'Button URL', defaultValue: '#' },
      },
    },
  },
  'social-facebook-embed': {
    companyName: { type: 'text', label: 'Company Name', defaultValue: 'Company Name' },
    ...createTextStyleProperties('companyName', 'heading3', 'left', 'primary', 'bold'),
    companyHandle: { type: 'text', label: 'Company Handle', defaultValue: '@company' },
    content: { type: 'textarea', label: 'Content', defaultValue: 'Exciting news! We\'ve just launched our new product feature that will revolutionize how you work. Check it out and let us know what you think!' },
    likes: { type: 'text', label: 'Likes', defaultValue: '42 Likes' },
    comments: { type: 'text', label: 'Comments', defaultValue: '8 Comments' },
  },
  'social-instagram-grid': {
    title: { type: 'text', label: 'Title', defaultValue: 'Follow us on Instagram' },
    ...createTextStyleProperties('title', 'heading3', 'center', 'primary', 'bold'),
    images: {
      type: 'list',
      label: 'Images',
      itemSchema: {
        mediaId: { type: 'text', label: 'Image Media ID', defaultValue: null },
        imageUrl: { type: 'image', label: 'Image URL', defaultValue: '/placeholder-instagram.jpg' },
        text: { type: 'text', label: 'Alt Text', defaultValue: 'Instagram Post' },
        url: { type: 'text', label: 'Link URL', defaultValue: '#' },
      },
    },
  },
  'social-tiktok-youtube-embed': {
    title: { type: 'text', label: 'Title', defaultValue: 'Featured Video' },
    ...createTextStyleProperties('title', 'heading3', 'left', 'primary', 'bold'),
    description: { type: 'text', label: 'Description', defaultValue: 'Check out our latest video content' },
    ...createTextStyleProperties('description', 'body', 'left', 'secondary', 'normal'),
    videoUrl: { type: 'text', label: 'Video URL', defaultValue: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    videoTitle: { type: 'text', label: 'Video Title', defaultValue: 'How to Use Our Platform - Quick Tutorial' },
    videoDescription: { type: 'textarea', label: 'Video Description', defaultValue: 'Learn the basics of our platform in just 2 minutes with this quick tutorial.' },
    views: { type: 'text', label: 'Views', defaultValue: '1.2K views' },
    date: { type: 'text', label: 'Date', defaultValue: '3 days ago' },
  },
};

// Testimonials Blocks Config
export const testimonialsBlocksConfig: Record<string, BlockPropertySchema> = {
  'testimonial-single-card': {
    name: { type: 'text', label: 'Name', defaultValue: 'Sarah Johnson' },
    ...createTextStyleProperties('name', 'heading3', 'left', 'primary', 'bold'),
    role: { type: 'text', label: 'Role', defaultValue: 'CEO, TechCorp' },
    ...createTextStyleProperties('role', 'body', 'left', 'secondary', 'normal'),
    content: { type: 'textarea', label: 'Content', defaultValue: 'This service has completely transformed our business. The team\'s dedication and expertise are unmatched. Highly recommended!' },
    ...createTextStyleProperties('content', 'body', 'left', 'secondary', 'normal'),
    rating: { type: 'number', label: 'Rating', defaultValue: 5 },
    avatarMediaId: { type: 'text', label: 'Avatar Media ID', defaultValue: null },
    avatar: { type: 'image', label: 'Avatar URL', defaultValue: '/placeholder-avatar.jpg' },
    background: { type: 'select', label: 'Background', options: ['none', 'muted', 'primary'], defaultValue: 'muted' },
  },
  'testimonial-grid-three': {
    title: { type: 'text', label: 'Title', defaultValue: 'What Our Clients Say' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Don\'t just take our word for it' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    testimonials: {
      type: 'list',
      label: 'Testimonials',
      itemSchema: {
        mediaId: { type: 'text', label: 'Avatar Media ID', defaultValue: null },
        avatar: { type: 'image', label: 'Avatar URL', defaultValue: '/placeholder-avatar.jpg' },
        name: { type: 'text', label: 'Name', defaultValue: 'Alex Thompson' },
        role: { type: 'text', label: 'Role', defaultValue: 'Founder, StartupXYZ' },
        content: { type: 'textarea', label: 'Content', defaultValue: 'Outstanding service! The team went above and beyond to deliver exceptional results.' },
        rating: { type: 'number', label: 'Rating', defaultValue: 5 },
      },
    },
  },
  'testimonial-carousel': {
    title: { type: 'text', label: 'Title', defaultValue: 'Customer Success Stories' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    testimonials: {
      type: 'list',
      label: 'Testimonials',
      itemSchema: {
        mediaId: { type: 'text', label: 'Avatar Media ID', defaultValue: null },
        avatar: { type: 'image', label: 'Avatar URL', defaultValue: '/placeholder-avatar.jpg' },
        name: { type: 'text', label: 'Name', defaultValue: 'Jennifer Lee' },
        role: { type: 'text', label: 'Role', defaultValue: 'Operations Manager' },
        company: { type: 'text', label: 'Company', defaultValue: 'Global Industries' },
        content: { type: 'textarea', label: 'Content', defaultValue: 'Working with this team has been an absolute game-changer for our company.' },
        rating: { type: 'number', label: 'Rating', defaultValue: 5 },
      },
    },
  },
  'testimonial-minimal': {
    content: { type: 'textarea', label: 'Content', defaultValue: 'This is hands down the best service I\'ve ever used. The results speak for themselves.' },
    ...createTextStyleProperties('content', 'body', 'center', 'secondary', 'normal'),
    name: { type: 'text', label: 'Name', defaultValue: 'Robert Martinez' },
    ...createTextStyleProperties('name', 'heading3', 'center', 'primary', 'bold'),
    role: { type: 'text', label: 'Role', defaultValue: 'Business Owner' },
    ...createTextStyleProperties('role', 'body', 'center', 'secondary', 'normal'),
  },
  'testimonial-wall': {
    title: { type: 'text', label: 'Title', defaultValue: 'Loved by Thousands' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    testimonials: {
      type: 'list',
      label: 'Testimonials',
      itemSchema: {
        name: { type: 'text', label: 'Name', defaultValue: 'Emily Watson' },
        role: { type: 'text', label: 'Role', defaultValue: 'Designer' },
        content: { type: 'textarea', label: 'Content', defaultValue: 'Absolutely incredible! Best investment we\'ve made.' },
        rating: { type: 'number', label: 'Rating', defaultValue: 5 },
      },
    },
  },
};

// Icon Blocks Config
export const featuresBlocksConfig: Record<string, BlockPropertySchema> = {
  'features-single': {
    icon: { type: 'text', label: 'Icon', defaultValue: 'rocket' },
    title: { type: 'text', label: 'Title', defaultValue: 'Fast & Reliable' },
    ...createTextStyleProperties('title', 'heading3', 'center', 'primary', 'bold'),
    description: { type: 'textarea', label: 'Description', defaultValue: 'Experience lightning-fast performance and rock-solid reliability with our cutting-edge technology.' },
    ...createTextStyleProperties('description', 'body', 'center', 'secondary', 'normal'),
    iconColor: { type: 'text', label: 'Icon Color', defaultValue: 'primary' },
    iconSize: { type: 'number', label: 'Icon Size', defaultValue: 64 },
  },
  'features-box-centered': {
    icon: { type: 'text', label: 'Icon', defaultValue: 'shield' },
    title: { type: 'text', label: 'Title', defaultValue: 'Secure & Protected' },
    ...createTextStyleProperties('title', 'heading3', 'center', 'primary', 'bold'),
    description: { type: 'textarea', label: 'Description', defaultValue: 'Your data is protected with enterprise-grade security and encryption.' },
    ...createTextStyleProperties('description', 'body', 'center', 'secondary', 'normal'),
    buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Learn More' },
    buttonUrl: { type: 'text', label: 'Button URL', defaultValue: '#' },
    buttonTarget: { type: 'select', label: 'Button Target', options: ['_self', '_blank'], defaultValue: '_self' },
  },
  'features-box-left': {
    icon: { type: 'text', label: 'Icon', defaultValue: 'users' },
    title: { type: 'text', label: 'Title', defaultValue: 'Team Collaboration' },
    ...createTextStyleProperties('title', 'heading3', 'left', 'primary', 'bold'),
    description: { type: 'textarea', label: 'Description', defaultValue: 'Work together seamlessly with powerful collaboration tools designed for modern teams.' },
    ...createTextStyleProperties('description', 'body', 'left', 'secondary', 'normal'),
  },
  'features-feature-grid': {
    title: { type: 'text', label: 'Title', defaultValue: 'Why Choose Us' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Everything you need to succeed' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    features: {
      type: 'list',
      label: 'Features',
      itemSchema: {
        icon: { type: 'text', label: 'Icon', defaultValue: 'zap' },
        title: { type: 'text', label: 'Title', defaultValue: 'Lightning Fast' },
        description: { type: 'textarea', label: 'Description', defaultValue: 'Optimized for speed and performance' },
      },
    },
  },
  'features-list-bullets': {
    title: { type: 'text', label: 'Title', defaultValue: 'What You Get' },
    ...createTextStyleProperties('title', 'heading3', 'left', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'Items',
      itemSchema: {
        icon: { type: 'text', label: 'Icon', defaultValue: 'checkCircle' },
        text: { type: 'text', label: 'Text', defaultValue: 'Unlimited projects and team members' },
      },
    },
  },
  'features-box-stacked': {
    title: { type: 'text', label: 'Title', defaultValue: 'Our Services' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    services: {
      type: 'list',
      label: 'Services',
      itemSchema: {
        icon: { type: 'text', label: 'Icon', defaultValue: 'code' },
        title: { type: 'text', label: 'Title', defaultValue: 'Web Development' },
        description: { type: 'textarea', label: 'Description', defaultValue: 'Custom websites and web applications built with modern technologies.' },
      },
    },
  },
  'features-icon-grid-three': {
    title: { type: 'text', label: 'Title', defaultValue: 'Why Choose Us' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Everything you need to succeed' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    features: {
      type: 'list',
      label: 'Features',
      itemSchema: {
        icon: { type: 'text', label: 'Icon', defaultValue: 'zap' },
        title: { type: 'text', label: 'Title', defaultValue: 'Lightning Fast' },
        description: { type: 'textarea', label: 'Description', defaultValue: 'Optimized for speed and performance' },
      },
    },
  },
  'features-list-with-icons': {
    title: { type: 'text', label: 'Title', defaultValue: 'What You Get' },
    ...createTextStyleProperties('title', 'heading2', 'left', 'primary', 'bold'),
    items: {
      type: 'list',
      label: 'Items',
      itemSchema: {
        icon: { type: 'text', label: 'Icon', defaultValue: 'checkCircle' },
        text: { type: 'text', label: 'Text', defaultValue: 'Unlimited projects and team members' },
      },
    },
  },
  'features-services-two-column': {
    title: { type: 'text', label: 'Title', defaultValue: 'Our Services' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    services: {
      type: 'list',
      label: 'Services',
      itemSchema: {
        icon: { type: 'text', label: 'Icon', defaultValue: 'code' },
        title: { type: 'text', label: 'Title', defaultValue: 'Web Development' },
        description: { type: 'textarea', label: 'Description', defaultValue: 'Custom websites and web applications built with modern technologies.' },
      },
    },
  },
  'features-single-centered': {
    icon: { type: 'text', label: 'Icon', defaultValue: 'rocket' },
    title: { type: 'text', label: 'Title', defaultValue: 'Fast & Reliable' },
    ...createTextStyleProperties('title', 'heading3', 'center', 'primary', 'bold'),
    description: { type: 'textarea', label: 'Description', defaultValue: 'Experience lightning-fast performance and rock-solid reliability with our cutting-edge technology.' },
    ...createTextStyleProperties('description', 'body', 'center', 'secondary', 'normal'),
    iconColor: { type: 'text', label: 'Icon Color', defaultValue: 'primary' },
    iconSize: { type: 'number', label: 'Icon Size', defaultValue: 64 },
  },
};

// Stats Blocks Config
export const statsBlocksConfig: Record<string, BlockPropertySchema> = {
  'stats-four-column': {
    title: { type: 'text', label: 'Title', defaultValue: 'Our Impact in Numbers' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    stats: {
      type: 'list',
      label: 'Stats',
      itemSchema: {
        value: { type: 'text', label: 'Value', defaultValue: '10K+' },
        label: { type: 'text', label: 'Label', defaultValue: 'Active Users' },
        icon: { type: 'text', label: 'Icon', defaultValue: 'users' },
      },
    },
  },
  'stats-counter-animated': {
    stats: {
      type: 'list',
      label: 'Stats',
      itemSchema: {
        value: { type: 'text', label: 'Value', defaultValue: '250+' },
        label: { type: 'text', label: 'Label', defaultValue: 'Projects Completed' },
        suffix: { type: 'text', label: 'Suffix', defaultValue: '' },
      },
    },
  },
  'stats-circular-progress': {
    title: { type: 'text', label: 'Title', defaultValue: 'Our Performance' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    stats: {
      type: 'list',
      label: 'Stats',
      itemSchema: {
        value: { type: 'number', label: 'Value (Percentage)', defaultValue: 95 },
        label: { type: 'text', label: 'Label', defaultValue: 'Customer Satisfaction' },
        color: { type: 'text', label: 'Color', defaultValue: 'primary' },
      },
    },
  },
  'stats-minimal': {
    stats: {
      type: 'list',
      label: 'Stats',
      itemSchema: {
        value: { type: 'text', label: 'Value', defaultValue: '500+' },
        label: { type: 'text', label: 'Label', defaultValue: 'Companies Trust Us' },
      },
    },
  },
  'stats-with-background': {
    title: { type: 'text', label: 'Title', defaultValue: 'Trusted by Industry Leaders' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    description: { type: 'text', label: 'Description', defaultValue: 'Join thousands of companies already using our platform' },
    ...createTextStyleProperties('description', 'body', 'center', 'secondary', 'normal'),
    stats: {
      type: 'list',
      label: 'Stats',
      itemSchema: {
        value: { type: 'text', label: 'Value', defaultValue: '15K+' },
        label: { type: 'text', label: 'Label', defaultValue: 'Active Projects' },
      },
    },
  },
};

// Pricing Blocks Config
export const pricingBlocksConfig: Record<string, BlockPropertySchema> = {
  'pricing-table-three-column': {
    title: { type: 'text', label: 'Title', defaultValue: 'Choose Your Plan' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Select the perfect plan for your needs' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    plans: {
      type: 'list',
      label: 'Plans',
      itemSchema: {
        name: { type: 'text', label: 'Plan Name', defaultValue: 'Starter' },
        price: { type: 'text', label: 'Price', defaultValue: '$19' },
        period: { type: 'text', label: 'Period', defaultValue: '/month' },
        description: { type: 'text', label: 'Description', defaultValue: 'Perfect for individuals' },
        buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Get Started' },
        buttonUrl: { type: 'text', label: 'Button URL', defaultValue: '#' },
        buttonTarget: { type: 'select', label: 'Button Target', options: ['_self', '_blank'], defaultValue: '_self' },
        highlighted: { type: 'boolean', label: 'Highlighted', defaultValue: false },
        features: {
          type: 'list',
          label: 'Features',
          itemSchema: {
            text: { type: 'text', label: 'Feature Text', defaultValue: 'Feature name' },
            included: { type: 'boolean', label: 'Included', defaultValue: true },
          },
        },
      },
    },
  },
  'pricing-comparison-detailed': {
    title: { type: 'text', label: 'Title', defaultValue: 'Compare Plans' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    plans: {
      type: 'list',
      label: 'Plans',
      itemSchema: {
        name: { type: 'text', label: 'Plan Name', defaultValue: 'Starter' },
        price: { type: 'text', label: 'Price', defaultValue: '$19' },
      },
    },
    features: {
      type: 'list',
      label: 'Feature Categories',
      itemSchema: {
        category: { type: 'text', label: 'Category Name', defaultValue: 'Core Features' },
        items: {
          type: 'list',
          label: 'Feature Items',
          itemSchema: {
            feature: { type: 'text', label: 'Feature Name', defaultValue: 'Projects' },
            values: { type: 'list', label: 'Values', itemSchema: {} },
          },
        },
      },
    },
  },
  'pricing-toggle-switch': {
    title: { type: 'text', label: 'Title', defaultValue: 'Simple, Transparent Pricing' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Save 20% with yearly billing' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    plans: {
      type: 'list',
      label: 'Plans',
      itemSchema: {
        name: { type: 'text', label: 'Plan Name', defaultValue: 'Basic' },
        monthlyPrice: { type: 'text', label: 'Monthly Price', defaultValue: '$29' },
        yearlyPrice: { type: 'text', label: 'Yearly Price', defaultValue: '$279' },
        description: { type: 'text', label: 'Description', defaultValue: 'Essential features' },
        buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Start Free Trial' },
        buttonUrl: { type: 'text', label: 'Button URL', defaultValue: '#' },
        buttonTarget: { type: 'select', label: 'Button Target', options: ['_self', '_blank'], defaultValue: '_self' },
        highlighted: { type: 'boolean', label: 'Highlighted', defaultValue: false },
        features: {
          type: 'list',
          label: 'Features',
          itemSchema: {
            text: { type: 'text', label: 'Feature Text', defaultValue: 'Feature name' },
          },
        },
      },
    },
  },
};

// Rating & Review Blocks Config
export const ratingBlocksConfig: Record<string, BlockPropertySchema> = {
  'rating-stars-inline': {
    rating: { type: 'number', label: 'Rating', defaultValue: 4.5 },
    totalReviews: { type: 'number', label: 'Total Reviews', defaultValue: 1234 },
    showReviewCount: { type: 'boolean', label: 'Show Review Count', defaultValue: true },
    size: { type: 'select', label: 'Size', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
  },
  'review-card-single': {
    review: {
      type: 'list',
      label: 'Review',
      itemSchema: {
        mediaId: { type: 'text', label: 'Avatar Media ID', defaultValue: null },
        avatar: { type: 'image', label: 'Avatar URL', defaultValue: '/placeholder-avatar.jpg' },
        author: { type: 'text', label: 'Author Name', defaultValue: 'Sarah Johnson' },
        role: { type: 'text', label: 'Role', defaultValue: 'Marketing Manager' },
        rating: { type: 'number', label: 'Rating', defaultValue: 5 },
        date: { type: 'text', label: 'Date', defaultValue: '2 weeks ago' },
        title: { type: 'text', label: 'Review Title', defaultValue: 'Excellent product!' },
        content: { type: 'textarea', label: 'Review Content', defaultValue: 'This product is amazing...' },
        helpful: { type: 'number', label: 'Helpful Count', defaultValue: 24 },
        verified: { type: 'boolean', label: 'Verified Purchase', defaultValue: true },
      },
    },
  },
  'review-grid-three': {
    title: { type: 'text', label: 'Title', defaultValue: 'What Our Customers Say' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Join thousands of satisfied customers' },
    averageRating: { type: 'number', label: 'Average Rating', defaultValue: 4.8 },
    totalReviews: { type: 'number', label: 'Total Reviews', defaultValue: 2847 },
    reviews: {
      type: 'list',
      label: 'Reviews',
      itemSchema: {
        mediaId: { type: 'text', label: 'Avatar Media ID', defaultValue: null },
        avatar: { type: 'image', label: 'Avatar URL', defaultValue: '/placeholder-avatar.jpg' },
        author: { type: 'text', label: 'Author Name', defaultValue: 'Alex Martinez' },
        role: { type: 'text', label: 'Role', defaultValue: 'CEO, TechStart' },
        rating: { type: 'number', label: 'Rating', defaultValue: 5 },
        date: { type: 'text', label: 'Date', defaultValue: '1 week ago' },
        content: { type: 'textarea', label: 'Review Content', defaultValue: 'Outstanding service!' },
        verified: { type: 'boolean', label: 'Verified Purchase', defaultValue: true },
      },
    },
  },
};

// Progress Bars Config
export const progressBlocksConfig: Record<string, BlockPropertySchema> = {
  'progress-bar-single': {
    title: { type: 'text', label: 'Title', defaultValue: 'Project Completion' },
    progress: { type: 'number', label: 'Progress (%)', defaultValue: 75 },
    showPercentage: { type: 'boolean', label: 'Show Percentage', defaultValue: true },
    color: { type: 'select', label: 'Color', options: ['primary', 'success', 'warning', 'danger', 'info'], defaultValue: 'primary' },
    size: { type: 'select', label: 'Size', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
    animated: { type: 'boolean', label: 'Animated', defaultValue: true },
  },
  'progress-bars-stacked': {
    title: { type: 'text', label: 'Title', defaultValue: 'Our Skills' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: "What we're great at" },
    skills: {
      type: 'list',
      label: 'Skills',
      itemSchema: {
        name: { type: 'text', label: 'Skill Name', defaultValue: 'Web Development' },
        progress: { type: 'number', label: 'Progress (%)', defaultValue: 95 },
        color: { type: 'select', label: 'Color', options: ['primary', 'success', 'warning', 'danger', 'info'], defaultValue: 'primary' },
      },
    },
  },
  'progress-circular': {
    title: { type: 'text', label: 'Title', defaultValue: 'Our Achievements' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Delivering excellence across all metrics' },
    stats: {
      type: 'list',
      label: 'Stats',
      itemSchema: {
        label: { type: 'text', label: 'Label', defaultValue: 'Client Satisfaction' },
        progress: { type: 'number', label: 'Progress (%)', defaultValue: 98 },
        color: { type: 'select', label: 'Color', options: ['primary', 'success', 'warning', 'danger', 'info'], defaultValue: 'primary' },
        icon: { type: 'text', label: 'Icon (emoji)', defaultValue: '😊' },
      },
    },
  },
};

// Homepage Sections Config (NEW - Phase 1 + Phase 3: Design Token Migration)
export const homepageSectionsConfig: Record<string, BlockPropertySchema> = {
  'thumbnail-carousel': {
    sectionTitle: { type: 'text', label: 'Section Title', defaultValue: 'Our Solutions' },
    ...createTextStyleProperties('sectionTitle', 'heading2', 'center', 'primary', 'bold'),
    sectionDescription: { type: 'textarea', label: 'Section Description', defaultValue: 'Discover our comprehensive solutions' },
    ...createTextStyleProperties('sectionDescription', 'body', 'center', 'secondary', 'normal'),
    // Design Token: Background color
    bgColor: {
      type: 'text',
      label: 'Background Color',
      defaultValue: 'bg-background',
      tokenReference: {
        category: 'color',
        suggestedPath: 'color.background.primary',
        allowCustom: true,
        description: 'Section background color'
      }
    },
    // Design Token: Spacing
    paddingY: {
      type: 'text',
      label: 'Vertical Padding',
      defaultValue: 'py-16 md:py-24',
      tokenReference: {
        category: 'spacing',
        suggestedPath: 'spacing.section.y',
        allowCustom: true,
        description: 'Top and bottom padding'
      }
    },
    imagePosition: {
      type: 'select',
      label: 'Image Position',
      options: ['left', 'right'],
      defaultValue: 'left'
    },
    slides: {
      type: 'list',
      label: 'Carousel Slides',
      itemSchema: {
        id: { type: 'text', label: 'Unique ID', defaultValue: 'slide-1' },
        category: { type: 'text', label: 'Category Badge', defaultValue: 'CATEGORY' },
        // Design Token: Badge color
        categoryBgColor: {
          type: 'text',
          label: 'Badge Background Color',
          defaultValue: 'bg-primary/10',
          tokenReference: {
            category: 'color',
            suggestedPath: 'color.primary.light',
            allowCustom: true,
            description: 'Category badge background'
          }
        },
        title: { type: 'text', label: 'Slide Title', defaultValue: 'Solution Title' },
        description: { type: 'textarea', label: 'Description', defaultValue: 'Solution description text' },
        imageUrl: { type: 'image', label: 'Slide Image URL', defaultValue: '/placeholder.jpg' },
        imageHint: { type: 'text', label: 'Image Alt Text', defaultValue: 'Solution image' },
        iconName: { type: 'text', label: 'Lucide Icon Name', defaultValue: 'Building' },
        // Design Token: Icon color
        iconColor: {
          type: 'text',
          label: 'Icon Color',
          defaultValue: 'text-primary',
          tokenReference: {
            category: 'color',
            suggestedPath: 'color.primary',
            allowCustom: true,
            description: 'Icon color'
          }
        },
        items: {
          type: 'list',
          label: 'Quick Links',
          itemSchema: {
            title: { type: 'text', label: 'Link Title', defaultValue: 'Learn More' },
            href: { type: 'text', label: 'Link URL', defaultValue: '#' },
          },
        },
      },
    },
  },
  'tabbed-grid': {
    sectionTitle: { type: 'text', label: 'Section Title', defaultValue: 'Resources' },
    ...createTextStyleProperties('sectionTitle', 'heading2', 'center', 'primary', 'bold'),
    sectionDescription: { type: 'textarea', label: 'Section Description', defaultValue: 'Explore our resources' },
    ...createTextStyleProperties('sectionDescription', 'body', 'center', 'secondary', 'normal'),
    // Design Token: Background color
    bgColor: {
      type: 'text',
      label: 'Background Color',
      defaultValue: 'bg-background',
      tokenReference: {
        category: 'color',
        suggestedPath: 'color.background.primary',
        allowCustom: true,
        description: 'Section background color'
      }
    },
    // Design Token: Spacing
    paddingY: {
      type: 'text',
      label: 'Vertical Padding',
      defaultValue: 'py-16 md:py-24',
      tokenReference: {
        category: 'spacing',
        suggestedPath: 'spacing.section.y',
        allowCustom: true,
        description: 'Top and bottom padding'
      }
    },
    // Design Token: Card spacing
    cardGap: {
      type: 'text',
      label: 'Card Gap',
      defaultValue: 'gap-6',
      tokenReference: {
        category: 'spacing',
        suggestedPath: 'spacing.grid.gap',
        allowCustom: true,
        description: 'Gap between cards'
      }
    },
    tabs: {
      type: 'list',
      label: 'Tabs',
      itemSchema: {
        id: { type: 'text', label: 'Tab ID', defaultValue: 'tab-1' },
        title: { type: 'text', label: 'Tab Title', defaultValue: 'Tab Name' },
        iconName: { type: 'text', label: 'Lucide Icon Name', defaultValue: 'FileText' },
        items: {
          type: 'list',
          label: 'Tab Items',
          itemSchema: {
            title: { type: 'text', label: 'Item Title', defaultValue: 'Card Title' },
            description: { type: 'textarea', label: 'Item Description', defaultValue: 'Card description' },
            ctaText: { type: 'text', label: 'CTA Button Text', defaultValue: 'Learn More' },
            ctaLink: { type: 'text', label: 'CTA Button Link', defaultValue: '#' },
            // Design Token: Card colors
            cardBgColor: {
              type: 'text',
              label: 'Card Background',
              defaultValue: 'bg-card',
              tokenReference: {
                category: 'color',
                suggestedPath: 'color.card.background',
                allowCustom: true,
                description: 'Card background color'
              }
            },
          },
        },
      },
    },
  },
  'hero-tabbed-carousel': {
    autoplayDelay: { type: 'number', label: 'Autoplay Delay (ms)', defaultValue: 5000 },
    // Design Token: Hero height
    heroHeight: {
      type: 'text',
      label: 'Hero Height',
      defaultValue: 'h-[600px] md:h-[700px]',
      tokenReference: {
        category: 'dimension',
        suggestedPath: 'dimension.hero.height',
        allowCustom: true,
        description: 'Hero section height'
      }
    },
    // Design Token: Overlay color
    overlayColor: {
      type: 'text',
      label: 'Overlay Color',
      defaultValue: 'bg-black/40',
      tokenReference: {
        category: 'color',
        suggestedPath: 'color.overlay.dark',
        allowCustom: true,
        description: 'Hero overlay color and opacity'
      }
    },
    tabs: {
      type: 'list',
      label: 'Hero Tabs',
      itemSchema: {
        id: { type: 'text', label: 'Tab ID', defaultValue: 'tab-1' },
        title: { type: 'text', label: 'Tab Title', defaultValue: 'Solutions' },
        slides: {
          type: 'list',
          label: 'Tab Slides',
          itemSchema: {
            image: { type: 'image', label: 'Background Image URL', defaultValue: '/placeholder.jpg' },
            imageHint: { type: 'text', label: 'Image Alt Text', defaultValue: 'Hero image' },
            headline: { type: 'text', label: 'Main Headline', defaultValue: 'Welcome to Our Platform' },
            // Design Token: Headline text size
            headlineFontSize: {
              type: 'text',
              label: 'Headline Font Size',
              defaultValue: 'text-4xl md:text-5xl lg:text-6xl',
              tokenReference: {
                category: 'typography',
                suggestedPath: 'typography.size.hero',
                allowCustom: true,
                description: 'Hero headline font size'
              }
            },
            subheadline: { type: 'textarea', label: 'Subheadline', defaultValue: 'Discover amazing features' },
            ctaText: { type: 'text', label: 'CTA Button Text', defaultValue: 'Get Started' },
            ctaLink: { type: 'text', label: 'CTA Button Link', defaultValue: '#' },
            // Design Token: CTA button color
            ctaBgColor: {
              type: 'text',
              label: 'CTA Background Color',
              defaultValue: 'bg-primary',
              tokenReference: {
                category: 'color',
                suggestedPath: 'color.primary',
                allowCustom: true,
                description: 'CTA button background'
              }
            },
          },
        },
      },
    },
  },
  'education-multi-layout': {
    sectionTitle: { type: 'text', label: 'Section Title', defaultValue: 'Education & Support' },
    ...createTextStyleProperties('sectionTitle', 'heading2', 'center', 'primary', 'bold'),
    sectionDescription: { type: 'textarea', label: 'Section Description', defaultValue: 'Expand your knowledge and get the support you need' },
    ...createTextStyleProperties('sectionDescription', 'body', 'center', 'secondary', 'normal'),
    // Design Token: Background color
    bgColor: {
      type: 'text',
      label: 'Background Color',
      defaultValue: 'bg-background',
      tokenReference: {
        category: 'color',
        suggestedPath: 'color.background.secondary',
        allowCustom: true,
        description: 'Section background color'
      }
    },
    // Design Token: Spacing
    paddingY: {
      type: 'text',
      label: 'Vertical Padding',
      defaultValue: 'py-16 md:py-24',
      tokenReference: {
        category: 'spacing',
        suggestedPath: 'spacing.section.y',
        allowCustom: true,
        description: 'Top and bottom padding'
      }
    },
    // Design Token: Grid/Carousel gap
    itemGap: {
      type: 'text',
      label: 'Item Gap',
      defaultValue: 'gap-6',
      tokenReference: {
        category: 'spacing',
        suggestedPath: 'spacing.grid.gap',
        allowCustom: true,
        description: 'Gap between items in grid/carousel'
      }
    },
    tabs: {
      type: 'list',
      label: 'Education Tabs',
      itemSchema: {
        id: { type: 'text', label: 'Tab ID', defaultValue: 'tab-1' },
        title: { type: 'text', label: 'Tab Title', defaultValue: 'Training' },
        iconName: { type: 'text', label: 'Lucide Icon Name', defaultValue: 'BookOpen' },
        layoutType: {
          type: 'select',
          label: 'Layout Type',
          options: ['carousel', 'grid-2col', 'grid-3col'],
          defaultValue: 'carousel'
        },
        autoplay: { type: 'boolean', label: 'Enable Autoplay (carousel only)', defaultValue: false },
        items: {
          type: 'list',
          label: 'Tab Items',
          itemSchema: {
            title: { type: 'text', label: 'Item Title', defaultValue: 'Title' },
            description: { type: 'textarea', label: 'Item Description', defaultValue: 'Description' },
            date: { type: 'text', label: 'Date (optional)', defaultValue: '' },
            category: { type: 'text', label: 'Category (optional)', defaultValue: '' },
            ctaText: { type: 'text', label: 'CTA Button Text', defaultValue: 'Learn More' },
            ctaLink: { type: 'text', label: 'CTA Button Link', defaultValue: '#' },
            // Design Token: CTA button styling
            ctaBgColor: {
              type: 'text',
              label: 'CTA Button Background',
              defaultValue: 'bg-primary',
              tokenReference: {
                category: 'color',
                suggestedPath: 'color.primary',
                allowCustom: true,
                description: 'CTA button background color'
              }
            },
            imageUrl: { type: 'image', label: 'Image URL (optional)', defaultValue: '' },
            iconName: { type: 'text', label: 'Lucide Icon Name (optional)', defaultValue: '' },
            // Design Token: Icon color
            iconColor: {
              type: 'text',
              label: 'Icon Color',
              defaultValue: 'text-primary',
              tokenReference: {
                category: 'color',
                suggestedPath: 'color.primary',
                allowCustom: true,
                description: 'Icon color'
              }
            },
            // Design Token: Card background (for grid layouts)
            cardBgColor: {
              type: 'text',
              label: 'Card Background',
              defaultValue: 'bg-card',
              tokenReference: {
                category: 'color',
                suggestedPath: 'color.card.background',
                allowCustom: true,
                description: 'Card background for grid layouts'
              }
            },
          },
        },
      },
    },
  },
};

// Migration Blocks Configuration (from migration-blocks.tsx)
// Complex nested structures with full editing capabilities
const migrationBlocksConfig: Record<string, BlockPropertySchema> = {
  // 1. CMS Hero Carousel - Complex nested tabs → slides structure
  'cms-hero-carousel': {
    autoplayDelay: { type: 'number', label: 'Autoplay Delay (ms)', defaultValue: 5000 },
    tabs: {
      type: 'list',
      label: 'Hero Tabs',
      defaultValue: [],
      itemSchema: {
        id: { type: 'text', label: 'Tab ID', defaultValue: 'tab-1' },
        name: { type: 'text', label: 'Tab Name', defaultValue: 'Tab 1' },
        slides: {
          type: 'list',
          label: 'Slides',
          defaultValue: [],
          itemSchema: {
            image: { type: 'image', label: 'Slide Image', defaultValue: '' },
            imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: '' },
            headline: { type: 'text', label: 'Headline', defaultValue: '' },
            subheadline: { type: 'textarea', label: 'Subheadline', defaultValue: '' },
            ctaText: { type: 'text', label: 'CTA Button Text', defaultValue: 'Learn More' },
            ctaLink: { type: 'text', label: 'CTA Button Link', defaultValue: '#' },
          },
        },
      },
    },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // 2. CMS Solutions Carousel - Nested slides with category, items
  'cms-solutions-carousel': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Çözümlerimiz' },
    subtitle: { type: 'textarea', label: 'Section Subtitle', defaultValue: 'Sektörünüz ne olursa olsun, projenizin her aşaması için güçlü ve esnek bir çözümümüz var.' },
    slides: {
      type: 'list',
      label: 'Solution Slides',
      defaultValue: [],
      itemSchema: {
        id: { type: 'text', label: 'Slide ID', defaultValue: 'solution-1' },
        category: { type: 'text', label: 'Category', defaultValue: 'Category' },
        title: { type: 'text', label: 'Title', defaultValue: '' },
        description: { type: 'textarea', label: 'Description', defaultValue: '' },
        imageUrl: { type: 'image', label: 'Image URL', defaultValue: '' },
        imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: '' },
        iconName: { type: 'text', label: 'Icon Name (Lucide)', defaultValue: '' },
        items: {
          type: 'list',
          label: 'Solution Items',
          defaultValue: [],
          itemSchema: {
            title: { type: 'text', label: 'Item Title', defaultValue: '' },
            href: { type: 'text', label: 'Item Link', defaultValue: '#' },
          },
        },
      },
    },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // 3. CMS Products Carousel - Similar to solutions carousel
  'cms-products-carousel': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Ürünlerimiz' },
    subtitle: { type: 'textarea', label: 'Section Subtitle', defaultValue: 'İhtiyaçlarınıza özel olarak tasarlanmış, sektör lideri Allplan ve iş ortağı ürünlerini keşfedin.' },
    slides: {
      type: 'list',
      label: 'Product Slides',
      defaultValue: [],
      itemSchema: {
        id: { type: 'text', label: 'Slide ID', defaultValue: 'product-1' },
        category: { type: 'text', label: 'Category', defaultValue: 'Category' },
        title: { type: 'text', label: 'Title', defaultValue: '' },
        description: { type: 'textarea', label: 'Description', defaultValue: '' },
        imageUrl: { type: 'image', label: 'Image URL', defaultValue: '' },
        imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: '' },
        iconName: { type: 'text', label: 'Icon Name (Lucide)', defaultValue: '' },
        items: {
          type: 'list',
          label: 'Product Items',
          defaultValue: [],
          itemSchema: {
            title: { type: 'text', label: 'Item Title', defaultValue: '' },
            href: { type: 'text', label: 'Item Link', defaultValue: '#' },
          },
        },
      },
    },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // 4. CMS Workflow Section - Complex nested tabs → items structure
  'cms-workflow-section': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'İş Akışı' },
    subtitle: { type: 'textarea', label: 'Section Subtitle', defaultValue: 'Allplan ile proje yaşam döngüsünün her aşamasında verimli çalışın.' },
    tabs: {
      type: 'list',
      label: 'Workflow Tabs',
      defaultValue: [],
      itemSchema: {
        id: { type: 'text', label: 'Tab ID', defaultValue: 'workflow-1' },
        title: { type: 'text', label: 'Tab Title', defaultValue: 'Workflow 1' },
        items: {
          type: 'list',
          label: 'Workflow Items',
          defaultValue: [],
          itemSchema: {
            id: { type: 'text', label: 'Item ID', defaultValue: 'item-1' },
            title: { type: 'text', label: 'Item Title', defaultValue: '' },
            contentTitle: { type: 'text', label: 'Content Title', defaultValue: '' },
            text: { type: 'textarea', label: 'Text Content', defaultValue: '' },
            image: { type: 'image', label: 'Image URL', defaultValue: '' },
            imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: '' },
          },
        },
      },
    },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // 5. CMS Parallax Spacer - Simple component with optional CTA
  'cms-parallax-spacer': {
    imageUrl: { type: 'image', label: 'Background Image URL', defaultValue: 'https://picsum.photos/seed/parallax/1920/800' },
    imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: 'parallax background' },
    title: { type: 'text', label: 'Title', defaultValue: 'Section Title' },
    subtitle: { type: 'textarea', label: 'Subtitle', defaultValue: 'Section subtitle' },
    buttonText: { type: 'text', label: 'Button Text (Optional)', defaultValue: '' },
    buttonLink: { type: 'text', label: 'Button Link (Optional)', defaultValue: '' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // 6. CMS Certificate Verification - Simple CTA section
  'cms-certificate-verification': {
    title: { type: 'text', label: 'Title', defaultValue: 'Instantly Verify Your Allplan Certificate' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Quickly check the validity of your Allplan certificates in real-time.' },
    ctaText: { type: 'text', label: 'CTA Button Text', defaultValue: 'Check Now' },
    ctaLink: { type: 'text', label: 'CTA Button Link', defaultValue: 'https://sertifikasorgulama.aluplan.com.tr/' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // 7. CMS Newsletter Section - With benefits list (string array)
  'cms-newsletter-section': {
    title: { type: 'text', label: 'Title', defaultValue: 'Bültenimize Abone Olun' },
    subtitle: { type: 'textarea', label: 'Subtitle', defaultValue: 'ALLPLAN güncellemelerini ilk öğrenen siz olun.' },
    benefits: {
      type: 'textarea',
      label: 'Benefits (one per line)',
      defaultValue: `En son sürüm duyuruları ve yenilikler
Etkinliklere, eğitimlere ve webinarlara özel davetiyeler
Sektör, şirket ve ürün haberleri`,
    },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // 8. CMS Why Aluplan - Two-column with items list
  'cms-why-aluplan': {
    title: { type: 'text', label: 'Title', defaultValue: 'Neden Aluplan Digital?' },
    content: { type: 'textarea', label: 'Content', defaultValue: 'Sektördeki 20 yılı aşkın tecrübemizle...' },
    imageUrl: { type: 'image', label: 'Image URL', defaultValue: 'https://picsum.photos/seed/why-aluplan/800/600' },
    imagePosition: { type: 'select', label: 'Image Position', options: ['left', 'right'], defaultValue: 'left' },
    items: {
      type: 'list',
      label: 'Feature Items',
      defaultValue: [],
      itemSchema: {
        title: { type: 'text', label: 'Item Title', defaultValue: '' },
        description: { type: 'textarea', label: 'Item Description', defaultValue: '' },
      },
    },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // Simple migration blocks (already have simple structures)
  'hero-with-image-and-text-overlay': {
    title: { type: 'text', label: 'Title', defaultValue: 'Welcome' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Discover our amazing platform' },
    backgroundImageUrl: { type: 'image', label: 'Background Image URL', defaultValue: 'https://picsum.photos/seed/hero/1920/1080' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'hero-with-background-image': {
    title: { type: 'text', label: 'Title', defaultValue: 'Welcome' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Discover our amazing platform' },
    backgroundImageUrl: { type: 'image', label: 'Background Image URL', defaultValue: 'https://picsum.photos/seed/hero-bg/1920/1080' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'content-section-with-title': {
    title: { type: 'text', label: 'Title', defaultValue: 'Section Title' },
    content: { type: 'textarea', label: 'Content (HTML)', defaultValue: 'Section content goes here.' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'content-with-call-to-action': {
    title: { type: 'text', label: 'Title', defaultValue: 'Ready to Get Started?' },
    content: { type: 'text', label: 'Content', defaultValue: 'Join thousands of satisfied customers today.' },
    buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Get Started' },
    buttonUrl: { type: 'text', label: 'Button URL', defaultValue: '#' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'content-with-image-two-column': {
    title: { type: 'text', label: 'Title', defaultValue: 'Our Story' },
    content: { type: 'textarea', label: 'Content (HTML)', defaultValue: 'Learn about our journey and what makes us unique.' },
    imageUrl: { type: 'image', label: 'Image URL', defaultValue: 'https://picsum.photos/seed/two-col/800/600' },
    imagePosition: { type: 'select', label: 'Image Position', options: ['left', 'right'], defaultValue: 'right' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'newsletter-signup-form': {
    title: { type: 'text', label: 'Title', defaultValue: 'Subscribe to Our Newsletter' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Get the latest updates delivered to your inbox.' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
};

// All block configurations
export const allBlockConfigs: Record<string, BlockPropertySchema> = {
  ...navigationBlocksConfig,
  ...heroBlocksConfig,
  ...contentBlocksConfig,
  ...elementBlocksConfig,
  ...specialBlocksConfig,
  ...ecommerceBlocksConfig,
  ...galleryBlocksConfig,
  ...footerBlocksConfig,
  ...blogRssBlocksConfig,
  ...socialSharingBlocksConfig,
  ...testimonialsBlocksConfig,
  ...featuresBlocksConfig,
  ...statsBlocksConfig,
  ...pricingBlocksConfig,
  ...ratingBlocksConfig,
  ...progressBlocksConfig,
  ...homepageSectionsConfig,
  ...migrationBlocksConfig, // ADD MIGRATION BLOCKS
};
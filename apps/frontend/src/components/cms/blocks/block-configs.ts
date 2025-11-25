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
    type: 'text' | 'number' | 'boolean' | 'checkbox' | 'color' | 'select' | 'image' | 'list' | 'array' | 'textarea' | 'token';
    label: string;
    options?: string[]; // For select type
    defaultValue?: any;

    /**
     * NEW: Token reference configuration
     * When specified, the property can reference design tokens
     * Works with 'color', 'text', 'number' types
     */
    tokenReference?: TokenReferenceConfig;

    // For list/array type
    itemSchema?: {
      [subKey: string]: {
        type: 'text' | 'number' | 'boolean' | 'checkbox' | 'color' | 'select' | 'image' | 'textarea' | 'list' | 'array' | 'token';
        label: string;
        options?: string[];
        defaultValue?: any;
        tokenReference?: TokenReferenceConfig;
        // For nested list/array type
        itemSchema?: {
          [subKey: string]: {
            type: 'text' | 'number' | 'boolean' | 'checkbox' | 'color' | 'select' | 'image' | 'textarea' | 'list' | 'array' | 'token';
            label: string;
            options?: string[];
            defaultValue?: any;
            tokenReference?: TokenReferenceConfig;
            // For deeply nested list/array type
            itemSchema?: {
              [subKey: string]: {
                type: 'text' | 'number' | 'boolean' | 'checkbox' | 'color' | 'select' | 'image' | 'textarea' | 'token';
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
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: '#ffffff' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md'], defaultValue: 'shadow-sm' },
    showBorder: { type: 'boolean', label: 'Show Border', defaultValue: true },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
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
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: '#ffffff' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md'], defaultValue: 'shadow-sm' },
    showBorder: { type: 'boolean', label: 'Show Border', defaultValue: true },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
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
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: '#ffffff' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md'], defaultValue: 'shadow-sm' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
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
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: '#ffffff' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md'], defaultValue: 'shadow-sm' },
    showSocialIcons: { type: 'boolean', label: 'Show Social Icons', defaultValue: true },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
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
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md'], defaultValue: 'shadow-none' },
    transparentBackground: { type: 'boolean', label: 'Transparent Background', defaultValue: true },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
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
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: '#ffffff' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md'], defaultValue: 'shadow-sm' },
    showBorder: { type: 'boolean', label: 'Show Border', defaultValue: true },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
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
    backgroundMediaType: {
      type: 'select',
      label: 'Background Media Type',
      options: ['none', 'image', 'video', 'youtube'],
      defaultValue: 'image'
    },
    backgroundMediaUrl: { type: 'text', label: 'Background Media URL (Upload/Direct URL)', defaultValue: '' },
    backgroundImageHint: { type: 'text', label: 'Background Image Hint (AI)', defaultValue: '' },
  },
  'hero-split-image-right': {
    title: { type: 'text', label: 'Title', defaultValue: 'Transform Your Business' },
    ...createTextStyleProperties('title', 'heading1', 'left', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Our innovative solutions help you achieve more with less effort.' },
    ...createTextStyleProperties('subtitle', 'body', 'left', 'secondary', 'normal'),
    ...createButtonProperties(),
    imageMediaType: {
      type: 'select',
      label: 'Image Media Type',
      options: ['none', 'image', 'video'],
      defaultValue: 'image'
    },
    imageMediaUrl: { type: 'text', label: 'Image URL (Upload/Direct URL)', defaultValue: '' },
    imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: '' },
  },
  'hero-gradient-floating-cta': {
    title: { type: 'text', label: 'Title', defaultValue: 'Innovation Meets Excellence' },
    ...createTextStyleProperties('title', 'heading1', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Join thousands of satisfied customers who have transformed their workflow.' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    ...createButtonProperties(),
    backgroundMediaType: {
      type: 'select',
      label: 'Background Media Type',
      options: ['none', 'image', 'video', 'youtube'],
      defaultValue: 'image'
    },
    backgroundMediaUrl: { type: 'text', label: 'Background Media URL (Upload/Direct URL)', defaultValue: '' },
    backgroundImageHint: { type: 'text', label: 'Background Image Hint (AI)', defaultValue: '' },
    backgroundPosition: { type: 'select', label: 'Background Position', options: ['center', 'top', 'bottom', 'left', 'right'], defaultValue: 'center' },
    backgroundSize: { type: 'select', label: 'Background Size', options: ['cover', 'contain', 'auto'], defaultValue: 'cover' },
  },
  'hero-video-background': {
    title: { type: 'text', label: 'Title', defaultValue: 'Experience the Future' },
    ...createTextStyleProperties('title', 'heading1', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Immersive experiences that captivate and engage your audience.' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    ...createButtonProperties(),
    backgroundMediaType: {
      type: 'select',
      label: 'Background Media Type',
      options: ['none', 'image', 'video', 'youtube'],
      defaultValue: 'video'
    },
    backgroundMediaUrl: { type: 'text', label: 'Background Media URL (Upload/Direct URL)', defaultValue: '' },
    backgroundImageHint: { type: 'text', label: 'Background Image/Video Hint (AI)', defaultValue: '' },
    backgroundPosition: { type: 'select', label: 'Background Position', options: ['center', 'top', 'bottom', 'left', 'right'], defaultValue: 'center' },
    backgroundSize: { type: 'select', label: 'Background Size', options: ['cover', 'contain', 'auto'], defaultValue: 'cover' },
  },
  'hero-fullscreen-sticky-cta': {
    title: { type: 'text', label: 'Title', defaultValue: 'Make Your Mark' },
    ...createTextStyleProperties('title', 'heading1', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'The ultimate platform for creators and innovators.' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    ...createButtonProperties(),
    backgroundMediaType: {
      type: 'select',
      label: 'Background Media Type',
      options: ['none', 'image', 'video', 'youtube'],
      defaultValue: 'image'
    },
    backgroundMediaUrl: { type: 'text', label: 'Background Media URL (Upload/Direct URL)', defaultValue: '' },
    backgroundImageHint: { type: 'text', label: 'Background Image Hint (AI)', defaultValue: '' },
    backgroundPosition: { type: 'select', label: 'Background Position', options: ['center', 'top', 'bottom', 'left', 'right'], defaultValue: 'center' },
    backgroundSize: { type: 'select', label: 'Background Size', options: ['cover', 'contain', 'auto'], defaultValue: 'cover' },
  },
  'hero-carousel-slides': {
    title: { type: 'text', label: 'Title', defaultValue: 'Featured Solutions' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Discover our most popular offerings' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'secondary', 'normal'),
    backgroundMediaType: {
      type: 'select',
      label: 'Background Media Type',
      options: ['none', 'image', 'video', 'youtube'],
      defaultValue: 'image'
    },
    backgroundMediaUrl: { type: 'text', label: 'Background Media URL (Upload/Direct URL)', defaultValue: '' },
    backgroundImageHint: { type: 'text', label: 'Background Image Hint (AI)', defaultValue: '' },
    backgroundPosition: { type: 'select', label: 'Background Position', options: ['center', 'top', 'bottom', 'left', 'right'], defaultValue: 'center' },
    backgroundSize: { type: 'select', label: 'Background Size', options: ['cover', 'contain', 'auto'], defaultValue: 'cover' },
    items: {
      type: 'list',
      label: 'Carousel Items',
      itemSchema: {
        slideMediaType: {
          type: 'select',
          label: 'Slide Media Type',
          options: ['none', 'image', 'video'],
          defaultValue: 'image'
        },
        slideMediaUrl: { type: 'text', label: 'Slide Media URL (Upload/Direct URL)', defaultValue: '/placeholder-image.jpg' },
        slideImageHint: { type: 'text', label: 'Slide Image Hint (AI)', defaultValue: '' },
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
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    borderColor: { type: 'color', label: 'Border Color', defaultValue: '#e5e7eb' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '2rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '2rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
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
    quote: { type: 'textarea', label: 'Quote', defaultValue: '"The only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle."' },
    author: { type: 'text', label: 'Author', defaultValue: '— Steve Jobs' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    quoteColor: { type: 'color', label: 'Quote Color', defaultValue: 'inherit' },
    authorColor: { type: 'color', label: 'Author Color', defaultValue: '#6b7280' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-lg' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-medium' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '2rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '2rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'element-media-image': {
    imageMediaId: { type: 'text', label: 'Image Media ID', defaultValue: null },
    imageUrl: { type: 'image', label: 'Image URL', defaultValue: '' },
    caption: { type: 'text', label: 'Caption', defaultValue: 'Image caption or description' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    captionColor: { type: 'color', label: 'Caption Color', defaultValue: '#6b7280' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-sm' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '2rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '2rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
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
    enableHoverEffect: { type: 'boolean', label: 'Enable Hover Effect', defaultValue: true },
    hoverShadow: { type: 'select', label: 'Hover Shadow', options: ['sm', 'md', 'lg', 'xl', '2xl'], defaultValue: 'xl' },
    hoverTransform: { type: 'boolean', label: 'Hover Transform (lift)', defaultValue: true },
    enableButton: { type: 'boolean', label: 'Show Button', defaultValue: true },
    buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Daha Fazla Bilgi' },
    buttonVariant: { type: 'select', label: 'Button Variant', options: ['default', 'outline', 'secondary', 'ghost'], defaultValue: 'outline' },
    items: {
      type: 'list',
      label: 'Feature Items',
      itemSchema: {
        icon: { type: 'text', label: 'Icon (emoji or text)', defaultValue: '⚡' },
        iconType: { type: 'select', label: 'Icon Type', options: ['emoji', 'lucide'], defaultValue: 'emoji' },
        lucideIcon: { type: 'text', label: 'Lucide Icon Name (e.g., Building, Users)', defaultValue: 'Building' },
        iconBackground: { type: 'boolean', label: 'Show Icon Background', defaultValue: true },
        title: { type: 'text', label: 'Feature Title', defaultValue: 'Feature Name' },
        content: { type: 'textarea', label: 'Feature Description', defaultValue: 'Description of this feature.' },
        subItems: {
          type: 'list',
          label: 'Sub Items (Links)',
          itemSchema: {
            title: { type: 'text', label: 'Link Text', defaultValue: 'Learn More' },
            href: { type: 'text', label: 'Link URL', defaultValue: '#' },
          },
        },
        buttonHref: { type: 'text', label: 'Button Link', defaultValue: '#' },
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
  'special-product-grid': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Ürünler' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Section Subtitle', defaultValue: 'İhtiyaçlarınıza özel olarak tasarlanmış ürünleri keşfedin' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'muted', 'normal'),
    gridColumns: { type: 'select', label: 'Grid Columns', options: ['1', '2', '3'], defaultValue: '2' },
    enableHoverEffect: { type: 'boolean', label: 'Enable Hover Effect', defaultValue: true },
    hoverShadow: { type: 'select', label: 'Hover Shadow', options: ['sm', 'md', 'lg', 'xl', '2xl'], defaultValue: 'xl' },
    hoverTransform: { type: 'boolean', label: 'Hover Transform (lift)', defaultValue: true },
    products: {
      type: 'list',
      label: 'Product Cards',
      itemSchema: {
        imageMediaId: { type: 'text', label: 'Product Image Media ID', defaultValue: null },
        imageUrl: { type: 'image', label: 'Product Image URL', defaultValue: '/placeholder-product.jpg' },
        imageAspect: { type: 'select', label: 'Image Aspect Ratio', options: ['video', 'square', 'portrait'], defaultValue: 'video' },
        iconType: { type: 'select', label: 'Icon Type', options: ['emoji', 'lucide'], defaultValue: 'lucide' },
        icon: { type: 'text', label: 'Icon (emoji or text)', defaultValue: '📦' },
        lucideIcon: { type: 'text', label: 'Lucide Icon Name (e.g., Layers, Building)', defaultValue: 'Layers' },
        iconBackground: { type: 'boolean', label: 'Show Icon Background', defaultValue: true },
        category: { type: 'text', label: 'Product Category', defaultValue: 'Ürün Ailesi' },
        ...createTextStyleProperties('category', 'small', 'left', 'muted', 'normal'),
        title: { type: 'text', label: 'Product Title', defaultValue: 'ÜRÜN ADI' },
        ...createTextStyleProperties('title', 'heading3', 'left', 'primary', 'semibold'),
        description: { type: 'textarea', label: 'Product Description', defaultValue: 'Ürün açıklaması burada yer alır.' },
        ...createTextStyleProperties('description', 'body', 'left', 'muted', 'normal'),
        buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Kategoriyi İncele' },
        buttonVariant: { type: 'select', label: 'Button Variant', options: ['default', 'outline', 'secondary', 'ghost'], defaultValue: 'secondary' },
        buttonHref: { type: 'text', label: 'Button Link', defaultValue: '#' },
        buttonIcon: { type: 'boolean', label: 'Show Button Icon (ArrowRight)', defaultValue: true },
      },
    },
  },
  'special-resource-tabs': {
    title: { type: 'text', label: 'Section Title', defaultValue: 'Kaynaklar' },
    ...createTextStyleProperties('title', 'heading2', 'center', 'primary', 'bold'),
    subtitle: { type: 'text', label: 'Section Subtitle', defaultValue: 'Sektördeki bilgiyi keşfedin, becerilerinizi geliştirin ve projelerinizi ileriye taşıyın.' },
    ...createTextStyleProperties('subtitle', 'body', 'center', 'muted', 'normal'),
    gridColumns: { type: 'select', label: 'Cards Per Row', options: ['2', '3', '4'], defaultValue: '4' },
    enableHoverEffect: { type: 'boolean', label: 'Enable Card Hover Effect', defaultValue: true },
    hoverShadow: { type: 'select', label: 'Hover Shadow', options: ['sm', 'md', 'lg', 'xl', '2xl'], defaultValue: 'xl' },
    hoverTransform: { type: 'boolean', label: 'Hover Transform (lift)', defaultValue: true },
    tabs: {
      type: 'list',
      label: 'Resource Tabs',
      itemSchema: {
        tabId: { type: 'text', label: 'Tab ID (unique)', defaultValue: 'blog' },
        tabTitle: { type: 'text', label: 'Tab Title', defaultValue: 'Blog & Haberler' },
        iconType: { type: 'select', label: 'Icon Type', options: ['emoji', 'lucide'], defaultValue: 'lucide' },
        icon: { type: 'text', label: 'Icon (emoji)', defaultValue: '📰' },
        lucideIcon: { type: 'text', label: 'Lucide Icon Name (e.g., Rss, Video, BookOpen)', defaultValue: 'Rss' },
        resources: {
          type: 'list',
          label: 'Resources in this Tab',
          itemSchema: {
            title: { type: 'text', label: 'Resource Title', defaultValue: 'Resource Name' },
            description: { type: 'textarea', label: 'Resource Description', defaultValue: 'Brief description of this resource.' },
            ctaText: { type: 'text', label: 'Button Text', defaultValue: 'Oku' },
            ctaLink: { type: 'text', label: 'Button Link', defaultValue: '#' },
            buttonVariant: { type: 'select', label: 'Button Variant', options: ['default', 'outline', 'secondary', 'ghost'], defaultValue: 'outline' },
          },
        },
      },
    },
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
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    iconColor: { type: 'color', label: 'Icon Color', defaultValue: 'inherit' },
    iconSize: { type: 'select', label: 'Icon Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-lg' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '2rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '2rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
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
        mediaType: {
          type: 'select',
          label: 'Slide Media Type',
          options: ['none', 'image', 'video'],
          defaultValue: 'image'
        },
        mediaUrl: { type: 'text', label: 'Slide Media URL (Upload/Direct URL)', defaultValue: '/placeholder.jpg' },
        imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: 'Solution image' },
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
            mediaType: {
              type: 'select',
              label: 'Background Media Type',
              options: ['none', 'image', 'video', 'youtube'],
              defaultValue: 'image'
            },
            mediaUrl: { type: 'text', label: 'Background Media URL (Upload/Direct URL)', defaultValue: '/placeholder.jpg' },
            imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: 'Hero image' },
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
            mediaType: {
              type: 'select',
              label: 'Media Type',
              options: ['none', 'image', 'video'],
              defaultValue: 'none'
            },
            mediaUrl: { type: 'text', label: 'Media URL (Upload/Direct URL - optional)', defaultValue: '' },
            imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: '' },
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
            mediaType: {
              type: 'select',
              label: 'Media Type',
              options: ['none', 'image', 'video'],
              defaultValue: 'image'
            },
            mediaUrl: { type: 'text', label: 'Media URL (Upload/Direct URL)', defaultValue: '' },
            imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: '' },
            headline: { type: 'text', label: 'Headline', defaultValue: '' },
            subheadline: { type: 'textarea', label: 'Subheadline', defaultValue: '' },
            ctaText: { type: 'text', label: 'CTA Button Text', defaultValue: 'Learn More' },
            ctaLink: { type: 'text', label: 'CTA Button Link', defaultValue: '#' },
          },
        },
      },
    },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
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
        mediaType: {
          type: 'select',
          label: 'Media Type',
          options: ['none', 'image', 'video'],
          defaultValue: 'image'
        },
        mediaUrl: { type: 'text', label: 'Media URL (Upload/Direct URL)', defaultValue: '' },
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
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
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
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
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
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // 5. CMS Parallax Spacer - Simple component with optional CTA
  'cms-parallax-spacer': {
    mediaType: {
      type: 'select',
      label: 'Background Media Type',
      options: ['none', 'image', 'video', 'youtube'],
      defaultValue: 'image'
    },
    mediaUrl: { type: 'text', label: 'Background Media URL (Upload/Direct URL)', defaultValue: 'https://picsum.photos/seed/parallax/1920/800' },
    imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: 'parallax background' },
    title: { type: 'text', label: 'Title', defaultValue: 'Section Title' },
    subtitle: { type: 'textarea', label: 'Subtitle', defaultValue: 'Section subtitle' },
    buttonText: { type: 'text', label: 'Button Text (Optional)', defaultValue: '' },
    buttonLink: { type: 'text', label: 'Button Link (Optional)', defaultValue: '' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // 6. CMS Certificate Verification - Simple CTA section
  'cms-certificate-verification': {
    title: { type: 'text', label: 'Title', defaultValue: 'Instantly Verify Your Allplan Certificate' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Quickly check the validity of your Allplan certificates in real-time.' },
    ctaText: { type: 'text', label: 'CTA Button Text', defaultValue: 'Check Now' },
    ctaLink: { type: 'text', label: 'CTA Button Link', defaultValue: 'https://sertifikasorgulama.aluplan.com.tr/' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
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
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // 8. CMS Why Aluplan - Two-column with items list
  'cms-why-aluplan': {
    title: { type: 'text', label: 'Title', defaultValue: 'Neden Aluplan Digital?' },
    content: { type: 'textarea', label: 'Content', defaultValue: 'Sektördeki 20 yılı aşkın tecrübemizle...' },
    mediaType: {
      type: 'select',
      label: 'Image Media Type',
      options: ['none', 'image', 'video'],
      defaultValue: 'image'
    },
    mediaUrl: { type: 'text', label: 'Image URL (Upload/Direct URL)', defaultValue: 'https://picsum.photos/seed/why-aluplan/800/600' },
    imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: '' },
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
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // Simple migration blocks (already have simple structures)
  'hero-with-image-and-text-overlay': {
    title: { type: 'text', label: 'Title', defaultValue: 'Welcome' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Discover our amazing platform' },
    backgroundMediaType: {
      type: 'select',
      label: 'Background Media Type',
      options: ['none', 'image', 'video', 'youtube'],
      defaultValue: 'image'
    },
    backgroundMediaUrl: { type: 'text', label: 'Background Media URL (Upload/Direct URL)', defaultValue: 'https://picsum.photos/seed/hero/1920/1080' },
    backgroundImageHint: { type: 'text', label: 'Background Image Hint (AI)', defaultValue: '' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'hero-with-background-image': {
    title: { type: 'text', label: 'Title', defaultValue: 'Welcome' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Discover our amazing platform' },
    backgroundMediaType: {
      type: 'select',
      label: 'Background Media Type',
      options: ['none', 'image', 'video', 'youtube'],
      defaultValue: 'image'
    },
    backgroundMediaUrl: { type: 'text', label: 'Background Media URL (Upload/Direct URL)', defaultValue: 'https://picsum.photos/seed/hero-bg/1920/1080' },
    backgroundImageHint: { type: 'text', label: 'Background Image Hint (AI)', defaultValue: '' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'content-section-with-title': {
    title: { type: 'text', label: 'Title', defaultValue: 'Section Title' },
    content: { type: 'textarea', label: 'Content (HTML)', defaultValue: 'Section content goes here.' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'content-with-call-to-action': {
    title: { type: 'text', label: 'Title', defaultValue: 'Ready to Get Started?' },
    content: { type: 'text', label: 'Content', defaultValue: 'Join thousands of satisfied customers today.' },
    buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Get Started' },
    buttonUrl: { type: 'text', label: 'Button URL', defaultValue: '#' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'content-with-image-two-column': {
    title: { type: 'text', label: 'Title', defaultValue: 'Our Story' },
    content: { type: 'textarea', label: 'Content (HTML)', defaultValue: 'Learn about our journey and what makes us unique.' },
    mediaType: {
      type: 'select',
      label: 'Image Media Type',
      options: ['none', 'image', 'video'],
      defaultValue: 'image'
    },
    mediaUrl: { type: 'text', label: 'Image URL (Upload/Direct URL)', defaultValue: 'https://picsum.photos/seed/two-col/800/600' },
    imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: '' },
    imagePosition: { type: 'select', label: 'Image Position', options: ['left', 'right'], defaultValue: 'right' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    gap: { type: 'text', label: 'Gap Between Columns', defaultValue: '3rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'newsletter-signup-form': {
    title: { type: 'text', label: 'Title', defaultValue: 'Subscribe to Our Newsletter' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Get the latest updates delivered to your inbox.' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'cms-timeline-carousel': {
    // Note: This component uses hardcoded timelineData and takes no props
    // Style properties only for visual editor compatibility
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '6rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
};

// ==================== NEW TEMPLATE DESIGN BLOCKS (Sprint 1) ====================
const templateDesignBlocksConfig: Record<string, BlockPropertySchema> = {
  // Hero Blocks
  'hero-solutions': {
    eyebrow: { type: 'text', label: 'Eyebrow Text', defaultValue: 'Çözümlerimiz' },
    title: { type: 'text', label: 'Title', defaultValue: 'İşinizi Dijital Dönüşümle Güçlendirin' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Kurumsal Düzeyde İş Çözümleri' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Modern teknoloji ve uzman ekibimizle işinizi bir sonraki seviyeye taşıyın.' },
    mediaType: {
      type: 'select',
      label: 'Media Type',
      options: ['none', 'image', 'video', 'youtube'],
      defaultValue: 'image'
    },
    mediaUrl: { type: 'text', label: 'Media URL (Upload/Direct URL)', defaultValue: 'https://picsum.photos/seed/hero-solutions/800/600' },
    imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: '' },
    imageAlt: { type: 'text', label: 'Image Alt Text', defaultValue: 'Çözüm Görseli' },
    primaryButtonText: { type: 'text', label: 'Primary Button Text', defaultValue: 'Demo Talep Et' },
    primaryButtonUrl: { type: 'text', label: 'Primary Button URL', defaultValue: '/demo' },
    secondaryButtonText: { type: 'text', label: 'Secondary Button Text', defaultValue: 'Daha Fazla Bilgi' },
    secondaryButtonUrl: { type: 'text', label: 'Secondary Button URL', defaultValue: '#features' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '6rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '6rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'hero-corporate': {
    title: { type: 'text', label: 'Title', defaultValue: 'Güvenilir İş Ortağınız' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Kurumsal Mükemmellik' },
    description: { type: 'textarea', label: 'Description', defaultValue: '25 yılı aşkın deneyimimizle, işletmenizin dijital dönüşüm yolculuğunda yanınızdayız.' },
    mediaType: {
      type: 'select',
      label: 'Media Type',
      options: ['none', 'image', 'video', 'youtube'],
      defaultValue: 'image'
    },
    mediaUrl: { type: 'text', label: 'Media URL (Upload/Direct URL)', defaultValue: 'https://picsum.photos/seed/hero-corporate/800/600' },
    imageHint: { type: 'text', label: 'Image Hint (AI)', defaultValue: '' },
    imageAlt: { type: 'text', label: 'Image Alt Text', defaultValue: 'Kurumsal Görsel' },
    imagePosition: { type: 'select', label: 'Image Position', defaultValue: 'right', options: ['left', 'right'] },
    showVideoButton: { type: 'checkbox', label: 'Show Video Play Button', defaultValue: false },
    primaryButtonText: { type: 'text', label: 'Primary Button Text', defaultValue: 'Bizimle İletişime Geçin' },
    primaryButtonUrl: { type: 'text', label: 'Primary Button URL', defaultValue: '/contact' },
    secondaryButtonText: { type: 'text', label: 'Secondary Button Text', defaultValue: 'Hakkımızda' },
    secondaryButtonUrl: { type: 'text', label: 'Secondary Button URL', defaultValue: '/about' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '8rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '8rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'hero-case-study': {
    projectTitle: { type: 'text', label: 'Project Title', defaultValue: 'Dijital Dönüşüm Başarı Hikayesi' },
    clientName: { type: 'text', label: 'Client Name', defaultValue: 'Müşteri Adı' },
    clientLogo: { type: 'image', label: 'Client Logo', defaultValue: '' },
    industry: { type: 'text', label: 'Industry', defaultValue: 'Teknoloji' },
    projectDate: { type: 'text', label: 'Project Date', defaultValue: '2024' },
    summary: { type: 'textarea', label: 'Summary', defaultValue: 'İşletmenin operasyonel verimliliğini %45 artıran kapsamlı dijital dönüşüm projesi.' },
    featuredImage: { type: 'image', label: 'Featured Image', defaultValue: 'https://picsum.photos/seed/case-study/1200/600' },
    featuredImageAlt: { type: 'text', label: 'Image Alt Text', defaultValue: 'Proje Görseli' },
    downloadPdfUrl: { type: 'text', label: 'PDF Download URL', defaultValue: '/case-study.pdf' },
    contactUrl: { type: 'text', label: 'Contact URL', defaultValue: '/contact' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '6rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // Timeline Blocks
  'timeline-horizontal': {
    title: { type: 'text', label: 'Title', defaultValue: 'Kurumsal Tarihçemiz' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Yıllara Göre Gelişimimiz' },
    showConnectors: { type: 'checkbox', label: 'Show Connector Lines', defaultValue: true },
    compactMode: { type: 'checkbox', label: 'Compact Mode', defaultValue: false },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'timeline-vertical': {
    title: { type: 'text', label: 'Title', defaultValue: 'Timeline' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: '' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // Carousel Blocks
  'testimonial-carousel': {
    title: { type: 'text', label: 'Title', defaultValue: 'Müşterilerimiz Ne Diyor' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Başarı Hikayeleri' },
    autoPlay: { type: 'checkbox', label: 'Auto-Play', defaultValue: false },
    autoPlayInterval: { type: 'number', label: 'Auto-Play Interval (ms)', defaultValue: 5000 },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'carousel-gallery': {
    title: { type: 'text', label: 'Title', defaultValue: '' },
    aspectRatio: { type: 'select', label: 'Aspect Ratio', defaultValue: 'video', options: ['video', 'square', 'portrait'] },
    showThumbnails: { type: 'checkbox', label: 'Show Thumbnails', defaultValue: true },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // Organization Blocks
  'client-logo-grid': {
    title: { type: 'text', label: 'Title', defaultValue: 'Güvenilen Markalar' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Dünya çapında lider şirketlerle çalışıyoruz' },
    columns: { type: 'select', label: 'Columns', defaultValue: 5, options: [3, 4, 5, 6] },
    grayscaleDefault: { type: 'checkbox', label: 'Grayscale by Default', defaultValue: true },
    hoverEffect: { type: 'checkbox', label: 'Hover Effect', defaultValue: true },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },

  // Tab Blocks
  'feature-tabs': {
    title: { type: 'text', label: 'Title', defaultValue: 'Özellikler' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Güçlü Araçlar, Tek Platformda' },
    defaultTab: { type: 'text', label: 'Default Tab ID', defaultValue: '' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'category-tabs': {
    title: { type: 'text', label: 'Title', defaultValue: 'Blog' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Son Yazılar ve Haberler' },
    defaultCategory: { type: 'text', label: 'Default Category ID', defaultValue: '' },
    showAllTab: { type: 'checkbox', label: 'Show All Tab', defaultValue: true },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
};

// Phase 3 Sprint 1 configurations
const phase3Sprint1Config: Record<string, BlockPropertySchema> = {
  'hero-minimal': {
    title: { type: 'text', label: 'Title', defaultValue: 'Clean & Simple' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Minimal Design' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Focus on what matters most. No distractions, just pure content.' },
    primaryButtonText: { type: 'text', label: 'Primary Button Text', defaultValue: 'Get Started' },
    primaryButtonUrl: { type: 'text', label: 'Primary Button URL', defaultValue: '#' },
    secondaryButtonText: { type: 'text', label: 'Secondary Button Text', defaultValue: '' },
    secondaryButtonUrl: { type: 'text', label: 'Secondary Button URL', defaultValue: '#' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '8rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '8rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'hero-campaign': {
    badge: { type: 'text', label: 'Badge Text', defaultValue: '🎉 Özel Kampanya' },
    title: { type: 'text', label: 'Title', defaultValue: 'Sınırlı Süreli Teklif' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: '%50 İndirim' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'İlk 100 müşteriye özel fırsat. Bu fırsatı kaçırmayın!' },
    imageUrl: { type: 'image', label: 'Image URL', defaultValue: '' },
    videoUrl: { type: 'text', label: 'Video URL (optional)', defaultValue: '' },
    primaryButtonText: { type: 'text', label: 'Primary Button Text', defaultValue: 'Hemen Katıl' },
    primaryButtonUrl: { type: 'text', label: 'Primary Button URL', defaultValue: '#' },
    secondaryButtonText: { type: 'text', label: 'Secondary Button Text', defaultValue: 'Detayları Gör' },
    secondaryButtonUrl: { type: 'text', label: 'Secondary Button URL', defaultValue: '#' },
    urgencyText: { type: 'text', label: 'Urgency Text', defaultValue: 'Kampanya 2 gün içinde sona eriyor!' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '6rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '6rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'hero-split-content': {
    title: { type: 'text', label: 'Title', defaultValue: 'Build Better Products' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Product Development' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Everything you need to create amazing products.' },
    imageUrl: { type: 'image', label: 'Image URL', defaultValue: 'https://picsum.photos/seed/split-hero/800/800' },
    imagePosition: { type: 'select', label: 'Image Position', options: ['left', 'right'], defaultValue: 'right' },
    primaryButtonText: { type: 'text', label: 'Primary Button Text', defaultValue: 'Get Started' },
    primaryButtonUrl: { type: 'text', label: 'Primary Button URL', defaultValue: '#' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '6rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '6rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'stats-metrics-grid': {
    title: { type: 'text', label: 'Title', defaultValue: '' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: '' },
    columns: { type: 'select', label: 'Columns', options: ['2', '3', '4', '5', '6'], defaultValue: '4' },
    showIcons: { type: 'checkbox', label: 'Show Icons', defaultValue: true },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'content-text-image-split': {
    title: { type: 'text', label: 'Title', defaultValue: 'Why Choose Us' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Our Strengths' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'We provide comprehensive solutions tailored to your business needs.' },
    imageUrl: { type: 'image', label: 'Image URL', defaultValue: 'https://picsum.photos/seed/content-split/800/600' },
    imagePosition: { type: 'select', label: 'Image Position', options: ['left', 'right'], defaultValue: 'right' },
    buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Learn More' },
    buttonUrl: { type: 'text', label: 'Button URL', defaultValue: '#' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'pricing-comparison-table': {
    title: { type: 'text', label: 'Title', defaultValue: 'Simple, Transparent Pricing' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Choose the plan that fits your needs' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'feature-showcase-grid': {
    title: { type: 'text', label: 'Title', defaultValue: '' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: '' },
    columns: { type: 'select', label: 'Columns', options: ['2', '3', '4'], defaultValue: '3' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'blog-post-grid': {
    title: { type: 'text', label: 'Title', defaultValue: '' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: '' },
    columns: { type: 'select', label: 'Columns', options: ['2', '3'], defaultValue: '3' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'team-member-grid': {
    title: { type: 'text', label: 'Title', defaultValue: '' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: '' },
    columns: { type: 'select', label: 'Columns', options: ['2', '3', '4'], defaultValue: '3' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'contact-form-section': {
    title: { type: 'text', label: 'Title', defaultValue: 'Get in Touch' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Contact Us' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Have a question? We\'d love to hear from you.' },
    showMap: { type: 'checkbox', label: 'Show Map', defaultValue: false },
    mapEmbedUrl: { type: 'text', label: 'Map Embed URL', defaultValue: '' },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
};

// All block configurations - EXPORT WILL BE ADDED AFTER ALL CONFIG DEFINITIONS
// Temporary marker - configs will be merged after all definitions

// ===== PHASE 3 SPRINT 2 BLOCK CONFIGURATIONS =====

const phase3Sprint2Config: Record<string, BlockPropertySchema> = {
  'accordion-faq': {
    title: { type: 'text', label: 'Title', defaultValue: 'Sık Sorulan Sorular' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'SSS' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Merak ettiğiniz her şey burada. Sorunuza cevap bulamadıysanız bizimle iletişime geçin.' },
    faqs: { type: 'array', label: 'FAQ Items', defaultValue: [] },
    showSearch: { type: 'checkbox', label: 'Show Search', defaultValue: true },
    showCategories: { type: 'checkbox', label: 'Show Categories', defaultValue: true },
    defaultOpenIndex: { type: 'text', label: 'Default Open Index (-1 for none)', defaultValue: '-1' },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'video-embed-section': {
    title: { type: 'text', label: 'Title', defaultValue: 'Ürün Tanıtım Videosu' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'İzle & Öğren' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Ürünümüzün nasıl çalıştığını ve size nasıl fayda sağlayabileceğini keşfedin.' },
    videoProvider: { type: 'select', label: 'Video Provider', defaultValue: 'youtube', options: ['youtube', 'vimeo', 'custom'] },
    videoUrl: { type: 'text', label: 'Video URL', defaultValue: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    thumbnailUrl: { type: 'image', label: 'Thumbnail URL (optional)', defaultValue: '' },
    aspectRatio: { type: 'select', label: 'Aspect Ratio', defaultValue: '16/9', options: ['16/9', '4/3', '1/1'] },
    autoplay: { type: 'checkbox', label: 'Autoplay', defaultValue: false },
    showControls: { type: 'checkbox', label: 'Show Controls', defaultValue: true },
    layout: { type: 'select', label: 'Layout', defaultValue: 'centered', options: ['full-width', 'centered', 'split-left', 'split-right'] },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'cta-banner': {
    title: { type: 'text', label: 'Title', defaultValue: 'Hemen Başlayın' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Bugün kaydolun ve işinizi bir üst seviyeye taşıyın. 14 gün ücretsiz deneme, kredi kartı gerekmez.' },
    variant: { type: 'select', label: 'Variant', defaultValue: 'gradient', options: ['solid', 'gradient', 'outline', 'minimal'] },
    primaryButtonText: { type: 'text', label: 'Primary Button Text', defaultValue: 'Ücretsiz Deneyin' },
    primaryButtonUrl: { type: 'text', label: 'Primary Button URL', defaultValue: '#' },
    secondaryButtonText: { type: 'text', label: 'Secondary Button Text', defaultValue: 'Daha Fazla Bilgi' },
    secondaryButtonUrl: { type: 'text', label: 'Secondary Button URL', defaultValue: '#' },
    showIcon: { type: 'checkbox', label: 'Show Icon', defaultValue: true },
    features: { type: 'array', label: 'Features', defaultValue: [] },
    imageUrl: { type: 'image', label: 'Image URL (optional)', defaultValue: '' },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: '' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'process-steps': {
    title: { type: 'text', label: 'Title', defaultValue: 'Nasıl Çalışır?' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Süreç' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Başlamak için basit 4 adımı takip edin.' },
    steps: { type: 'array', label: 'Steps', defaultValue: [] },
    layout: { type: 'select', label: 'Layout', defaultValue: 'horizontal', options: ['horizontal', 'vertical', 'grid'] },
    showConnectors: { type: 'checkbox', label: 'Show Connectors', defaultValue: true },
    highlightColor: { type: 'color', label: 'Highlight Color', defaultValue: '#ff7f1e' },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'logo-cloud': {
    title: { type: 'text', label: 'Title', defaultValue: 'Güvenilir Markalar' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Dünya çapında lider şirketlerle çalışıyoruz' },
    logos: { type: 'array', label: 'Logos', defaultValue: [] },
    layout: { type: 'select', label: 'Layout', defaultValue: 'grid', options: ['grid', 'marquee', 'centered'] },
    columns: { type: 'select', label: 'Columns', defaultValue: '5', options: ['3', '4', '5', '6'] },
    grayscaleDefault: { type: 'checkbox', label: 'Grayscale Default', defaultValue: true },
    hoverEffect: { type: 'checkbox', label: 'Hover Effect', defaultValue: true },
    marqueeSpeed: { type: 'select', label: 'Marquee Speed', defaultValue: 'normal', options: ['slow', 'normal', 'fast'] },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'newsletter-signup': {
    title: { type: 'text', label: 'Title', defaultValue: 'Bültenimize Abone Olun' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Güncel Kalın' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'En son haberler, güncellemeler ve özel teklifler için e-posta listemize katılın.' },
    variant: { type: 'select', label: 'Variant', defaultValue: 'card', options: ['minimal', 'card', 'full-width', 'inline'] },
    placeholder: { type: 'text', label: 'Placeholder', defaultValue: 'E-posta adresiniz' },
    buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Abone Ol' },
    showConsent: { type: 'checkbox', label: 'Show Consent', defaultValue: true },
    consentText: { type: 'text', label: 'Consent Text', defaultValue: 'E-posta almayı ve gizlilik politikasını kabul ediyorum.' },
    successMessage: { type: 'text', label: 'Success Message', defaultValue: 'Teşekkürler! Aboneliğiniz başarıyla oluşturuldu.' },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'social-proof-stats': {
    title: { type: 'text', label: 'Title', defaultValue: '' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Rakamlarla Başarımız' },
    stats: { type: 'array', label: 'Stats', defaultValue: [] },
    layout: { type: 'select', label: 'Layout', defaultValue: 'horizontal', options: ['horizontal', 'grid'] },
    showIcons: { type: 'checkbox', label: 'Show Icons', defaultValue: true },
    animateOnScroll: { type: 'checkbox', label: 'Animate On Scroll', defaultValue: true },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'content-tabs': {
    title: { type: 'text', label: 'Title', defaultValue: 'Keşfedin' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Özellikler' },
    tabs: { type: 'array', label: 'Tabs', defaultValue: [] },
    defaultTab: { type: 'text', label: 'Default Tab', defaultValue: '' },
    tabsPosition: { type: 'select', label: 'Tabs Position', defaultValue: 'top', options: ['top', 'left'] },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'image-text-overlap': {
    title: { type: 'text', label: 'Title', defaultValue: 'Yenilikçi Çözümler' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'İnovasyon' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Modern ve etkili çözümlerle işinizi bir adım öteye taşıyoruz.' },
    features: { type: 'array', label: 'Features', defaultValue: [] },
    imageUrl: { type: 'image', label: 'Image URL', defaultValue: 'https://picsum.photos/seed/overlap/800/1000' },
    overlapPosition: { type: 'select', label: 'Overlap Position', defaultValue: 'right', options: ['left', 'right', 'top', 'bottom'] },
    cardBackgroundColor: { type: 'color', label: 'Card Background Color', defaultValue: '#ffffff' },
    buttonText: { type: 'text', label: 'Button Text', defaultValue: 'Daha Fazla Bilgi' },
    buttonUrl: { type: 'text', label: 'Button URL', defaultValue: '#' },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '6rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '6rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'split-feature-highlight': {
    title: { type: 'text', label: 'Title', defaultValue: 'Güçlü Özellikler' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Neler Sunuyoruz' },
    highlights: { type: 'array', label: 'Highlights', defaultValue: [] },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
};

// ===== PHASE 3 SPRINT 3 BLOCK CONFIGURATIONS =====

const phase3Sprint3Config: Record<string, BlockPropertySchema> = {
  'comparison-table': {
    title: { type: 'text', label: 'Title', defaultValue: 'Planları Karşılaştırın' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Fiyatlandırma' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Size en uygun planı seçin ve hemen başlayın.' },
    featureRows: { type: 'array', label: 'Feature Rows', defaultValue: [] },
    columns: { type: 'array', label: 'Columns', defaultValue: [] },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'faq-grid': {
    title: { type: 'text', label: 'Title', defaultValue: 'Sık Sorulan Sorular' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'SSS' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'En sık sorulan sorulara hızlıca göz atın.' },
    faqs: { type: 'array', label: 'FAQ Items', defaultValue: [] },
    columns: { type: 'select', label: 'Columns', options: ['1', '2', '3'], defaultValue: '2' },
    showIcons: { type: 'checkbox', label: 'Show Icons', defaultValue: true },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'feature-comparison': {
    title: { type: 'text', label: 'Title', defaultValue: 'Neden Biz?' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Karşılaştırma' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Rakiplerimizle karşılaştırıldığında sunduğumuz avantajları görün.' },
    leftSide: { type: 'object', label: 'Left Side', defaultValue: {} },
    rightSide: { type: 'object', label: 'Right Side', defaultValue: {} },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'icon-grid': {
    title: { type: 'text', label: 'Title', defaultValue: 'Neden Bizi Seçmelisiniz?' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Avantajlarımız' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Modern iş dünyasının ihtiyaçlarına özel çözümler sunuyoruz.' },
    items: { type: 'array', label: 'Items', defaultValue: [] },
    columns: { type: 'select', label: 'Columns', options: ['2', '3', '4', '6'], defaultValue: '3' },
    iconSize: { type: 'select', label: 'Icon Size', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
    variant: { type: 'select', label: 'Variant', options: ['simple', 'card', 'bordered'], defaultValue: 'simple' },
    showNumbers: { type: 'checkbox', label: 'Show Numbers', defaultValue: false },
    numberStyle: { type: 'select', label: 'Number Style', options: ['circle', 'square', 'plain'], defaultValue: 'circle' },
    numberColor: { type: 'color', label: 'Number Color', defaultValue: '#ff7f1e' },
    startNumber: { type: 'number', label: 'Start Number', defaultValue: 1 },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'metric-cards': {
    title: { type: 'text', label: 'Title', defaultValue: '' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Performans Göstergeleri' },
    cards: { type: 'array', label: 'Cards', defaultValue: [] },
    columns: { type: 'select', label: 'Columns', options: ['2', '3', '4'], defaultValue: '4' },
    showIcons: { type: 'checkbox', label: 'Show Icons', defaultValue: true },
    showTrends: { type: 'checkbox', label: 'Show Trends', defaultValue: true },
    // Style properties
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    headlineColor: { type: 'color', label: 'Headline Color', defaultValue: 'inherit' },
    fontSize: { type: 'select', label: 'Font Size', options: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'], defaultValue: 'text-base' },
    fontWeight: { type: 'select', label: 'Font Weight', options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'], defaultValue: 'font-normal' },
    borderRadius: { type: 'select', label: 'Border Radius', options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'], defaultValue: 'rounded' },
    shadow: { type: 'select', label: 'Shadow', options: ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'], defaultValue: 'shadow-none' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '4rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '4rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'partner-showcase': {
    title: { type: 'text', label: 'Title', defaultValue: 'Güvenilir Ortaklarımız' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Ortaklar' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Dünya çapında lider şirketlerle birlikte çalışıyoruz.' },
    partners: { type: 'array', label: 'Partners', defaultValue: [] },
    layout: { type: 'select', label: 'Layout', options: ['grid', 'featured', 'carousel'], defaultValue: 'grid' },
    showQuotes: { type: 'checkbox', label: 'Show Quotes', defaultValue: true },
    showStats: { type: 'checkbox', label: 'Show Stats', defaultValue: true },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'quote-callout': {
    quote: { type: 'textarea', label: 'Quote', defaultValue: 'Bu platform sayesinde işimizi dönüştürdük. Müşteri memnuniyeti %40 arttı, operasyonel maliyetlerimiz yarı yarıya azaldı.' },
    author: { type: 'text', label: 'Author', defaultValue: 'Mehmet Öztürk' },
    authorTitle: { type: 'text', label: 'Author Title', defaultValue: 'CEO & Kurucu' },
    authorImage: { type: 'image', label: 'Author Image', defaultValue: 'https://i.pravatar.cc/150?img=33' },
    companyLogo: { type: 'image', label: 'Company Logo', defaultValue: '' },
    variant: { type: 'select', label: 'Variant', options: ['centered', 'split', 'minimal', 'boxed'], defaultValue: 'centered' },
    size: { type: 'select', label: 'Size', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
    accentColor: { type: 'color', label: 'Accent Color', defaultValue: '#ff7f1e' },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'service-grid': {
    title: { type: 'text', label: 'Title', defaultValue: 'Hizmetlerimiz' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Çözümlerimiz' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'İşinizi büyütmek için kapsamlı hizmet portföyümüzü keşfedin.' },
    services: { type: 'array', label: 'Services', defaultValue: [] },
    columns: { type: 'select', label: 'Columns', options: ['2', '3', '4'], defaultValue: '3' },
    showIcons: { type: 'checkbox', label: 'Show Icons', defaultValue: true },
    cardStyle: { type: 'select', label: 'Card Style', options: ['default', 'bordered', 'elevated', 'minimal'], defaultValue: 'default' },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'text-columns': {
    title: { type: 'text', label: 'Title', defaultValue: '' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Bilgi' },
    description: { type: 'textarea', label: 'Description', defaultValue: '' },
    columns: { type: 'array', label: 'Columns', defaultValue: [] },
    columnCount: { type: 'select', label: 'Column Count', options: ['2', '3', '4'], defaultValue: '3' },
    showDividers: { type: 'checkbox', label: 'Show Dividers', defaultValue: false },
    alignText: { type: 'select', label: 'Text Alignment', options: ['left', 'center', 'justify'], defaultValue: 'left' },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
  'workflow-tabs': {
    title: { type: 'text', label: 'Title', defaultValue: 'İş Akışı' },
    subtitle: { type: 'text', label: 'Subtitle', defaultValue: 'Süreç' },
    description: { type: 'textarea', label: 'Description', defaultValue: 'Proje yaşam döngüsünün tüm aşamalarını keşfedin.' },
    mainTabs: {
      type: 'array',
      label: 'Main Tabs',
      defaultValue: [],
      itemSchema: {
        id: { type: 'text', label: 'Tab ID', defaultValue: '' },
        icon: { type: 'text', label: 'Icon (emoji)', defaultValue: '📋' },
        label: { type: 'text', label: 'Label', defaultValue: 'Tab Label' },
        subTabs: {
          type: 'array',
          label: 'Sub Tabs',
          defaultValue: [],
          itemSchema: {
            id: { type: 'text', label: 'Sub Tab ID', defaultValue: '' },
            label: { type: 'text', label: 'Label', defaultValue: 'Sub Tab Label' },
            title: { type: 'text', label: 'Title', defaultValue: 'Sub Tab Title' },
            description: { type: 'textarea', label: 'Description', defaultValue: '' },
            mediaType: {
              type: 'select',
              label: 'Media Type',
              options: ['none', 'image', 'video', 'youtube'],
              defaultValue: 'none'
            },
            mediaUrl: { type: 'text', label: 'Media URL (Upload/Direct URL/YouTube Link)', defaultValue: '' },
            icon: { type: 'text', label: 'Icon (emoji) - Legacy', defaultValue: '📄' },
          }
        }
      }
    },
    enableScroll: { type: 'checkbox', label: 'Enable Horizontal Scroll', defaultValue: true },
    defaultMainTab: { type: 'text', label: 'Default Main Tab ID', defaultValue: '' },
    defaultSubTab: { type: 'text', label: 'Default Sub Tab ID', defaultValue: '' },
    accentColor: { type: 'select', label: 'Accent Color', options: ['primary', 'success', 'warning', 'error'], defaultValue: 'primary' },
    tabVariant: { type: 'select', label: 'Tab Variant', options: ['solid', 'outlined', 'minimal'], defaultValue: 'outlined' },
    backgroundColor: { type: 'color', label: 'Background Color', defaultValue: 'transparent' },
    textColor: { type: 'color', label: 'Text Color', defaultValue: 'inherit' },
    paddingTop: { type: 'text', label: 'Padding Top', defaultValue: '5rem' },
    paddingBottom: { type: 'text', label: 'Padding Bottom', defaultValue: '5rem' },
    cssClasses: { type: 'text', label: 'CSS Classes', defaultValue: '' },
  },
};

// ===== ALL BLOCK CONFIGURATIONS EXPORT =====
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
  ...migrationBlocksConfig,
  ...templateDesignBlocksConfig,
  ...phase3Sprint1Config,
  ...phase3Sprint2Config,
  ...phase3Sprint3Config,
};

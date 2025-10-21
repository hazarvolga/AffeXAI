"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allBlockConfigs = exports.progressBlocksConfig = exports.ratingBlocksConfig = exports.pricingBlocksConfig = exports.statsBlocksConfig = exports.featuresBlocksConfig = exports.testimonialsBlocksConfig = exports.socialSharingBlocksConfig = exports.blogRssBlocksConfig = exports.footerBlocksConfig = exports.galleryBlocksConfig = exports.ecommerceBlocksConfig = exports.specialBlocksConfig = exports.elementBlocksConfig = exports.contentBlocksConfig = exports.heroBlocksConfig = exports.navigationBlocksConfig = void 0;
// Common logo properties for navigation blocks
const logoProperties = {
    logoMediaId: { type: 'text', label: 'Logo Media ID', defaultValue: null },
    logoType: {
        type: 'select',
        label: 'Logo Type',
        options: ['text', 'image'],
        defaultValue: 'text'
    },
    logoText: { type: 'text', label: 'Logo Text', defaultValue: 'Company' },
    logoUrl: { type: 'image', label: 'Logo Image URL', defaultValue: '' },
    logoAlt: { type: 'text', label: 'Logo Alt Text', defaultValue: 'Company Logo' },
    logoWidth: { type: 'number', label: 'Logo Width (px)', defaultValue: 120 },
    logoHeight: { type: 'number', label: 'Logo Height (px)', defaultValue: 40 },
};
// Helper function to create button properties with a prefix
const createButtonProperties = (prefix = '') => {
    const p = prefix ? `${prefix}B` : 'b'; // primaryButtonUrl vs buttonUrl
    const label = prefix ? `${prefix} Button` : 'Button';
    return {
        [`${prefix ? prefix.toLowerCase() : ''}ButtonText`]: {
            type: 'text',
            label: `${label} Text`,
            defaultValue: 'Click Here'
        },
        [`${prefix ? prefix.toLowerCase() : ''}ButtonUrl`]: {
            type: 'text',
            label: `${label} URL`,
            defaultValue: '#'
        },
        [`${prefix ? prefix.toLowerCase() : ''}ButtonTarget`]: {
            type: 'select',
            label: `${label} Target`,
            options: ['_self', '_blank'],
            defaultValue: '_self'
        },
    };
};
// Helper function to create text style properties (typography)
const createTextStyleProperties = (prefix, defaultVariant = 'body', defaultAlign = 'left', defaultColor = 'primary', defaultWeight = 'normal') => {
    const label = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    return {
        [`${prefix}Variant`]: {
            type: 'select',
            label: `${label} Size`,
            options: ['heading1', 'heading2', 'heading3', 'body', 'caption'],
            defaultValue: defaultVariant
        },
        [`${prefix}Align`]: {
            type: 'select',
            label: `${label} Alignment`,
            options: ['left', 'center', 'right', 'justify'],
            defaultValue: defaultAlign
        },
        [`${prefix}Color`]: {
            type: 'select',
            label: `${label} Color`,
            options: ['primary', 'secondary', 'muted', 'success', 'warning', 'error'],
            defaultValue: defaultColor
        },
        [`${prefix}Weight`]: {
            type: 'select',
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
const createColorProperty = (label, defaultValue = '{color.background}', allowCustom = true) => ({
    type: 'color',
    label,
    defaultValue,
    tokenReference: {
        category: 'color',
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
const createSpacingProperty = (label, defaultValue = '{spacing.md}', allowCustom = true) => ({
    type: 'text',
    label,
    defaultValue,
    tokenReference: {
        category: 'spacing',
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
const createTypographyProperty = (label, defaultValue = '{typography.body}') => ({
    type: 'token',
    label,
    defaultValue,
    tokenReference: {
        category: 'typography',
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
exports.navigationBlocksConfig = {
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
exports.heroBlocksConfig = {
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
exports.contentBlocksConfig = {
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
exports.elementBlocksConfig = {
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
exports.specialBlocksConfig = {
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
exports.ecommerceBlocksConfig = {
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
exports.galleryBlocksConfig = {
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
exports.footerBlocksConfig = {
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
exports.blogRssBlocksConfig = {
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
exports.socialSharingBlocksConfig = {
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
exports.testimonialsBlocksConfig = {
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
exports.featuresBlocksConfig = {
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
exports.statsBlocksConfig = {
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
exports.pricingBlocksConfig = {
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
exports.ratingBlocksConfig = {
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
exports.progressBlocksConfig = {
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
// All block configurations
exports.allBlockConfigs = {
    ...exports.navigationBlocksConfig,
    ...exports.heroBlocksConfig,
    ...exports.contentBlocksConfig,
    ...exports.elementBlocksConfig,
    ...exports.specialBlocksConfig,
    ...exports.ecommerceBlocksConfig,
    ...exports.galleryBlocksConfig,
    ...exports.footerBlocksConfig,
    ...exports.blogRssBlocksConfig,
    ...exports.socialSharingBlocksConfig,
    ...exports.testimonialsBlocksConfig,
    ...exports.featuresBlocksConfig,
    ...exports.statsBlocksConfig,
    ...exports.pricingBlocksConfig,
    ...exports.ratingBlocksConfig,
    ...exports.progressBlocksConfig,
};
//# sourceMappingURL=block-configs.js.map
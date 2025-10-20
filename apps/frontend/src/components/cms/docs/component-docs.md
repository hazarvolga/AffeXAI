# CMS Component Documentation

## Overview

This documentation provides comprehensive information about the CMS components and blocks available in the visual editor. Each component is designed to be reusable, customizable, and accessible.

## Basic Components

### Text Component

The Text component allows you to add headings, paragraphs, and other text content to your pages.

**Props:**
- `content` (string): The text content to display
- `variant` ('heading1' | 'heading2' | 'heading3' | 'body' | 'caption'): Text style variant
- `align` ('left' | 'center' | 'right' | 'justify'): Text alignment
- `color` ('primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error'): Text color
- `weight` ('normal' | 'medium' | 'semibold' | 'bold'): Font weight
- `italic` (boolean): Whether to italicize text
- `underline` (boolean): Whether to underline text
- `strikethrough` (boolean): Whether to strikethrough text

### Button Component

The Button component allows you to add interactive buttons for actions or navigation.

**Props:**
- `text` (string): Button text
- `href` (string): Link URL (optional)
- `variant` ('default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'): Button style variant
- `size` ('sm' | 'default' | 'lg'): Button size
- `disabled` (boolean): Whether the button is disabled

### Image Component

The Image component allows you to add images with captions and various styling options.

**Props:**
- `src` (string): Image URL
- `alt` (string): Alt text for accessibility
- `caption` (string): Image caption (optional)
- `width` (number | string): Image width
- `height` (number | string): Image height
- `fit` ('cover' | 'contain' | 'fill' | 'none'): Image fit behavior
- `position` ('center' | 'top' | 'bottom' | 'left' | 'right'): Image position
- `rounded` ('none' | 'sm' | 'md' | 'lg' | 'full'): Border radius
- `shadow` ('none' | 'sm' | 'md' | 'lg'): Shadow effect
- `border` (boolean): Whether to show border
- `borderColor` ('default' | 'primary' | 'secondary'): Border color
- `lazy` (boolean): Whether to lazy load the image

### Container Component

The Container component groups other components together with layout options.

**Props:**
- `padding` ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'): Padding size
- `background` ('none' | 'primary' | 'secondary' | 'muted'): Background color

### Card Component

The Card component provides a content card with consistent styling.

**Props:**
- `padding` ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'): Padding size
- `rounded` ('none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'): Border radius

### Grid Component

The Grid component provides a responsive grid layout for organizing content.

**Props:**
- `columns` (number): Number of columns (1-6)
- `gap` ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'): Gap between items

## Block Categories

### Navigation Blocks

Pre-built navigation components for site menus and breadcrumbs.

### Hero Blocks

Eye-catching hero sections for page headers and promotions.

### Content Blocks

Various content section layouts for articles, features, and descriptions.

### Footer Blocks

Pre-built footer components for site information and links.

### Element Blocks

Individual UI elements like counters, testimonials, and call-to-actions.

### Content Variant Blocks

Different content presentation styles for varied layouts.

### Special Blocks

Interactive and specialized components like countdown timers and pricing tables.

### E-commerce Blocks

Product and shopping components for online stores.

### Gallery Blocks

Image and media展示 components for portfolios and showcases.

### Blog & RSS Blocks

Content and news展示 components for articles and updates.

### Social & Sharing Blocks

Social media and sharing components for engagement.

## Layout Options

### Visibility Controls
- Show/Hide Header
- Show/Hide Footer
- Show/Hide Page Title

### Display Options
- Full Width Layout
- Background Color Selection

## Editor Features

### Inline Editing
Directly edit text content by double-clicking on text components.

### Media Replacement
Replace images directly through the media library without changing component structure.

### Component Locking
Lock components to prevent accidental edits.

### History Management
Undo/Redo functionality with detailed action history.

### Template System
Save and load page templates for consistent layouts.

### Debug Panel
Inspect page data, components, and layout options for troubleshooting.

## Keyboard Shortcuts

- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Shift + Z`: Redo
- `Delete`: Delete selected component
- `Ctrl/Cmd + D`: Duplicate selected component
- `Ctrl/Cmd + L`: Lock/Unlock selected component
- `Ctrl/Cmd + Shift + ↑`: Move component up
- `Ctrl/Cmd + Shift + ↓`: Move component down
- `Ctrl/Cmd + P`: Toggle preview mode

## Accessibility Features

- Keyboard navigation support
- Screen reader compatibility
- Reduced motion support
- Proper color contrast ratios
- ARIA labels and roles

## Performance Optimizations

- Component memoization
- Virtualization for large component trees
- Code splitting for block components
- Bundle optimization with tree-shaking
- Lazy loading for media assets

## Extensibility

### Adding New Components
1. Create a new component file in `/components/cms/`
2. Register the component in `/components/cms/component-registry.ts`
3. Add default props to `/components/cms/component-factory.ts`
4. Update the ComponentLibrary if it's a basic component

### Creating Custom Blocks
1. Create a new block component in `/components/cms/blocks/`
2. Add block configuration to the appropriate category file
3. Register the block in `/components/cms/component-registry.ts`

### Theme Customization
Modify theme settings in `/components/cms/component-registry.ts` to change:
- Color schemes
- Spacing scales
- Border radius options
- Shadow effects

## Troubleshooting

### Common Issues

1. **Component not rendering**: Check that all required props are provided and valid
2. **Layout issues**: Verify container and grid configurations
3. **Media not loading**: Ensure image URLs are accessible and properly formatted
4. **Performance problems**: Use the debug panel to identify large component trees

### Debugging Tools

- Use the Debug Panel to inspect component data
- Check browser console for error messages
- Validate JSON exports for template issues
- Test with different screen sizes for responsive issues
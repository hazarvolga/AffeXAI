# Aluplan CMS Design System

## Overview
This document outlines the design system for the Aluplan CMS, built with Tailwind CSS and Shadcn/UI components. The system provides a consistent, scalable approach to UI development.

## Design Tokens

### Colors
The color palette is based on the existing brand colors with extended semantic colors:

- **Primary**: Orange-based palette (matching existing brand)
- **Neutral**: Grayscale for text and backgrounds
- **Semantic**: Success (green), Warning (yellow), Error (red)

### Typography
Using the Inter font family with a comprehensive scale:
- Headings: H1 (3rem) to H3 (1.5rem)
- Body: 1rem (16px) as base
- Captions: 0.875rem (14px)

### Spacing
Based on an 8px grid system:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

### Border Radius
Consistent rounded corners:
- none: 0px
- sm: 2px
- DEFAULT: 4px
- md: 6px
- lg: 8px
- xl: 12px
- 2xl: 16px
- 3xl: 24px
- full: 9999px

## Component Library

### Core Components
1. **Text Component**
   - Variants: heading1, heading2, heading3, body, caption
   - Alignment: left, center, right, justify

2. **Button Component**
   - Variants: default, destructive, outline, secondary, ghost, link
   - Sizes: sm, default, lg

3. **Image Component**
   - Object fit options: cover, contain, fill, none
   - Positioning: center, top, bottom, left, right
   - Caption support

4. **Container Component**
   - Padding options: none, sm, md, lg, xl
   - Margin options: none, sm, md, lg, xl
   - Background options: none, primary, secondary, muted
   - Rounded corners and shadow options

### Page Renderer
A flexible component that can render any combination of the above components based on a data structure, enabling dynamic page creation.

## Implementation Guidelines

### Consistency
- Always use design tokens instead of hardcoded values
- Follow the established component patterns
- Maintain proper spacing and alignment

### Responsiveness
- All components are mobile-first
- Use Tailwind's responsive prefixes when needed
- Test on multiple screen sizes

### Accessibility
- Proper semantic HTML
- Sufficient color contrast
- Keyboard navigation support

## Future Enhancements
- Component configuration forms
- Drag-and-drop functionality
- Additional component types (cards, lists, forms)
- Advanced styling options
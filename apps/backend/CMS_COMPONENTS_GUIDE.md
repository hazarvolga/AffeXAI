# CMS Components Usage Guide

## Overview
This guide provides instructions on how to use the CMS components effectively in your pages. All components are designed to be responsive, accessible, and consistent with the Aluplan design system.

## Core Components

### Text Component
The Text component is used for all textual content on the page.

**Props:**
- `id` (string, required): Unique identifier for the component
- `content` (string, required): The text content to display
- `variant` ('heading1' | 'heading2' | 'heading3' | 'body' | 'caption'): Text style variant
- `align` ('left' | 'center' | 'right' | 'justify'): Text alignment
- `color` ('primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error'): Text color
- `weight` ('normal' | 'medium' | 'semibold' | 'bold'): Font weight
- `italic` (boolean): Apply italic styling
- `underline` (boolean): Apply underline styling
- `strikethrough` (boolean): Apply strikethrough styling

**Example:**
```jsx
<TextComponent
  id="welcome-heading"
  content="Welcome to Aluplan"
  variant="heading1"
  align="center"
  color="primary"
  weight="bold"
/>
```

### Button Component
The Button component is used for actions and navigation.

**Props:**
- `id` (string, required): Unique identifier for the component
- `text` (string, required): Button label text
- `href` (string, optional): URL for link buttons
- `variant` ('default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'): Button style variant
- `size` ('default' | 'sm' | 'lg'): Button size
- `disabled` (boolean): Disable the button
- `onClick` (function): Click handler
- `icon` (ReactNode): Icon to display with the button
- `iconPosition` ('left' | 'right'): Position of the icon
- `fullWidth` (boolean): Make button full width
- `borderRadius` ('none' | 'sm' | 'md' | 'lg' | 'full'): Button border radius

**Example:**
```jsx
<ButtonComponent
  id="cta-button"
  text="Get Started"
  variant="default"
  size="lg"
  fullWidth={true}
  onClick={() => console.log('Button clicked')}
/>
```

### Image Component
The Image component is used for displaying images with captions.

**Props:**
- `id` (string, required): Unique identifier for the component
- `src` (string, required): Image source URL
- `alt` (string, required): Alternative text for accessibility
- `width` (number | string): Image width
- `height` (number | string): Image height
- `fit` ('cover' | 'contain' | 'fill' | 'none'): Object fit property
- `position` ('center' | 'top' | 'bottom' | 'left' | 'right'): Object position
- `caption` (string): Image caption
- `rounded` ('none' | 'sm' | 'md' | 'lg' | 'full'): Border radius
- `shadow` ('none' | 'sm' | 'md' | 'lg'): Shadow effect
- `border` (boolean): Show border
- `borderColor` ('default' | 'primary' | 'secondary'): Border color
- `lazy` (boolean): Enable lazy loading

**Example:**
```jsx
<ImageComponent
  id="hero-image"
  src="/images/hero.jpg"
  alt="Construction project"
  width="100%"
  height="400px"
  fit="cover"
  rounded="lg"
  shadow="md"
  caption="Our latest construction project"
/>
```

### Container Component
The Container component is used for layout and grouping other components.

**Props:**
- `id` (string, required): Unique identifier for the component
- `children` (ReactNode, required): Child components
- `padding` ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'): Padding size
- `margin` ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'): Margin size
- `background` ('none' | 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error'): Background color
- `rounded` ('none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'): Border radius
- `shadow` ('none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner'): Shadow effect
- `border` (boolean): Show border
- `borderColor` ('default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'): Border color
- `maxWidth` ('none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full' | 'min' | 'max'): Maximum width
- `height` ('auto' | 'full' | 'screen' | 'min' | 'max'): Height
- `flex` (boolean): Enable flexbox
- `flexDirection` ('row' | 'col' | 'row-reverse' | 'col-reverse'): Flex direction
- `alignItems` ('start' | 'center' | 'end' | 'stretch' | 'baseline'): Align items
- `justifyContent` ('start' | 'center' | 'end' | 'between' | 'around' | 'evenly'): Justify content

**Example:**
```jsx
<ContainerComponent
  id="feature-section"
  padding="lg"
  background="muted"
  rounded="lg"
  flex={true}
  flexDirection="col"
  alignItems="center"
>
  <TextComponent
    id="feature-title"
    content="Key Features"
    variant="heading2"
  />
  {/* Other components */}
</ContainerComponent>
```

### Card Component
The Card component is used for content cards with consistent styling.

**Props:**
- `id` (string, required): Unique identifier for the component
- `children` (ReactNode, required): Child components
- `padding` ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'): Padding size
- `background` ('none' | 'primary' | 'secondary' | 'muted'): Background color
- `rounded` ('none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'): Border radius
- `shadow` ('none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner'): Shadow effect
- `border` (boolean): Show border
- `borderColor` ('default' | 'primary' | 'secondary'): Border color
- `hover` (boolean): Enable hover effects
- `clickable` (boolean): Make card clickable
- `onClick` (function): Click handler

**Example:**
```jsx
<CardComponent
  id="feature-card"
  padding="lg"
  rounded="lg"
  shadow="md"
  hover={true}
  className="text-center"
>
  <TextComponent
    id="card-title"
    content="Feature Title"
    variant="heading3"
    className="mb-2"
  />
  <TextComponent
    id="card-description"
    content="Feature description text"
    variant="body"
    color="secondary"
  />
</CardComponent>
```

### Grid Component
The Grid component is used for creating responsive grid layouts.

**Props:**
- `id` (string, required): Unique identifier for the component
- `children` (ReactNode, required): Child components
- `columns` (number | 'auto' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'): Number of columns
- `gap` ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'): Gap between grid items
- `padding` ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'): Padding size
- `margin` ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'): Margin size
- `background` ('none' | 'primary' | 'secondary' | 'muted'): Background color
- `rounded` ('none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'): Border radius

**Example:**
```jsx
<GridComponent
  id="features-grid"
  columns="auto"
  gap="lg"
  padding="md"
>
  {/* Card components or other content */}
  <CardComponent {...} />
  <CardComponent {...} />
  <CardComponent {...} />
</GridComponent>
```

## Best Practices

### Responsive Design
- Use the `GridComponent` with `columns="auto"` for responsive grids
- Choose appropriate text variants for different content types
- Test components on various screen sizes

### Accessibility
- Always provide meaningful `alt` text for images
- Use semantic heading levels (h1, h2, h3) appropriately
- Ensure sufficient color contrast for text

### Performance
- Use the `lazy` prop for images below the fold
- Optimize image sizes and formats
- Limit the number of components on a single page

### Consistency
- Stick to the defined color palette
- Use consistent spacing with the padding/margin props
- Maintain visual hierarchy with appropriate text variants

## Component Composition
Components can be nested within each other to create complex layouts:

```jsx
<ContainerComponent padding="lg">
  <TextComponent content="Page Title" variant="heading1" />
  <GridComponent columns="auto" gap="md">
    <CardComponent>
      <TextComponent content="Card Title" variant="heading3" />
      <ButtonComponent text="Action" />
    </CardComponent>
  </GridComponent>
</ContainerComponent>
```

This structure allows for flexible, maintainable page layouts while ensuring consistency with the design system.
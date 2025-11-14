'use client';

import React from 'react';
import { TextComponent } from './text-component';
import { ButtonComponent } from './button-component';
import { ImageComponent } from './image-component';
import { ContainerComponent } from './container-component';
import { CardComponent } from './card-component';
import { GridComponent } from './grid-component';
import { PreviewProvider } from './preview-context';
import { blockRegistry } from './block-registry';

// Define the structure of a CMS component
interface CmsComponent {
  id: string;
  type: 'text' | 'button' | 'image' | 'container' | 'card' | 'grid' | 'block';
  props: any;
  children?: CmsComponent[];
}

interface PageRendererProps {
  components: CmsComponent[];
}

export const PageRenderer: React.FC<PageRendererProps> = ({ components }) => {
  const renderComponent = (component: CmsComponent): React.ReactNode => {
    // Handle block-based components (from visual editor)
    if (component.type === 'block' && component.props?.blockId) {
      const BlockComponent = blockRegistry[component.props.blockId];
      if (BlockComponent) {
        return <BlockComponent key={component.id} {...component.props} />;
      }
      console.warn(`Block not found: ${component.props.blockId}`);
      return null;
    }

    // Handle legacy component types
    switch (component.type) {
      case 'text':
        return <TextComponent key={component.id} {...component.props} />;

      case 'button':
        return <ButtonComponent key={component.id} {...component.props} />;

      case 'image':
        return <ImageComponent key={component.id} {...component.props} />;

      case 'container':
        return (
          <ContainerComponent key={component.id} {...component.props}>
            {component.children?.map(renderComponent)}
          </ContainerComponent>
        );

      case 'card':
        return (
          <CardComponent key={component.id} {...component.props}>
            {component.children?.map(renderComponent)}
          </CardComponent>
        );

      case 'grid':
        return (
          <GridComponent key={component.id} {...component.props}>
            {component.children?.map(renderComponent)}
          </GridComponent>
        );

      default:
        console.warn(`Unknown component type: ${component.type}`);
        return null;
    }
  };

  return (
    <PreviewProvider initialMode="public">
      <div className="cms-page">
        {components.map(renderComponent)}
      </div>
    </PreviewProvider>
  );
};

export default PageRenderer;
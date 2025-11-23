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
      const blockId = component.props.blockId;
      const BlockComponent = blockRegistry[blockId];

      if (BlockComponent) {
        return <BlockComponent key={component.id} {...component.props} />;
      }

      // Component not found in registry - show detailed error
      console.error(`Unknown component type: ${blockId}`);
      console.error('Component props:', component.props);
      console.error('Available blocks:', Object.keys(blockRegistry));

      if (process.env.NODE_ENV === 'development') {
        return (
          <div key={component.id} className="border-2 border-red-500 bg-red-50 p-4 my-4">
            <p className="text-red-700 font-bold">Unknown component type: {blockId}</p>
            <p className="text-sm text-red-600 mt-2">This component is not registered in the component registry</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-sm text-red-600">Debug info</summary>
              <pre className="text-xs mt-2 overflow-auto">{JSON.stringify({ blockId, availableBlocks: Object.keys(blockRegistry) }, null, 2)}</pre>
            </details>
          </div>
        );
      }

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

  // Sort components by orderIndex to ensure correct rendering order
  const sortedComponents = [...components].sort((a, b) => {
    const orderA = a.orderIndex ?? 999;
    const orderB = b.orderIndex ?? 999;
    return orderA - orderB;
  });

  // Group consecutive special-feature-card-single components into grids
  const groupedComponents: (CmsComponent | CmsComponent[])[] = [];
  let currentCardGroup: CmsComponent[] = [];

  sortedComponents.forEach((component, index) => {
    const isCardSingle = component.type === 'block' && component.props?.blockId === 'special-feature-card-single';

    if (isCardSingle) {
      currentCardGroup.push(component);
    } else {
      // If we have accumulated cards, push them as a group
      if (currentCardGroup.length > 0) {
        groupedComponents.push([...currentCardGroup]);
        currentCardGroup = [];
      }
      // Push the non-card component
      groupedComponents.push(component);
    }
  });

  // Don't forget the last group if it exists
  if (currentCardGroup.length > 0) {
    groupedComponents.push([...currentCardGroup]);
  }

  return (
    <PreviewProvider initialMode="public">
      <div className="cms-page">
        {groupedComponents.map((item, groupIndex) => {
          // If it's an array, it's a group of cards - wrap in grid
          if (Array.isArray(item)) {
            return (
              <div key={`card-group-${groupIndex}`} className="container mx-auto py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {item.map(renderComponent)}
                </div>
              </div>
            );
          }
          // Otherwise, it's a single component
          return renderComponent(item);
        })}
      </div>
    </PreviewProvider>
  );
};

export default PageRenderer;
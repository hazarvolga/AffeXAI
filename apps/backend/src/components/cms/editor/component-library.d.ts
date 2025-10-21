import React from 'react';
import { Component } from '@/lib/cms/cms-service';
interface BlockItem {
    id: string;
    name: string;
    description: string;
    category: string;
    component: React.ComponentType;
}
interface ComponentLibraryProps {
    onComponentSelect: (componentType: Component['type']) => void;
    onBlockSelect?: (block: BlockItem) => void;
    displayMode?: 'components' | 'blocks' | 'all';
}
export declare const ComponentLibrary: React.FC<ComponentLibraryProps>;
export default ComponentLibrary;
//# sourceMappingURL=component-library.d.ts.map
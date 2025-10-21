import React from 'react';
interface Component {
    id: string;
    type: string;
    props: any;
    orderIndex: number;
    parentId: string | null;
    children?: Component[];
}
interface ComponentTreeProps {
    components: Component[];
    selectedComponentId: string | null;
    onSelectComponent: (id: string | null) => void;
    onDeleteComponent: (id: string) => void;
    onReorderComponents: (componentId: string, newParentId: string | null, newIndex: number) => void;
    onUpdateComponent?: (componentId: string, updates: Partial<Component>) => void;
    className?: string;
}
export declare function ComponentTree({ components, selectedComponentId, onSelectComponent, onDeleteComponent, onReorderComponents, onUpdateComponent, className, }: ComponentTreeProps): React.JSX.Element;
export {};
//# sourceMappingURL=component-tree.d.ts.map
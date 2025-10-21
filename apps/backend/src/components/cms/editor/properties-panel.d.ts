import React from 'react';
interface ComponentProps {
    [key: string]: any;
}
interface LayoutOptions {
    showHeader?: boolean;
    showFooter?: boolean;
    fullWidth?: boolean;
    backgroundColor?: string;
    showTitle?: boolean;
}
interface PropertiesPanelProps {
    componentType: string;
    componentProps: ComponentProps;
    onPropsChange: (props: ComponentProps) => void;
    isLocked?: boolean;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    canMoveUp?: boolean;
    canMoveDown?: boolean;
    layoutOptions?: LayoutOptions;
    onLayoutOptionsChange?: (layoutOptions: LayoutOptions) => void;
}
export declare const PropertiesPanel: React.FC<PropertiesPanelProps>;
export default PropertiesPanel;
//# sourceMappingURL=properties-panel.d.ts.map
import React from 'react';
interface LayoutComponentProps {
    showHeader?: boolean;
    showFooter?: boolean;
    fullWidth?: boolean;
    backgroundColor?: string;
    showTitle?: boolean;
    onLayoutChange: (layoutOptions: {
        showHeader?: boolean;
        showFooter?: boolean;
        fullWidth?: boolean;
        backgroundColor?: string;
        showTitle?: boolean;
    }) => void;
}
export declare const LayoutComponent: React.FC<LayoutComponentProps>;
export default LayoutComponent;
//# sourceMappingURL=layout-component.d.ts.map
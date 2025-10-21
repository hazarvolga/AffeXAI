import React from 'react';
interface LayoutOptions {
    showHeader: boolean;
    showFooter: boolean;
    fullWidth: boolean;
    backgroundColor: string;
    showTitle: boolean;
}
interface LayoutOptionsPanelProps {
    layoutOptions: LayoutOptions;
    onLayoutOptionsChange: (layoutOptions: LayoutOptions) => void;
}
export declare const LayoutOptionsPanel: React.FC<LayoutOptionsPanelProps>;
export default LayoutOptionsPanel;
//# sourceMappingURL=layout-options-panel.d.ts.map
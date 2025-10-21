import React from 'react';
interface PageBuilderRendererProps {
    components: any[];
    layoutOptions?: {
        showHeader?: boolean;
        showFooter?: boolean;
        fullWidth?: boolean;
        backgroundColor?: string;
        showTitle?: boolean;
    };
    className?: string;
    pageTitle?: string;
}
export declare const PageBuilderRenderer: React.FC<PageBuilderRendererProps>;
export declare const PageBuilderRendererSSR: React.FC<PageBuilderRendererProps>;
export default PageBuilderRenderer;
//# sourceMappingURL=page-builder-renderer.d.ts.map
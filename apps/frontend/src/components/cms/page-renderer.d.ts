import React from 'react';
interface CmsComponent {
    id: string;
    type: 'text' | 'button' | 'image' | 'container' | 'card' | 'grid';
    props: any;
    children?: CmsComponent[];
}
interface PageRendererProps {
    components: CmsComponent[];
}
export declare const PageRenderer: React.FC<PageRendererProps>;
export default PageRenderer;
//# sourceMappingURL=page-renderer.d.ts.map
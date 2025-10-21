import React from 'react';
interface CmsComponent {
    id: string;
    type: 'text' | 'button' | 'image' | 'container' | 'card' | 'grid';
    props: any;
    children?: CmsComponent[];
}
interface CmsPage {
    id: string;
    title: string;
    slug: string;
    description: string;
    components: CmsComponent[];
}
interface CmsPageRendererProps {
    page: CmsPage;
}
export declare const CmsPageRenderer: React.FC<CmsPageRendererProps>;
export default CmsPageRenderer;
//# sourceMappingURL=cms-page-renderer.d.ts.map
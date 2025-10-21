import React from 'react';
interface SEOData {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: string;
    ogUrl?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    twitterCreator?: string;
    robotsIndex?: boolean;
    robotsFollow?: boolean;
    structuredData?: string;
}
interface SEOPanelProps {
    seoData: SEOData;
    onSEODataChange: (data: SEOData) => void;
    showHeader?: boolean;
    showFooter?: boolean;
    onShowHeaderChange?: (value: boolean) => void;
    onShowFooterChange?: (value: boolean) => void;
}
export declare const SEOPanel: React.FC<SEOPanelProps>;
export {};
//# sourceMappingURL=seo-panel.d.ts.map
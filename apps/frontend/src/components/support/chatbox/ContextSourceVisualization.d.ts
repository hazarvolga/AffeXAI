import React from 'react';
export interface ContextSource {
    id: string;
    type: 'knowledge_base' | 'faq_learning' | 'document' | 'url';
    title: string;
    content: string;
    relevanceScore: number;
    metadata: {
        articleId?: string;
        categoryName?: string;
        tags?: string[];
        faqId?: string;
        confidence?: number;
        learningPattern?: string;
        fileName?: string;
        fileType?: string;
        pageNumber?: number;
        url?: string;
        domain?: string;
        extractedAt?: Date;
    };
    createdAt: Date;
}
interface ContextSourceVisualizationProps {
    sources: ContextSource[];
    className?: string;
    maxSources?: number;
    showRelevanceScores?: boolean;
    onSourceClick?: (source: ContextSource) => void;
}
export declare function ContextSourceVisualization({ sources, className, maxSources, showRelevanceScores, onSourceClick }: ContextSourceVisualizationProps): React.JSX.Element | null;
export {};
//# sourceMappingURL=ContextSourceVisualization.d.ts.map
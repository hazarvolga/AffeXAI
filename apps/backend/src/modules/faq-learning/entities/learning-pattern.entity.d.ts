import { BaseEntity } from '../../../database/entities/base.entity';
export declare enum PatternType {
    QUESTION = "question",
    ANSWER = "answer",
    CONTEXT = "context"
}
export interface PatternSource {
    type: 'chat' | 'ticket';
    id: string;
    relevance: number;
}
export declare class LearningPattern extends BaseEntity {
    patternType: PatternType;
    pattern: string;
    patternHash: string;
    frequency: number;
    confidence: number;
    keywords: string[];
    category: string;
    sources: PatternSource[];
    metadata: {
        averageRelevance?: number;
        lastSeenAt?: Date;
        relatedPatterns?: string[];
        contextualInfo?: any;
    };
    get type(): PatternType;
    get patternText(): string;
    get isHighFrequency(): boolean;
    get isHighConfidence(): boolean;
    get averageSourceRelevance(): number;
    get uniqueSourceCount(): number;
    addSource(source: PatternSource): void;
    incrementFrequency(): void;
}
//# sourceMappingURL=learning-pattern.entity.d.ts.map
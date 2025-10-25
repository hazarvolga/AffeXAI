import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { KnowledgeSourceType } from './enums/knowledge-source-type.enum';
import { KnowledgeSourceStatus } from './enums/knowledge-source-status.enum';
export declare class CompanyKnowledgeSource extends BaseEntity {
    title: string;
    description: string;
    sourceType: KnowledgeSourceType;
    status: KnowledgeSourceStatus;
    filePath: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    url: string;
    lastScrapedAt: Date;
    scrapeFailCount: number;
    extractedContent: string;
    summary: string;
    tags: string[];
    keywords: string[];
    metadata: {
        pageCount?: number;
        wordCount?: number;
        language?: string;
        author?: string;
        createdDate?: Date;
        extractedImages?: number;
        linkCount?: number;
    };
    usageCount: number;
    helpfulCount: number;
    averageRelevanceScore: number;
    enableForFaqLearning: boolean;
    enableForChat: boolean;
    uploadedById: string;
    uploadedBy: User;
    archivedAt: Date;
    archivedById: string;
    archivedBy: User;
    get isActive(): boolean;
    get isProcessing(): boolean;
    get hasFailed(): boolean;
    get isArchived(): boolean;
    get effectivenessScore(): number;
    get displayType(): string;
}
//# sourceMappingURL=company-knowledge-source.entity.d.ts.map
import { User } from '../../users/entities/user.entity';
export declare class PageTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    designSystem: Record<string, any>;
    blocks: Record<string, any>[];
    layoutOptions: Record<string, any>;
    metadata: Record<string, any>;
    preview: Record<string, any>;
    constraints: Record<string, any>;
    usageCount: number;
    isFeatured: boolean;
    isActive: boolean;
    authorId: string;
    author: User;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=page-template.entity.d.ts.map
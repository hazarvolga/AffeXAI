import { Component } from './component.entity';
import { Category } from './category.entity';
import { PageStatus } from '@affexai/shared-types';
export declare class Page {
    id: string;
    title: string;
    slug: string;
    description: string;
    status: PageStatus;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date | null;
    createdBy: string;
    updatedBy: string;
    layoutOptions: Record<string, any>;
    categoryId: string | null;
    category: Category | null;
    components: Component[];
}
//# sourceMappingURL=page.entity.d.ts.map
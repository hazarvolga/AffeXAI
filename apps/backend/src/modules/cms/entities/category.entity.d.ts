export declare class Category {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    parentId: string | null;
    parent: Category | null;
    children: Category[];
    orderIndex: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=category.entity.d.ts.map
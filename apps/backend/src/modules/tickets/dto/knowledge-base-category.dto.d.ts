export declare class CreateCategoryDto {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
    parentId?: string;
    sortOrder?: number;
}
export declare class UpdateCategoryDto {
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
    parentId?: string;
    sortOrder?: number;
    isActive?: boolean;
}
export declare class ReorderCategoriesDto {
    categoryIds: string[];
}
export declare class MoveCategoryDto {
    newParentId?: string;
}
export declare class BulkUpdateStatusDto {
    categoryIds: string[];
    isActive: boolean;
}
export declare class BulkDeleteDto {
    categoryIds: string[];
}
//# sourceMappingURL=knowledge-base-category.dto.d.ts.map
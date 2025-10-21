import type { CmsCategory, CmsCategoryTree, CreateCmsCategoryDto, UpdateCmsCategoryDto, ReorderCmsCategoriesDto, CmsCategoryQueryParams } from '@affexai/shared-types';
/**
 * CMS Category Service
 * Handles all CMS Category operations with unified HTTP client
 */
export declare class CmsCategoryService {
    /**
     * Get all categories (flat list)
     */
    getCategories(params?: CmsCategoryQueryParams): Promise<CmsCategory[]>;
    /**
     * Get category tree (hierarchical structure)
     */
    getCategoryTree(): Promise<CmsCategoryTree[]>;
    /**
     * Get category by ID
     */
    getCategory(id: string): Promise<CmsCategory>;
    /**
     * Get category by slug
     */
    getCategoryBySlug(slug: string): Promise<CmsCategory>;
    /**
     * Create a new category
     */
    createCategory(data: CreateCmsCategoryDto): Promise<CmsCategory>;
    /**
     * Update existing category
     */
    updateCategory(id: string, data: UpdateCmsCategoryDto): Promise<CmsCategory>;
    /**
     * Delete category
     */
    deleteCategory(id: string): Promise<void>;
    /**
     * Reorder categories
     */
    reorderCategories(data: ReorderCmsCategoriesDto): Promise<void>;
}
export declare const cmsCategoryService: CmsCategoryService;
//# sourceMappingURL=category-service.d.ts.map
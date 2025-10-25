import { Repository } from 'typeorm';
import { KnowledgeBaseCategory } from '../entities/knowledge-base-category.entity';
export interface CreateCategoryDto {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
    parentId?: string;
    sortOrder?: number;
}
export interface UpdateCategoryDto {
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
    parentId?: string;
    sortOrder?: number;
    isActive?: boolean;
}
export interface CategoryTreeNode {
    id: string;
    name: string;
    slug: string;
    color: string;
    icon: string;
    articleCount: number;
    children: CategoryTreeNode[];
    level: number;
}
export interface CategoryStats {
    totalCategories: number;
    activeCategories: number;
    totalArticles: number;
    averageArticlesPerCategory: number;
    mostPopularCategories: KnowledgeBaseCategory[];
    unusedCategories: KnowledgeBaseCategory[];
}
export declare class KnowledgeBaseCategoryService {
    private readonly categoryRepository;
    private readonly logger;
    constructor(categoryRepository: Repository<KnowledgeBaseCategory>);
    /**
     * Create a new category
     */
    createCategory(dto: CreateCategoryDto, userId: string): Promise<KnowledgeBaseCategory>;
    /**
     * Update a category
     */
    updateCategory(id: string, dto: UpdateCategoryDto, userId: string): Promise<KnowledgeBaseCategory>;
    /**
     * Delete a category
     */
    deleteCategory(id: string): Promise<void>;
    /**
     * Get category by ID
     */
    getCategory(id: string): Promise<KnowledgeBaseCategory>;
    /**
     * Get all categories
     */
    getAllCategories(): Promise<KnowledgeBaseCategory[]>;
    /**
     * Get categories with article counts
     */
    getCategoriesWithCounts(): Promise<KnowledgeBaseCategory[]>;
    /**
     * Get category tree structure
     */
    getCategoryTree(): Promise<CategoryTreeNode[]>;
    /**
     * Move category to new parent
     */
    moveCategory(categoryId: string, newParentId?: string): Promise<void>;
    /**
     * Get category with full hierarchy path
     */
    getCategoryWithPath(id: string): Promise<KnowledgeBaseCategory & {
        path: string[];
    }>;
    /**
     * Get category path (breadcrumb)
     */
    getCategoryPath(categoryId: string): Promise<string[]>;
    /**
     * Get all descendants of a category
     */
    getCategoryDescendants(categoryId: string): Promise<KnowledgeBaseCategory[]>;
    /**
     * Get all ancestors of a category
     */
    getCategoryAncestors(categoryId: string): Promise<KnowledgeBaseCategory[]>;
    /**
     * Validate category hierarchy
     */
    validateHierarchy(categoryId: string, parentId?: string): Promise<boolean>;
    /**
     * Reorder categories within the same parent
     */
    reorderCategories(categoryIds: string[]): Promise<void>;
    /**
     * Update article counts for categories
     */
    updateArticleCounts(): Promise<void>;
    /**
     * Get category statistics
     */
    getCategoryStats(): Promise<CategoryStats>;
    /**
     * Get popular categories
     */
    getPopularCategories(limit?: number): Promise<KnowledgeBaseCategory[]>;
    /**
     * Bulk activate/deactivate categories
     */
    bulkUpdateStatus(categoryIds: string[], isActive: boolean): Promise<void>;
    /**
     * Bulk delete categories
     */
    bulkDeleteCategories(categoryIds: string[]): Promise<void>;
    /**
     * Initialize default categories
     */
    initializeDefaultCategories(userId: string): Promise<KnowledgeBaseCategory[]>;
    /**
     * Search categories by name or description
     */
    searchCategories(query: string): Promise<KnowledgeBaseCategory[]>;
    /**
     * Get categories by parent ID
     */
    getCategoriesByParent(parentId?: string): Promise<KnowledgeBaseCategory[]>;
    /**
     * Get root categories (no parent)
     */
    getRootCategories(): Promise<KnowledgeBaseCategory[]>;
    /**
     * Generate URL-friendly slug from name
     */
    generateSlug(name: string): Promise<string>;
    /**
     * Generate unique slug by checking database
     */
    private generateUniqueSlug;
    /**
     * Check if slug is already taken
     */
    private isSlugTaken;
    /**
     * Validate category data
     */
    private validateCategoryData;
    /**
     * Validate parent category
     */
    private validateParentCategory;
    /**
     * Check for circular reference in hierarchy
     */
    private checkCircularReference;
    /**
     * Get category depth in hierarchy
     */
    private getCategoryDepth;
    /**
     * Sort category tree recursively
     */
    private sortCategoryTree;
}
//# sourceMappingURL=knowledge-base-category.service.d.ts.map
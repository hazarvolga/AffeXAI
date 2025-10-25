import { User } from '../../users/entities/user.entity';
import { KnowledgeBaseCategoryService } from '../services/knowledge-base-category.service';
import { CreateCategoryDto, UpdateCategoryDto, ReorderCategoriesDto, MoveCategoryDto, BulkUpdateStatusDto, BulkDeleteDto } from '../dto/knowledge-base-category.dto';
/**
 * Knowledge Base Category Controller
 * Manages KB article categories
 */
export declare class KnowledgeBaseCategoryController {
    private readonly categoryService;
    constructor(categoryService: KnowledgeBaseCategoryService);
    /**
     * Create new category
     */
    createCategory(dto: CreateCategoryDto, user: User): Promise<{
        success: boolean;
        data: import("../entities/knowledge-base-category.entity").KnowledgeBaseCategory;
    }>;
    /**
     * Get category tree structure
     */
    getCategoryTree(): Promise<{
        success: boolean;
        data: import("../services/knowledge-base-category.service").CategoryTreeNode[];
    }>;
    /**
     * Get category statistics
     */
    getCategoryStats(): Promise<{
        success: boolean;
        data: import("../services/knowledge-base-category.service").CategoryStats;
    }>;
    /**
     * Search categories
     */
    searchCategories(query: string): Promise<{
        success: boolean;
        message: string;
        data: never[];
    } | {
        success: boolean;
        data: import("../entities/knowledge-base-category.entity").KnowledgeBaseCategory[];
        message?: undefined;
    }>;
    /**
     * Get all categories
     */
    getAllCategories(): Promise<{
        success: boolean;
        data: import("../entities/knowledge-base-category.entity").KnowledgeBaseCategory[];
    }>;
    /**
     * Update category
     */
    updateCategory(id: string, dto: UpdateCategoryDto, user: User): Promise<{
        success: boolean;
        data: import("../entities/knowledge-base-category.entity").KnowledgeBaseCategory;
    }>;
    /**
     * Delete category
     */
    deleteCategory(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Get categories by parent
     */
    getRootCategories(): Promise<{
        success: boolean;
        data: import("../entities/knowledge-base-category.entity").KnowledgeBaseCategory[];
    }>;
    /**
     * Get categories by parent ID
     */
    getCategoriesByParent(parentId: string): Promise<{
        success: boolean;
        data: import("../entities/knowledge-base-category.entity").KnowledgeBaseCategory[];
    }>;
    /**
     * Get category with full path
     */
    getCategoryWithPath(id: string): Promise<{
        success: boolean;
        data: import("../entities/knowledge-base-category.entity").KnowledgeBaseCategory & {
            path: string[];
        };
    }>;
    /**
     * Get category descendants
     */
    getCategoryDescendants(id: string): Promise<{
        success: boolean;
        data: import("../entities/knowledge-base-category.entity").KnowledgeBaseCategory[];
    }>;
    /**
     * Get category ancestors
     */
    getCategoryAncestors(id: string): Promise<{
        success: boolean;
        data: import("../entities/knowledge-base-category.entity").KnowledgeBaseCategory[];
    }>;
    /**
     * Reorder categories
     */
    reorderCategories(dto: ReorderCategoriesDto): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Move category to new parent
     */
    moveCategory(id: string, dto: MoveCategoryDto): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Bulk update category status
     */
    bulkUpdateStatus(dto: BulkUpdateStatusDto): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Bulk delete categories
     */
    bulkDeleteCategories(dto: BulkDeleteDto): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Update article counts
     */
    updateArticleCounts(): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Initialize default categories (for setup)
     */
    initializeDefaultCategories(user: User): Promise<{
        success: boolean;
        data: import("../entities/knowledge-base-category.entity").KnowledgeBaseCategory[];
        message: string;
    }>;
    /**
     * Get category by ID
     */
    getCategory(id: string): Promise<{
        success: boolean;
        data: import("../entities/knowledge-base-category.entity").KnowledgeBaseCategory;
    }>;
}
//# sourceMappingURL=knowledge-base-category.controller.d.ts.map
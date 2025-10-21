import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCmsCategoryDto, UpdateCmsCategoryDto, CmsCategoryTree, ReorderCmsCategoriesDto } from '@affexai/shared-types';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    /**
     * Generate slug from category name
     */
    private generateSlug;
    /**
     * Create a new category
     */
    create(createDto: CreateCmsCategoryDto): Promise<Category>;
    /**
     * Find all categories (flat list)
     */
    findAll(params?: {
        parentId?: string | null;
        isActive?: boolean;
        search?: string;
    }): Promise<Category[]>;
    /**
     * Find one category by ID
     */
    findOne(id: string): Promise<Category>;
    /**
     * Find category by slug
     */
    findBySlug(slug: string): Promise<Category>;
    /**
     * Build hierarchical tree structure
     */
    getTree(): Promise<CmsCategoryTree[]>;
    /**
     * Update a category
     */
    update(id: string, updateDto: UpdateCmsCategoryDto): Promise<Category>;
    /**
     * Check if setting parentId would create a circular reference
     */
    private wouldCreateCircularReference;
    /**
     * Delete a category
     */
    remove(id: string): Promise<void>;
    /**
     * Reorder categories
     */
    reorder(dto: ReorderCmsCategoriesDto): Promise<void>;
    /**
     * Get category with page count
     */
    getCategoryWithPageCount(id: string): Promise<Category & {
        pageCount: number;
    }>;
}
//# sourceMappingURL=category.service.d.ts.map
import { CategoryService } from '../services/category.service';
import { CreateCmsCategoryDto } from '../dto/create-category.dto';
import { UpdateCmsCategoryDto } from '../dto/update-category.dto';
import { ReorderCategoriesDto } from '../dto/reorder-categories.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createDto: CreateCmsCategoryDto): Promise<import("../entities").Category>;
    findAll(parentId?: string, isActive?: string, search?: string): Promise<import("../entities").Category[]>;
    getTree(): Promise<import("@affexai/shared-types").CmsCategoryTree[]>;
    findOne(id: string): Promise<import("../entities").Category>;
    findBySlug(slug: string): Promise<import("../entities").Category>;
    update(id: string, updateDto: UpdateCmsCategoryDto): Promise<import("../entities").Category>;
    remove(id: string): Promise<void>;
    reorder(dto: ReorderCategoriesDto): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=category.controller.d.ts.map
import React from 'react';
import { CategoryTreeNode } from './CategoryList';
interface CategoryStats {
    totalCategories: number;
    activeCategories: number;
    totalArticles: number;
    averageArticlesPerCategory: number;
    mostPopularCategories: CategoryTreeNode[];
    unusedCategories: CategoryTreeNode[];
}
interface CategoryManagementProps {
    onLoadCategories: () => Promise<CategoryTreeNode[]>;
    onLoadStats: () => Promise<CategoryStats>;
    onCreateCategory: (data: any) => Promise<CategoryTreeNode>;
    onUpdateCategory: (id: string, data: any) => Promise<CategoryTreeNode>;
    onDeleteCategory: (id: string) => Promise<void>;
    onReorderCategories: (categoryIds: string[]) => Promise<void>;
    onInitializeDefaults: () => Promise<CategoryTreeNode[]>;
    onUpdateArticleCounts: () => Promise<void>;
}
declare const CategoryManagement: React.FC<CategoryManagementProps>;
export default CategoryManagement;
//# sourceMappingURL=CategoryManagement.d.ts.map
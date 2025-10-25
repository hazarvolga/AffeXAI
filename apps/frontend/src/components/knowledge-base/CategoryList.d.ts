import React from 'react';
export interface CategoryTreeNode {
    id: string;
    name: string;
    slug: string;
    color: string;
    icon: string;
    articleCount: number;
    children: CategoryTreeNode[];
    level: number;
    isActive: boolean;
    parentId?: string;
}
interface CategoryListProps {
    categories: CategoryTreeNode[];
    onCategorySelect?: (category: CategoryTreeNode) => void;
    onCategoryEdit?: (category: CategoryTreeNode) => void;
    onCategoryDelete?: (categoryId: string) => void;
    onCategoryReorder?: (categoryIds: string[]) => void;
    onCategoryCreate?: (parentId?: string) => void;
    isLoading?: boolean;
    showActions?: boolean;
    allowReorder?: boolean;
    searchable?: boolean;
}
declare const CategoryList: React.FC<CategoryListProps>;
export default CategoryList;
//# sourceMappingURL=CategoryList.d.ts.map
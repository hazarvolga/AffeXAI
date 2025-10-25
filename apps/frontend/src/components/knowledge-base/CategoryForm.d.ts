import React from 'react';
import * as z from 'zod';
import { CategoryTreeNode } from './CategoryList';
declare const categorySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    color: z.ZodEnum<["blue", "green", "red", "yellow", "purple", "pink", "indigo", "gray"]>;
    icon: z.ZodEnum<["folder", "book", "file", "tag", "star", "heart", "info", "help"]>;
    parentId: z.ZodUnion<[z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"none">]>, z.ZodLiteral<"">]>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    color: "blue" | "red" | "green" | "yellow" | "purple" | "pink" | "indigo" | "gray";
    icon: "file" | "info" | "help" | "tag" | "folder" | "star" | "book" | "heart";
    description?: string | undefined;
    isActive?: boolean | undefined;
    sortOrder?: number | undefined;
    parentId?: string | undefined;
}, {
    name: string;
    color: "blue" | "red" | "green" | "yellow" | "purple" | "pink" | "indigo" | "gray";
    icon: "file" | "info" | "help" | "tag" | "folder" | "star" | "book" | "heart";
    description?: string | undefined;
    isActive?: boolean | undefined;
    sortOrder?: number | undefined;
    parentId?: string | undefined;
}>;
type CategoryFormData = z.infer<typeof categorySchema>;
interface CategoryFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CategoryFormData) => Promise<void>;
    category?: CategoryTreeNode | null;
    parentCategories?: CategoryTreeNode[];
    isLoading?: boolean;
    mode: 'create' | 'edit';
}
declare const CategoryForm: React.FC<CategoryFormProps>;
export default CategoryForm;
//# sourceMappingURL=CategoryForm.d.ts.map
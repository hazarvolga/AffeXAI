/**
 * CMS Components Registry
 * Central registry for all prebuild components with metadata
 */
export type ComponentCategory = 'Navigation' | 'Hero' | 'Content' | 'ContentVariant' | 'Element' | 'Gallery' | 'Footer' | 'Ecommerce' | 'Blog' | 'Social' | 'Special' | 'Testimonials' | 'Features' | 'Stats' | 'Pricing' | 'Rating' | 'Progress';
export interface ComponentRegistryItem {
    id: string;
    name: string;
    description: string;
    category: ComponentCategory;
    icon?: string;
    thumbnail?: string;
    defaultProps: any;
}
/**
 * Normalize component ID (handle legacy IDs)
 */
export declare const normalizeComponentId: (id: string) => string;
/**
 * Generate complete components registry
 */
export declare const componentsRegistry: ComponentRegistryItem[];
/**
 * Get components by category
 */
export declare const getComponentsByCategory: (category: ComponentCategory) => ComponentRegistryItem[];
/**
 * Get component by ID (with legacy ID support)
 */
export declare const getComponentById: (id: string) => ComponentRegistryItem | undefined;
/**
 * Get all categories
 */
export declare const getAllCategories: () => ComponentCategory[];
/**
 * Search components by name or description
 */
export declare const searchComponents: (query: string) => ComponentRegistryItem[];
//# sourceMappingURL=components-registry.d.ts.map
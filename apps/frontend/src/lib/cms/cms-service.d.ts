import type { Page, Component, CreatePageDto, UpdatePageDto, CreateComponentDto, UpdateComponentDto, ReorderComponentsDto, PageQueryParams, PageStatus } from '@affexai/shared-types';
export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
}
export interface Menu {
    id: string;
    name: string;
    slug: string;
    items?: MenuItem[];
}
export interface MenuItem {
    id: string;
    menuId: string;
    label: string;
    url?: string;
    pageId?: string;
    parentId?: string;
    orderIndex: number;
}
export type { Page, Component, CreatePageDto, UpdatePageDto, CreateComponentDto, UpdateComponentDto, ReorderComponentsDto, PageQueryParams, PageStatus, };
/**
 * CMS Service
 * Handles all CMS-related API operations with unified HTTP client
 * Note: Uses wrapped methods because backend uses global ApiResponse wrapper
 */
export declare class CmsService {
    /**
     * Get all pages, optionally filtered by status
     */
    getPages(status?: PageStatus): Promise<Page[]>;
    /**
     * Get page by ID
     */
    getPage(id: string): Promise<Page>;
    /**
     * Get page by slug
     */
    getPageBySlug(slug: string): Promise<Page>;
    /**
     * Create a new page
     */
    createPage(data: CreatePageDto): Promise<Page>;
    /**
     * Update existing page
     */
    /**
     * Update existing page
     */
    updatePage(id: string, data: UpdatePageDto): Promise<Page>;
    /**
     * Delete page
     */
    deletePage(id: string): Promise<void>;
    /**
     * Publish page
     */
    publishPage(id: string): Promise<Page>;
    /**
     * Unpublish page
     */
    unpublishPage(id: string): Promise<Page>;
    /**
     * Get all components, optionally filtered by page ID
     */
    getComponents(pageId?: string): Promise<Component[]>;
    /**
     * Get component by ID
     */
    getComponent(id: string): Promise<Component>;
    /**
     * Create a new component
     */
    createComponent(data: CreateComponentDto): Promise<Component>;
    /**
     * Update existing component
     */
    updateComponent(id: string, data: UpdateComponentDto): Promise<Component>;
    /**
     * Delete component
     */
    deleteComponent(id: string): Promise<void>;
    /**
     * Reorder components
     */
    reorderComponents(data: ReorderComponentsDto): Promise<Component[]>;
    /**
     * Get all categories
     */
    getCategories(): Promise<Category[]>;
    /**
     * Get category by ID
     */
    getCategory(id: string): Promise<Category>;
    /**
     * Create a new category
     */
    createCategory(data: {
        name: string;
        slug: string;
        description?: string;
    }): Promise<Category>;
    /**
     * Get all menus
     */
    getMenus(): Promise<Menu[]>;
    /**
     * Get menu by ID
     */
    getMenu(id: string): Promise<Menu>;
    /**
     * Add page to menu with hierarchical placement support
     */
    addPageToMenu(menuId: string, pageId: string, label: string, orderIndex?: number, parentId?: string): Promise<MenuItem>;
    /**
     * Remove page from menu
     */
    removePageFromMenu(menuId: string, itemId: string): Promise<void>;
}
export declare const cmsService: CmsService;
//# sourceMappingURL=cms-service.d.ts.map
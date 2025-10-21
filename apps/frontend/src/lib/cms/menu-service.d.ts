import type { CmsMenu, CmsMenuItem, CmsMenuTree, CreateCmsMenuDto, UpdateCmsMenuDto, CreateCmsMenuItemDto, UpdateCmsMenuItemDto, ReorderMenuItemsDto, MenuLocation } from '@affexai/shared-types';
/**
 * CMS Menu Service
 * Handles all CMS Menu and Menu Item operations with unified HTTP client
 */
export declare class CmsMenuService {
    /**
     * Get all menus
     */
    getMenus(params?: {
        location?: MenuLocation;
        isActive?: boolean;
        search?: string;
    }): Promise<CmsMenu[]>;
    /**
     * Get menu by ID
     */
    getMenu(id: string): Promise<CmsMenu>;
    /**
     * Get menu by slug
     */
    getMenuBySlug(slug: string): Promise<CmsMenu>;
    /**
     * Create a new menu
     */
    createMenu(data: CreateCmsMenuDto): Promise<CmsMenu>;
    /**
     * Update existing menu
     */
    updateMenu(id: string, data: UpdateCmsMenuDto): Promise<CmsMenu>;
    /**
     * Delete menu
     */
    deleteMenu(id: string): Promise<void>;
    /**
     * Get all menu items for a specific menu (flat list)
     */
    getMenuItems(menuId: string): Promise<CmsMenuItem[]>;
    /**
     * Get menu item tree (hierarchical structure)
     */
    getMenuItemTree(menuId: string): Promise<CmsMenuTree[]>;
    /**
     * Get menu item by ID
     */
    getMenuItem(id: string): Promise<CmsMenuItem>;
    /**
     * Create a new menu item
     */
    createMenuItem(data: CreateCmsMenuItemDto): Promise<CmsMenuItem>;
    /**
     * Update existing menu item
     */
    updateMenuItem(id: string, data: UpdateCmsMenuItemDto): Promise<CmsMenuItem>;
    /**
     * Delete menu item
     */
    deleteMenuItem(id: string): Promise<void>;
    /**
     * Reorder menu items
     */
    reorderMenuItems(data: ReorderMenuItemsDto): Promise<void>;
}
export declare const cmsMenuService: CmsMenuService;
//# sourceMappingURL=menu-service.d.ts.map
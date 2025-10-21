import { Repository } from 'typeorm';
import { Menu } from '../entities/menu.entity';
import { MenuItem } from '../entities/menu-item.entity';
import { CreateCmsMenuDto, UpdateCmsMenuDto, CreateCmsMenuItemDto, UpdateCmsMenuItemDto, ReorderMenuItemsDto, MenuLocation, CmsMenuTree } from '@affexai/shared-types';
export declare class MenuService {
    private menuRepository;
    private menuItemRepository;
    constructor(menuRepository: Repository<Menu>, menuItemRepository: Repository<MenuItem>);
    /**
     * Generate slug from menu name
     */
    private generateSlug;
    /**
     * Create a new menu
     */
    createMenu(createDto: CreateCmsMenuDto): Promise<Menu>;
    /**
     * Find all menus
     */
    findAllMenus(params?: {
        location?: MenuLocation;
        isActive?: boolean;
        search?: string;
    }): Promise<Menu[]>;
    /**
     * Find one menu by ID
     */
    findOneMenu(id: string): Promise<Menu>;
    /**
     * Find menu by slug
     */
    findMenuBySlug(slug: string): Promise<Menu>;
    /**
     * Update a menu
     */
    updateMenu(id: string, updateDto: UpdateCmsMenuDto): Promise<Menu>;
    /**
     * Delete a menu
     */
    removeMenu(id: string): Promise<void>;
    /**
     * Create a new menu item
     */
    createMenuItem(createDto: CreateCmsMenuItemDto): Promise<MenuItem>;
    /**
     * Find all menu items for a menu
     */
    findMenuItems(menuId: string): Promise<MenuItem[]>;
    /**
     * Get menu items as tree structure
     */
    getMenuItemTree(menuId: string): Promise<CmsMenuTree[]>;
    /**
     * Find one menu item by ID
     */
    findOneMenuItem(id: string): Promise<MenuItem>;
    /**
     * Update a menu item
     */
    updateMenuItem(id: string, updateDto: UpdateCmsMenuItemDto): Promise<MenuItem>;
    /**
     * Check if setting parentId would create a circular reference
     */
    private wouldCreateCircularReference;
    /**
     * Delete a menu item
     */
    removeMenuItem(id: string): Promise<void>;
    /**
     * Reorder menu items
     */
    reorderMenuItems(dto: ReorderMenuItemsDto): Promise<void>;
}
//# sourceMappingURL=menu.service.d.ts.map
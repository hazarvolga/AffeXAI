import { MenuService } from '../services/menu.service';
import { CreateCmsMenuDto } from '../dto/create-menu.dto';
import { UpdateCmsMenuDto } from '../dto/update-menu.dto';
import { CreateCmsMenuItemDto } from '../dto/create-menu-item.dto';
import { UpdateCmsMenuItemDto } from '../dto/update-menu-item.dto';
import { ReorderMenuItemsDto } from '../dto/reorder-menu-items.dto';
import { MenuLocation } from '@affexai/shared-types';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    createMenu(createDto: CreateCmsMenuDto): Promise<import("../entities").Menu>;
    findAllMenus(location?: MenuLocation, isActive?: string, search?: string): Promise<import("../entities").Menu[]>;
    findOneMenu(id: string): Promise<import("../entities").Menu>;
    findMenuBySlug(slug: string): Promise<import("../entities").Menu>;
    updateMenu(id: string, updateDto: UpdateCmsMenuDto): Promise<import("../entities").Menu>;
    removeMenu(id: string): Promise<void>;
    createMenuItem(createDto: CreateCmsMenuItemDto): Promise<import("../entities").MenuItem>;
    findMenuItems(menuId: string): Promise<import("../entities").MenuItem[]>;
    getMenuItemTree(menuId: string): Promise<import("@affexai/shared-types").CmsMenuTree[]>;
    findOneMenuItem(id: string): Promise<import("../entities").MenuItem>;
    updateMenuItem(id: string, updateDto: UpdateCmsMenuItemDto): Promise<import("../entities").MenuItem>;
    removeMenuItem(id: string): Promise<void>;
    reorderMenuItems(dto: ReorderMenuItemsDto): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=menu.controller.d.ts.map
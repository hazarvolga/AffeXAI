import { Menu } from './menu.entity';
import { Page } from './page.entity';
import { Category } from './category.entity';
import { MenuItemType } from '@affexai/shared-types';
export declare class MenuItem {
    id: string;
    menuId: string;
    menu: Menu;
    parentId: string | null;
    parent: MenuItem | null;
    children: MenuItem[];
    type: MenuItemType;
    label: string;
    url: string | null;
    pageId: string | null;
    page: Page | null;
    categoryId: string | null;
    category: Category | null;
    target: '_blank' | '_self' | null;
    icon: string | null;
    cssClass: string | null;
    orderIndex: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=menu-item.entity.d.ts.map
import { MenuItemType } from '@affexai/shared-types';
export declare class CreateCmsMenuItemDto {
    menuId: string;
    parentId?: string | null;
    type: MenuItemType;
    label: string;
    url?: string;
    pageId?: string;
    categoryId?: string;
    target?: '_blank' | '_self';
    icon?: string;
    cssClass?: string;
    orderIndex?: number;
    isActive?: boolean;
}
//# sourceMappingURL=create-menu-item.dto.d.ts.map
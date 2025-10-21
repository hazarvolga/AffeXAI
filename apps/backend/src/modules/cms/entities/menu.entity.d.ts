import { MenuItem } from './menu-item.entity';
import { MenuLocation } from '@affexai/shared-types';
export declare class Menu {
    id: string;
    name: string;
    slug: string;
    location: MenuLocation;
    isActive: boolean;
    items: MenuItem[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=menu.entity.d.ts.map
import { Page } from './page.entity';
import { ComponentType } from '@affexai/shared-types';
export declare class Component {
    id: string;
    pageId: string;
    parentId: string | null;
    type: ComponentType;
    props: any;
    orderIndex: number;
    createdAt: Date;
    updatedAt: Date;
    page: Page;
    children: Component[];
    parent: Component;
}
//# sourceMappingURL=component.entity.d.ts.map
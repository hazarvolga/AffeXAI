interface LayoutOptions {
    showHeader?: boolean;
    showFooter?: boolean;
    fullWidth?: boolean;
    backgroundColor?: string;
    showTitle?: boolean;
}
interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
}
interface Menu {
    id: string;
    name: string;
    slug: string;
    items?: MenuItem[];
}
interface MenuItem {
    id: string;
    menuId: string;
    label: string;
    url?: string;
    pageId?: string;
    parentId?: string;
    orderIndex: number;
}
interface Page {
    id: string;
    title: string;
    slug: string;
    description: string;
    status: 'draft' | 'published' | 'archived';
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    components: Component[];
    layoutOptions?: LayoutOptions;
    version?: number;
    parentId?: string;
    categoryId?: string;
    category?: Category;
}
export interface Component {
    id: string;
    pageId: string;
    parentId: string;
    type: 'text' | 'button' | 'image' | 'container' | 'card' | 'grid' | 'block';
    props: any;
    orderIndex: number;
    createdAt: string;
    updatedAt: string;
    children?: Component[];
}
interface CreatePageDto {
    title: string;
    slug: string;
    description?: string;
    status?: 'draft' | 'published' | 'archived';
    layoutOptions?: LayoutOptions;
    createdBy?: string;
    categoryId?: string;
}
interface CreateComponentDto {
    pageId: string;
    parentId?: string;
    type: 'text' | 'button' | 'image' | 'container' | 'card' | 'grid' | 'block';
    props: any;
    orderIndex?: number;
}
export type { CreateComponentDto };
export declare class CmsService {
    private request;
    getPages(status?: 'draft' | 'published' | 'archived'): Promise<Page[]>;
    getPage(id: string, withComponents?: boolean): Promise<Page>;
    getPageBySlug(slug: string, withComponents?: boolean): Promise<Page>;
    createPage(data: CreatePageDto): Promise<Page>;
    updatePage(id: string, data: Partial<CreatePageDto>): Promise<Page>;
    deletePage(id: string): Promise<void>;
    publishPage(id: string): Promise<Page>;
    unpublishPage(id: string): Promise<Page>;
    createPageVersion(id: string): Promise<Page>;
    getPageVersion(id: string, version: number): Promise<Page>;
    getPageVersions(id: string): Promise<Page[]>;
    rollbackPageToVersion(id: string, version: number): Promise<Page>;
    getComponents(pageId?: string): Promise<Component[]>;
    getComponent(id: string): Promise<Component>;
    createComponent(data: CreateComponentDto): Promise<Component>;
    updateComponent(id: string, data: Partial<CreateComponentDto>): Promise<Component>;
    deleteComponent(id: string): Promise<void>;
    reorderComponents(componentIds: string[], orderIndexes: number[]): Promise<Component[]>;
    batchCreateComponents(components: CreateComponentDto[]): Promise<Component[]>;
    batchUpdateComponents(updates: {
        id: string;
        data: Partial<CreateComponentDto>;
    }[]): Promise<Component[]>;
    batchDeleteComponents(ids: string[]): Promise<void>;
    batchCreatePages(pages: CreatePageDto[]): Promise<Page[]>;
    batchUpdatePages(updates: {
        id: string;
        data: Partial<CreatePageDto>;
    }[]): Promise<Page[]>;
    getCategories(): Promise<Category[]>;
    getCategory(id: string): Promise<Category>;
    createCategory(data: {
        name: string;
        slug: string;
        description?: string;
    }): Promise<Category>;
    getMenus(): Promise<Menu[]>;
    getMenu(id: string): Promise<Menu>;
    addPageToMenu(menuId: string, pageId: string, label: string, orderIndex?: number): Promise<MenuItem>;
    removePageFromMenu(menuId: string, itemId: string): Promise<void>;
}
export declare const cmsService: CmsService;
export type { Category, Menu, MenuItem };
//# sourceMappingURL=cms-service.d.ts.map
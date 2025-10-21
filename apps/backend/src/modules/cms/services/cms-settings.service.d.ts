import { Repository } from 'typeorm';
import { Page } from '../entities/page.entity';
import { Component } from '../entities/component.entity';
export declare class CmsSettingsService {
    private pageRepository;
    private componentRepository;
    constructor(pageRepository: Repository<Page>, componentRepository: Repository<Component>);
    /**
     * Get all published pages with their components
     */
    getPublishedPages(): Promise<Page[]>;
    /**
     * Get a published page by slug with its components
     */
    getPublishedPageBySlug(slug: string): Promise<Page | null>;
    /**
     * Get all components for a published page, organized hierarchically
     */
    getPageComponents(pageId: string): Promise<Component[]>;
    /**
     * Get CMS configuration that can be used in site settings
     */
    getCmsConfiguration(): Promise<{
        pages: {
            id: string;
            title: string;
            slug: string;
            description: string;
        }[];
        lastUpdated: Date;
    }>;
}
//# sourceMappingURL=cms-settings.service.d.ts.map
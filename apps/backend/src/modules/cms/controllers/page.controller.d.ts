import { PageService } from '../services/page.service';
import { CreatePageDto } from '../dto/create-page.dto';
import { UpdatePageDto } from '../dto/update-page.dto';
import { PageStatus } from '@affexai/shared-types';
export declare class PageController {
    private readonly pageService;
    constructor(pageService: PageService);
    create(createPageDto: CreatePageDto): Promise<import("../entities").Page>;
    findAll(status?: PageStatus): Promise<import("../entities").Page[]>;
    findOne(id: string): Promise<import("../entities").Page | null>;
    findBySlug(slug: string): Promise<import("../entities").Page | null>;
    update(id: string, updatePageDto: UpdatePageDto): Promise<import("../entities").Page>;
    remove(id: string): Promise<void>;
    publish(id: string): Promise<import("../entities").Page>;
    unpublish(id: string): Promise<import("../entities").Page>;
}
//# sourceMappingURL=page.controller.d.ts.map
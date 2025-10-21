import { Repository } from 'typeorm';
import { Page } from '../entities/page.entity';
import { PageStatus } from '@affexai/shared-types';
import { CreatePageDto } from '../dto/create-page.dto';
import { UpdatePageDto } from '../dto/update-page.dto';
import { EventBusService } from '../../platform-integration/services/event-bus.service';
export declare class PageService {
    private pageRepository;
    private eventBusService;
    constructor(pageRepository: Repository<Page>, eventBusService: EventBusService);
    create(createPageDto: CreatePageDto): Promise<Page>;
    findAll(status?: PageStatus): Promise<Page[]>;
    findOne(id: string): Promise<Page | null>;
    findBySlug(slug: string): Promise<Page | null>;
    update(id: string, updatePageDto: UpdatePageDto): Promise<Page>;
    remove(id: string): Promise<void>;
    publish(id: string): Promise<Page>;
    unpublish(id: string): Promise<Page>;
}
//# sourceMappingURL=page.service.d.ts.map
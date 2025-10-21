import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { EventBusService } from '../platform-integration/services/event-bus.service';
export declare class MediaService {
    private mediaRepository;
    private eventBusService;
    private readonly logger;
    constructor(mediaRepository: Repository<Media>, eventBusService: EventBusService);
    create(createMediaDto: CreateMediaDto): Promise<Media>;
    findAll(): Promise<Media[]>;
    findOne(id: string): Promise<Media>;
    update(id: string, updateMediaDto: UpdateMediaDto): Promise<Media>;
    remove(id: string): Promise<void>;
    findByType(type: string): Promise<Media[]>;
}
//# sourceMappingURL=media.service.d.ts.map
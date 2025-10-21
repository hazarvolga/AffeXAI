import { Repository } from 'typeorm';
import { Segment } from './entities/segment.entity';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';
export declare class SegmentService {
    private segmentsRepository;
    constructor(segmentsRepository: Repository<Segment>);
    create(createSegmentDto: CreateSegmentDto): Promise<Segment>;
    findAll(): Promise<Segment[]>;
    findAllForImport(): Promise<Array<{
        id: string;
        name: string;
        description: string;
        subscriberCount: number;
        openRate: number;
        clickRate: number;
    }>>;
    findOne(id: string): Promise<Segment>;
    update(id: string, updateSegmentDto: UpdateSegmentDto): Promise<Segment>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=segment.service.d.ts.map
import { SegmentService } from './segment.service';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';
import { Segment } from './entities/segment.entity';
export declare class SegmentController {
    private readonly segmentService;
    constructor(segmentService: SegmentService);
    create(createSegmentDto: CreateSegmentDto): Promise<Segment>;
    findAll(): Promise<Segment[]>;
    getImportOptions(): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            description: string;
            subscriberCount: number;
            openRate: number;
            clickRate: number;
        }[];
    }>;
    findOne(id: string): Promise<Segment>;
    update(id: string, updateSegmentDto: UpdateSegmentDto): Promise<Segment>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=segment.controller.d.ts.map
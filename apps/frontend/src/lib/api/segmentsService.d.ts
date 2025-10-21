import { BaseApiService } from './base-service';
import type { Segment, CreateSegmentDto, UpdateSegmentDto } from '@affexai/shared-types';
export type { Segment, CreateSegmentDto, UpdateSegmentDto, };
/**
 * Segments Service
 * Handles email marketing segment operations extending BaseApiService
 */
declare class SegmentsService extends BaseApiService<Segment, CreateSegmentDto, UpdateSegmentDto> {
    constructor();
}
export declare const segmentsService: SegmentsService;
export default segmentsService;
//# sourceMappingURL=segmentsService.d.ts.map
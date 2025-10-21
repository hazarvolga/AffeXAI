export interface Segment {
    id: string;
    name: string;
    description?: string;
    subscriberCount: number;
    criteria?: string;
    openRate: number;
    clickRate: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateSegmentDto {
    name: string;
    description?: string;
    criteria?: string;
    openRate?: number;
    clickRate?: number;
}
export interface UpdateSegmentDto {
    name?: string;
    description?: string;
    criteria?: string;
    openRate?: number;
    clickRate?: number;
    subscriberCount?: number;
}
declare class SegmentsService {
    getAllSegments(): Promise<Segment[]>;
    getSegmentById(id: string): Promise<Segment>;
    createSegment(segmentData: CreateSegmentDto): Promise<Segment>;
    updateSegment(id: string, segmentData: UpdateSegmentDto): Promise<Segment>;
    deleteSegment(id: string): Promise<void>;
}
declare const _default: SegmentsService;
export default _default;
//# sourceMappingURL=segmentsService.d.ts.map
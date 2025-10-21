import { InteractionType, DeviceType } from '../entities';
export declare class CoordinatesDto {
    x: number;
    y: number;
    relativeX: number;
    relativeY: number;
}
export declare class ViewportDto {
    width: number;
    height: number;
}
export declare class TrackEventDto {
    componentId: string;
    componentType: string;
    interactionType: InteractionType;
    sessionId: string;
    userId?: string;
    pageUrl: string;
    deviceType: DeviceType;
    browser?: string;
    viewport: ViewportDto;
    coordinates?: CoordinatesDto;
    metadata?: Record<string, any>;
}
export declare class BatchTrackEventsDto {
    events: TrackEventDto[];
    session?: {
        id: string;
        startTime: Date;
        deviceType: DeviceType;
        browser?: string;
        os?: string;
    };
}
//# sourceMappingURL=track-event.dto.d.ts.map
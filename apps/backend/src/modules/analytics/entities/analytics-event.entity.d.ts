import { User } from '../../users/entities/user.entity';
import { AnalyticsSession } from './analytics-session.entity';
export declare enum InteractionType {
    CLICK = "click",
    HOVER = "hover",
    SCROLL = "scroll",
    FOCUS = "focus",
    INPUT = "input",
    SUBMIT = "submit",
    VIEW = "view",
    EXIT = "exit"
}
export declare enum DeviceType {
    MOBILE = "mobile",
    TABLET = "tablet",
    DESKTOP = "desktop"
}
export declare class AnalyticsEvent {
    id: string;
    componentId: string;
    componentType: string;
    interactionType: InteractionType;
    sessionId: string;
    userId: string | null;
    pageUrl: string;
    deviceType: DeviceType;
    browser: string | null;
    viewportWidth: number | null;
    viewportHeight: number | null;
    coordinateX: number | null;
    coordinateY: number | null;
    relativeX: number | null;
    relativeY: number | null;
    metadata: Record<string, any> | null;
    createdAt: Date;
    user?: User;
    session?: AnalyticsSession;
}
//# sourceMappingURL=analytics-event.entity.d.ts.map
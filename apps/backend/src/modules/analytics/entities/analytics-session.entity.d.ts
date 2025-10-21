import { User } from '../../users/entities/user.entity';
import { AnalyticsEvent } from './analytics-event.entity';
import { DeviceType } from './analytics-event.entity';
export declare class AnalyticsSession {
    id: string;
    userId: string | null;
    startTime: Date;
    endTime: Date | null;
    duration: number | null;
    pagesVisited: string[];
    totalInteractions: number;
    deviceType: DeviceType;
    browser: string | null;
    os: string | null;
    converted: boolean;
    conversionGoal: string | null;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
    events?: AnalyticsEvent[];
}
//# sourceMappingURL=analytics-session.entity.d.ts.map
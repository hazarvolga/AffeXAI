import { Repository } from 'typeorm';
import { EmailOpenHistory } from '../entities/email-open-history.entity';
import { Subscriber } from '../entities/subscriber.entity';
interface OptimalTimeResult {
    subscriberId: string;
    optimalHour: number;
    optimalDayOfWeek: number;
    confidence: number;
    timezone: string;
    basedOnDataPoints: number;
}
interface GlobalOptimalTime {
    hour: number;
    dayOfWeek: number;
    averageOpenRate: number;
}
export declare class SendTimeOptimizationService {
    private readonly openHistoryRepository;
    private readonly subscriberRepository;
    constructor(openHistoryRepository: Repository<EmailOpenHistory>, subscriberRepository: Repository<Subscriber>);
    /**
     * Her abone için kişiselleştirilmiş optimal gönderim zamanı hesaplar
     */
    calculateOptimalTimeForSubscriber(subscriberId: string, minDataPoints?: number): Promise<OptimalTimeResult>;
    /**
     * Tüm kampanya için optimal gönderim zamanı hesaplar
     */
    calculateOptimalTimeForCampaign(subscriberIds: string[]): Promise<{
        globalTime: Date;
        individualTimes: Map<string, Date>;
    }>;
    /**
     * Global optimal gönderim zamanını hesaplar
     */
    calculateGlobalOptimalTime(): Promise<GlobalOptimalTime>;
    /**
     * Bir aboneye ait email açma geçmişini kaydeder
     */
    recordEmailOpen(subscriberId: string, campaignId: string, metadata?: {
        timezone?: string;
        deviceType?: string;
        emailClient?: string;
        ipAddress?: string;
        country?: string;
        city?: string;
    }): Promise<void>;
    /**
     * Belirli bir segment için optimal gönderim zamanı önerileri
     */
    getSegmentOptimalTimes(segmentId: string): Promise<{
        recommendations: Array<{
            time: string;
            expectedOpenRate: number;
            reason: string;
        }>;
    }>;
    /**
     * Dağılımdan optimal değeri bulur
     */
    private findOptimalValue;
    /**
     * Ağırlıklı ortalama hesaplar
     */
    private calculateWeightedAverage;
    /**
     * Bir sonraki belirtilen gün ve saati hesaplar
     */
    private getNextOccurrence;
    /**
     * Gün numarasından gün adını döndürür
     */
    private getDayName;
}
export {};
//# sourceMappingURL=send-time-optimization.service.d.ts.map
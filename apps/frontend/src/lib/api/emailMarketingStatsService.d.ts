import { Group, Segment } from '@affexai/shared-types';
export interface RecipientStats {
    totalActiveSubscribers: number;
    groups: Group[];
    segments: Segment[];
}
declare class EmailMarketingStatsService {
    private basePath;
    getRecipientStats(): Promise<RecipientStats>;
    getCampaignStats(campaignId: string): Promise<any>;
    getOverallStats(startDate?: string, endDate?: string): Promise<any>;
}
declare const emailMarketingStatsService: EmailMarketingStatsService;
export default emailMarketingStatsService;
//# sourceMappingURL=emailMarketingStatsService.d.ts.map
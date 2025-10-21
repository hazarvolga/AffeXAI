interface CampaignSchedulerProps {
    campaignId: string;
    currentStatus: string;
    currentScheduledAt?: string;
    onScheduleUpdate?: () => void;
}
export default function CampaignScheduler({ campaignId, currentStatus, currentScheduledAt, onScheduleUpdate }: CampaignSchedulerProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=CampaignScheduler.d.ts.map
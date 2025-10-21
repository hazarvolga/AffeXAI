interface AbTestCreatorProps {
    campaignId: string;
    campaignName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTestCreated?: () => void;
}
export default function AbTestCreator({ campaignId, campaignName, open, onOpenChange, onTestCreated }: AbTestCreatorProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=AbTestCreator.d.ts.map
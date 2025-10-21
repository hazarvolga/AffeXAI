interface AbTestResultsProps {
    campaignId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onWinnerSelected?: () => void;
}
export default function AbTestResultsViewer({ campaignId, open, onOpenChange, onWinnerSelected }: AbTestResultsProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=AbTestResults.d.ts.map
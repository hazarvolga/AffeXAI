interface AiEmailGeneratorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onGenerated: (subject: string, bodyHtml: string, alternatives: string[]) => void;
    defaultCampaignName?: string;
}
export default function AiEmailGenerator({ open, onOpenChange, onGenerated, defaultCampaignName, }: AiEmailGeneratorProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=AiEmailGenerator.d.ts.map
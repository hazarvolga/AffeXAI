export declare enum ActionImpactLevel {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
interface ApprovalSettingsProps {
    requiresApproval: boolean;
    impactLevel: ActionImpactLevel;
    onRequiresApprovalChange: (value: boolean) => void;
    onImpactLevelChange: (value: ActionImpactLevel) => void;
}
export default function ApprovalSettings({ requiresApproval, impactLevel, onRequiresApprovalChange, onImpactLevelChange, }: ApprovalSettingsProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ApprovalSettings.d.ts.map
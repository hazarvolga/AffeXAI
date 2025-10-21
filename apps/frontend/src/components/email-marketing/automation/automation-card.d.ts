/**
 * Automation Card Component
 * Card display for individual automation
 */
import { Automation } from '@/types/automation';
interface AutomationCardProps {
    automation: Automation;
    onDelete: (id: string) => void;
}
export declare function AutomationCard({ automation, onDelete }: AutomationCardProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=automation-card.d.ts.map
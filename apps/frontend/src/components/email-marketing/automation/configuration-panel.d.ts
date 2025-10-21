import { Node } from '@xyflow/react';
interface ConfigurationPanelProps {
    selectedNode: Node | null;
    onClose: () => void;
    onUpdate?: (nodeId: string, data: any) => void;
}
export declare function ConfigurationPanel({ selectedNode, onClose, onUpdate }: ConfigurationPanelProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=configuration-panel.d.ts.map
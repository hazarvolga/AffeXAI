import { NodeProps } from '@xyflow/react';
export type ConditionNodeData = {
    label: string;
    condition?: string;
    field?: string;
    operator?: string;
    value?: string;
    configured?: boolean;
};
declare function ConditionNode({ data, selected }: NodeProps<ConditionNodeData>): import("react").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof ConditionNode>;
export default _default;
//# sourceMappingURL=condition-node.d.ts.map
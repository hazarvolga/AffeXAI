import { NodeProps } from '@xyflow/react';
export type DelayNodeData = {
    label: string;
    duration?: number;
    unit?: 'minutes' | 'hours' | 'days';
    configured?: boolean;
};
declare function DelayNode({ data, selected }: NodeProps<DelayNodeData>): import("react").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof DelayNode>;
export default _default;
//# sourceMappingURL=delay-node.d.ts.map
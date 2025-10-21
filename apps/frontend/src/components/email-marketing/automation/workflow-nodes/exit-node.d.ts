import { NodeProps } from '@xyflow/react';
export type ExitNodeData = {
    label: string;
    reason?: string;
};
declare function ExitNode({ data, selected }: NodeProps<ExitNodeData>): import("react").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof ExitNode>;
export default _default;
//# sourceMappingURL=exit-node.d.ts.map
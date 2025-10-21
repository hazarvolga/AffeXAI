import { NodeProps } from '@xyflow/react';
export type SendEmailNodeData = {
    label: string;
    templateId?: string;
    subject?: string;
    configured?: boolean;
};
declare function SendEmailNode({ data, selected }: NodeProps<SendEmailNodeData>): import("react").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof SendEmailNode>;
export default _default;
//# sourceMappingURL=send-email-node.d.ts.map
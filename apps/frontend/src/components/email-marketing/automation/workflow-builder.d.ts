import { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
interface WorkflowBuilderProps {
    initialNodes?: Node[];
    initialEdges?: Edge[];
    onChange?: (data: {
        nodes: Node[];
        edges: Edge[];
    }) => void;
}
export declare function WorkflowBuilder({ initialNodes: propInitialNodes, initialEdges: propInitialEdges, onChange, }?: WorkflowBuilderProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=workflow-builder.d.ts.map
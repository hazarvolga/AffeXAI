"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowBuilder = WorkflowBuilder;
const react_1 = require("react");
const react_2 = require("@xyflow/react");
require("@xyflow/react/dist/style.css");
const step_library_sidebar_1 = require("./step-library-sidebar");
const configuration_panel_1 = require("./configuration-panel");
const workflow_nodes_1 = require("./workflow-nodes");
// Node type definitions for React Flow
const nodeTypes = {
    startNode: workflow_nodes_1.StartNode,
    sendEmailNode: workflow_nodes_1.SendEmailNode,
    delayNode: workflow_nodes_1.DelayNode,
    conditionNode: workflow_nodes_1.ConditionNode,
    exitNode: workflow_nodes_1.ExitNode,
};
// Initial setup with start node
const initialNodes = [
    {
        id: 'start-1',
        type: 'startNode',
        data: {
            label: 'Workflow starts here',
            triggerType: 'Event'
        },
        position: { x: 250, y: 50 },
    },
];
const initialEdges = [];
let nodeId = 1;
function WorkflowBuilder({ initialNodes: propInitialNodes, initialEdges: propInitialEdges, onChange, } = {}) {
    const reactFlowWrapper = (0, react_1.useRef)(null);
    const [nodes, setNodes, onNodesChange] = (0, react_2.useNodesState)(propInitialNodes || initialNodes);
    const [edges, setEdges, onEdgesChange] = (0, react_2.useEdgesState)(propInitialEdges || initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = (0, react_1.useState)(null);
    const [selectedNode, setSelectedNode] = (0, react_1.useState)(null);
    // Notify parent of changes
    (0, react_1.useEffect)(() => {
        if (onChange) {
            onChange({ nodes, edges });
        }
    }, [nodes, edges, onChange]);
    // Handle node click - open configuration panel
    const onNodeClick = (0, react_1.useCallback)((_event, node) => {
        setSelectedNode(node);
    }, []);
    // Handle node update from configuration panel
    const handleNodeUpdate = (0, react_1.useCallback)((nodeId, data) => {
        setNodes((nds) => nds.map((node) => node.id === nodeId
            ? { ...node, data: { ...node.data, ...data } }
            : node));
    }, [setNodes]);
    // Handle connection creation
    const onConnect = (0, react_1.useCallback)((params) => {
        setEdges((eds) => (0, react_2.addEdge)({
            ...params,
            animated: true,
            style: { strokeWidth: 2 }
        }, eds));
    }, [setEdges]);
    // Handle drag over canvas (for drop zone)
    const onDragOver = (0, react_1.useCallback)((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);
    // Handle drop - create new node
    const onDrop = (0, react_1.useCallback)((event) => {
        event.preventDefault();
        const type = event.dataTransfer.getData('application/reactflow');
        if (!type || !reactFlowInstance || !reactFlowWrapper.current) {
            return;
        }
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        nodeId++;
        const newNodeId = `${type}-${nodeId}`;
        // Create node data based on type
        let nodeData = {};
        let nodeType = '';
        switch (type) {
            case 'sendEmail':
                nodeType = 'sendEmailNode';
                nodeData = {
                    label: 'Configure email',
                    configured: false,
                };
                break;
            case 'delay':
                nodeType = 'delayNode';
                nodeData = {
                    label: 'Wait before continuing',
                    configured: false,
                };
                break;
            case 'condition':
                nodeType = 'conditionNode';
                nodeData = {
                    label: 'Add condition',
                    configured: false,
                };
                break;
            case 'exit':
                nodeType = 'exitNode';
                nodeData = {
                    label: 'Workflow completed',
                };
                break;
            default:
                return;
        }
        const newNode = {
            id: newNodeId,
            type: nodeType,
            position,
            data: nodeData,
        };
        setNodes((nds) => nds.concat(newNode));
    }, [reactFlowInstance, setNodes]);
    // Close configuration panel
    const handleCloseConfig = (0, react_1.useCallback)(() => {
        setSelectedNode(null);
    }, []);
    // Handle pane click - deselect node
    const onPaneClick = (0, react_1.useCallback)(() => {
        setSelectedNode(null);
    }, []);
    return (<div className="flex h-screen">
      {/* Left Sidebar - Step Library */}
      <step_library_sidebar_1.StepLibrarySidebar />

      {/* Center - Canvas */}
      <div ref={reactFlowWrapper} className="flex-1 relative">
        <react_2.ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={onNodeClick} onPaneClick={onPaneClick} onInit={setReactFlowInstance} onDrop={onDrop} onDragOver={onDragOver} nodeTypes={nodeTypes} fitView attributionPosition="bottom-left">
          <react_2.Background variant={react_2.BackgroundVariant.Dots} gap={12} size={1}/>
          <react_2.Controls />
          <react_2.MiniMap nodeColor={(node) => {
            switch (node.type) {
                case 'startNode':
                    return '#10b981';
                case 'sendEmailNode':
                    return '#3b82f6';
                case 'delayNode':
                    return '#f59e0b';
                case 'conditionNode':
                    return '#8b5cf6';
                case 'exitNode':
                    return '#10b981';
                default:
                    return '#d1d5db';
            }
        }} maskColor="rgb(240, 240, 240, 0.6)"/>
        </react_2.ReactFlow>
      </div>

      {/* Configuration Panel (Conditional) */}
      {selectedNode && (<configuration_panel_1.ConfigurationPanel selectedNode={selectedNode} onClose={() => setSelectedNode(null)} onUpdate={handleNodeUpdate}/>)}
    </div>);
}
//# sourceMappingURL=workflow-builder.js.map
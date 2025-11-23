'use client';

import { useCallback, useState, useRef, useEffect, DragEvent } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
  NodeTypes,
  ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { StepLibrarySidebar } from './step-library-sidebar';
import { ConfigurationPanel } from './configuration-panel';
import {
  StartNode,
  SendEmailNode,
  DelayNode,
  ConditionNode,
  ExitNode,
} from './workflow-nodes';

// Node type definitions for React Flow
const nodeTypes: NodeTypes = {
  startNode: StartNode as any,
  sendEmailNode: SendEmailNode as any,
  delayNode: DelayNode as any,
  conditionNode: ConditionNode as any,
  exitNode: ExitNode as any,
};

// Initial setup with start node
const initialNodes: Node[] = [
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

const initialEdges: Edge[] = [];

let nodeId = 1;

interface WorkflowBuilderProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  onChange?: (data: { nodes: Node[]; edges: Edge[] }) => void;
}

export function WorkflowBuilder({
  initialNodes: propInitialNodes,
  initialEdges: propInitialEdges,
  onChange,
}: WorkflowBuilderProps = {}) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(propInitialNodes || initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(propInitialEdges || initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Notify parent of changes
  useEffect(() => {
    if (onChange) {
      onChange({ nodes, edges });
    }
  }, [nodes, edges, onChange]);

  // Handle node click - open configuration panel
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Handle node update from configuration panel
  const handleNodeUpdate = useCallback((nodeId: string, data: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node
      )
    );
  }, [setNodes]);

  // Handle connection creation
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({
        ...params,
        animated: true,
        style: { strokeWidth: 2 }
      }, eds));
    },
    [setEdges]
  );

  // Handle drag over canvas (for drop zone)
  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop - create new node
  const onDrop = useCallback(
    (event: DragEvent) => {
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
      let nodeData: any = {};
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

      const newNode: Node = {
        id: newNodeId,
        type: nodeType,
        position,
        data: nodeData,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Close configuration panel
  const handleCloseConfig = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Handle pane click - deselect node
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Step Library */}
      <StepLibrarySidebar />

      {/* Center - Canvas */}
      <div 
        ref={reactFlowWrapper}
        className="flex-1 relative"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={12} 
            size={1} 
          />
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
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
            }}
            maskColor="rgb(240, 240, 240, 0.6)"
          />
        </ReactFlow>
      </div>

      {/* Configuration Panel (Conditional) */}
      {selectedNode && (
        <ConfigurationPanel
          selectedNode={selectedNode}
          onClose={() => setSelectedNode(null)}
          onUpdate={handleNodeUpdate}
        />
      )}
    </div>
  );
}

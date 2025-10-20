'use client';

import { useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  X,
  Settings,
  Mail,
  Clock,
  GitBranch,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Node } from '@xyflow/react';
import {
  SendEmailConfigForm,
  type SendEmailConfigData,
  DelayConfigForm,
  type DelayConfigData,
  ConditionConfigForm,
  type ConditionConfigData,
} from './workflow-config-forms';

interface ConfigurationPanelProps {
  selectedNode: Node | null;
  onClose: () => void;
  onUpdate?: (nodeId: string, data: any) => void;
}

export function ConfigurationPanel({ 
  selectedNode, 
  onClose,
  onUpdate 
}: ConfigurationPanelProps) {
  if (!selectedNode) {
    return null;
  }

  const getNodeIcon = () => {
    switch (selectedNode.type) {
      case 'startNode':
        return Settings;
      case 'sendEmailNode':
        return Mail;
      case 'delayNode':
        return Clock;
      case 'conditionNode':
        return GitBranch;
      case 'exitNode':
        return CheckCircle2;
      default:
        return Settings;
    }
  };

  const getNodeColor = () => {
    switch (selectedNode.type) {
      case 'startNode':
        return 'text-green-600 bg-green-100';
      case 'sendEmailNode':
        return 'text-blue-600 bg-blue-100';
      case 'delayNode':
        return 'text-amber-600 bg-amber-100';
      case 'conditionNode':
        return 'text-purple-600 bg-purple-100';
      case 'exitNode':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getNodeTypeName = () => {
    switch (selectedNode.type) {
      case 'startNode':
        return 'Trigger Start';
      case 'sendEmailNode':
        return 'Send Email';
      case 'delayNode':
        return 'Delay';
      case 'conditionNode':
        return 'Condition';
      case 'exitNode':
        return 'Exit';
      default:
        return 'Unknown';
    }
  };

  const handleFormUpdate = useCallback((data: any) => {
    if (onUpdate && selectedNode) {
      onUpdate(selectedNode.id, data);
    }
  }, [onUpdate, selectedNode]);

  const renderConfigurationForm = () => {
    if (!selectedNode) return null;

    switch (selectedNode.type) {
      case 'sendEmailNode':
        return (
          <SendEmailConfigForm
            data={selectedNode.data as SendEmailConfigData}
            onUpdate={handleFormUpdate}
          />
        );
      
      case 'delayNode':
        return (
          <DelayConfigForm
            data={selectedNode.data as DelayConfigData}
            onUpdate={handleFormUpdate}
          />
        );
      
      case 'conditionNode':
        return (
          <ConditionConfigForm
            data={selectedNode.data as ConditionConfigData}
            onUpdate={handleFormUpdate}
          />
        );
      
      case 'startNode':
        return (
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-green-900">
                  Workflow Start Point
                </h4>
                <p className="text-xs text-green-800 mt-1">
                  This is the starting point of your workflow. Configure the trigger 
                  settings in the Trigger Configuration step before building the workflow.
                </p>
              </div>
            </div>
          </Card>
        );
      
      case 'exitNode':
        return (
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-green-900">
                  Workflow End Point
                </h4>
                <p className="text-xs text-green-800 mt-1">
                  This marks the end of your workflow. Subscribers reaching this 
                  point will exit the automation flow.
                </p>
              </div>
            </div>
          </Card>
        );
      
      default:
        return (
          <Card className="p-4 bg-muted">
            <p className="text-sm text-muted-foreground">
              No configuration available for this node type.
            </p>
          </Card>
        );
    }
  };

  // Get Icon component after function definitions
  const Icon = getNodeIcon();

  return (
    <Card className="w-[350px] h-full flex flex-col border-l rounded-none">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded ${getNodeColor()}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{getNodeTypeName()}</h3>
              <p className="text-xs text-muted-foreground">
                Configure step
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <Badge variant="outline" className="text-xs">
          Node ID: {selectedNode.id}
        </Badge>
      </div>

      {/* Configuration Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Dynamic Configuration Form */}
          {renderConfigurationForm()}

          <Separator />

          {/* Node Data Display */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Current Configuration</h4>
            
            <div className="space-y-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Type
                </label>
                <div className="text-sm mt-1">
                  {selectedNode.type || 'default'}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Position
                </label>
                <div className="text-sm mt-1">
                  X: {Math.round(selectedNode.position.x)}, 
                  Y: {Math.round(selectedNode.position.y)}
                </div>
              </div>

              {selectedNode.data && Object.keys(selectedNode.data).length > 0 && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Data
                  </label>
                  <div className="mt-1 p-2 bg-muted rounded text-xs font-mono">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(selectedNode.data, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs"
                disabled
              >
                Duplicate
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs text-red-600 hover:text-red-700"
                disabled
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="p-4 border-t space-y-2">
        <Button 
          className="w-full" 
          size="sm"
          disabled
        >
          Save Configuration
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          size="sm"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </Card>
  );
}

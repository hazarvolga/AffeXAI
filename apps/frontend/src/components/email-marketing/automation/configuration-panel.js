"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationPanel = ConfigurationPanel;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const scroll_area_1 = require("@/components/ui/scroll-area");
const separator_1 = require("@/components/ui/separator");
const lucide_react_1 = require("lucide-react");
const workflow_config_forms_1 = require("./workflow-config-forms");
function ConfigurationPanel({ selectedNode, onClose, onUpdate }) {
    if (!selectedNode) {
        return null;
    }
    const getNodeIcon = () => {
        switch (selectedNode.type) {
            case 'startNode':
                return lucide_react_1.Settings;
            case 'sendEmailNode':
                return lucide_react_1.Mail;
            case 'delayNode':
                return lucide_react_1.Clock;
            case 'conditionNode':
                return lucide_react_1.GitBranch;
            case 'exitNode':
                return lucide_react_1.CheckCircle2;
            default:
                return lucide_react_1.Settings;
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
    const handleFormUpdate = (0, react_1.useCallback)((data) => {
        if (onUpdate && selectedNode) {
            onUpdate(selectedNode.id, data);
        }
    }, [onUpdate, selectedNode]);
    const renderConfigurationForm = () => {
        if (!selectedNode)
            return null;
        switch (selectedNode.type) {
            case 'sendEmailNode':
                return (<workflow_config_forms_1.SendEmailConfigForm data={selectedNode.data} onUpdate={handleFormUpdate}/>);
            case 'delayNode':
                return (<workflow_config_forms_1.DelayConfigForm data={selectedNode.data} onUpdate={handleFormUpdate}/>);
            case 'conditionNode':
                return (<workflow_config_forms_1.ConditionConfigForm data={selectedNode.data} onUpdate={handleFormUpdate}/>);
            case 'startNode':
                return (<card_1.Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-start gap-2">
              <lucide_react_1.Info className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"/>
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
          </card_1.Card>);
            case 'exitNode':
                return (<card_1.Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-start gap-2">
              <lucide_react_1.Info className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"/>
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
          </card_1.Card>);
            default:
                return (<card_1.Card className="p-4 bg-muted">
            <p className="text-sm text-muted-foreground">
              No configuration available for this node type.
            </p>
          </card_1.Card>);
        }
    };
    // Get Icon component after function definitions
    const Icon = getNodeIcon();
    return (<card_1.Card className="w-[350px] h-full flex flex-col border-l rounded-none">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded ${getNodeColor()}`}>
              <Icon className="w-4 h-4"/>
            </div>
            <div>
              <h3 className="font-semibold text-sm">{getNodeTypeName()}</h3>
              <p className="text-xs text-muted-foreground">
                Configure step
              </p>
            </div>
          </div>
          <button_1.Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <lucide_react_1.X className="w-4 h-4"/>
          </button_1.Button>
        </div>

        <badge_1.Badge variant="outline" className="text-xs">
          Node ID: {selectedNode.id}
        </badge_1.Badge>
      </div>

      {/* Configuration Content */}
      <scroll_area_1.ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Dynamic Configuration Form */}
          {renderConfigurationForm()}

          <separator_1.Separator />

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

              {selectedNode.data && Object.keys(selectedNode.data).length > 0 && (<div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Data
                  </label>
                  <div className="mt-1 p-2 bg-muted rounded text-xs font-mono">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(selectedNode.data, null, 2)}
                    </pre>
                  </div>
                </div>)}
            </div>
          </div>

          <separator_1.Separator />

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <button_1.Button variant="outline" size="sm" className="text-xs" disabled>
                Duplicate
              </button_1.Button>
              <button_1.Button variant="outline" size="sm" className="text-xs text-red-600 hover:text-red-700" disabled>
                Delete
              </button_1.Button>
            </div>
          </div>
        </div>
      </scroll_area_1.ScrollArea>

      {/* Footer Actions */}
      <div className="p-4 border-t space-y-2">
        <button_1.Button className="w-full" size="sm" disabled>
          Save Configuration
        </button_1.Button>
        <button_1.Button variant="outline" className="w-full" size="sm" onClick={onClose}>
          Close
        </button_1.Button>
      </div>
    </card_1.Card>);
}
//# sourceMappingURL=configuration-panel.js.map
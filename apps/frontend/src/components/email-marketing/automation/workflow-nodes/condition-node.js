"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("@xyflow/react");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
function ConditionNode({ data, selected }) {
    return (<>
      {/* Input Handle */}
      <react_2.Handle type="target" position={react_2.Position.Top} className="w-3 h-3 bg-purple-500 border-2 border-white"/>

      <card_1.Card className={`min-w-[200px] transition-all ${selected
            ? 'ring-2 ring-primary shadow-lg'
            : 'hover:shadow-md'}`}>
        <div className="p-4 space-y-2">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-100 rounded">
                <lucide_react_1.GitBranch className="w-4 h-4 text-purple-600"/>
              </div>
              <span className="font-semibold text-sm">Condition</span>
            </div>
            {!data.configured && (<badge_1.Badge variant="destructive" className="text-xs">
                Setup Required
              </badge_1.Badge>)}
          </div>

          {/* Content */}
          <div className="text-sm text-muted-foreground">
            {data.condition || data.label}
          </div>

          {/* Condition details */}
          {data.field && data.operator && (<badge_1.Badge variant="outline" className="text-xs">
              {data.field} {data.operator} {data.value}
            </badge_1.Badge>)}
        </div>
      </card_1.Card>

      {/* Output Handles - True/False paths */}
      <react_2.Handle type="source" position={react_2.Position.Bottom} id="true" className="w-3 h-3 bg-green-500 border-2 border-white" style={{ left: '30%' }}/>
      <react_2.Handle type="source" position={react_2.Position.Bottom} id="false" className="w-3 h-3 bg-red-500 border-2 border-white" style={{ left: '70%' }}/>
    </>);
}
exports.default = (0, react_1.memo)(ConditionNode);
//# sourceMappingURL=condition-node.js.map
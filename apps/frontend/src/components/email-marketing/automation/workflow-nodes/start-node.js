"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("@xyflow/react");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
function StartNode({ data, selected }) {
    return (<card_1.Card className={`min-w-[200px] transition-all ${selected
            ? 'ring-2 ring-primary shadow-lg'
            : 'hover:shadow-md'}`}>
      <div className="p-4 space-y-2">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-green-100 rounded">
            <lucide_react_1.Zap className="w-4 h-4 text-green-600"/>
          </div>
          <span className="font-semibold text-sm">Trigger Start</span>
        </div>

        {/* Content */}
        <div className="text-sm text-muted-foreground">
          {data.label}
        </div>

        {/* Badge */}
        {data.triggerType && (<badge_1.Badge variant="outline" className="text-xs">
            {data.triggerType}
          </badge_1.Badge>)}
      </div>

      {/* Output Handle */}
      <react_2.Handle type="source" position={react_2.Position.Bottom} className="w-3 h-3 bg-green-500 border-2 border-white"/>
    </card_1.Card>);
}
exports.default = (0, react_1.memo)(StartNode);
//# sourceMappingURL=start-node.js.map
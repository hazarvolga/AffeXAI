"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("@xyflow/react");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
function DelayNode({ data, selected }) {
    const getDurationText = () => {
        if (!data.duration || !data.unit)
            return 'Not configured';
        return `${data.duration} ${data.unit}`;
    };
    return (<>
      {/* Input Handle */}
      <react_2.Handle type="target" position={react_2.Position.Top} className="w-3 h-3 bg-amber-500 border-2 border-white"/>

      <card_1.Card className={`min-w-[200px] transition-all ${selected
            ? 'ring-2 ring-primary shadow-lg'
            : 'hover:shadow-md'}`}>
        <div className="p-4 space-y-2">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 rounded">
                <lucide_react_1.Clock className="w-4 h-4 text-amber-600"/>
              </div>
              <span className="font-semibold text-sm">Delay</span>
            </div>
            {!data.configured && (<badge_1.Badge variant="destructive" className="text-xs">
                Setup Required
              </badge_1.Badge>)}
          </div>

          {/* Content */}
          <div className="text-sm text-muted-foreground">
            {data.label || 'Wait before continuing'}
          </div>

          {/* Duration */}
          <badge_1.Badge variant="outline" className="text-xs">
            ⏱️ {getDurationText()}
          </badge_1.Badge>
        </div>
      </card_1.Card>

      {/* Output Handle */}
      <react_2.Handle type="source" position={react_2.Position.Bottom} className="w-3 h-3 bg-amber-500 border-2 border-white"/>
    </>);
}
exports.default = (0, react_1.memo)(DelayNode);
//# sourceMappingURL=delay-node.js.map
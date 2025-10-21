"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepLibrarySidebar = StepLibrarySidebar;
const card_1 = require("@/components/ui/card");
const scroll_area_1 = require("@/components/ui/scroll-area");
const separator_1 = require("@/components/ui/separator");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
const STEP_LIBRARY = [
    {
        type: 'sendEmail',
        label: 'Send Email',
        description: 'Send an email to subscriber',
        icon: lucide_react_1.Mail,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
    },
    {
        type: 'delay',
        label: 'Delay',
        description: 'Wait before continuing',
        icon: lucide_react_1.Clock,
        color: 'text-amber-600',
        bgColor: 'bg-amber-100',
    },
    {
        type: 'condition',
        label: 'Condition',
        description: 'Branch based on criteria',
        icon: lucide_react_1.GitBranch,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
    },
    {
        type: 'exit',
        label: 'Exit',
        description: 'End the workflow',
        icon: lucide_react_1.CheckCircle2,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
    },
];
function StepLibrarySidebar({ onDragStart }) {
    const handleDragStart = (event, stepType) => {
        event.dataTransfer.setData('application/reactflow', stepType);
        event.dataTransfer.effectAllowed = 'move';
        if (onDragStart) {
            onDragStart(event, stepType);
        }
    };
    return (<card_1.Card className="w-[280px] h-full flex flex-col border-r rounded-none">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-semibold">Workflow Steps</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Drag and drop to canvas
        </p>
      </div>

      {/* Step Library */}
      <scroll_area_1.ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Actions
            </div>
            <separator_1.Separator className="my-2"/>
          </div>

          {STEP_LIBRARY.map((step) => {
            const Icon = step.icon;
            return (<div key={step.type} draggable onDragStart={(e) => handleDragStart(e, step.type)} className="group cursor-move">
                <card_1.Card className="p-3 hover:shadow-md transition-all hover:border-primary/50">
                  <div className="flex items-start gap-3">
                    {/* Drag Handle */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <lucide_react_1.GripVertical className="w-4 h-4 text-muted-foreground"/>
                    </div>

                    {/* Icon */}
                    <div className={`p-1.5 rounded ${step.bgColor} flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${step.color}`}/>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{step.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {step.description}
                      </div>
                    </div>
                  </div>
                </card_1.Card>
              </div>);
        })}
        </div>

        {/* Tips Section */}
        <div className="p-4 pt-2">
          <separator_1.Separator className="mb-3"/>
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Tips
            </div>
            <div className="text-xs text-muted-foreground space-y-1.5">
              <div className="flex items-start gap-2">
                <badge_1.Badge variant="outline" className="text-[10px] px-1 py-0">1</badge_1.Badge>
                <span>Drag steps onto canvas</span>
              </div>
              <div className="flex items-start gap-2">
                <badge_1.Badge variant="outline" className="text-[10px] px-1 py-0">2</badge_1.Badge>
                <span>Connect nodes by dragging</span>
              </div>
              <div className="flex items-start gap-2">
                <badge_1.Badge variant="outline" className="text-[10px] px-1 py-0">3</badge_1.Badge>
                <span>Click to configure</span>
              </div>
            </div>
          </div>
        </div>
      </scroll_area_1.ScrollArea>
    </card_1.Card>);
}
//# sourceMappingURL=step-library-sidebar.js.map
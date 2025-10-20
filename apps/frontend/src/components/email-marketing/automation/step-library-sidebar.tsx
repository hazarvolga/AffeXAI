'use client';

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Clock, 
  GitBranch, 
  CheckCircle2,
  GripVertical 
} from 'lucide-react';

type StepType = 'sendEmail' | 'delay' | 'condition' | 'exit';

interface StepDefinition {
  type: StepType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

const STEP_LIBRARY: StepDefinition[] = [
  {
    type: 'sendEmail',
    label: 'Send Email',
    description: 'Send an email to subscriber',
    icon: Mail,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    type: 'delay',
    label: 'Delay',
    description: 'Wait before continuing',
    icon: Clock,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    type: 'condition',
    label: 'Condition',
    description: 'Branch based on criteria',
    icon: GitBranch,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    type: 'exit',
    label: 'Exit',
    description: 'End the workflow',
    icon: CheckCircle2,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
];

interface StepLibrarySidebarProps {
  onDragStart?: (event: React.DragEvent, stepType: StepType) => void;
}

export function StepLibrarySidebar({ onDragStart }: StepLibrarySidebarProps) {
  const handleDragStart = (event: React.DragEvent, stepType: StepType) => {
    event.dataTransfer.setData('application/reactflow', stepType);
    event.dataTransfer.effectAllowed = 'move';
    
    if (onDragStart) {
      onDragStart(event, stepType);
    }
  };

  return (
    <Card className="w-[280px] h-full flex flex-col border-r rounded-none">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-semibold">Workflow Steps</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Drag and drop to canvas
        </p>
      </div>

      {/* Step Library */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Actions
            </div>
            <Separator className="my-2" />
          </div>

          {STEP_LIBRARY.map((step) => {
            const Icon = step.icon;
            
            return (
              <div
                key={step.type}
                draggable
                onDragStart={(e) => handleDragStart(e, step.type)}
                className="group cursor-move"
              >
                <Card className="p-3 hover:shadow-md transition-all hover:border-primary/50">
                  <div className="flex items-start gap-3">
                    {/* Drag Handle */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </div>

                    {/* Icon */}
                    <div className={`p-1.5 rounded ${step.bgColor} flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${step.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{step.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {step.description}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Tips Section */}
        <div className="p-4 pt-2">
          <Separator className="mb-3" />
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Tips
            </div>
            <div className="text-xs text-muted-foreground space-y-1.5">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-[10px] px-1 py-0">1</Badge>
                <span>Drag steps onto canvas</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-[10px] px-1 py-0">2</Badge>
                <span>Connect nodes by dragging</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-[10px] px-1 py-0">3</Badge>
                <span>Click to configure</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

export type DelayNodeData = {
  label: string;
  duration?: number;
  unit?: 'minutes' | 'hours' | 'days';
  configured?: boolean;
};

function DelayNode({ data, selected }: NodeProps<DelayNodeData>) {
  const getDurationText = () => {
    if (!data.duration || !data.unit) return 'Not configured';
    return `${data.duration} ${data.unit}`;
  };

  return (
    <>
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-amber-500 border-2 border-white"
      />

      <Card 
        className={`min-w-[200px] transition-all ${
          selected 
            ? 'ring-2 ring-primary shadow-lg' 
            : 'hover:shadow-md'
        }`}
      >
        <div className="p-4 space-y-2">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 rounded">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <span className="font-semibold text-sm">Delay</span>
            </div>
            {!data.configured && (
              <Badge variant="destructive" className="text-xs">
                Setup Required
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="text-sm text-muted-foreground">
            {data.label || 'Wait before continuing'}
          </div>

          {/* Duration */}
          <Badge variant="outline" className="text-xs">
            ⏱️ {getDurationText()}
          </Badge>
        </div>
      </Card>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-amber-500 border-2 border-white"
      />
    </>
  );
}

export default memo(DelayNode);

/**
 * Automation Card Component
 * Card display for individual automation
 */

'use client';

import { Automation, AutomationStatus, TriggerType } from '@/types/automation';
import { useActivateAutomation, usePauseAutomation } from '@/hooks/use-automation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Play,
  Pause,
  Edit,
  Trash2,
  MoreVertical,
  Users,
  Activity,
  Clock,
  CheckCircle2,
  Zap,
  Calendar,
  User,
  GitBranch,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface AutomationCardProps {
  automation: Automation;
  onDelete: (id: string) => void;
}

export function AutomationCard({ automation, onDelete }: AutomationCardProps) {
  const activateMutation = useActivateAutomation();
  const pauseMutation = usePauseAutomation();

  const handleActivate = async () => {
    await activateMutation.mutateAsync({ id: automation.id, registerExisting: false });
  };

  const handlePause = async () => {
    await pauseMutation.mutateAsync({ id: automation.id, cancelPending: false });
  };

  const getStatusColor = (status: AutomationStatus) => {
    switch (status) {
      case AutomationStatus.ACTIVE:
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case AutomationStatus.PAUSED:
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case AutomationStatus.DRAFT:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
      case AutomationStatus.COMPLETED:
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case AutomationStatus.ARCHIVED:
        return 'bg-gray-400/10 text-gray-400 hover:bg-gray-400/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };

  const getTriggerIcon = (type: TriggerType) => {
    switch (type) {
      case TriggerType.EVENT:
        return <Zap className="h-4 w-4" />;
      case TriggerType.BEHAVIOR:
        return <Activity className="h-4 w-4" />;
      case TriggerType.TIME_BASED:
        return <Calendar className="h-4 w-4" />;
      case TriggerType.ATTRIBUTE:
        return <User className="h-4 w-4" />;
      default:
        return <GitBranch className="h-4 w-4" />;
    }
  };

  const canActivate = automation.status === AutomationStatus.DRAFT || automation.status === AutomationStatus.PAUSED;
  const canPause = automation.status === AutomationStatus.ACTIVE;

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      {/* Status Indicator */}
      <div
        className={cn(
          'absolute left-0 top-0 h-1 w-full',
          automation.status === AutomationStatus.ACTIVE && 'bg-green-500',
          automation.status === AutomationStatus.PAUSED && 'bg-yellow-500',
          automation.status === AutomationStatus.DRAFT && 'bg-gray-400'
        )}
      />

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              {getTriggerIcon(automation.triggerType)}
              <CardTitle className="line-clamp-1">{automation.name}</CardTitle>
            </div>
            <CardDescription className="line-clamp-2">
              {automation.description || 'No description'}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/email-marketing/automations/${automation.id}`}>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <Link href={`/email-marketing/automations/${automation.id}/analytics`}>
                <DropdownMenuItem>
                  <Activity className="mr-2 h-4 w-4" />
                  View Analytics
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              {canActivate && (
                <DropdownMenuItem onClick={handleActivate}>
                  <Play className="mr-2 h-4 w-4" />
                  Activate
                </DropdownMenuItem>
              )}
              {canPause && (
                <DropdownMenuItem onClick={handlePause}>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(automation.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Badge className={getStatusColor(automation.status)}>{automation.status}</Badge>
          <Badge variant="outline" className="capitalize">
            {automation.triggerType.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{automation.subscriberCount.toLocaleString()}</span>
              <span className="text-muted-foreground">subscribers</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{automation.executionCount.toLocaleString()}</span>
              <span className="text-muted-foreground">runs</span>
            </div>
          </div>

          {/* Performance Metrics */}
          {automation.executionCount > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">Success Rate</span>
                </div>
                <span className="font-medium">{automation.successRate.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Avg. Time</span>
                </div>
                <span className="font-medium">
                  {automation.avgExecutionTime > 60
                    ? `${(automation.avgExecutionTime / 60).toFixed(1)}m`
                    : `${automation.avgExecutionTime.toFixed(0)}s`}
                </span>
              </div>
            </div>
          )}

          {/* Workflow Steps */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GitBranch className="h-4 w-4" />
            <span>{automation.workflowSteps.length} steps</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        {canActivate && (
          <Button
            onClick={handleActivate}
            disabled={activateMutation.isPending}
            className="flex-1"
          >
            <Play className="mr-2 h-4 w-4" />
            Activate
          </Button>
        )}
        {canPause && (
          <Button
            onClick={handlePause}
            disabled={pauseMutation.isPending}
            variant="outline"
            className="flex-1"
          >
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </Button>
        )}
        <Link href={`/email-marketing/automations/${automation.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

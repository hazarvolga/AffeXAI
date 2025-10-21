"use strict";
/**
 * Automation Card Component
 * Card display for individual automation
 */
'use client';
/**
 * Automation Card Component
 * Card display for individual automation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationCard = AutomationCard;
const automation_1 = require("@/types/automation");
const use_automation_1 = require("@/hooks/use-automation");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const link_1 = __importDefault(require("next/link"));
function AutomationCard({ automation, onDelete }) {
    const activateMutation = (0, use_automation_1.useActivateAutomation)();
    const pauseMutation = (0, use_automation_1.usePauseAutomation)();
    const handleActivate = async () => {
        await activateMutation.mutateAsync({ id: automation.id, registerExisting: false });
    };
    const handlePause = async () => {
        await pauseMutation.mutateAsync({ id: automation.id, cancelPending: false });
    };
    const getStatusColor = (status) => {
        switch (status) {
            case automation_1.AutomationStatus.ACTIVE:
                return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
            case automation_1.AutomationStatus.PAUSED:
                return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
            case automation_1.AutomationStatus.DRAFT:
                return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
            case automation_1.AutomationStatus.COMPLETED:
                return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
            case automation_1.AutomationStatus.ARCHIVED:
                return 'bg-gray-400/10 text-gray-400 hover:bg-gray-400/20';
            default:
                return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
        }
    };
    const getTriggerIcon = (type) => {
        switch (type) {
            case automation_1.TriggerType.EVENT:
                return <lucide_react_1.Zap className="h-4 w-4"/>;
            case automation_1.TriggerType.BEHAVIOR:
                return <lucide_react_1.Activity className="h-4 w-4"/>;
            case automation_1.TriggerType.TIME_BASED:
                return <lucide_react_1.Calendar className="h-4 w-4"/>;
            case automation_1.TriggerType.ATTRIBUTE:
                return <lucide_react_1.User className="h-4 w-4"/>;
            default:
                return <lucide_react_1.GitBranch className="h-4 w-4"/>;
        }
    };
    const canActivate = automation.status === automation_1.AutomationStatus.DRAFT || automation.status === automation_1.AutomationStatus.PAUSED;
    const canPause = automation.status === automation_1.AutomationStatus.ACTIVE;
    return (<card_1.Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      {/* Status Indicator */}
      <div className={(0, utils_1.cn)('absolute left-0 top-0 h-1 w-full', automation.status === automation_1.AutomationStatus.ACTIVE && 'bg-green-500', automation.status === automation_1.AutomationStatus.PAUSED && 'bg-yellow-500', automation.status === automation_1.AutomationStatus.DRAFT && 'bg-gray-400')}/>

      <card_1.CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              {getTriggerIcon(automation.triggerType)}
              <card_1.CardTitle className="line-clamp-1">{automation.name}</card_1.CardTitle>
            </div>
            <card_1.CardDescription className="line-clamp-2">
              {automation.description || 'No description'}
            </card_1.CardDescription>
          </div>
          <dropdown_menu_1.DropdownMenu>
            <dropdown_menu_1.DropdownMenuTrigger asChild>
              <button_1.Button variant="ghost" size="icon" className="h-8 w-8">
                <lucide_react_1.MoreVertical className="h-4 w-4"/>
              </button_1.Button>
            </dropdown_menu_1.DropdownMenuTrigger>
            <dropdown_menu_1.DropdownMenuContent align="end">
              <link_1.default href={`/email-marketing/automations/${automation.id}`}>
                <dropdown_menu_1.DropdownMenuItem>
                  <lucide_react_1.Edit className="mr-2 h-4 w-4"/>
                  Edit
                </dropdown_menu_1.DropdownMenuItem>
              </link_1.default>
              <link_1.default href={`/email-marketing/automations/${automation.id}/analytics`}>
                <dropdown_menu_1.DropdownMenuItem>
                  <lucide_react_1.Activity className="mr-2 h-4 w-4"/>
                  View Analytics
                </dropdown_menu_1.DropdownMenuItem>
              </link_1.default>
              <dropdown_menu_1.DropdownMenuSeparator />
              {canActivate && (<dropdown_menu_1.DropdownMenuItem onClick={handleActivate}>
                  <lucide_react_1.Play className="mr-2 h-4 w-4"/>
                  Activate
                </dropdown_menu_1.DropdownMenuItem>)}
              {canPause && (<dropdown_menu_1.DropdownMenuItem onClick={handlePause}>
                  <lucide_react_1.Pause className="mr-2 h-4 w-4"/>
                  Pause
                </dropdown_menu_1.DropdownMenuItem>)}
              <dropdown_menu_1.DropdownMenuSeparator />
              <dropdown_menu_1.DropdownMenuItem onClick={() => onDelete(automation.id)} className="text-destructive focus:text-destructive">
                <lucide_react_1.Trash2 className="mr-2 h-4 w-4"/>
                Delete
              </dropdown_menu_1.DropdownMenuItem>
            </dropdown_menu_1.DropdownMenuContent>
          </dropdown_menu_1.DropdownMenu>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <badge_1.Badge className={getStatusColor(automation.status)}>{automation.status}</badge_1.Badge>
          <badge_1.Badge variant="outline" className="capitalize">
            {automation.triggerType.replace('_', ' ')}
          </badge_1.Badge>
        </div>
      </card_1.CardHeader>

      <card_1.CardContent>
        <div className="space-y-3">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
              <span className="font-medium">{automation.subscriberCount.toLocaleString()}</span>
              <span className="text-muted-foreground">subscribers</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <lucide_react_1.Activity className="h-4 w-4 text-muted-foreground"/>
              <span className="font-medium">{automation.executionCount.toLocaleString()}</span>
              <span className="text-muted-foreground">runs</span>
            </div>
          </div>

          {/* Performance Metrics */}
          {automation.executionCount > 0 && (<div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <lucide_react_1.CheckCircle2 className="h-4 w-4 text-green-500"/>
                  <span className="text-muted-foreground">Success Rate</span>
                </div>
                <span className="font-medium">{automation.successRate.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <lucide_react_1.Clock className="h-4 w-4 text-muted-foreground"/>
                  <span className="text-muted-foreground">Avg. Time</span>
                </div>
                <span className="font-medium">
                  {automation.avgExecutionTime > 60
                ? `${(automation.avgExecutionTime / 60).toFixed(1)}m`
                : `${automation.avgExecutionTime.toFixed(0)}s`}
                </span>
              </div>
            </div>)}

          {/* Workflow Steps */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <lucide_react_1.GitBranch className="h-4 w-4"/>
            <span>{automation.workflowSteps.length} steps</span>
          </div>
        </div>
      </card_1.CardContent>

      <card_1.CardFooter className="gap-2">
        {canActivate && (<button_1.Button onClick={handleActivate} disabled={activateMutation.isPending} className="flex-1">
            <lucide_react_1.Play className="mr-2 h-4 w-4"/>
            Activate
          </button_1.Button>)}
        {canPause && (<button_1.Button onClick={handlePause} disabled={pauseMutation.isPending} variant="outline" className="flex-1">
            <lucide_react_1.Pause className="mr-2 h-4 w-4"/>
            Pause
          </button_1.Button>)}
        <link_1.default href={`/email-marketing/automations/${automation.id}`} className="flex-1">
          <button_1.Button variant="outline" className="w-full">
            <lucide_react_1.Edit className="mr-2 h-4 w-4"/>
            Edit
          </button_1.Button>
        </link_1.default>
      </card_1.CardFooter>
    </card_1.Card>);
}
//# sourceMappingURL=automation-card.js.map
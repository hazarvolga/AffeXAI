"use strict";
/**
 * Automation List Component
 * Lists all automations with filtering and actions
 */
'use client';
/**
 * Automation List Component
 * Lists all automations with filtering and actions
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationList = AutomationList;
const react_1 = require("react");
const use_automation_1 = require("@/hooks/use-automation");
const automation_card_1 = require("./automation-card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const lucide_react_1 = require("lucide-react");
const automation_1 = require("@/types/automation");
const skeleton_1 = require("@/components/ui/skeleton");
const alert_1 = require("@/components/ui/alert");
const link_1 = __importDefault(require("next/link"));
function AutomationList() {
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [statusFilter, setStatusFilter] = (0, react_1.useState)('all');
    const [triggerFilter, setTriggerFilter] = (0, react_1.useState)('all');
    const { data: automations, isLoading, error } = (0, use_automation_1.useAutomations)();
    const deleteMutation = (0, use_automation_1.useDeleteAutomation)();
    // Filter automations
    const filteredAutomations = automations?.filter((automation) => {
        const matchesSearch = automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            automation.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || automation.status === statusFilter;
        const matchesTrigger = triggerFilter === 'all' || automation.triggerType === triggerFilter;
        return matchesSearch && matchesStatus && matchesTrigger;
    });
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this automation?')) {
            await deleteMutation.mutateAsync(id);
        }
    };
    if (error) {
        console.error('Automation load error:', error);
        return (<alert_1.Alert variant="destructive">
        <alert_1.AlertDescription>
          Failed to load automations. Please try again later.
          {process.env.NODE_ENV === 'development' && (<div className="mt-2 text-xs opacity-75">
              Error: {error instanceof Error ? error.message : 'Unknown error'}
            </div>)}
        </alert_1.AlertDescription>
      </alert_1.Alert>);
    }
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketing Automations</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage automated email workflows
          </p>
        </div>
        <link_1.default href="/admin/email-marketing/automations/new">
          <button_1.Button>
            <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
            Create Automation
          </button_1.Button>
        </link_1.default>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <lucide_react_1.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
          <input_1.Input placeholder="Search automations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9"/>
        </div>

        <select_1.Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
          <select_1.SelectTrigger className="w-[180px]">
            <lucide_react_1.Filter className="mr-2 h-4 w-4"/>
            <select_1.SelectValue placeholder="Status"/>
          </select_1.SelectTrigger>
          <select_1.SelectContent>
            <select_1.SelectItem value="all">All Status</select_1.SelectItem>
            <select_1.SelectItem value={automation_1.AutomationStatus.DRAFT}>Draft</select_1.SelectItem>
            <select_1.SelectItem value={automation_1.AutomationStatus.ACTIVE}>Active</select_1.SelectItem>
            <select_1.SelectItem value={automation_1.AutomationStatus.PAUSED}>Paused</select_1.SelectItem>
            <select_1.SelectItem value={automation_1.AutomationStatus.COMPLETED}>Completed</select_1.SelectItem>
            <select_1.SelectItem value={automation_1.AutomationStatus.ARCHIVED}>Archived</select_1.SelectItem>
          </select_1.SelectContent>
        </select_1.Select>

        <select_1.Select value={triggerFilter} onValueChange={(value) => setTriggerFilter(value)}>
          <select_1.SelectTrigger className="w-[180px]">
            <lucide_react_1.Filter className="mr-2 h-4 w-4"/>
            <select_1.SelectValue placeholder="Trigger"/>
          </select_1.SelectTrigger>
          <select_1.SelectContent>
            <select_1.SelectItem value="all">All Triggers</select_1.SelectItem>
            <select_1.SelectItem value={automation_1.TriggerType.EVENT}>Event</select_1.SelectItem>
            <select_1.SelectItem value={automation_1.TriggerType.BEHAVIOR}>Behavior</select_1.SelectItem>
            <select_1.SelectItem value={automation_1.TriggerType.TIME_BASED}>Time-Based</select_1.SelectItem>
            <select_1.SelectItem value={automation_1.TriggerType.ATTRIBUTE}>Attribute</select_1.SelectItem>
          </select_1.SelectContent>
        </select_1.Select>
      </div>

      {/* Loading State */}
      {isLoading && (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (<skeleton_1.Skeleton key={i} className="h-64"/>))}
        </div>)}

      {/* Automation Cards */}
      {!isLoading && filteredAutomations && filteredAutomations.length > 0 && (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAutomations.map((automation) => (<automation_card_1.AutomationCard key={automation.id} automation={automation} onDelete={handleDelete}/>))}
        </div>)}

      {/* Empty State */}
      {!isLoading && filteredAutomations && filteredAutomations.length === 0 && (<div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <lucide_react_1.Plus className="h-6 w-6 text-primary"/>
          </div>
          <h3 className="mt-4 text-lg font-semibold">No automations found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery || statusFilter !== 'all' || triggerFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by creating your first automation'}
          </p>
          {!searchQuery && statusFilter === 'all' && triggerFilter === 'all' && (<link_1.default href="/admin/email-marketing/automations/new">
              <button_1.Button className="mt-4">
                <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
                Create Automation
              </button_1.Button>
            </link_1.default>)}
        </div>)}

      {/* Stats */}
      {!isLoading && automations && automations.length > 0 && (<div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border p-4">
            <div className="text-2xl font-bold">{automations.length}</div>
            <div className="text-sm text-muted-foreground">Total Automations</div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-2xl font-bold">
              {automations.filter((a) => a.status === automation_1.AutomationStatus.ACTIVE).length}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-2xl font-bold">
              {automations.reduce((sum, a) => sum + a.subscriberCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Subscribers</div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-2xl font-bold">
              {automations.reduce((sum, a) => sum + a.executionCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Executions</div>
          </div>
        </div>)}
    </div>);
}
//# sourceMappingURL=automation-list.js.map
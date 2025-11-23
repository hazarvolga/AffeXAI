/**
 * Automation List Component
 * Lists all automations with filtering and actions
 */

'use client';

import { useState } from 'react';
import { useAutomations, useDeleteAutomation } from '@/hooks/use-automation';
import { AutomationCard } from './automation-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Filter } from 'lucide-react';
import { AutomationStatus, TriggerType } from '@/types/automation';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export function AutomationList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AutomationStatus | 'all'>('all');
  const [triggerFilter, setTriggerFilter] = useState<TriggerType | 'all'>('all');

  const { data: automations, isLoading, error } = useAutomations();
  const deleteMutation = useDeleteAutomation();

  // Filter automations
  const filteredAutomations = automations?.filter((automation) => {
    const matchesSearch =
      automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      automation.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || automation.status === statusFilter;

    const matchesTrigger = triggerFilter === 'all' || automation.triggerType === triggerFilter;

    return matchesSearch && matchesStatus && matchesTrigger;
  });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this automation?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  if (error) {
    console.error('Automation load error:', error);
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load automations. Please try again later.
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-2 text-xs opacity-75">
              Error: {error instanceof Error ? error.message : 'Unknown error'}
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketing Automations</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage automated email workflows
          </p>
        </div>
        <Link href="/admin/email-marketing/automations/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Automation
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search automations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value={AutomationStatus.DRAFT}>Draft</SelectItem>
            <SelectItem value={AutomationStatus.ACTIVE}>Active</SelectItem>
            <SelectItem value={AutomationStatus.PAUSED}>Paused</SelectItem>
            <SelectItem value={AutomationStatus.COMPLETED}>Completed</SelectItem>
            <SelectItem value={AutomationStatus.ARCHIVED}>Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select value={triggerFilter} onValueChange={(value) => setTriggerFilter(value as any)}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Trigger" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Triggers</SelectItem>
            <SelectItem value={TriggerType.EVENT}>Event</SelectItem>
            <SelectItem value={TriggerType.BEHAVIOR}>Behavior</SelectItem>
            <SelectItem value={TriggerType.TIME_BASED}>Time-Based</SelectItem>
            <SelectItem value={TriggerType.ATTRIBUTE}>Attribute</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      )}

      {/* Automation Cards */}
      {!isLoading && filteredAutomations && filteredAutomations.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAutomations.map((automation) => (
            <AutomationCard
              key={automation.id}
              automation={automation}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredAutomations && filteredAutomations.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No automations found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery || statusFilter !== 'all' || triggerFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Get started by creating your first automation'}
          </p>
          {!searchQuery && statusFilter === 'all' && triggerFilter === 'all' && (
            <Link href="/admin/email-marketing/automations/new">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Create Automation
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Stats */}
      {!isLoading && automations && automations.length > 0 && (
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border p-4">
            <div className="text-2xl font-bold">{automations.length}</div>
            <div className="text-sm text-muted-foreground">Total Automations</div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-2xl font-bold">
              {automations.filter((a) => a.status === AutomationStatus.ACTIVE).length}
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
        </div>
      )}
    </div>
  );
}

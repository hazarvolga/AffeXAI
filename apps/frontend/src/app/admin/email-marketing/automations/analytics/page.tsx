'use client';

import { AutomationAnalytics } from '@/components/email-marketing/automation/automation-analytics';

export default function AutomationAnalyticsPage() {
  // In production, get automationId from URL params
  const automationId = 'demo-automation-1';

  return (
    <div className="container mx-auto py-6">
      <AutomationAnalytics automationId={automationId} />
    </div>
  );
}

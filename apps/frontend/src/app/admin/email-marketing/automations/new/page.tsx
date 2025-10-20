'use client';

import { AutomationBuilder } from '@/components/email-marketing/automation/automation-builder';

export default function NewAutomationPage() {
  return (
    <div className="container mx-auto py-6">
      <AutomationBuilder mode="create" />
    </div>
  );
}

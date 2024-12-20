'use client';

import { PageHeader } from '@/components/layout/page-header';
import { Settings } from '@monite/sdk-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your organization settings"
      />
      <div className="rounded-lg border bg-card">
        <Settings />
      </div>
    </div>
  );
}
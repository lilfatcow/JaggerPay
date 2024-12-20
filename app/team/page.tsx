'use client';

import { Users } from '@monite/sdk-react';
import { PageHeader } from '@/components/layout/page-header';

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Management"
        description="Manage your team members and permissions"
      />
      <div className="rounded-lg border bg-card">
        <Users />
      </div>
    </div>
  );
}
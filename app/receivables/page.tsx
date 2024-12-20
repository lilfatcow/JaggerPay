'use client';

import { Receivables } from '@monite/sdk-react';
import { PageHeader } from '@/components/layout/page-header';

export default function ReceivablesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Receivables"
        description="Track and manage your accounts receivable"
      />
      <div className="rounded-lg border bg-card">
        <Receivables />
      </div>
    </div>
  );
}
'use client';

import { Payables } from '@monite/sdk-react';
import { PageHeader } from '@/components/layout/page-header';

export default function PayablesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Payables"
        description="Manage your accounts payable and invoices"
      />
      <div className="rounded-lg border bg-card">
        <Payables />
      </div>
    </div>
  );
}
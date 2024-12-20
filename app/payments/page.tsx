'use client';

import { PaymentsList } from '@monite/sdk-react';
import { PageHeader } from '@/components/layout/page-header';

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        description="Process and track all payments"
      />
      <div className="rounded-lg border bg-card">
        <PaymentsList />
      </div>
    </div>
  );
}
'use client';

import { CorporateCards } from '@monite/sdk-react';
import { PageHeader } from '@/components/layout/page-header';

export default function CardsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Corporate Cards"
        description="Manage your corporate cards and expenses"
      />
      <div className="rounded-lg border bg-card">
        <CorporateCards />
      </div>
    </div>
  );
}
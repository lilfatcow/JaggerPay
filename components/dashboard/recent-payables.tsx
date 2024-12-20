'use client';

import { Suspense } from 'react';
import { Payables } from '@monite/sdk-react';
import { Skeleton } from '@/components/ui/skeleton';

function PayablesContent() {
  return (
    <div className="bg-card rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Payables</h2>
      <Payables />
    </div>
  );
}

export function RecentPayables() {
  return (
    <Suspense fallback={<PayablesSkeleton />}>
      <PayablesContent />
    </Suspense>
  );
}

function PayablesSkeleton() {
  return (
    <div className="bg-card rounded-lg p-6">
      <Skeleton className="h-8 w-48 mb-4" />
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
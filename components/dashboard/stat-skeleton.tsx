'use client';

import { Card, CardContent } from '@/components/ui/card';

export function StatSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-3/4 bg-gray-100 rounded animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
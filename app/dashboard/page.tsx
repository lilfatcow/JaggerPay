'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { TestMoniteConnection } from '@/components/monite/test-connection';
import { Stats } from '@/components/dashboard/stats';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RecentPayables } from '@/components/dashboard/recent-payables';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we load your dashboard.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.user_metadata?.name || user.email}!</p>
        </div>
        <TestMoniteConnection />
      </div>
      
      <Stats />
      <QuickActions />
      <RecentPayables />
    </div>
  );
}

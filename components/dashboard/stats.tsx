'use client';

import { useEffect, useState } from 'react';
import { fetchStats, type Stats } from '@/lib/api/stats';
import { StatSkeleton } from './stat-skeleton';
import { StatCard } from './stat-card';

export function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getStats() {
      try {
        const data = await fetchStats();
        if (mounted) {
          setStats(data);
        }
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    getStats();
    return () => { mounted = false; };
  }, []);

  if (loading || !stats) {
    return <StatSkeleton />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Revenue"
        value={`$${stats.totalRevenue.toLocaleString()}`}
        change={stats.revenueChange}
        trend={stats.revenueChange >= 0 ? 'up' : 'down'}
      />
      <StatCard
        title="Payments Pending"
        value={`$${stats.pendingPayments.toLocaleString()}`}
        change={stats.paymentsChange}
        trend={stats.paymentsChange >= 0 ? 'up' : 'down'}
      />
      <StatCard
        title="Active Invoices"
        value={stats.activeInvoices.toString()}
        change={stats.invoicesChange}
        trend={stats.invoicesChange >= 0 ? 'up' : 'down'}
      />
    </div>
  );
}
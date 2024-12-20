'use client';

import { TransactionList } from '@/components/transactions/transaction-list';
import { TestMoniteConnection } from '@/components/monite/test-connection';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Wallet, CreditCard, ArrowRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const quickActions = [
    {
      title: 'Pay a Bill',
      description: 'Process a new payment',
      icon: CreditCard,
      href: '/dashboard/payables/new',
    },
    {
      title: 'Create Invoice',
      description: 'Bill a client',
      icon: ArrowUpRight,
      href: '/dashboard/receivables/new',
    },
    {
      title: 'Working Capital',
      description: 'Access financing',
      icon: Wallet,
      href: '/dashboard/capital',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your financial operations
          </p>
        </div>
        <TestMoniteConnection />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4 text-green-500" />
            <h3 className="font-semibold">Receivables</h3>
          </div>
          <p className="text-2xl font-bold mt-2">$12,450.00</p>
          <p className="text-sm text-muted-foreground">10 open invoices</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-red-500" />
            <h3 className="font-semibold">Payables</h3>
          </div>
          <p className="text-2xl font-bold mt-2">$8,230.00</p>
          <p className="text-sm text-muted-foreground">5 pending bills</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-500" />
            <h3 className="font-semibold">Working Capital</h3>
          </div>
          <p className="text-2xl font-bold mt-2">$50,000.00</p>
          <p className="text-sm text-muted-foreground">Available credit</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => (
            <Card key={action.title} className="p-6 hover:bg-muted/50 transition-colors">
              <Link href={action.href}>
                <div className="flex flex-col h-full">
                  <action.icon className="h-8 w-8 mb-4" />
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                  <div className="flex items-center gap-2 mt-4 text-sm text-primary">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <TransactionList />
      </div>
    </div>
  );
}

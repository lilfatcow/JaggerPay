'use client';

import { FileText, Receipt, Wallet } from 'lucide-react';
import { ActionCard } from './action-card';

const actions = [
  {
    title: 'Payables',
    description: 'Manage your accounts payable',
    icon: Receipt,
    action: 'View Payables',
    onClick: () => console.log('Navigate to payables'),
  },
  {
    title: 'Receivables',
    description: 'Track accounts receivable',
    icon: FileText,
    action: 'View Receivables',
    onClick: () => console.log('Navigate to receivables'),
  },
  {
    title: 'Payments',
    description: 'Process and track payments',
    icon: Wallet,
    action: 'Manage Payments',
    onClick: () => console.log('Navigate to payments'),
  },
] as const;

export function QuickActions() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {actions.map((action) => (
        <ActionCard key={action.title} {...action} />
      ))}
    </section>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { formatCurrency } from '@/lib/utils/format';
import { format } from 'date-fns';
import { fetchTransactions, type Transaction } from '@/lib/api/transactions';

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTransactions() {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error loading transactions:', error);
      } finally {
        setLoading(false);
      }
    }

    getTransactions();
  }, []);

  if (loading) {
    return <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
      ))}
    </div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <span className="text-sm text-muted-foreground">Last 30 days</span>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-card rounded-lg border"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 bg-primary/10" />
              <div>
                <h3 className="font-medium">{transaction.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {transaction.reference}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(transaction.date, 'MMM d')}
                </p>
              </div>
              {transaction.status === 'overdue' && (
                <span className="text-destructive font-medium">
                  Overdue
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
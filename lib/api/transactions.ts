'use client';

import { getMoniteSDK } from './monite';

export interface Transaction {
  id: string;
  name: string;
  reference: string;
  date: Date;
  amount: number;
  status: 'overdue' | 'paid' | 'pending';
}

export async function fetchTransactions(): Promise<Transaction[]> {
  try {
    const monite = getMoniteSDK();
    const [receivables, payables] = await Promise.all([
      monite.api.receivables.getList({ 
        limit: 5, 
        sort: '-created_at',
        status: ['issued', 'paid', 'overdue'] 
      }),
      monite.api.payables.getList({ 
        limit: 5, 
        sort: '-created_at',
        status: ['issued', 'paid', 'overdue']
      }),
    ]);

    const transactions = [
      ...receivables.data.map(r => ({
        id: r.id,
        name: r.counterpart_name || 'Unknown',
        reference: r.document_id || '',
        date: new Date(r.created_at),
        amount: r.amount || 0,
        status: r.status as 'overdue' | 'paid' | 'pending',
      })),
      ...payables.data.map(p => ({
        id: p.id,
        name: p.counterpart_name || 'Unknown',
        reference: p.document_id || '',
        date: new Date(p.created_at),
        amount: p.amount || 0,
        status: p.status as 'overdue' | 'paid' | 'pending',
      })),
    ].sort((a, b) => b.date.getTime() - a.date.getTime());

    return transactions.slice(0, 5);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}
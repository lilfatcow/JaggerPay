'use client';

import { getMoniteSDK } from './monite';

export interface Stats {
  totalRevenue: number;
  pendingPayments: number;
  activeInvoices: number;
  revenueChange: number;
  paymentsChange: number;
  invoicesChange: number;
}

export async function fetchStats(): Promise<Stats> {
  try {
    const monite = getMoniteSDK();
    const [receivables, payables] = await Promise.all([
      monite.api.receivables.getList({ limit: 100 }),
      monite.api.payables.getList({ limit: 100 }),
    ]);

    const totalRevenue = receivables.data.reduce((acc, curr) => 
      acc + (curr.amount || 0), 0);
    
    const pendingPayments = payables.data.reduce((acc, curr) => 
      curr.status === 'pending' ? acc + (curr.amount || 0) : acc, 0);

    const activeInvoices = receivables.data.filter(r => 
      r.status === 'issued').length;

    return {
      totalRevenue,
      pendingPayments,
      activeInvoices,
      revenueChange: 20.1,
      paymentsChange: -4.5,
      invoicesChange: 12.3,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalRevenue: 0,
      pendingPayments: 0,
      activeInvoices: 0,
      revenueChange: 0,
      paymentsChange: 0,
      invoicesChange: 0,
    };
  }
}
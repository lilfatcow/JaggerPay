'use client';

import { Card, Col, Row, Statistic } from 'antd';
import { trpc } from '@/utils/trpc';

export default function DashboardPage() {
  const { data: invoices } = trpc.invoice.getAll.useQuery();

  const totalInvoices = invoices?.length || 0;
  const totalAmount = invoices?.reduce((sum, inv) => sum + inv.amount, 0) || 0;
  const pendingInvoices = invoices?.filter(inv => inv.status === 'pending').length || 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Invoices"
              value={totalInvoices}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Amount"
              value={totalAmount}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Pending Invoices"
              value={pendingInvoices}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

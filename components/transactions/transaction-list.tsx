import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

interface Transaction {
  id: string;
  name: string;
  reference: string;
  amount: number;
  dueDate: string;
  status: 'overdue' | 'pending' | 'paid';
}

const transactions: Transaction[] = [
  {
    id: '1',
    name: 'SuperBloom House | Israa Saed & Aele Saed',
    reference: 'SBH10-24',
    amount: 18000.00,
    dueDate: 'Oct 1',
    status: 'overdue',
  },
  {
    id: '2',
    name: 'SuperBloom House | Israa Saed & Aele Saed',
    reference: 'SBH10-24',
    amount: 18000.00,
    dueDate: 'Oct 1',
    status: 'overdue',
  },
];

export function TransactionList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Recent Transactions</h2>
        <span className="text-sm text-muted-foreground">Last 30 days</span>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 rounded-lg border"
          >
            <div className="flex items-center gap-4">
              <Avatar />
              <div>
                <h3 className="font-medium">{transaction.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {transaction.reference}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge
                variant={transaction.status === 'overdue' ? 'destructive' : 'secondary'}
                className="capitalize"
              >
                {transaction.status}
              </Badge>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {transaction.dueDate}
                </p>
                <p className="font-medium">
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

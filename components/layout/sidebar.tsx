'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import {
  Home,
  FileText,
  Receipt,
  Wallet,
  Users2,
  Settings,
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Bill Pay', href: '/payables', icon: FileText },
  { name: 'Receivables', href: '/receivables', icon: Receipt },
  { name: 'WonderPay Capital', href: '/capital', icon: Wallet },
  { name: 'Clients & Vendors', href: '/clients', icon: Users2 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-muted/10">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <Logo showText={false} />
        <span className="text-sm font-medium">Wonderland Studio</span>
      </div>

      <div className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.name}
              asChild
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                isActive && 'bg-muted'
              )}
            >
              <Link href={item.href}>
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

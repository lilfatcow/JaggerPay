'use client';

import { cn } from '@/lib/utils';
import { 
  Home, Receipt, FileText, Wallet, 
  Users, Building2, Settings, Star 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Bill Pay', href: '/payables', icon: Receipt },
  { name: 'Receivables', href: '/receivables', icon: FileText },
  { name: 'WonderPay Capital', href: '/capital', icon: Star },
  { name: 'Clients & Vendors', href: '/counterparts', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-64 min-h-screen bg-white border-r px-3 py-4">
      <div className="mb-8 px-3">
        <div className="flex items-center gap-2 text-blue-600">
          <div className="h-2 w-2 rounded-sm bg-blue-600" />
          <span className="text-sm font-medium">Wonderland Studio</span>
        </div>
      </div>

      <div className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                pathname === item.href 
                  ? 'bg-black text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
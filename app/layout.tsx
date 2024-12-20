'use client';

import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/providers/auth-provider';
import { MoniteAppProvider } from '@/providers/monite-provider';
import { Toaster } from '@/components/ui/sonner';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth' || pathname === '/auth/signup';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <Providers>
              {children}
            </Providers>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
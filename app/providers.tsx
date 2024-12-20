'use client';

import { MoniteProvider } from '@monite/sdk-react';
import { ThemeProvider } from 'next-themes';
import { monite } from '@/lib/monite';
import { EmotionCacheProvider } from '@/lib/providers/emotion';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionCacheProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <MoniteProvider monite={monite}>
          {children}
        </MoniteProvider>
      </ThemeProvider>
    </EmotionCacheProvider>
  );
}
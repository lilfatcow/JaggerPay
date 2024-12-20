'use client';

import { MoniteProvider, MoniteSDK } from '@monite/sdk-react';
import { useMemo } from 'react';

export function MoniteAppProvider({ children }: { children: React.ReactNode }) {
  const monite = useMemo(() => {
    return new MoniteSDK({
      apiUrl: process.env.NEXT_PUBLIC_MONITE_API_URL!,
      entityId: process.env.NEXT_PUBLIC_MONITE_ENTITY_ID!,
      token: process.env.NEXT_PUBLIC_MONITE_TOKEN!,
    });
  }, []);

  return (
    <MoniteProvider monite={monite}>
      {children}
    </MoniteProvider>
  );
}

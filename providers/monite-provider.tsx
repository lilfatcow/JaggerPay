'use client';

import { MoniteSDK } from '@monite/sdk-api';
import { MoniteProvider } from '@monite/sdk-react';
import { useAuth } from '@/contexts/auth-context';
import { useMemo } from 'react';

export function MoniteAppProvider({ children }: { children: React.ReactNode }) {
  const { moniteToken } = useAuth();

  const monite = useMemo(() => {
    if (!moniteToken || typeof window === 'undefined') return null;

    return new MoniteSDK({
      apiUrl: 'https://api.sandbox.monite.com/v1',
      entityId: process.env.NEXT_PUBLIC_MONITE_ENTITY_ID!,
      fetchToken: async () => {
        try {
          const response = await fetch('https://api.sandbox.monite.com/v1/auth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              grant_type: 'client_credentials',
              client_id: process.env.NEXT_PUBLIC_MONITE_CLIENT_ID,
              client_secret: process.env.NEXT_PUBLIC_MONITE_CLIENT_SECRET,
              audience: process.env.NEXT_PUBLIC_MONITE_AUDIENCE,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch Monite token');
          }

          const data = await response.json();
          return data.access_token;
        } catch (error) {
          console.error('Error fetching Monite token:', error);
          return moniteToken; // Fallback to existing token
        }
      },
    });
  }, [moniteToken]);

  if (!monite) {
    return <>{children}</>;
  }

  return (
    <MoniteProvider monite={monite}>
      {children}
    </MoniteProvider>
  );
}
